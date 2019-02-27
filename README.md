<img src="http://www.wboost.top/img/icon2.png" width="28" hegiht="28" align=center />CONFIG-SERVER
================

[Home Page](http://www.wboost.top) | [官方主页](http://www.wboost.top) | [中文说明]() | [文档手册](http://www.wboost.top/framework/spring-boot-starter-support/docs)
------
[![Packagist](http://www.wboost.top/svg/version-1.2.0.RELEASE-brightgreen.svg)](http://www.wboost.top)  
------

>### 与spring-cloud-config的关系
- 此版本为spring-cloud-config的升级版，兼容一切原始操作方式
- 类型为本地存储 与config-server.jar同级目录下conf文件夹
>### 功能
- 提供全局配置功能，通用配置(如服务注册中心，单点登录等服务地址不需要每个项目都配置一次)
- 提供页面更换配置操作，便于测试人员修改配置项
- 可查看当前启动项目使用中的配置项，便于开发人员排查配置导致的部署问题
- 提供进程级别的重启功能

>### 使用方式

>#### 启动
1. jar包同级新建目录conf
2. 将提供的all-public.yml复制进conf文件夹
3. 其他项目的配置文件均放置在此文件夹下(也可通过页面上传)

>#### 全局配置项为

```
application.name=all
profile=public
```

>#### 初始化配置项(以trajx为例)
1. 打开配置中心页面 ip:8888/index.html
![image](http://wboost.top:8080/config-server/config-server-index.png)
2. 选择init-config,并在application.name中输入trajx,点击确定
![image](http://wboost.top:8080/config-server/init-config.png)
3. 在弹出的配置中选择需要修改的配置项（可在浏览器ctrl+f查找）
![image](http://wboost.top:8080/config-server/config-write.png)
4. 修改或增加完成后点击确定，页面将会展示修改后的配置项并标红，查看无误后，点击右上角upload按钮->确认上传保存
![image](http://wboost.top:8080/config-server/upload.png)

>#### 查看当前启动项目生效的配置项
- 点击context-properties栏,选择想要查看的产品,即可出现配置项
![image](http://wboost.top:8080/config-server/context-properties.png)

>#### 重启系统
- 点击右上角restart按钮，点击确定
![image](http://wboost.top:8080/config-server/restart-choose.png)
- 将出现等待提示框,等待片刻,可看到重新启动日志
![image](http://wboost.top:8080/config-server/restart-log.png)
