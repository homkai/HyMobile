define(function(require, exports, module){

    exports._init = function(){
        console.log('_init', Date.now());
    };

    exports.run_init = function(){
        console.log('run_init', Date.now());
    };

    exports.run = function(req, ctn){
        console.log('run', Date.now());
        var html = '<a href="javascript:;" id="test" data-tapRoute="play/ssq/order">Go to DLT</a>';
        $(ctn).html(html);
    };

    exports.order = function(req, view){
        console.log('order', Date.now());
    };

    exports.run_destroy = function(){
        console.log('run_destroy', Date.now());
    };

    exports._destroy = function(){
        console.log('_destroy', Date.now());
    };
});