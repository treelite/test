var pollution = (function () {

    var instance;
    var callbackList = [];
    var created = null;

    function loadIframe() {
        if (created) {
            return;
        }

        //var name = '_BLANK_FROM_' + (new Date().getTime()) + '_';
        var name = 'test';
        document.write('<iframe style="display:none" name="'+ name +'" src="about:blank" ></iframe>');
        window.onload = function () {
            onload(window.frames[name]);
        };
        created = true;
    }

    function onload(win) {
        win = win.contentWindow || win; 
        instance = {
            g: function (id) {
                return win.document.getElementById.call(document, id);
            },

            open: function (src) {
                win.open.call(window, src);
            }
        };

        for (var i = 0, item; item = callbackList[i]; i++) {
            item.call(null, instance);
        }
    }

    return {
        ready: function (callback) {
            if (!instance) {
                callbackList.push(callback);
                loadIframe();
            }
            else {
                callback.call(null, instance);
            }
        }
    };
})();
