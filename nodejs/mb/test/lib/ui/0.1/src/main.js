define(function () {
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
