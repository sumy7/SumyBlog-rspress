---
layout: post
title: 优化SQL查询时候的性能
date: '2018-05-31 21:43:49'
categories:
  - 实践
tags:
  - sql
  - mysql
  - 优化
  - 数据库
---

# 优化SQL查询时候的性能

最近是特殊时期，都在强调系统性能的优化。在师傅的指导下，对系统中一个比较费劲的功能进行了优化。师傅的理念是： **能用SQL解决的问题绝不用程序处理** 。在实际场景下，通过优化，将3分钟无法完成的业务优化到了1分钟以内。虽然没有优化到极致，但对SQL查询性能的了解前进了一大步，于是稍微记录一下。

## 建立索引

索引是避免全表扫描的一个重要手段。有索引和没有索引，好的索引和差的索引，对于性能的影响都是不同的。对于经常查询的字段可以建立索引，如主键；对于经常组合查询的字段可以建立联合索引。

这次遇到的情况是：

```sql
select * from table1 where a=1 and b in (?, ?);
```

这样子可以考虑将 `(a, b)` 建立组合索引。

## 使用IN进行批量查询

一般情况下，通过一次查询之后可能不会完全返回需要的所有数据，这时候会对每一条数据进行一次补充查询。

```sql
-- 返回初始数据
select * from table1 where deleted = 0;

-- 对初始数据补充查询数据
select * from table2 where id = ? and deleted = 0;
```

如果数据条目比较多，会频繁进行访问数据库操作。

为了减轻数据库的压力，可以将第一次查询初始数据后的值整合到列表中，查询补充数据的时候通过 **IN** 操作一次全部查询出来，然后在内存中转成map与初始数据对应结合。

```sql
select * from table2 where deleted = 0 and id IN (?, ?, ?);
```

## 避免将不同字段作为条件进行OR查询

使用 **OR** 可以查询出满足多个条件中至少一个条件的数据。但是如果遇到没有索引的字段，可能会造成无用的全表扫描。

```sql
select * from table1 where deleted = 0 and ( a = ? OR b = ?);
```

这种情况下通过将OR进行拆分，作为两个select语句，通过 **UNION ALL** 的方式结合数据。

```sql
select * from table1 where deleted = 0 and a = ?
UNION ALL
select * from table1 where deleted = 0 and b = ?
```

这样使得两个SQL可以分别根据自己的条件进行优化，避免全表扫描的出现。

## 避免进行大量的JOIN操作

大多数情况下，需要的数据会存在两个或多个表中。使用 **JOIN** 可以很方便的将多个表中需要的字段数据聚合起来。但是如果JOIN的表过多，数据库引擎会先将各个表根据JOIN条件聚合成一个宽表，然后从中查询。JOIN后表记录数是乘积式的增长。

```sql
select t1.* from table1 t1
  LEFT JOIN table2 t2 ON t1.id=t2.t1_id
  LEFT JOIN table3 t3 ON t1.id=t3.t1_id
  LEFT JOIN table4 t4 ON t1.id=t4.t1_id
where
  t1.delted = 0;
```

JOIN的表不易过多，1-2张为易，最近看到一张JOIN了5张表的查询，这样做的原因是想在SQL中查询其它表中的字段的聚合数据。这个时候可以考虑使用子查询进行改写：

```sql
select t1.*
    (select count(*) from table2 t2 where t2.t1_id=t1.id) t2_count,
    (select count(*) from table3 t3 where t3.t1_id=t1.id) t3_count,
    (select count(*) from table4 t4 where t4.t1_id=t1.id) t4_count,
 from table1 t1
 where
   t1.deleted = 0;
```

如果实在需要其它表的一些字段数据，可以参考前面提到的 **批量查询** 的方法，先是几张表进行关联查出基础数据，然后其它表关联查询附加数据，最后在内存中对这些数据进行整合。

如果这样关联的表还是很多，说明数据库设计有问题。

## 总结

拜拜。:hand:
