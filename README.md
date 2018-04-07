项目名：基于 Koa.js 的 Node.js MVC 框架，仓库地址：https://github.com/zhaotoday/koa 。负责人：[@zhaotoday](https://github.com/zhaotoday) 。

## 1. 运行

### 1.1. Node 版本
Koa2 使用了 async/await 等新语法，请保证 Node 版本在 7.6 及以上。

### 1.2. 命令

```bash
# 安装依赖
$ npm install

# JS 代码校验
$ npm run eslintfix
$ npm run eslint

# 开发
$ npm run dev

# 停止
$ npm run stop

# 启动
$ npm start
```

## 2. 目录结构

```
├─ src                     源码
│  ├─ app                  业务代码
│  │  ├─ controllers       控制器：用于解析用户输入，处理后返回相应的结果
│  │  ├─ models            模型  ：用于定义数据模型
│  │  ├─ services          服务  ：用于编写业务逻辑层，比如连接数据库，调用第三方接口等
│  │  └─ views             视图  ：用于放置模板文件，返回客户端的视图层
│  ├─ core                 核心代码
│  │  ├─ controller.js     控制器基类
│  │  ├─ model.js          模型基类
│  │  └─ service.js        服务基类
│  ├─ middlewares          中间件
│  ├─ public               静态资源
│  ├─ router               URL 路由
│  ├─ utils                工具库
│  └─ index.js             入口：用于自定义启动时的初始化工作，比如启动 https，调用中间件、路由等
├─ .eslintrc               ESLint 配置文件
├─ nodemon.json            nodemon 配置文件
├─ package.json            npm 配置文件
├─ processes.json          pm2 配置文件
```

## 1. 参考

### 1.1. 文档

- [Koa 官网](http://koajs.com)
- [koa 中文网](http://www.koacn.com/)
- [Koa 文档的中文版本](https://github.com/demopark/koa-docs-Zh-CN)
- [Node Koa2 实战](https://github.com/ikcamp/koa2-tutorial)
- [Sequelize 文档](http://docs.sequelizejs.com)
- [Sequelize 文档的中文版本](https://github.com/demopark/sequelize-docs-Zh-CN)
- [EJS 官网](http://ejs.co/)
- [EJS 官网中文版](https://ejs.bootcss.com/)
- [EJS 中文文档](https://segmentfault.com/a/1190000004286562)
- [EJS 模板语言使用](https://www.w3cschool.cn/weflow/weflow-ejs.html)
- [PM2 官网](http://pm2.keymetrics.io)

### 1.2. 文章

- [Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)
- [Koa2进阶学习笔记](https://chenshenhai.github.io/koa2-note/)
- [Koa2 之文件上传下载](https://github.com/lin-xin/blog/issues/25)
- [React 服务端渲染与同构](http://blog.pspgbhu.me/article/react-isomorphic)
- [koa 实现 jwt 认证](https://github.com/superman66/koa-jwt-sample)
- [PM2实用入门指南](http://imweb.io/topic/57c8cbb27f226f687b365636) 
- [Node.js使用Sequelize操作MySQL](http://www.w3clog.com/21.html)
- [Sequelize 和 MySQL 对照](https://segmentfault.com/a/1190000003987871#articleHeader11)
- [nginx反向代理原理和配置讲解](http://www.cnblogs.com/anruy/p/4989161.html)
- [前后端分离之JWT用户认证](http://lion1ou.win/2017/01/18/)
- [nodemon 基本配置与使用](https://www.cnblogs.com/JuFoFu/p/5140302.html)

### 1.3. 安全  

- [如何防范常见的Web攻击](http://blog.720ui.com/2016/security_web/)
- [Web安全系列——XSS攻击](https://qiuzhenyuan.github.io/2017/11/11/Web安全系列——XSS攻击/)
- [如何让前端更安全？——XSS攻击和防御详解](https://mp.weixin.qq.com/s/6ChuUdOm7vej8vQ3dbC8fw)
- [程序猿必读-防范CSRF跨站请求伪造](https://github.com/mylxsw/growing-up/blob/master/doc/%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%BF%85%E8%AF%BB-%E9%98%B2%E8%8C%83CSRF%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0.md)
- [web安全之SQL注入](https://www.imooc.com/learn/883)
- [Web安全-XSS](https://www.imooc.com/learn/812)
- [根据白名单过滤 HTML(防止 XSS 攻击)](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)
