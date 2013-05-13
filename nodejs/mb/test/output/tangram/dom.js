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