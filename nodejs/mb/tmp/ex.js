define(function (require) {
    var G = baidu.dom.g;
    var cookie = baidu.cookie;
    var ajax = require('../common/ajax');
    var tpl = require('tpl!./main.tpl');
    var URL = { CHECK: lxb.root + '/web/home/canOpenApps' };
    var COOKIE_KEY = 'no-rec-apps-';
    var view = {};
    var appBuilders = {};
    appBuilders[2] = function (data, flag) {
        var template = tpl.recTel;
        var info = {};
        info.gift = parseInt(data.senduser, 10) ? '\u514d\u8d39400\u7535\u8bdd\u9753\u53f7\u8d60\u9001\u4e2d\uff08\u542b2000\u5206\u949f\u901a\u8bdd\uff09' : '';
        info.cls = flag ? 'rec-item-cs' : '';
        info.url = lxb.root + '/web/tel/gotoOpenTelApp';
        return template.render(info);
    };
    appBuilders[4] = function (data, flag) {
        var template = tpl.recTrack;
        var info = {};
        info.cls = flag ? 'rec-item-cs' : '';
        return template.render(info);
    };
    appBuilders[8] = function (data, flag) {
        var template = tpl.recCallback;
        var info = {};
        if (parseInt(data.senduser, 10) && data.sendnum && data.sendnum > 0) {
            info.gift = '\u7acb\u5373\u5f00\u901a\u83b7\u8d60' + data.sendnum + '\u5206\u949f\u901a\u8bdd\uff01';
        }
        info.cls = flag ? 'rec-item-cs' : '';
        info.url = lxb.root + '/web/callbackOpen';
        return template.render(info);
    };
    var map = {};
    var seq = [
            8,
            2,
            4
        ];
    function show(data) {
        if (data && data.length > 0) {
            var html = [];
            for (var i = 0, item; data[i]; i++) {
                map[item.id] = item;
            }
            for (var i = 0, builder, key; key = seq[i]; i++) {
                builder = appBuilders[key];
                if (builder) {
                    html.push(builder(map[key], i % 2 !== 0));
                }
            }
            view.content.innerHTML = html.join('');
        }
        view.container.style.display = '';
    }
    function close() {
        view.container.style.display = 'none';
    }
    function initView() {
        view.container = G('recommand');
        view.content = G('rec-content');
        view.btnClose = G('rec-btn-close');
        view.btnLater = G('rec-btn-later');
        view.chkNoRec = G('rec-btn-rmd-chk');
    }
    function bindEvents() {
        view.btnClose.onclick = function () {
            close();
            return false;
        };
        view.btnLater.onclick = function () {
            if (view.chkNoRec.checked) {
                cookie.set(COOKIE_KEY, 1, { expires: 15 * 24 * 60 * 60 * 1000 });
            }
            close();
            return false;
        };
    }
    return {
        init: function (ucid) {
            initView();
            bindEvents();
            COOKIE_KEY += ucid;
            if (cookie.get(COOKIE_KEY)) {
                return;
            }
            ajax.get(URL.CHECK, function (data) {
                if (data && data.length > 0) {
                    show(data);
                }
            });
        }
    };
});
