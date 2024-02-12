---
layout: post
title: node下基于MySQL实现分布式锁
date: '2022-09-20 00:00:00'
categories:
  - 技术
tags:
  - node
  - mysql
  - 分布式锁
---

# node下基于MySQL实现分布式锁

业务里有一个清理数据库日志的功能，于是搞了个定时任务去删记录。为了不让多个机器的定时任务同时去删记录，就自然而然的想到了加锁。迫于现实技术栈限制，只能用“基本不用”的MySQL方式实现一个分布式锁。有条件最好的还是使用Redis吧。node框架使用了midwayjs和typeorm。

## 分布式锁的概述

单机器环境下，得益于node的单线程事件模型，其实是不需要过度考虑**共享资源**的问题。

当并发的去读写一个“共享资源”的时候，会出现两种情况：

+ 对结果没什么影响，但是会把某些操作多做几遍，**为了效率**需要控制一下。例如：清理过期数据、发送通知邮件等。
+ 对结果有很大的影响，造成数据不一致的情况发生，**为了正确性**需要控制一下。例如：发放奖励、处理订单数据等。

## 分布式锁特点

分布式锁一般有如下的特点：

+ 互斥性： 同一时刻只能有一个线程持有锁
+ 可重入性： 同一节点上的同一个线程如果获取了锁之后能够再次获取锁
+ 锁超时：和J.U.C中的锁一样支持锁超时，防止死锁
+ 高性能和高可用： 加锁和解锁需要高效，同时也需要保证高可用，防止分布式锁失效
+ 具备阻塞和非阻塞性：能够及时从阻塞状态中被唤醒

## 分布式锁的实现方式

常见的实现分布式锁的方式有：基于Redis、基于数据库、基于zookeeper等。

+ Redis由于是单线程，会顺序处理收到的请求，通过竞争键值资源实现分布式锁。
+ 数据库通过事务和数据库锁竞争表级资源或行级资源，以此实现分布式锁。
+ ZK类似于一个文件系统，通过多系统竞争文件系统上的文件资源，起到分布式锁的作用。

## MySQL的分布式锁实现

### 基于唯一索引(insert)实现

在数据库中创建一张表，在表的字段上增加一个唯一索引。通过同时向数据库中插入唯一索引的数据，来进行获取锁的竞争过程。

成功插入记录，表示获取锁。释放锁则将记录删除。

### 基于表字段版本号实现

增加版本号字段。首先获取当前版本号，然后尝试进行版本号+1的更新操作。如果更新成功，表示获取锁。实际就是个CAS过程。没有释放锁的过程。

### 基于排他锁(for update)实现

在select语句后面增加for update来给数据库增加排他锁，其它线程就无法在该记录上再增加排他锁，表示获取分布式锁成功。释放锁通过commit提交事务来实现。

## midwayjs和typeorm代码

下面基于midwayjs和typeorm实现一个简易的分布式锁。

### 数据库结构

在数据库新建一张表，用于记录锁信息。
```mysql
create table fem_shedlock
(
  name       varchar(64)  not null comment '琐名称',
  lock_until timestamp    not null comment '自动释放锁时间',
  locked_at  timestamp    not null default current_timestamp() comment '锁创建时间',
  locked_by  varchar(255) not null comment '锁创建者名称',
  constraint fem_shedlock_pk primary key (name)
) comment '分布式锁记录表';
```

数据库实体类，用于操作数据库数据。
```typescript
import { EntityModel } from '@midwayjs/orm';
import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

@EntityModel('fem_shedlock')
export class ShedlockEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 64, name: 'name' })
  name: string;

  @Column({ type: 'timestamp', name: 'lock_until' })
  lockUntil: Date;

  @Column({ type: 'timestamp', name: 'locked_at' })
  lockedAt: Date;

  @Column({ type: 'varchar', length: 255, name: 'locked_by' })
  lockedBy: string;
}
```

### 数据库分布式锁实现

主要思路就是更新表对应的记录，通过更新操作影响的行数，判断是否成功获取锁。lockUntil字段表示锁持有的时间，在锁持有时间内其它线程无法更新当前字段。lockedBy记录锁持有人，只有持有锁才能进行锁的续期和释放操作。释放锁就是将lockUntil字段设置为当前时间让锁过期即可。

