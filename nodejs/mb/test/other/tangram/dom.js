define(function (require) {
    var util = require('./util');
    return {
        g: function (id) {
            return document.getElementById(id);
        }
    };
});
