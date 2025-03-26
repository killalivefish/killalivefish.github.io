---
layout: posts
title:  "SpringBoot自动加载机制"
date:   2025-03-25 10:41:36
categories: 后端
excerpt: SpringBoot自动加载机制的实现
---
官方文档：https://docs.spring.io/spring-boot/docs/2.7.18/reference/html/features.html#features.developing-auto-configuration
1. 定义AutoConfiguration类
2. 定义Configuration类
3. 定义KafkaProperties类
SpringBoot自动加载机制的实现主要由下面这些注解实现
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({RestTemplate.class})
@ConditionalOnBean({LoadBalancerClient.class})
@EnableConfigurationProperties({LoadBalancerClientsProperties.class})
@ConfigurationProperties("spring.cloud.loadbalancer")