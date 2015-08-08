/**
 * HyMobile 单页应用框架
 * Created by Homkai on 2015/8/8.
 */
define('hy', function(require, exports, module){

    module.exports = {
        run: run
    };

    // HY全局数据池
    var HY = {
        config: {
            route: {
                default:{
                    module: 'app',
                    action: 'run'
                }
            },
            dom: {
                global: 'hy_global_ctn',
                view: 'hy_view_ctn'
            }
        },
        refer: {},
        now: {}
    };
    window.HY || (window.HY = HY);
    var G = window.HY;

    var Route = require('route'),
        URL = require('url'),
        Event = require('event');

    function log(){
        if(!window.console || !URL.get('?hyDebug')) return;
        if(arguments.length > 1) arguments[0] += ' => ';
        return console.log.apply(console, arguments);
    }

    function initEvent(){
        // 先执行销毁方法，再执行初始化方法
        Event.onG('module_ready', function(e, dist){
            var refer = G.refer = G.now;
            var now = G.now = dist;
            // 如果模块改变则执行module级别的 否则仅执行action级别
            if(G.now.module !== G.refer.module){
                refer.exports && $.isFunction(refer.exports['_destroy']) && refer.exports['_init']();
                $.isFunction(now.exports['_init']) && now.exports['_init']();
                refer.exports && $.isFunction(refer.exports[refer.action+'_destroy']) && refer.exports[refer.action+'_destroy']();
                $.isFunction(now.exports[now.action+'_init']) && now.exports[now.action+'_init']();
            }else if(G.now.action !== G.refer.action){
                refer.exports && $.isFunction(refer.exports[refer.action+'_destroy']) && refer.exports[refer.action+'_destroy']();
                $.isFunction(now.exports[now.action+'_init']) && now.exports[now.action+'_init']();
            }
            log('HY/module_ready', now.module+'->'+now.action);
        });
    }

    function bootModule(dist, app){
        if(app && app[dist.action]){
            // 前置、后置方法
            dist.exports = app;
            dist.hash = location.hash;
            // 准备参数
            var req = URL.get('#');
            $('#' + G.config.dom.view).remove();
            $('#' + G.config.dom.global).after('<section id="' + G.config.dom.view + '"></section>');
            // 广播消息
            Event.emitG('module_ready', [dist]);
            var ctn = document.getElementById(G.config.dom.view);
            app[dist.action](req, ctn);
        }else{
            console.error('HY/module_bind:', 'Unknown module/action ['+dist.module+'/'+dist.action+']!')
        }
    }

    function checkDist(dist){
        if(dist.module && /(tpl_|css_)/.test(dist.module)){
            console.error('HY/module_checkDist:', 'Invalid module name ['+dist.module+']!');
            return false;
        }
        return true;
    }

    function bindModule(){
        // 路由规则，分自定义规则和默认规则，由route模块实现
        var custom = Route.customRoute();
        var dist = ($.isPlainObject(custom) && custom) || Route.getDist();
        if(!$.isPlainObject(dist)){
            return console.error('HY/module_bind:', 'Can\'t find the matching route rule for this hash!');
        }
        if(dist.isRoot){
            dist.module = G.config.route.default.module;
        }
        if(!checkDist(dist)) return false;
        // 当module或者action改变时才重新加载
        if(dist.module === G.now.module && dist.action === G.now.action) return false;
        if(dist.module !== G.now.module){
            require.async('app/'+dist.module, function(app){
                dist.action = dist.action || G.config.route.default.action;
                bootModule(dist, app);
            });
        }else{
            bootModule(dist, G.now.exports);
        }
    }

    function run(cb){
        // 整合配置
        if(window.HY_CONFIG && $.isPlainObject(window.HY_CONFIG)){
            G.config = $.extend(true, G.config, window.HY_CONFIG);
        }
        // 初始化事件绑定
        initEvent();
        $.isFunction(cb) && cb(require);
        // 启动路由
        Route.run(bindModule);
    }
});