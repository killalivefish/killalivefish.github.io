---
layout: posts
title:  "Ld"
date: 2024-03-17
categories: Devops
excerpt: 
---

### 3.2 Kubernetes核心能力和目标定位

Pod的IP等信息是不固定的，kubernetes通过Service作为Pod的代理入口，替代Pod对外暴露一个固定的网络地址。

Kubernetes职责：

- Service后端真正代理Pod的IP地址、端口等信息的自动更新和维护，并对外暴露固定的网络地址，负载均衡Pod
- Deployment对多个Pod实例进行管理
- Sercet保存需要受信任的信息
- Job、CornJob
- 

## 4.Kubernetes集群搭建和配置

### 4.1Kubeadm

Kubeadm

1. 生成证书文件 `/etc/kubernetes/pki/ca.crt ca.key`
2. 为其他组件生成访问kube-apiservice所需的配置文件 `ls /etc/kubernetes/xxx.conf`
3. 为Master生成Pod的配置文件 `/etc/kubernetes/manifests/xxx.yaml`
4. 生成etcd的Pod yaml文件
5. 为集群生成一个bootstrap token
6. 将ca.cert和Master的重要信息以ConifgMap的方式保存在etcd中
7. 安装默认插件kube-proxy和DNS

kubectl

kubelet是Kubernetes用来操作Docker容器的核心组件

