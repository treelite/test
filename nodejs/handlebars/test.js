var Handlebars = require('handlebars');
var fs = require('fs');

Handlebars.registerHelper('forEach', function (context, options) {
    var res = [];
    var items = [];
    for (var key in context) {
        if (context.hasOwnProperty(key)) {
            items.push({key: key, value: context[key]});
        }
    }

    for (var i = 0, item; item = items[i]; i++) {
        item.last = i >= items.length - 1;
        res.push(options.fn(item));
    }
    return res.join('');
});

var file = fs.readFileSync('./tpl.html', 'utf-8');
var tpl = Handlebars.compile(file);

var data = {
    hash: {
        path1: 'wwww',
        path2: 'hhhh',
        path3: 'oooo'
    }
};
console.log(tpl(data));
