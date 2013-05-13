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