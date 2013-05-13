define(function (require) {
    var info = require('./info');
    
    return {
        enter: function () {
            info.init('sidebar');
        }
    };
});
