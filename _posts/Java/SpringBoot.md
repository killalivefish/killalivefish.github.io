

java报错：类文件具有错误的版本 61.0，应为 52.0 请删除该文件或确保该文件位于正确的类路径子目录中。

原因：SpringBoot使用了3.0或者3.0以上，因为Spring官方发布从Spring6以及SprinBoot3.0开始最低支持JDK17

解决: 将版本降低到2.几就行



## Spring Boot配置

Spring Boot在auto-configuration中会包含各个组件的默认配置类比如kafa等。

`spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/kafka/KafkaAutoConfiguration.java`

`spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/kafka/KafkaProperties.java`

## Spring Boot创建自己的stater

