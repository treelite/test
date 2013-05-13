define(function (require) {
    var ui = require('./main');
    var lib = require('./lib');

    function Button(options) {
        var ele = this.ele = options.ele;

        ele.className = 'ui-button';

        lib.on(ele, 'mouseover', function () {
            ele.className += ' ui-button-hover';
        });

        lib.on(ele, 'mouseout', function () {
            ele.className = ele.className.replace(/\s+ui-button-hover/g, '');
        });

        lib.on(ele, 'mousedown', function () {
            ele.className += ' ui-button-active';
        });

        lib.on(ele, 'mouseout', function () {
            ele.className = ele.className.replace(/\s+ui-button-active/g, '');
        });
    }

    Button.prototype.on = function (name, callback) {
        lib.on(this.ele, name, callback);
    };

    ui.register('button', Button);

    return Button;
});