```typescript
import { Logger, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository, LessThan, MoreThanOrEqual } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ILogger } from '@midwayjs/logger';
import * as dayjs from 'dayjs';
import type { ManipulateType } from 'dayjs';

import { ShedlockEntity } from '@/entity/shedlock.entity';

/**
 * 生成锁创建者编号，由环境变量中的容器名称、容器IP和一个随机的uuid字符串组成。
 */
const getLockCreator = () => {
  const name = process.env.POD_NAME || 'noname';
  const ip = process.env.POD_IP || 'noip';
  const suffix = uuidv4();
  return `${name}_${ip}_${suffix}`;
};

// 锁创建者编号
const LOCK_CREATOR = getLockCreator();

@Provide()
export default class ShedlockService {
  @Logger()
  logger: ILogger;

  @InjectEntityModel(ShedlockEntity)
  shedlockRepository: Repository<ShedlockEntity>;

  /**
   * 查看锁是否已经存在，不管锁有没有过期
   * @param lockName 琐名称
   * @private
   */
  private async find(lockName: string) {
    return await this.shedlockRepository.findOne({
      where: {
        name: lockName,
      },
    });
  }

  /**
   * 插入锁，返回是否插入成功
   * @param lockName 琐名称
   * @param lockTime 锁定时间
   * @param lockTimeUnit 锁定时间的时间单位
   * @private
   */
  private async insert(
    lockName: string,
    lockTime: number,
    lockTimeUnit: ManipulateType
  ): Promise<boolean> {
    const current = dayjs();
    try {
      await this.shedlockRepository.insert({
        name: lockName,
        lockUntil: current.add(lockTime, lockTimeUnit).toDate(),
        lockedAt: current.toDate(),
        lockedBy: LOCK_CREATOR,
      });
    } catch (e) {
      this.logger.info(
        `[Shedlock]Insert lock failed. lockName=${lockName} creator=${LOCK_CREATOR}`,
        e
      );
      return false;
    }
    return true;
  }

  /**
   * 尝试更新锁
   * @param lockName 琐名称
   * @param lockTime 锁定时间
   * @param lockTimeUnit 锁定时间单位
   * @private
   */
  private async update(
    lockName: string,
    lockTime: number,
    lockTimeUnit: ManipulateType
  ): Promise<boolean> {
    const current = dayjs();
    try {
      const updateEffect = await this.shedlockRepository.update(
        {
          name: lockName,
          lockUntil: LessThan(current.toDate()),
        },
        {
          lockUntil: current.add(lockTime, lockTimeUnit).toDate(),
          lockedAt: current.toDate(),
          lockedBy: LOCK_CREATOR,
        }
      );
      return updateEffect.affected > 0;
    } catch (e) {
      this.logger.info(
        `[Shedlock]Update lock failed. lockName=${lockName} creator=${LOCK_CREATOR}`,
        e
      );
      return false;
    }
  }

  /**
   * 更新锁的持续时间，只能更新自己的锁
   * @param lockName 琐名称
   * @param untilTime 新的持续时间
   * @private
   */
  private async updateUntil(lockName: string, untilTime: Date) {
    const updateEffect = await this.shedlockRepository.update(
      {
        name: lockName,
        lockedBy: LOCK_CREATOR,
        lockUntil: MoreThanOrEqual(dayjs().toDate()),
      },
      {
        lockUntil: untilTime,
      }
    );
    return updateEffect.affected > 0;
  }

  /**
   * 尝试获取锁
   * @param lockName 琐名称
   * @param lockTime 锁时间
   * @param lockTimeUnit 锁时间单位
   */
  async lock(
    lockName: string,
    lockTime: number,
    lockTimeUnit: ManipulateType
  ): Promise<boolean> {
    if (!(await this.find(lockName))) {
      const insertSuccess = await this.insert(lockName, lockTime, lockTimeUnit);
      // 插入失败，尝试执行后续的更新锁逻辑
      if (insertSuccess) {
        return true;
      }
    }
    return await this.update(lockName, lockTime, lockTimeUnit);
  }

  /**
   * 锁续期，更新锁的持续时间，只有拥有锁的时候才可以延长持续时间
   * @param lockName 琐名称
   * @param lockTime 持续时间
   * @param lockTimeUnit 持续时间单位
   */
  async extend(
    lockName: string,
    lockTime: number,
    lockTimeUnit: ManipulateType
  ): Promise<boolean> {
    if (!(await this.find(lockName))) {
      return false;
    }
    const current = dayjs();
    return await this.updateUntil(
      lockName,
      current.add(lockTime, lockTimeUnit).toDate()
    );
  }

  /**
   * 释放锁
   * @param lockName 琐名称
   */
  async unlock(lockName: string): Promise<boolean> {
    return await this.updateUntil(lockName, dayjs().toDate());
  }
}
```

提供了几个方法：

+ lock() 获取锁，声明锁的持续时间，返回获取锁是否成功
+ unlock() 释放锁
+ extend() 锁续期，返回是否续期成功

### 分布式锁的使用

```typescript
// 获取LOCK_NAME的锁，锁持有10分钟
await this.shedlockService.lock(LOCK_NAME, 10, 'minutes')

// 释放锁
await this.shedlockService.unlock(LOCK_NAME);
```

## 参考内容

+ [https://github.com/pjmike/redis-distributed-lock](https://github.com/pjmike/redis-distributed-lock)
+ [https://github.com/lukas-krecan/ShedLock](https://github.com/lukas-krecan/ShedLock)
+ [微服务-分布式锁（一）-MySQL方案](https://juejin.cn/post/6988674953277571103)
