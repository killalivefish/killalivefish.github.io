---
layout: posts
title:  "OpenFeign的使用"
date:   2025-03-26 22:27:36
categories: 后端
excerpt: 记录OpenFeign的设计、实现和应用
---
# Feign的主要功能：
声明式的跨服务的接口调用,支持Eureka、Nacos等注册中心。
新版中默认使用spring-cloud的loadBalanced注解，自动实现负载均衡。
老版本使用Ribbon。

# 如何使用：
  现在有两个微服务一个order-service,一个goods-service。order-service调用goods-service的接口，那么在order-service中引入goods-service的依赖，然后通过@FeignClient注解声明一个接口，接口中的方法就是调用goods-service的接口。
  1. 引入依赖
  ```java 
  @SpringBootApplication
  @EnableDiscoveryClient
  @EnableFeignClients
  public class OrderServiceApplication {
      @Bean
      @LoadBalanced
      RestTemplate restTemplate(){
          return new RestTemplate();
      }
      
      public static void main(String[] args) {
          SpringApplication.run(OrderServiceApplication.class, args);
      }
      
  }
  ```
  2. 创建一个接口
   ```java
   @FeignClient(value = "goods-service", fallback = Fallback.class, configuration = FeignConfig.class)
    public interface GoodsApi {
        @RequestMapping("/goods/reduceStock")
        public Integer reduceStock();
    }
   ```
  3. controller中调用接口
   ```java
   @RestController
   @RequestMapping("/order")
   public class OrderController {
       private final Logger log = LoggerFactory.getLogger(OrderController.class);
      
       @Autowired
       GoodsApi GoodsApi;
       
       @RequestMapping("/orderPayment")
       public Integer orderPayment(){
           Integer result1 = GoodsApi.reduceStock();
           return result1;
       }
   }
   ```
## 如何在调用失败后执行回调函数
1. 需要在@FeignClient注解中声明fallback要使用的类
   ```java
   @FeignClient(value = "goods-service", fallback = Fallback.class)
   ```
2. 定义Fallback类
   2.1 Fallback类实现FallbackFactory接口
   ```java
   public class IntegralFallback implements IntegralApi{
      private static final Logger LOGGER= LoggerFactory.getLogger(IntegralFallback.class);
      @Override
      public Integer addIntegral() {
          LOGGER.error("addIntegral failed!!");
          throw new NoFallbackAvailableException("Boom!", new RuntimeException());
      }
   }
   ```
   ```java
   public class IntegralFallbackFactory implements  FallbackFactory<IntegralFallback> {
     @Override
     public IntegralFallback create(Throwable cause) {
         return new IntegralFallback();
     }
   }
   ```
   2.2 Fallback类实现@FeignClient修饰的类
   ```java
   @Component
   public class Fallback implements GoodsApi {
       private static final Logger LOGGER= LoggerFactory.getLogger(Fallback. class);
       @Override
       public Integer reduceStock() {
           LOGGER.error("reduceStock failed!!");
           return -1;
       }
   }
   ```
# 如何覆盖默认配置
在@FeignClient注解中声明configuration属性，指定配置类。
```java
@FeignClient(value = "goods-service", configuration = FeignConfig.class)
```
# 如何设置重试
老版本需要设置Ribbon的重试和指定重试策略。
新版本中需要在在FeignConfig中声明Retryer属性。
```java
import feign.Retryer;

@Bean
public Retryer feignRetryer() {
    // 参数：间隔时间(ms)、最大间隔时间、最大尝试次数（包含首次调用）
    return new Retryer.Default(100, 1000, 3);
}
```
# 如何设置重试策略
新版本设置LoadBalancerClient的负载均衡策略。
老版本在Ribbon中设置重试策略。
```java
// 负载均衡策略（Spring Cloud LoadBalancer）
@Configuration
@LoadBalancerClient(name = "order-service", configuration = CustomLoadBalancerConfig.class)
public class CustomLoadBalancerConfig {
    @Bean
    public ReactorLoadBalancer<ServiceInstance> randomLoadBalancer(...) {
        return new RandomLoadBalancer(...); // 随机策略
    }
}
```
