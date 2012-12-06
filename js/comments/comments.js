var fs = require('fs');

var content = fs.readFileSync('test.js', 'utf-8'),
    key = '__$STR$__',
    i, item, items, index, len,
    trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),
    str = [];

content = content.replace(/'((\\'|[^'\r\n])*)'/g, function ($0, $1) {
    var uid = key + str.length;

    str.push($1);
    return "'" + uid + "'";
});

content = content.replace(/"((\\"|[^"\r\n])*)"/g, function ($0, $1) {
    var uid = key + str.length;

    str.push($1);
    return '"' + uid + '"';
});

content = content.replace(/\/\*[\w\W]*\*\//mg, '');
console.log('replace:\n' + content);
items = content.split(/\r?\n/);
content = [];

for (i = 0, len = items.length; i < len; i++) {
    item = items[i];
    item = item.replace(trimer, '');
    item = item.replace(/\/\*.*\*\//g, '');
    if ((index = item.indexOf('//')) >= 0) {
        item = item.substring(0, index);
    }

    item = item.replace(/__\$STR\$__(\d+)/g, function ($0, $1) {
        $1 = parseInt($1, 10);
        return str[$1];
    });
    items.push(item);
}

console.log('output:\n' + content.join('\r\n'));
console.log(str);
