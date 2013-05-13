
define('tangram/util',[],function () {
    return {
        version: '0.1'
    };
});

define('tangram/dom',['require','./util'],function (require) {
    var util = require('./util');
    return {
        g: function (id) {
            return document.getElementById(id);
        }
    };
});

define('tangram/string',['require','./util'],function (require) {
    var util = require('./util');
    return {
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, '');
        }
    };
});

define('ui/main',[],function () {
    var controls = {};
    var contructors = {};

    function parseParams(str) {
        str = str.split(/\s*;\s*/);

        var res = {};
        for (var i = 0, item; item = str[i]; i++) {
            item = item.split(/\s*:\s*/);
            res[item[0]] = item[1];
        }

        return res;
    }

    return {
        init: function () {
            var eles = document.getElementsByTagName('*');

            for (var i = 0, item; item = eles[i]; i++) {
                var attr = item.getAttribute('data-ui');
                if (attr) {
                    attr = parseParams(attr);
                    attr.ele = item;

                    var type = attr.type;
                    delete attr.type;

                    controls[attr.id] = new contructors[type](attr);
                }
            }
        },

        get: function (id) {
            return controls[id]; 
        },

        create: function (type, options) {
            var id = options.id;

            controls[id] = new contructors[type](options);

            return controls[id];
        },

        register: function (name, contructor) {
            contructors[name] = contructor;
        }
    };
});

define('ui', ['ui/main'], function (main) { return main; });

define('ui/lib',[],function () {
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

define('ui/button',['require','./main','./lib'],function (require) {
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

define('home/main',['require','tangram/dom','tangram/string','ui','ui/button'],function (require) {

    var dom = require('tangram/dom');
    var string = require('tangram/string');
    var ui = require('ui');
    
    require('ui/button');

    function submitName() {
        var ele = dom.g('name');
        var value = ele.value = string.trim(ele.value);

        location.href = 'web/account.html?name=' + value 
            + '&req=' + (new Date()).getTime();
    }

    return {
        enter: function (id) {
            var html = [];

            ui.init();

            dom.g(id).innerHTML = 'welcome';

            ui.get('btn').on('click', submitName);
        }
    }
});
