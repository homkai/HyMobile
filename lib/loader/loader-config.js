seajs.config({
    base: '/app/',
    paths:{
        _core: '/lib/core/',
        _base: '/lib/base/',
    },
    alias: {
        hy: '_core/hy.js?c=y&v=150810093700',
        url: '_core/url.js?c=y&v=150810093700',
        event: '_core/event.js?c=y&v=150810093722',
        route: '_core/route.js?c=y&v=150810093700',
        time: '_core/time.js?c=y&v=150810093700',
        cache: '_core/cache.js?c=y&v=150810093700',
        data: '_core/data.js?c=y&v=150810093700',
        view: '_base/view.js?c=y&v=150810093700',
        msg: '_base/msg.js?c=y&v=150810093700',
        'play/ssq': 'play/ssq.js?c=y&v=150810093700',
        'index/main': 'index/main.js?c=y&v=150914233400'
    }
});