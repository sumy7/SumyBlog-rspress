---
layout: post
title: Maven 初尝试踩坑记录
date: '2016-11-22 13:53:34'
categories:
  - 问题麻烦
tags:
  - maven
  - java
  - 模块化
reference:
  - url: >-
      http://stackoverflow.com/questions/2229757/maven-add-a-dependency-to-a-jar-by-relative-path
    title: 'Maven: add a dependency to a jar by relative path - StackOverflow'
---

之前有个项目使用的 `Ant` 构建出来的，当时为了节省时间，就在里面填填补补，导致现在感觉项目比较凌乱。于是花了大约2周的时间将 `Ant` 重构成了 `Maven`，由于第一次使用，好多地方也不是很明白，没有达到100%还原。

这里只简单记录一下耗时比较长的坑，一些简单的内容可以通过谷歌直接解决了。

# Maven 划分模块

一个典型的 Maven 项目包含 **父模块** 与 **子模块** ，父模块主要用于整合项目，声明一些基本的变量数据集，统筹各个子模块之间的关系。每个子模块最好只包含一个单独的功能。

关于模块的打包方式有 `pom` 、 `jar` 、 `war` 等，父模块只能为 `pom` ，子模块根据需要可以声明为不同的打包格式。

在这个项目分成的结构示意如下：

```
---- app-parent
      |-- pom.xml (pom)
      |
      |-- app-conf
      |        |-- pom.xml (pom)
      |
      |-- app-a
      |        |-- pom.xml (jar)
      |
      |-- app-b
      |        |-- pom.xml (jar)
      |
      |-- app-dist
              |-- pom.xml (directory)
```

`app-parent` 是父模块， `app-conf` 放置一些单独的配置文件， `app-a` 和 `app-b` 是项目的一个jar包， `app-dist` 用于将项目中的内容组合成符合要求的目录格式。

# Maven assembly

Maven 是一种 **约定** 型构建语言，即使很少的配置，只要位置放置正确，也能生成符合要求的jar包。但是，现实情况下往往需要生成复杂的目录结构，Maven 中含有很多的打包插件可以解决这个问题，这里使用的是 `maven-assembly-plugin` 打包插件。它会根据xml声明的配置来组织打包结构。

主要的结构如下：

```xml
<assembly>
[...]
    <dependencySets>
    </dependencySets>
    <moduleSets>
    </moduleSets>
    <fileSets>
    </fileSets>
[...]
</assembly>
```

`dependencySets` 处理模块依赖的jar如何存放， `moduleSets` 处理单独的模块如何存放， `fileSets` 处理自定义文件如何存放。每个标签下面都可以指定模块名称和输出目录。

举个例子：

1. 将模块 **app-a 依赖** 放入 `/lib` 目录下
2. 将模块 **app-b** 放在根目录下
3. 将 **app-conf** 放在 `/conf` 目录下

```xml
<assembly>
[...]
    <dependencySets>
        <!-- 将app-a的依赖打包到 /lib 目录 -->
        <dependencySet>
            <outputDirectory>/lib</outputDirectory>
            <includes>
                <include>xx.xx.xx:app-a</include>
            </includes>
        </dependencySet>
    </dependencySets>
    <moduleSets>
        <!-- 将app-b的jar复制到根目录 -->
        <moduleSet>
            <includes>
                <include>xx.xx.xx:app-b</include>
            </includes>
            <binaries>
                <outputDirectory>/</outputDirectory>
                <unpack>false</unpack>
                <includes>
                    <include>*</include>
                </includes>
            </binaries>
        </moduleSet>
    </moduleSets>
    <fileSets>
        <!-- 将app-conf目录下的内容复制到 /conf 目录 -->
        <fileSet>
            <directory>../app-conf/</directory>
            <outputDirectory>./conf</outputDirectory>
        </fileSet>
    </fileSets>
[...]
</assembly>
```

assembly 还有很多配置，暂时用到的只有这么多。

# 可运行 jar 打包

可运行的 jar 包在文件内会包含 `MANIFEST.MF` 文件，在 ant 构建的时候，这个文件是自己书写并提供的。通过 `maven-jar-plugin` 插件可以指定 mainClass 并自动将依赖写入 MANIFEST.MF 文件。

```xml
[...]
           <plugin>
                <artifactId>maven-jar-plugin</artifactId>
                <configuration>
                    <archive>
                        <addMavenDescriptor>false</addMavenDescriptor>
                        <manifest>
                            <addClasspath>true</addClasspath>
                            <mainClass>xx.xx.xx.Xxxx</mainClass>
                        </manifest>
                    </archive>
                </configuration>
            </plugin>
[...]
```

但是，这里存在一个小问题，如果我们使用的jar包在maven库中找不到，你可能会通过本地引入的方式应用它（`Scope` 为 `System`）。

```xml
<dependency>
     <groupId>lib</groupId>
     <artifactId>commons-logging</artifactId>
     <version>1.0.4</version>
     <scope>system</scope>
     <systemPath>${basedir}/lib/commons-logging.jar</systemPath>
 </dependency>
```

这样虽然可以编译通过，但Maven却不将其作为标准 _依赖_ ，通过assembly和MANIFEST.MF都无法对其进行处理。

一个比较好的解决方案是创建一个项目专有的 **私有仓库** 。在父模块下创建一个文件夹 _repo_ 作为项目的私有仓库。

```
---- app-parent
      |-- pom.xml (pom)
      |
      |-- repo
```

复制jar包到私有仓库，使用maven命令

```shell
mvn install:install-file -Dfile=<path-to-file> -DgroupId=<myGroup> \
                         -DartifactId=<myArtifactId> -Dversion=<myVersion> \
                         -Dpackaging=<myPackaging> -DlocalRepositoryPath=<path>
```

例如：

```shell
mvn install:install-file -Dfile=/opt/a.jar -DgroupId=a.b.c \
                         -DartifactId=logging -Dversion=1.0.0 \
                         -Dpackaging=jar -DlocalRepositoryPath=./repo
```

执行完成后就可以在 _repo_ 文件夹下看到新加入的jar包。

在项目中引用私有仓库的jar包，首先要添加私有仓库的地址。如果包含子模块，不建议将仓库地址放在父模块的 pom.xml 文件内。

```xml
<repositories>
  <repository>
    <id>my-local-repo</id>
    <url>file://${basedir}/repo</url>
    <!-- 子模块中请使用 -->
    <url>file://${basedir}/../repo</url>
  </repository>
</repositories>
```

之后像其它 Maven 依赖一样引用就可以了。

```xml
<dependency>
     <groupId>a.b.c</groupId>
     <artifactId>logging</artifactId>
     <version>1.0.0</version>
 </dependency>
```