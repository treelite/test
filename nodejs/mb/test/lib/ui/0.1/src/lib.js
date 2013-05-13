define(function () {
    return {
        on: function (ele, name, callback) {
            name = name.replace(/^on/i, '');
            if (ele.addEventListener) {
                ele.addEventListener(name, callback, false);
            }
            else {
                ele.attachEvent('on' + name, callback);
            }
        }
    };
});
