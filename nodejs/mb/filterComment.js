var fs = require('fs');

function filterComment(code) {
    var state = 0; //0 - 寻找状态 1 - 收集状态
    var i = 0;
    var len = code.length;
    var token;
    var comments = [];

    function wantStartComment(token) {
        var c = code.charAt(i + 1);
        if (c == '/' || c == '*') {
            state = 1;
            comments.push({
                type: c,
                start: i
            });
            i++;
        }
    }

    function wantEndComment(token) {
        var item = comments[comments.length - 1];

        if (item) {
            if (item.type == '/' && token == '\n') {
                item.end = i;
                state = 0;
            }
            else if (token == '/' && item.type == '*' && code.charAt(i - 1) == '*') {
                item.end = i;
                state = 0;
            }
        }
    }

    while (i < len) {
        token = code.charAt(i);
        if (token == '/') {
            state ? wantEndComment(token) : wantStartComment(token);
        }
        else if (token == '\n') {
            wantEndComment(token);
        }
        i++;
    }

    var start = 0;
    var res = []
    comments.forEach(function (item) {
        res.push(code.substring(start, item.start));
        start = item.end + 1;
    });
    if (start < code.length) {
        res.push(code.substring(start));
    }

    return res.join('');
}

var code = fs.readFileSync(process.argv[2], 'utf-8');

//filterComment(code);
console.log(filterComment(code));
