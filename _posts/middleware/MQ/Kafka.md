[https://blog.csdn.net/Liu_Fang_Hong/article/details/132147387](https:/blog.csdn.net/Liu_Fang_Hong/article/details/132147387)

[https://cloud.tencent.com/developer/article/1814830](https:/cloud.tencent.com/developer/article/1814830)

- spring boot 使用Kafka [https://blog.csdn.net/yy8623977/article/details/127950423](https:/blog.csdn.net/yy8623977/article/details/127950423)

## Linux上使用kafka

- 创建topic

`kafka-topics.sh --create --zookeeper 192.168.1.150:2181,192.168.1.150:2182 --replication-factor 1 --partitions 3 --topic test`

- 查看topic

`kafka-topics.sh --list --zookeeper 192.168.1.150:2181,192.168.1.150:2182`

- 查看topic详细信息

`kafka-topics.sh --describe --topic test --zookeeper 192.168.1.150:2181,192.168.1.150:2182`

- 测试发布消息

`kafka-console-producer.sh --broker-list 192.168.1.150:9092 --topic test`

- 测试接收消息

`kafka-console-consumer.sh --bootstrap-server 192.168.1.150:9092 --topic test --from-beginning`

- 修改分区数量

`kafka-topics.sh --zookeeper 192.168.1.150:2181,192.168.1.150:2182 --alter --topic test --partitions [数量]`

- 删除指定的Topic

`kafka-topics.sh --delete --zookeeper 192.168.1.150:2181,192.168.1.150:2182 --topic [topic名字]`

## SpringBoot使用配置Kafka

1. pom.xml

   ```xml
       <dependencies>
           <dependency>
               <groupId>org.springframework.boot</groupId>
               <artifactId>spring-boot-starter-web</artifactId>
               <version>2.0.0.RELEASE</version>
           </dependency>
           <dependency>
               <groupId>org.springframework.kafka</groupId>
               <artifactId>spring-kafka</artifactId>
               <version>2.8.3</version>
           </dependency>
           <dependency>
               <groupId>org.springframework.kafka</groupId>
               <artifactId>spring-kafka-test</artifactId>
               <scope>test</scope>
           </dependency>
       </dependencies>
   ```

   

2. application.yml

   ```yml
   spring:
     profiles:
       active: dev
     kafka:
       bootstrap-servers: 192.168.1.150:9092
       producer:
         retries: 0
         acks: 1
         batch-size: 16384
         buffer-memory: 33554432
   
       consumer:
         group-id: "myGroup"
         enable-auto-commit: true
         auto-commit-interval: 100
   ```

   

3. Producer

   ```java
   @RestController
   public class Producer {
       @Autowired
       private KafkaTemplate<String, Object> kafkaTemplate;
       // 发送消息
       @GetMapping("/send/{msg}")
       public void sendMessage1(@PathVariable("msg") String msg) {
           kafkaTemplate.send("test", msg);
       }
   }
   ```

   

4. Consumer

   ```java
   @Component
   public class Consumer {
       @KafkaListener(topics = {"test"})
       public void listen(ConsumerRecord<?, ?> record){
           // 消费的哪个topic、partition的消息,打印出消息内容
           System.out.println("简单消费："+record.topic()+"-"+record.partition()+"-"+record.value());
       }
   }
   ```

   

5. log中显示的配置

   ```yml
   2024-03-22 14:20:09.636  INFO 6808 --- [nio-9777-exec-5] o.a.k.clients.producer.ProducerConfig    : ProducerConfig values: 
       acks = 1
       batch.size = 16384
       bootstrap.servers = [192.168.1.150:9092]
       buffer.memory = 33554432
       client.dns.lookup = use_all_dns_ips
       client.id = producer-1
       compression.type = none
       connections.max.idle.ms = 540000
       delivery.timeout.ms = 120000
       enable.idempotence = false
       interceptor.classes = []
       key.serializer = class org.apache.kafka.common.serialization.StringSerializer
       linger.ms = 0
       max.block.ms = 60000
       max.in.flight.requests.per.connection = 5
       max.request.size = 1048576
       metadata.max.age.ms = 300000
       metadata.max.idle.ms = 300000
       metric.reporters = []
       metrics.num.samples = 2
       metrics.recording.level = INFO
       metrics.sample.window.ms = 30000
       partitioner.class = class org.apache.kafka.clients.producer.internals.DefaultPartitioner
       receive.buffer.bytes = 32768
       reconnect.backoff.max.ms = 1000
       reconnect.backoff.ms = 50
       request.timeout.ms = 30000
       retries = 0
       retry.backoff.ms = 100
       sasl.client.callback.handler.class = null
       sasl.jaas.config = null
       sasl.kerberos.kinit.cmd = /usr/bin/kinit
       sasl.kerberos.min.time.before.relogin = 60000
       sasl.kerberos.service.name = null
       sasl.kerberos.ticket.renew.jitter = 0.05
       sasl.kerberos.ticket.renew.window.factor = 0.8
       sasl.login.callback.handler.class = null
       sasl.login.class = null
       sasl.login.refresh.buffer.seconds = 300
       sasl.login.refresh.min.period.seconds = 60
       sasl.login.refresh.window.factor = 0.8
       sasl.login.refresh.window.jitter = 0.05
       sasl.mechanism = GSSAPI
       security.protocol = PLAINTEXT
       security.providers = null
       send.buffer.bytes = 131072
       socket.connection.setup.timeout.max.ms = 30000
       socket.connection.setup.timeout.ms = 10000
       ssl.cipher.suites = null
       ssl.enabled.protocols = [TLSv1.2]
       ssl.endpoint.identification.algorithm = https
       ssl.engine.factory.class = null
       ssl.key.password = null
       ssl.keymanager.algorithm = SunX509
       ssl.keystore.certificate.chain = null
       ssl.keystore.key = null
       ssl.keystore.location = null
       ssl.keystore.password = null
       ssl.keystore.type = JKS
       ssl.protocol = TLSv1.2
       ssl.provider = null
       ssl.secure.random.implementation = null
       ssl.trustmanager.algorithm = PKIX
       ssl.truststore.certificates = null
       ssl.truststore.location = null
       ssl.truststore.password = null
       ssl.truststore.type = JKS
       transaction.timeout.ms = 60000
       transactional.id = null
       value.serializer = class org.apache.kafka.common.serialization.StringSerializer
   ```

   

6. 