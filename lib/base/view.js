/**
 * View Module
 * Created by Homkai on 2015/8/8.
 */
define('view', function(require, exports, module){

    exports.run = function(){
        // 快速路由
        $('body').on('tap', '[data-taproute]', function(){
            var route = $.trim($(this).data('taproute'));
            console.log(route);
            if(!route) return;
            var Route = require('route');
            console.log(route);
            Route.go(route);
        });
        // 快速跳转URL
        $('body').on('tap', '[data-tapurl]', function(){
            var url = $.trim($(this).data('tapurl'));
            if(!url) return;
            setTimeout(function(){
                location.href = url;
            }, 10);
        });
    }

});