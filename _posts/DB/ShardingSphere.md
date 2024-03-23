- 官方文档：[https://shardingsphere.apache.org/document/legacy/3.x/document/cn/manual/sharding-jdbc/usage/read-write-splitting/](https:/shardingsphere.apache.org/document/legacy/3.x/document/cn/manual/sharding-jdbc/usage/read-write-splitting/)
- 参考：[https://zhuanlan.zhihu.com/p/383467428](https:/zhuanlan.zhihu.com/p/383467428)
- [https://juejin.cn/post/7324578107373387788?from=search-suggest](https:/juejin.cn/post/7324578107373387788?from=search-suggest)

## 1.JPA集成

读写分离

数据分片

分布式事务

### 1.1.配置

```yml
db:
  one: primary
  two: secondary
spring:
  shardingsphere:
    datasource:
      names: ${db.one},${db.two}
      primary:
        type: com.zaxxer.hikari.HikariDataSource
        jdbc-url: jdbc:mysql://localhost:3306/employeedb?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
        username: root
        password: root
        max-active: 16
      secondary:
        type: com.zaxxer.hikari.HikariDataSource
        jdbc-url: jdbc:mysql://192.168.*:3306/employeedb?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=GMT%2B8&allowPublicKeyRetrieval=true
        username: root
        password: root
        max-active: 16
    props:
      sql:
        show: true
    sharding:
      default-data-source-name: ${db.one}
      tables:
        employee:
          actual-data-nodes: ${db.one}.employee}
          table-strategy:
            inline:
              sharding-column: id
              algorithm-expression: employee->{id}
          key-generator:
            column: id
            type: SNOWFLAKE
```

sds

### 1.2.使用

ss

### 1.3.



## 2.Mybatis集成

读写分离

数据分片

分布式事务

### 1.1.配置

```yml

```

sds

### 1.2.使用

ss

### 1.3.

