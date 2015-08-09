seajs.config({
    base: '/lib/app/',
    paths:{
        app: '/lib/app/',
        core: '/lib/core/',
        base: '/lib/base/',
        common: '/lib/common/'
    },
    alias: {
        hy: 'core/hy',
        url: 'core/url',
        event: 'core/event',
        route: 'core/route',
        time: 'core/time',
        cache: 'core/cache',
        data: 'core/data',
        view: 'base/view',
        time: 'base/time',
        msg: 'base/msg'
    }
});