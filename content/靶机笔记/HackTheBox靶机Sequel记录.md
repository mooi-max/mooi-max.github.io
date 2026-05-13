---
title: HackTheBox靶机Sequel记录
description:
date: 2026-05-13
tags:
  - 数据库
  - MySQL
  - 靶机笔记
---


# 一.介绍

mysql命令主要是用来连接连接 MySQL Server，部分其它协议兼容的数据库也可以用mysql连接。

## 常用连接命令

```bash
mysql -u [username] -p
mysql -u [username] -h [ip] --ssl=0
```

## 常用参数

```bash
-u						#指定登录的用户名
-p						#输入密码

-h						#指定数据库服务器的 IP 地址或域名
-P						#指定端口号	

--ssl=0					#禁用 SSL 加密连接。
```

## 常用操作命令

### 增

```bash
create database 表名;		#创建数据库
create table 表名 (			#创建表
    id int,
    username varchar(50),
    password varchar(50)
);
```

```bash

insert info 表名 (username, password) values ('admin', '123456');
```

### 删

```bash
delete from 表名 where id = 1;				#删行
alter table 表名 drop column  列名;			#删列
drop table 表名;								#删表
drop database 数据库名;						#删库
```

为了更好理解，我们可以把数据库想象成一栋写字楼：

- Database（数据库） 是整栋大楼。
- Table（数据表） 是大楼里的一个个房间。
- Column（列） 是房间里固定好的柜子。
- Row/Data（行/数据） 是柜子里存放的一份份文件。

|操作|SQL 命令|翻译成“人话”口诀|
|---|---|---|
|删行|​DELETE FROM 表 WHERE 条件​|“从表里把满足条件的行删掉”（挑刺儿删）|
|删列|​ALTER TABLE 表 DROP 列​|“改变表结构，砸掉这一列”（拆墙拆柜子）|
|删表|​DROP TABLE 表​|“直接把这整张表爆破消失”（拆房间）|
|删库|​DROP DATABASE 库​|“直接把这个数据库连根拔起”（拆大楼）|

删除行/数据用delete from，其它用drop

删除行用delete from​选择表  
删除列用alter table​选择表

### 改

```bash
update users set password='new_password' where username='admin';
```

### 查

```bash
show databases;				#查看所有数据库
use [db_name];				#选中数据库

show tables;				#查看所有表
select * from [table_name];	#查看表中所有数据

SELECT password FROM users WHERE username = 'admin';
```

## 测试：

数据库基础操作测试

1. ​列出所有数据库​，并创建一个名为 mydb​的新数据库。

2. 进入 mydb​数据库，在其中创建一张名为 mytb​的数据表，包含以下三个字段：id​、usname​、passwd​。

3. 向 mytb​表中插入两条初始数据，要求如下表所示：

|id|usname|passwd|
|---|---|---|
|1|root|123|
|2|user|user|

4. 使用查询命令查看 mytb​表中的所有数据。

5. 将数据表中 id=2​的用户的 passwd​字段值修改为 456​。

6. 从表中删除 id=2​的这一行数据。

7. 修改表结构，删除 passwd​这一列。

8. 删除整张 mytb​数据表。

9. 最后，删除 mydb​数据库。


> ✏️ Note
> 
> 不看答案完成上面测试，就能掌握数据库的基础知识

## 答案：

1. 列出所有数据库，并创建一个名为 mydb​的新数据库。

```bash
show databases;
```

```bash
create database mydb;
```

2. 进入 mydb​数据库，在其中创建一张名为 mytb​的数据表，包含以下三个字段：id​、usname​、passwd​。

```bash
use mydb;
```

```bash
> create table mytb(
    -> id int,
    -> usname varchar(50),
    -> passwd varchar(50)
    -> );
```

3.向 mytb​表中插入两条初始数据，要求如下表所示：

|id|usname|passwd|
|---|---|---|
|1|root|123|
|2|user|user|

```bash
insert into mytb (id,usname,passwd) values 
(1,'root','123'),
(2,'user','user');
```

4. 使用查询命令查看 mytb​表中的所有数据。

```bash
select * from mytb;
```

​![image](assets/image-20260513165026-5tqw9bz.png)​

5. 将数据表中 id=2​的用户的 passwd​字段值修改为 456​。

```bash
update mytb set passwd='456' where id=2;
```

6. 从表中删除 id=2​的这一行数据。

```bash
delete from mytb where id=2;
```

7. 删除 passwd​这一列。

```bash
alter table mytb drop column passwd;
```

8. 删除整张 mytb​数据表。

```bash
drop table mytb;
```

9. 最后，删除 mydb​数据库。

```bash
drop database mydb;
```

​![image](assets/image-20260513165137-q8m5r3x.png)​

# 二.靶机

## 1.扫描过程中，我们发现哪个端口在运行 MySQL？

```bash
3306
```

## 2.目标系统运行的是哪个社区开发的 MySQL 版本？

```bash
MariaDB
```

## 3.使用 MySQL 命令行客户端时，我们需要使用哪个开关来指定登录用户名？

```bash
-u
```

## 4.哪个用户名允许我们在不提供密码的情况下登录此 MariaDB 实例？

```bash
root
```

## 5.在 SQL 中，我们可以使用哪个符号在查询中指定要显示表中的所有内容？

```bash
*
```

## 6.在 SQL 中，每个查询语句的结尾需要使用什么符号？

```bash
;
```

## 7.此 MySQL 实例中有三个数据库是所有 MySQL 实例共有的。第四个数据库是此主机独有的，它的名称是什么？

```bash
htb
```

## 8.在 MySQL 中，选择要交互的数据库的命令是什么？

```bash
use
```

## 9.在 MySQL 中，显示给定表中不同列的命令是什么？

```bash
describe
```

## 10.哪个表有一个名为“flag”的列？

```bash
config
```


