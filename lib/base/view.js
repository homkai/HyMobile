/**
 * View Module
 * Created by Homkai on 2015/8/8.
 */
define('view', function(require, exports, module){

    exports.run = function(){
        // 快速路由
        $('body').on('tap', '[data-tapRoute]', function(){
            var route = $.trim($(this).data('tapRoute'));
            if(!route) return;
            var Route = require('route');
            Route.go(route);
        });
        // 快速跳转URL
        $('body').on('tap', '[data-tapURL]', function(){
            var url = $.trim($(this).data('tapURL'));
            if(!url) return;
            setTimeout(function(){
                location.href = url;
            }, 10);
        });
    }

});