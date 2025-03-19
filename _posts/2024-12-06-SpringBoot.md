---
layout: posts
title:  "SpringBoot"
date:   2025-03-10 15:00:36
categories: 后端
excerpt: SpringBoot笔记
---
约定大于配置：

之前的spring项目会存在大量的xml配置，springboot通过内置的默认配置减少了各类jar包的配置情况，只需要更改需要配置的参数即可。

spring-boot-autoconfigure中有大量的配置类

spring boot的内置tomcat在spring-boot-starter-tomcat中





java报错：类文件具有错误的版本 61.0，应为 52.0 请删除该文件或确保该文件位于正确的类路径子目录中。

原因：SpringBoot使用了3.0或者3.0以上，因为Spring官方发布从Spring6以及SprinBoot3.0开始最低支持JDK17

解决: 将版本降低到2.几就行



## Spring Boot配置

Spring Boot在auto-configuration中会包含各个组件的默认配置类比如kafa等。

`spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/kafka/KafkaAutoConfiguration.java`

`spring-boot-project/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/kafka/KafkaProperties.java`

## Spring Boot创建自己的stater



## Spring Boot启动流程



## Spring 请求流程

DispatcherServlet-->RequestMappingHandlerMapping->DispatcherServlet

java.lang.NullPointerException: null

	at com.easyassetmanagement.asset.service.SubscriptionService.submitOrder(SubscriptionService.java:32) ~[classes/:na]

	at com.easyassetmanagement.asset.controller.SubscriptionController.submitForm(SubscriptionController.java:21) ~[classes/:na]

	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]

	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62) ~[na:na]

	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]

	at java.base/java.lang.reflect.Method.invoke(Method.java:564) ~[na:na]

	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:205) ~[spring-web-5.3.24.jar:5.3.24]

	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:150) ~[spring-web-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:117) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:895) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:808) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1071) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:964) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1006) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:909) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at javax.servlet.http.HttpServlet.service(HttpServlet.java:696) ~[tomcat-embed-core-9.0.69.jar:4.0.FR]

	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:883) ~[spring-webmvc-5.3.24.jar:5.3.24]

	at javax.servlet.http.HttpServlet.service(HttpServlet.java:779) ~[tomcat-embed-core-9.0.69.jar:4.0.FR]

	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:227) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:53) ~[tomcat-embed-websocket-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-5.3.24.jar:5.3.24]

	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117) ~[spring-web-5.3.24.jar:5.3.24]

	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-5.3.24.jar:5.3.24]

	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117) ~[spring-web-5.3.24.jar:5.3.24]

	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-5.3.24.jar:5.3.24]

	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:117) ~[spring-web-5.3.24.jar:5.3.24]

	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:189) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:177) ~[tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:97) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:541) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:135) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:78) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:360) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:65) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:891) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1784) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-9.0.69.jar:9.0.69]

	at java.base/java.lang.Thread.run(Thread.java:844) [na:na]

