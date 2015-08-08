# HyMobile
HyMobile：宏奕移动H5单页应用框架

# Overview
- HyMobile是基于seajs、zepto（jquery亦可）建立起来的单页应用框架
- 内置事件机制，分global和view两个级别，可有效解决页面级的事件未销毁带来的问题
- 基于hashchange实现强大而灵活的路由机制，有框架默认的路由规则，亦支持自定义路由规则
- 支持module和action两级构造方法（_init）和析构方法（_destroy），编码更灵活
- 提供了众多常用组件：url、time、cache、view、data等

# Debug Mode
使用?hyDebug=1参数开启调试模式

# Config
在入口文件，seajs.use加载HY后，通过HY.run方法传入配置参数或者初始化回调方法

# Routing Rule
- URL地址+[#!/module/action&arg1=value1&arg2=value2] 如http://localhost:8080/index.html?hyDebug=1#!/play/ssq/run&id=123
- 即xx/xx/xx/.../xx 这组路由规则中最后一个是action，即module暴露的方法，前面的都是module，且与seajs的module概念一致
- 如果不满意现有路由方案，可以配置route模块，或者重写route模块，route模块与hy框架对接使用dist格式：
    {
        rule: '规则',
        module: '需要加载的模块',
        action: '请求的方法'
    }
- Route.reg(rule, dist)实现自定义路由规则，rule支持关键字和正则两种形式，dist直接传对象也可以通过callback返回

# FAQ
Q: 从/module1/action1&id=123到/module1/action1&id=321会不会重新执行action1方法

A: 不会

Q: 从/module1/action1到/module2/action2，如何执行构造方法和析构方法

A: module1/action1_destroy -> module1/_destroy -> module2/_init -> module2/action2_init


