define('tangram/util', [
    'require',
    'exports',
    'module'
], function () {
    return { version: '0.1' };
});

define('util', [
    'require',
    'exports',
    'module'
], function () {
    return {
        getQuery: function () {
            var params = location.search.substring(1);
            var res = {};
            if (!params) {
                return res;
            }
            params = params.split('&');
            for (var i = 0, item; item = params[i]; i++) {
                item = item.split('=');
                res[item[0]] = decodeURIComponent(item[1]);
            }
            return res;
        }
    };
});

define('tangram/dom', [
    'require',
    'exports',
    'module',
    './util'
], function (require) {
    var util = require('./util');
    return {
        g: function (id) {
            return document.getElementById(id);
        }
    };
});

define('account/info', [
    'require',
    'exports',
    'module',
    'tangram/dom',
    'util'
], function (require) {
    var dom = require('tangram/dom');
    var util = require('util');
    return {
        init: function (id) {
            var params = util.getQuery();
            dom.g(id).innerHTML = '<h1>hello ' + (params.name || '') + '</h1>';
        }
    };
});

define('account/main', [
    'require',
    'exports',
    'module',
    './info'
], function (require) {
    var info = require('./info');
    return {
        enter: function () {
            info.init('sidebar');
        }
    };
});