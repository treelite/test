define('tangram/string', [
    'require',
    'exports',
    'module',
    './util'
], function (require) {
    var util = require('./util');
    return {
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
});