---
sidebar_position: 15
---

## 第16章 MySQL优化（二）

### 一、AutoCommit

- 含义为是否自动提交事务。
- 默认的AutoCommit=1，也就是假如建立一个数据库链接，我想数据库发送sql语句，发10条语句，这每一条语句都是会开启一个事务，也就是会说开启了10个事务，这浪费性能，所以最好建议关掉，然后手动声明开启事务，这样就可以提高性能。

### 二、buffer

- buffer_pool：缓冲池，放数据的缓冲池，这个适度增大可以让数据读写硬盘的次数减少
- innodb_change_buffering=all，以便除了插入操作外，还有更新和删除操作都会用到缓冲buffering
- 把大型的事务分成几个小型的事务，不要把一个执行插入特大的大量数据的事务运行，这样会特别消耗性能。
