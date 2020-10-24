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

## Ribbon-客户端负载均衡

### 负载均衡：

将请求压力合理分配到对应的服务器上（轮询，权重，流量负载）

### 使用：

1.多个服务注册到同一个注册中心或者相关的服务注册中心

2.服务消费者通过调用被@loadBalanced修饰的RestTemplate



