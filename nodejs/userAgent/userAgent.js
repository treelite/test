var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var queryString = require('querystring');
var staticFileSever = require('./staticFileSever');
var mapper = {
        1: 'PC',
        2: 'Mobile',
        3: 'Pad'
    };

function saveUserAgent(data) {
    var res = '';

    data = queryString.parse(data);
    res += mapper[parseInt(data.type, 10)];
    res += '\t';
    res += decodeURIComponent(data.userAgent);
    res += '\n';

    fs.appendFile('userAgent.txt', res);
}

function onRequireHanlder(req, rep) {
    var path = url.parse(req.url);

    util.log(req.headers['user-agent']);
    if (path.pathname == '/') {
        staticFileSever.render('/test.html', rep);
        return;
    }

    if (path.pathname.indexOf('.') >= 0) {
        staticFileSever.render(path.pathname, rep);
        return;
    }

    req.setEncoding('utf8');
    req.on('data', function (data) {
        saveUserAgent(data);
    });

    req.on('end', function () {
        var data = 'OK';
        rep.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        rep.end(data);
    });
};

var server = http.createServer(onRequireHanlder);
server.listen(process.argv[2] || 8080);
util.log('server run');
