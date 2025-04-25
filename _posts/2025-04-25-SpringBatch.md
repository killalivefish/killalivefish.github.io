---
layout: posts
title:  "SpringBatch使用说明"
date:   2025-04-25 22:08:36
categories: 后端
excerpt: SpringBatch使用说明
---
# SpringBatch使用说明
> spring batch是一个批处理框架，可以通过定义job，step,iteamReader,iteamProcessor,iteamWriter来完成一个批处理任务。
> 同时也提供jobListener来监听job的执行情况。stepListener来监听step的执行情况。
> 内置文件，数据库等读取方式，方便业务开发。

## 创建job
一个job可以有多个step组成，steop之间可以相互依赖。可以通过on exit="..."来指定step的依赖关系。

## 创建step
step可以定义为顺序执行，也可以定义为并行执行。
step中可以定义多个tasklet，tasklet可以定义为顺序执行，也可以定义为并行执行。

## 创建tasklet

## 创建jobListener

## 常见问题
1. iteamReader读取文件中日期格式的字段转换报错
   在BeanWapper中添加自定的格式转换类，注入进去转换类，在配置文件中添加配置。
2. 
