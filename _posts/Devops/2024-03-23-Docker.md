---
layout: post
title: "Docker" 
date: 2024-03-12 20:00:00
author: HB
categories: [Devops]
tags: [Devops]
permalink: /blog/
---

- 官网：[https://docs.docker.com/desktop/install/windows-install/](https:/docs.docker.com/desktop/install/windows-install/)
- Docker入门到实践：[https://yeasy.gitbook.io/docker_practice/install](https:/yeasy.gitbook.io/docker_practice/install)

镜像：相当于union FS系统 比虚拟机简单

容器：和镜像是类和实例的关系，在镜像的系统上执行的线程



**容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用** [**数据卷（Volume）**](https://yeasy.gitbook.io/docker_practice/data_management/volume)**、或者** [**绑定宿主目录**](https://yeasy.gitbook.io/docker_practice/data_management/bind-mounts)**，在这些位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。**



[https://juejin.cn/post/7329100659877576716](https:/juejin.cn/post/7329100659877576716)



## 配置国内镜像地址

1. vim /etc/docker/daemon.json

   ```json
   {

       "registry-mirrors": [
           "https://registry.hub.docker.com",
           "http://hub-mirror.c.163.com",
           "https://docker.mirrors.ustc.edu.cn",
           "https://registry.docker-cn.com"
       ]
   }
   ```

2. ss
3. xx

## 设置开机自启

`systemctl enable docker.service`

`systemctl status docker`

`systemctl start docker`

## Docker Image

- 查看镜像 `docker images`或者`docker image ls`
- 获取镜像`docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`
- 查看镜像、容器、数据卷所占用的空间 `docker system df`
- 删除镜像 `docker rm` `镜像短 ID`、`镜像长 ID`、`镜像名` 或者 `镜像摘要`
- docker search xxx
- docker rmi localhost:5000/registry/hello (image的id或者name)

## Docker Container

- sudo systemctl start docker
- docker exec -it 7ef69493b770 /bin/bash
- 
- 查看容器进程`docker ps -a`
- 查看容器进程`docker top my_mysql`
- 查看容器信息`docker inspect name/id  | grep Mounts -A 20`
- 启动容器并指定容器和docke的端口映射 `docker run -p 192.168.1.151:9778:9777 registry/hello:v1`
- 删除容器 `docker container rm`



## 安装Mysql

- docker run -d --name my_mysql -e MYSQL_ROOT_PASSWORD=root  -p 3307:3306 mysql
- SHOW VARIABLES LIKE 'datadir';

  默认在/var/lib/mysql/

  可以


```linux
mkdir -p docker_v/mysql/conf
cd docker_v/mysql/conf
touch my.cnf
docker run -p 3306:3306 --name mysql -v /opt/docker_v/mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 -d imageID
```

## 安装Jenkins

[https://www.cnblogs.com/code4fs/articles/17281784.htm](https:/www.cnblogs.com/code4fs/articles/17281)



## 安装Nexus

[https://blog.csdn.net/zhuganlai168/article/details/130850155](https:/blog.csdn.net/zhuganlai168/article/details/130850155)

[https://blog.csdn.net/justlpf/article/details/133164155](https:/blog.csdn.net/justlpf/article/details/133164155)

[https://www.cnblogs.com/chuangcc/p/12207037.html](https:/www.cnblogs.com/chuangcc/p)

1. 22

   ```console
   $ docker run -d --name nexus3 --restart=always \
       -p 8081:8081 \
       --mount src=nexus-data,target=/nexus-data \
       sonatype/nexus3
   ```

   

2. 22

   ```console
   $ docker logs nexus3 -f
   ```

   

3. 22

   ```console
   $ docker exec nexus3 cat /nexus-data/admin.password
   ```

   

4. 添加到守护进程 `/etc/docker/daemon.json`

   ```json
   
   {
     "insecure-registries" : ["my-nexus-server:8081"]
   }
   ```

   

5. 

## blog

[https://blog.csdn.net/m0_58523831/article/details/131693934](https://blog.csdn.net/m0_58523831/article/details/131693934)

[https://blog.csdn.net/qq_52497256/article/details/128870731](https://blog.csdn.net/qq_52497256/article/details/128870731)

- Docker — 从入门到实践 [https://yeasy.gitbook.io/docker_practice/image/dockerfile ](https:/yeasy.gitbook.io/docker_practice/image/dockerfile)⭐⭐⭐⭐⭐

## Harbor私有仓库的安装

[https://blog.csdn.net/weixin_41465338/article/details/80146218?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-80146218-blog-103769241.235%5Ev38%5Epc_relevant_sort&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-1-80146218-blog-103769241.235%5Ev38%5Epc_relevant_sort&utm_relevant_index=2](https://blog.csdn.net/weixin_41465338/article/details/80146218?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-1-80146218-blog-103769241.235%5Ev38%5Epc_relevant_sort&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~Rate-1-80146218-blog-103769241.235%5Ev38%5Epc_relevant_sort&utm_relevant_index=2)

## 创建和使用私人仓库

[https://blog.csdn.net/yunxi115/article/details/131180864](https:/blog.csdn.net/yunxi115/article/details/131180864)

1. vim /etc/docker/daemon.json

   ```json
   {
       "insecure-registries": ["192.168.1.150:5000"],

       "registry-mirrors": [
           "https://registry.hub.docker.com",
           "http://hub-mirror.c.163.com",
           "https://docker.mirrors.ustc.edu.cn",
           "https://registry.docker-cn.com"
       ]
   }
   ```

2. 重启docker

   ```console
   systemctl restart docker
   ```

3. 拉取官方re

   ```console
   [root@localhost backup]# docker run -d -p 5000:5000 --restart=always --name registry registry
   Unable to find image 'registry:latest' locally
   latest: Pulling from library/registry
   619be1103602: Pull complete
   2ba4b87859f5: Pull complete
   0da701e3b4d6: Pull complete
   14a4d5d702c7: Pull complete
   d1a4f6454cb2: Pull complete
   Digest: sha256:f4e1b878d4bc40a1f65532d68c94dcfbab56aa8cba1f00e355a206e7f6cc9111
   Status: Downloaded newer image for registry:latest
   f00ddcd946c9979bcf614c29ae8b07cd1c46d78466d6dd2bd412674d68a5e78c
   ```

4. 启动re 容器

   ```console
   docker run -itd -v /data/registry:/var/lib/registry -p 5000:5000 --restart=always --name registry registry:latest
   ```

5. 查看

   ```console
   [root@localhost registry]# docker ps -al
   CONTAINER ID   IMAGE             COMMAND                  CREATED         STATUS         PORTS                                       NAMES
   f604234ece57   registry:latest   "/entrypoint.sh /etc…"   3 minutes ago   Up 3 minutes   0.0.0.0:5000->5000/tcp, :::5000->5000/tcp   registry
   ```


## 通过DockerFile build image并push到私人仓库

1. build

   ```console
   [root@localhost hello]# sudo docker build -t="registry/hello" .
   [+] Building 236.0s (7/7) FINISHED                                                                                                                                                     docker:default
    => [internal] load build definition from Dockerfile                                                                                                                                             0.0s
    => => transferring dockerfile: 275B                                                                                                                                                             0.0s
    => [internal] load .dockerignore                                                                                                                                                                0.0s
    => => transferring context: 2B                                                                                                                                                                  0.0s
    => [internal] load metadata for docker.io/library/openjdk:8-jdk-alpine                                                                                                                        122.0s
    => [internal] load build context                                                                                                                                                                0.2s
    => => transferring context: 17.57MB                                                                                                                                                             0.2s
    => [1/2] FROM docker.io/library/openjdk:8-jdk-alpine@sha256:94792824df2df33402f201713f932b58cb9de94a0cd524164a0f2283343547b3                                                                  112.5s
    => => resolve docker.io/library/openjdk:8-jdk-alpine@sha256:94792824df2df33402f201713f932b58cb9de94a0cd524164a0f2283343547b3                                                                    0.0s
    => => sha256:94792824df2df33402f201713f932b58cb9de94a0cd524164a0f2283343547b3 1.64kB / 1.64kB                                                                                                   0.0s
    => => sha256:44b3cea369c947527e266275cee85c71a81f20fc5076f6ebb5a13f19015dce71 947B / 947B                                                                                                       0.0s
    => => sha256:a3562aa0b991a80cfe8172847c8be6dbf6e46340b759c2b782f8b8be45342717 3.40kB / 3.40kB                                                                                                   0.0s
    => => sha256:e7c96db7181be991f19a9fb6975cdbbd73c65f4a2681348e63a141a2192a5f10 2.76MB / 2.76MB                                                                                                  31.1s
    => => sha256:f910a506b6cb1dbec766725d70356f695ae2bf2bea6224dbe8c7c6ad4f3664a2 238B / 238B                                                                                                      30.4s
    => => sha256:c2274a1a0e2786ee9101b08f76111f9ab8019e368dce1e325d3c284a0ca33397 70.73MB / 70.73MB                                                                                               110.1s
    => => extracting sha256:e7c96db7181be991f19a9fb6975cdbbd73c65f4a2681348e63a141a2192a5f10                                                                                                        0.2s
    => => extracting sha256:f910a506b6cb1dbec766725d70356f695ae2bf2bea6224dbe8c7c6ad4f3664a2                                                                                                        0.0s
    => => extracting sha256:c2274a1a0e2786ee9101b08f76111f9ab8019e368dce1e325d3c284a0ca33397                                                                                                        2.1s
    => [2/2] ADD hello-1.0-SNAPSHOT.jar hello.jar                                                                                                                                                   1.3s
    => exporting to image                                                                                                                                                                           0.2s
    => => exporting layers                                                                                                                                                                          0.2s
    => => writing image sha256:e41397a874b5a2ba184bd4524c4da5541261d9d06d085e30c33ac51b990bcd88                                                                                                     0.0s
    => => naming to docker.io/registry/hello  
    
    [root@localhost hello]# sudo docker build -t="registry/hello:v1" .
   [+] Building 32.3s (7/7) FINISHED                                                                                                                                                      docker:default
    => [internal] load build definition from Dockerfile                                                                                                                                             0.0s
    => => transferring dockerfile: 275B                                                                                                                                                             0.0s
    => [internal] load .dockerignore                                                                                                                                                                0.0s
    => => transferring context: 2B                                                                                                                                                                  0.0s
    => [internal] load metadata for docker.io/library/openjdk:8-jdk-alpine                                                                                                                         31.3s
    => [internal] load build context                                                                                                                                                                0.2s
    => => transferring context: 17.57MB                                                                                                                                                             0.1s
    => CACHED [1/2] FROM docker.io/library/openjdk:8-jdk-alpine@sha256:94792824df2df33402f201713f932b58cb9de94a0cd524164a0f2283343547b3                                                             0.0s
    => [2/2] ADD hello-1.0-SNAPSHOT.jar hello.jar                                                                                                                                                   0.7s
    => exporting to image                                                                                                                                                                           0.1s
    => => exporting layers                                                                                                                                                                          0.1s
    => => writing image sha256:505d6890c80dabc220cb9ce6180157cce8de32bc395edc4ea4bc2e31cd01dc10                                                                                                     0.0s
    => => naming to docker.io/registry/hello:v1                                                                                                                                                     0.0s
   
   ```

2. tag

   ```console
   [root@localhost hello]# sudo docker tag 505d6890c80d 192.168.1.151:5000/registry/hello
   ```

3. push

   ```console
   [root@localhost hello]# sudo docker push 192.168.1.151:5000/registry/hello
   Using default tag: latest
   The push refers to repository [192.168.1.151:5000/registry/hello]
   03903dcf96e2: Pushed
   ceaf9e1ebef5: Pushed
   9b9b7f3d56a0: Pushed
   f1b5933fe4b5: Pushed
   latest: digest: sha256:14c0b00c70b47dc028e38c21fe8d24b368bb4b47e91ee41fbd6e11d3ac1cce6f size: 1159
   ```

4. 查看私人仓库是否有镜像

   [http://192.168.1.151:5000/v2/_catalog](http:/192.168.1.151:5000/v2/_catalog)

   {"repositories":["registry/hello"]}

5. 

## DockerFile

[https://blog.csdn.net/gaohuanjie/article/details/127908886](https:/blog.csdn.net/gaohuanjie/article/details/127908886)

- `COPY` 复制DockerFile上下文的文件到容器的指定位置

  `COPY package.json /usr/src/app/`

- `ADD` 和`COPY`类似

  - 优点：可以是一个URL
  - 缺点：

    1. 从连接下载后文件权限得额外用`RUN`进行修改
    2. 会自动解压文件
    3. 导致构建缓存失效


- `CMD` 和RUN类似
- `ENTRYPOINT`和`RUN`类似

  可以带参数

- `ENV` 设置环境变量

  后面的指令可以通过$NAME来访问变量

- `ARG`设置环境变量
- `VOLUME` 指定容器在容器外的存储层
- `EXPOSE` 暴露端口
- `WORKDIR` 指定工作目录(相对路径)
- `USER` 改变之后层的执行 `RUN`, `CMD` 以及 `ENTRYPOINT` 这类命令的身份
- `HEALTHCHECK [选项] CMD <命令>`：设置检查容器健康状况的命令

  ```dockerfile
  HEALTHCHECK --interval=5s --timeout=3s \
    CMD curl -fs http://localhost/ || exit 1
  ```

- `ONBUILD` <其它指令>
- `LABEL` 指令用来给镜像以键值对的形式添加一些元数据（metadata）
- `SHELL` 指令可以指定 `RUN` `ENTRYPOINT` `CMD` 指令的 shell，Linux 中默认为 `["/bin/sh", "-c"]`
- 

```shell
sudo docker build -t="hello:v3" . \
&& sudo docker tag a8155153f44b 192.168.1.151:5000/hello \
&& sudo docker push 192.168.1.151:5000/hello \
&& curl http://192.168.1.151:5000/v2/_catalog \
&& docker pull localhost:5000/hello \
&& docker images \
```