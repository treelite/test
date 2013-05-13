define(function (require) {
    var util = require('./util');
    return {
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
});
