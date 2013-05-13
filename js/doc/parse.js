/**
 * @file 提取解析注释信息（基于UglifyJS的parse-js.js生成AST）
 * @author cxl(c.xinle@gmail.com)
 */

var parser = require('./lib/parse-js.js');
var util = require('util');
var fs = require('fs');

function isComment(data, isMulti) {
    var item = data[0];

    if (typeof item == 'string' && item.indexOf('comment') >= 0) {
        return isMulti ? item == 'comment2' : true;
    }
    else {
        return false;
    }
}

var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
function trim(str) {
    return str.replace(trimer, '');
}

var propertyHandles = {};

propertyHandles.namespace = function (res, item) {
    res.type = 'namespace';
};

propertyHandles.file = function (res, item) {
    res.type = 'file';
    if (item != '') {
        res.desc.push(item);
    }
};

propertyHandles.author = function (res, item) {
    res.author = item;
};

propertyHandles.type = function (res, item) {
    res.valueType = item.substring(1, item.length - 1);
};

propertyHandles.event = function (res, item) {
    res.type = 'event';
};

propertyHandles.param = function (res, item) {
    res.params = res.params || [];
    var param = {};
    item = item.split(/\s/);
    param.name = item[1];
    param.valueType = item[0].substring(1, item[0].length - 1);
    param.desc = item.slice(2).join(' ');

    res.params.push(param);
};

propertyHandles.return = function (res, item) {
    item = item.split(/\s/);
    res.return = {
        valueType: item[0].substring(1, item[0].length - 2),
        desc: item[1] || ''
    };
};

propertyHandles.constructor = function (res, item) {
    res.type = 'constructor';
};

propertyHandles.const = function (res, item) {
    res.type = 'const';
};

propertyHandles.extends = function (res, item) {
    res.extends = item;
};

propertyHandles.private = function (res, item) {
    res.visible = 'private';
};

propertyHandles.public = function (res, item) {
    res.visible = 'public';
};

propertyHandles.protected = function (res, item) {
    res.visible = 'protected';
};

function recType() {
    return 'unknow';
}

function parseCommentProperty(res, item) {
    var type;

    var data = trim(item.replace(/@([^ ]+)/, function($0, $1) {
        type = $1; 
        return '';
    }));

    var handler = propertyHandles[type];

    if (handler) {
        handler(res, data);
    }
    else if (item != '') {
        res.desc.push(item);
    }
}

function parseComment(comment) {
    var data = comment.data[1].split(/\n\r?/);
    var res = {desc: []};

    var preLine = '';
    for (var i = 0, item; item = data[i]; i++) {
        item = trim(item.replace(/^[^*]*\*{1,}/, ''));

        if (item.charAt(0) == '@') {
            if (preLine.charAt(0) == '@') {
                parseCommentProperty(res, preLine);
            }
            else if (preLine != '') {
                res.desc.push(preLine);
            }
            preLine = item;
        }
        else {
            preLine += item;
        }
    }

    if (preLine.charAt(0) == '@') {
        parseCommentProperty(res, preLine);
    }
    else {
        res.desc.push(preLine);
    }

    // 如果没有type则根据紧接的语句判断
    if (!res.type) {
        res.type = recType(comment.next);
    }

    //TODO: 获取相关语句注释语句

    return res;
}

function collectComment(data, comments) {
    for (var i = 0, item, len = data.length; i < len; i++) {
        item = data[i];
        if (util.isArray(item)) {
            if (isComment(item, true)) {
                var comment = {
                        data: item
                    };
                //var comment = parseComment(item);
                if (!isComment(data[i + 1])) {
                    comment.next = data[i + 1];
                }
                comments.push(comment);
            }
            else {
                collectComment(item, comments);
            }
        }
    }
}

var filename = process.argv[2];

if (filename) {
    var code = fs.readFileSync(filename, 'utf-8');
    var res;
    try {
        res = parser.parse(code);
    }
    catch (e) {
        console.log('Error: ' + e.message);
    }

    var comments = [];
    collectComment(res, comments);

    for (var i = 0, item; item = comments[i]; i++) {
        console.log(JSON.stringify(item));
        comments[i] = item = parseComment(item);
        console.log(JSON.stringify(item));
    }

    /*
    for (var i = 0, item; item = comments[i]; i++) {
        console.log(item.value);
        console.log(JSON.stringify(item.next));
    }
    */
    /*
    var nextToken = parser.tokenizer(code);
    var token;
    while(token = nextToken() && token.type != 'eof') {
        if (token.type.indexOf('comment') >= 0) {
            console.log(token.type + '\n' + token.value + '\n');
        }
    }
    */
}
