---
RocketMQ
http://rocketmq.apache.org/
参考连接：https://blog.csdn.net/m0_59849460/article/details/124115627
---

# RocketMQ

## 1.启动NameServer

```cmd
$ export NAMESRV_ADDR=localhost:9876

### 启动namesrv
$ nohup sh bin/mqnamesrv &

### 验证namesrv是否启动成功
$ tail -f ~/logs/rocketmqlogs/namesrv.log
The Name Server boot success...
```

## 2.启动Borker

```cmd
### 先启动broker
$ nohup sh bin/mqbroker -n localhost:9876 --enable-proxy &

### 验证broker是否启动成功, 比如, broker的ip是192.168.1.2 然后名字是broker-a
$ tail -f ~/logs/rocketmqlogs/proxy.log 
The broker[broker-a,192.169.1.2:10911] boot success...


#启动broker
sh ./mqbroker -n 192.168.*:9876 -c ../conf/broker.conf
The broker[broker-a, 192.168.*:10911] boot success. serializeType=JSON and name server is 192.168.1.150:9876
```

## 3.测试发送

```cmd
$ export NAMESRV_ADDR=localhost:9876
$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
 SendResult [sendStatus=SEND_OK, msgId= ...

$ sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
 ConsumeMessageThread_%d Receive New Messages: [MessageExt...
```



# RocketMQ Dashboard

## 1.安装&启动

```cmd
1.下载dashboard压缩包
2.解压
3.vim application.properties
  #
4.mvn clean package -Dmaven.test.skip=true
4.nohup java -jar /approval/app/rocketMq/rocketmq-dashboard-1.0.0.jar rocketmq.config.namesrvAddr=127.0.0.1:9876 >> ./logs/rocketMQ_dashboard.log &
```

## 2.问题

## 3.修改