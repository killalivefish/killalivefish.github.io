---
layout: post
title: "Fuck CSS" 
date: 2020-08-17 20:00:00
author: Hubo
categories: [CSS]
tags: [CSS]
---



CSS简单，但做起来和实际想的不一样

# Fuck **The** CSS

放弃了 左右布局 

## 选择器

- 属性选择器：含有'[]'；
- 伪类选择器：带有':'；
- 微元素选择器：带有'::'；
- 关系选择器、后代选择器；

## HTML元素的分类

- 块级：换行特性，占一行，多了就换行，可用clear清除浮动影响。div、li、p、span。display属性和内联不同
- 内联：

![盒子模型](box-model.png)

设置width属性时实际作用在盒子模型的content-box上，但可以通过设置box-sizing将width的设置作用在border(border-box )，padding（padding-box）上。

宽度分离：外层增加div只设置width,内部div设置其他属性。width会破坏浮动。