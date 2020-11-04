---
layout: post
title: "SpringCloud入门" 
date: 2020-10-20 21:35:00
author: Hubo
categories: [SpringCloud]
tags: [SpringCloud]
---

# spring cloud入门

微服务治理，服务发现（Eureka），断路器（Hystrix），智能路由（Zuul），客户端负载均衡（Ribbon）等。 

## Eureka

解决微服务的管理

服务的注册：注册中心--监测各微服务，剔除失效微服务

服务的发现：

Eureka服务端--注册中心的功能

Eureka客户端--往注册中心注册自己，从注册中心发现别的微服务

高可用：自己是服务端也向别的服务端注册自己

```properties
eureka.instance.hostname=localhost
#表示是否将自己注册到Eureka Server
eureka.client.register-with-eureka=false
#表示是否从Eureka Server获取注册的服务信息
eureka.client.fetch-registry=false
eureka.client.service-url.defaultZone=http://${eureka.instance.hostname}:${server.port}/eureka/
#服务续约调用间隔时间为30s
eureka.instance.lease-renewal-interval-in-seconds=30
#服务失效时间90s
eureka.instance.lease-expiration-duration-in-seconds=90
#保护机制是否开启
eureka.server.enable-self-preservation=false
```

服务提供者会缓存一份服务清单，有失效时间，隔时间去更新，消费者通过服务名去获取



Region:一个Region多个Zone

Zone:



服务提供者：启动时发送请求注册自己-->如果还在别的注册中心注册的话，给注册的也发送注册请求-->间隔时间			  	  	进行服务续约



服务消费者：发送请求到注册中心查找需要的服务提供者（此时就会用到Ribbon）-->服务提供者正常关闭时发送请求给注册中心下线-->注册中心更改服务提供者的状态为Down并传播出去

？：默认先给哪个注册中心发消息



注册中心：

失效剔除、自我保护（注册中心会保存一份服务提供能者的数据，不会立即清除）

？：自我保护的情况下失效剔除会进行吗



## Ribbon-客户端负载均衡

在Eureka服务发现的基础上自己实现了一套对服务势力选择的策略

@LoadBalanced

### 负载均衡：

将请求压力合理分配到对应的服务器上（轮询，权重，流量负载）

### 使用：

1.多个服务注册到同一个注册中心或者相关的服务注册中心

2.服务消费者通过调用被@loadBalanced修饰的RestTemplate

## Hystrix断路器

出现错误、超时、线程池拒绝、短路熔断时执行fallback()方法

注解@HystrixCommand(fallbackMethod = "helloFallBack")

方法与函数必须得在一个类中

方法名和注解中的一致

熔断的作用：

​	1.请求量大：请求数量是否在阈值内，默认20；

​	2.请求失败：错误百分比是否在阀值内，默认50；

如何决策熔断？

依赖隔离--舱壁模式实现线程的隔离 --为每一个服务提供一个线程池

信号量--控制并发度

### 异常处理

@HystrixCommand(ignoreExceptions = {BadRequestException.class})当抛出BadRequestException时不会产生服务降级；

针对不同的异常执行不同的服务降级方法：

1.继承实现HystrixCommand类，通过对获取的异常后判断异常类型使用不同的方法；

CommandKey

groupKey

threadPoolKey

### 缓存功能

getCacheKey()--开启缓存

#### 清理失效缓存功能：

## 声明式服务调用：Feign

整合了Ribbon和Hystrix

Ribbon使用RestTemplate实现调用，Feign对方法使用注解即可

@FeignClient("hello-service")注解到对应的接口

## API网关服务：Zuul

外观设计模式

实现请求路由、负载均衡、校验过滤、服务治理框架的结合、请求转发时的熔断机制、服务的聚合

通过Eureka实现服务的治理

ContextPath建立路由映射



Zuul中包含了ribbon、hystrix、actuator

### 路由

### 请求过滤：

继承ZuulFilter抽象类，实现方法

filterType:过滤器的请求在哪个生命周期执行

filterOrder:过滤器的执行顺序

shouldFilter:判断过滤器是否需要执行

run:过滤器的具体逻辑

## 分布式配置中心：Confg

## 消息总线：Bus

RabbitMq 、Kafka

## 消息驱动微服务：Stream

## 分布式服务追踪：Sleuth

