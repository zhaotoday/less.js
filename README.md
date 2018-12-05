## 简介
- 项目：基于 Koa.js 的 Node.js MVC 框架。
- 仓库地址：[https://github.com/zhaotoday/less.js](https://github.com/zhaotoday/less.js)。

## 运行

### Node 版本
Koa2 使用了 async/await 等新语法，请保证 Node 版本在 7.6 及以上。

### 命令

```bash
# 安装 pm2 到全局
$ npm install -g pm2

# 安装 less.js
$ npm install --save less.js

# JS 代码校验
$ npm run eslintfix
$ npm run eslint

# 开发
$ npm run dev

# 启动项目
$ npm start

# 停止项目
$ npm run stop
```

## 规范

### 目录结构

```
├─ src                     源码
│  ├─ app                  业务代码
│  │  ├─ controllers       控制器：用于解析用户输入，处理后返回相应的结果
│  │  ├─ models            模型  ：用于定义数据模型
│  │  ├─ services          服务  ：用于编写业务逻辑层，比如连接数据库，调用第三方接口等
│  │  └─ views             视图  ：用于放置模板文件，返回客户端的视图层
│  │
│  ├─ extends              扩展
│  ├─ middlewares          中间件
│  ├─ public               静态资源
│  ├─ router               URL 路由
│  ├─ utils                工具库
│  └─ index.js             入口：用于自定义启动时的初始化工作，比如启动 https，调用中间件、路由等
│  
├─ .eslintrc               eslint 配置文件
├─ nodemon.json            nodemon 配置文件
├─ package.json            npm 配置文件
├─ processes.json          pm2 配置文件
```

### 扩展

对 Koa.js 的一些扩展，用 $ 前缀命名，与 Koa.js 内置对象做区分。

#### 对象/方法

- app.$config：配置
- app.$module：加载内置模块
- app.$helpers：辅助函数
- app.$resources：生成 RESTful 规范的路由
- app.$model：公用模型对象
- app.$Service：服务基类
- app.$Controller：控制器基类
- app.$models：模型集合
- app.$services：服务集合
- app.$controllers：控制器集合

#### 示例

扩展辅助方法，新建 src/extends/helpers.js：

```js
module.exports = app => {
  return {
    myFunc () {}
  }
}
```

### 完整示例项目

完整的示例代码：[https://github.com/zhaotoday/lessjs-boilerplate](https://github.com/zhaotoday/lessjs-boilerplate)。

#### 模型

src/app/models/articles.js

```js
module.exports = app => {
  const {STRING, TEXT, INTEGER} = app.$Sequelize

  return app.$model.define('articles', {
    id: {
      type: INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'ID'
    },
    category_id: {
      type: INTEGER(6).UNSIGNED,
      comment: '栏目 ID'
    },
    author: {
      type: STRING(50),
      comment: '作者'
    },
    title: {
      type: STRING(200),
      allowNull: false,
      comment: '标题'
    },
    subtitle: {
      type: STRING(200),
      comment: '副标题'
    },
    description: {
      type: TEXT('tiny'),
      comment: '描述'
    },
    content: {
      type: TEXT('long'),
      comment: '内容'
    },
    pictures: {
      type: STRING(200),
      comment: '图片'
    },
    order: {
      type: INTEGER(10).UNSIGNED,
      comment: '次序'
    }
  })
}
```

#### 服务

src/app/services/articles.js

```js
module.exports = app => {
  return class extends app.$Service {
    constructor () {
      super()

      this.model = app.$models.articles
    }
  }
}
```

#### 控制器

src/app/controllers/articles.js

```js
module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    async index (ctx, next) {
      await ctx.render('articles', {
        items: await service.find({offset: 0, limit: 10})
      })
    }
  }
}
```

#### 视图

src/app/views/articles.ejs

```ejs
<%- JSON.stringify(items) %>
```

#### RESTful API

src/app/controllers/apis/v1/articles.js

```js
module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    async index (ctx, next) {
      ctx.response.body = ctx.send({
        status: 200,
        data: await service.find({offset: 0, limit: 10})
      })
    }
  }
}
```

#### 路由

src/router/routes/articles.js

```js
module.exports = (app, router) => {
  router.get('/articles', app.$controllers.articles.index)
}
```

## 参考

### 文档

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

### 文章

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

### 安全

- [如何防范常见的Web攻击](http://blog.720ui.com/2016/security_web/)
- [Web安全系列——XSS攻击](https://qiuzhenyuan.github.io/2017/11/11/Web安全系列——XSS攻击/)
- [如何让前端更安全？——XSS攻击和防御详解](https://mp.weixin.qq.com/s/6ChuUdOm7vej8vQ3dbC8fw)
- [程序猿必读-防范CSRF跨站请求伪造](https://github.com/mylxsw/growing-up/blob/master/doc/%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%BF%85%E8%AF%BB-%E9%98%B2%E8%8C%83CSRF%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0.md)
- [web安全之SQL注入](https://www.imooc.com/learn/883)
- [Web安全-XSS](https://www.imooc.com/learn/812)
- [根据白名单过滤 HTML(防止 XSS 攻击)](https://github.com/leizongmin/js-xss/blob/master/README.zh.md)
- [nodejs中使用bcrypt加密](https://blog.csdn.net/original_heart/article/details/78538908?reload)
- [Nodejs进阶：MD5入门介绍及crypto模块的应用](https://juejin.im/post/58fc1f925c497d0058fc3015)
- [Nodejs进阶：crypto模块中你需要掌握的安全基础知识](https://segmentfault.com/a/1190000012677632)
