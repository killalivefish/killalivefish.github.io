---
layout: posts
title:  "SpringCloud alibaba"
date:   2025-03-10 15:00:36
categories: SpringCloud
excerpt: SpringCloud alibaba笔记
---
spring cloud alibaba官方文档：

[https://sca.aliyun.com/zh-cn/docs/2022.0.0.0/user-guide/nacos/quick-start/](https://sca.aliyun.com/zh-cn/docs/2022.0.0.0/user-guide/nacos/quick-start/)

[https://www.bilibili.com/read/cv10201049/](https:/www.bilibili.com/read/cv10201049/)

## Nacos

> 官网：[https://nacos.io/](https:/nacos.io/)
> 
> 1.微服务的注册中心
> 
> 2.配置中心

相当于spring cloud netfliex的eureka和spring cloud config

### 配置DB

`nacos\conf\application.properties`中配置DB相关字段

容易忽略的参数：

````
<b><span style="color:rgba(244,63,94,1)">spring.datasource.platform=mysql	</span></b>
````

<b><span style="color:rgba(244,63,94,1)">	db.num=1</span></b>

### 配置集群

`nacos\conf\cluster.conf`中配置所有的节点

### 配置Nginx

[https://blog.csdn.net/A0415_1119/article/details/134496259?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-134496259-blog-123233138.235%5Ev43%5Epc_blog_bottom_relevance_base7&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-134496259-blog-123233138.235%5Ev43%5Epc_blog_bottom_relevance_base7&utm_relevant_index=2](https:/blog.csdn.net/A0415_1119/article/details/134496259?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%257Edefault%257ECTRLIST%257ERate-1-134496259-blog-123233138.235%255Ev43%255Epc_blog_bottom_relevance_base7&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%257Edefault%257ECTRLIST%257ERate-1-134496259-blog-123233138.235%255Ev43%255Epc_blog_bottom_relevance_base7&utm_relevant_index=2)

docker部署

[https://blog.csdn.net/m0_53151031/article/details/123118920](https:/blog.csdn.net/m0_53151031/article/details/123118920)



差异：

nacos启动报错

问题：本地启动报错

````
Caused by: java.net.UnknownHostException: jmenv.tbsite.net
        at java.base/java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:221)
        at java.base/java.net.PlainSocketImpl.connect(PlainSocketImpl.java:148)
        at java.base/java.net.Socket.connect(Socket.java:591)
        at java.base/sun.net.NetworkClient.doConnect(NetworkClient.java:177)
        at java.base/sun.net.www.http.HttpClient.openServer(HttpClient.java:474)
        at java.base/sun.net.www.http.HttpClient.openServer(HttpClient.java:569)
        at java.base/sun.net.www.http.HttpClient.<init>(HttpClient.java:242)
        at java.base/sun.net.www.http.HttpClient.New(HttpClient.java:341)
        at java.base/sun.net.www.http.HttpClient.New(HttpClient.java:362)
        at java.base/sun.net.www.protocol.http.HttpURLConnection.getNewHttpClient(HttpURLConnection.java:1242)
        at java.base/sun.net.www.protocol.http.HttpURLConnection.plainConnect0(HttpURLConnection.java:1181)
        at java.base/sun.net.www.protocol.http.HttpURLConnection.plainConnect(HttpURLConnection.java:1075)
        at java.base/sun.net.www.protocol.http.HttpURLConnection.connect(HttpURLConnection.java:1009)
        at com.alibaba.nacos.common.http.client.request.JdkHttpClientRequest.execute(JdkHttpClientRequest.java:112)
        at com.alibaba.nacos.common.http.client.NacosRestTemplate.execute(NacosRestTemplate.java:482)
        at com.alibaba.nacos.common.http.client.NacosRestTemplate.get(NacosRestTemplate.java:72)
        at com.alibaba.nacos.core.cluster.lookup.AddressServerMemberLookup.syncFromAddressUrl(AddressServerMemberLookup.java:143)
        at com.alibaba.nacos.core.cluster.lookup.AddressServerMemberLookup.run(AddressServerMemberLookup.java:111)
        ... 125 common frames omitted
2024-02-20 20:21:52,238 WARN [WatchFileCenter] start close
````

解决：[https://blog.csdn.net/ityw520/article/details/123149849](https://blog.csdn.net/ityw520/article/details/123149849)

读取不到extension-configs的配置文件--TODO

### 源码

- 登陆和权限spring security+JWT token
- config版本控制
- 如何实现的注册和配置

## Sentinel

> 官网：[https://sentinelguard.io/](https:/sentinelguard.io/)
> 
> 1.限流
> 
> 2.熔断
> 
> 3.服务降级

限流报错的内容自定义---通过@SentinelResource中fallback或者fallback class定义的方法名称去匹配和返回

[https://zhuanlan.zhihu.com/p/446532710](https:/zhuanlan.zhihu.com/p/446532710)

[https://www.cnblogs.com/FlyGoldfish/articles/14269621.html](https:/www.cnblogs.com/FlyGoldfish/articles/1)

SentinelResource的value要和接口请求的路径一样吗----不用直接通过value中的值进行设置就行

![](/assets/article/18dfab29676.png)

### 持久化

TODO

### 问题

- 创建流控规则时报错，而且显示的IP不正确

  ![](/assets/article/18df7f39b4d.png)

  ```log
  2024-02-29 21:46:11.917 ERROR 2421 --- [pool-2-thread-1] c.a.c.s.dashboard.metric.MetricFetcher   : Failed to fetch metric from <http://169.254.54.211:9001/metric?startTime=1709261036000&endTime=1709261042000&refetch=false> (ConnectionException: Connection timed out)
  2024-02-29 21:46:18.958 ERROR 2421 --- [pool-2-thread-1] c.a.c.s.dashboard.metric.MetricFetcher   : Failed to fetch metric from <http://169.254.54.211:9001/metric?startTime=1709261043000&endTime=1709261049000&refetch=false> (ConnectionException: Connection timed out)
  
  ```

  原因：sentinel的dashboard会安装[http://client-ip:port拉取数据，没有配置的话会分配一个](http://client-ip:port%E6%8B%89%E5%8F%96%E6%95%B0%E6%8D%AE%EF%BC%8C%E6%B2%A1%E6%9C%89%E9%85%8D%E7%BD%AE%E7%9A%84%E8%AF%9D%E4%BC%9A%E5%88%86%E9%85%8D%E4%B8%80%E4%B8%AA)

  解决：在yaml配置文件中加上client-ip和client-ip

  ![](/assets/article/18df7fa2898.png)

  参考链接：[https://blog.csdn.net/hjg719/article/details/128095358](https:/blog.csdn.net/hjg719/article/details/128095358)


## Gateway

> 1.路由请求
> 
> 2.整合Nacos和Ribbon实现动态服务治理和负载均衡
> 
> 3.整合Sentinel实现Sentinel的防护效

### 灰度发布

### 问题

1. 启动失败

   ```log
   parameter 0 of method modifyrequestbodygatewayfilterfactory in org.springfra
   ```

   原因：是由于依赖冲突，spring-cloud-starter-gateway与spring-boot-starter-web和spring-boot-starter-webflux依赖冲突

   解决：

   ```xml
    <dependency>
               <groupId>org.springframework.cloud</groupId>
               <artifactId>spring-cloud-starter-gateway</artifactId>
               <exclusions>
                   <exclusion>
                       <groupId>org.springframework.boot</groupId>
                       <artifactId>spring-boot-starter-web</artifactId>
                   </exclusion>
                   <exclusion>
                       <groupId>org.springframework.boot</groupId>
                       <artifactId>spring-boot-starter-webflux</artifactId>
                   </exclusion>
               </exclusions>
           </dependency>
   ```

2. 整合Sentinel启动失败

   原因：高版本的需要引入Sentinel对于Spring Cloud Gateway的依赖，注意版本解决冲突可以处理掉一些启动失败和报错的问题


## OpenFegin

> 让服务间的调用变简单

## Dubbo

> RPC，服务间调用通过RPC协议，性能更好

### 3.问题

1. 启动报错: Address already in use: bind

   原因：dubbo消费放的dubbo端口被占用，配置上新的的端口号就行

2. 服务放调用不到接口
3. nacos上消费方的ip不是主机的ip

## Spring Stream

> 封装使用MQ的代码，简化MQ的使用

## Seata

## Skywalking

> ARM，服务间的监控

[https://zhuanlan.zhihu.com/p/660828898](https:/zhuanlan.zhihu.com/p/660828898)

- JDK 11
- Elasticsearch [https://www.elastic.co/cn/downloads/past-releases/elasticsearch-7-17-1](https:/www.elastic.co/cn/downloads/past-releases/elasticsearch-7-17-1)
- Skywalking [https://archive.apache.org/dist/skywalking/8.9.0/](https:/archive.apache.org/dist/skywalking/8.9.0/)

## Docker

## Kubernets

## Jenkins

## Splunk