define(function (require) {

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
