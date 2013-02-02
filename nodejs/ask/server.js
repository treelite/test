var http = require("http"),
    url = require('url'),
    util = require('util'),
    staticFiles = require('./staticFileSever'),
    urlRounter,

    PORT = 8080;

function onRequireHanlder(req, rep) {
    var pathObj = url.parse(req.url),
        handler;

    util.log('require:' + pathObj.pathname);
    if (pathObj.pathname.indexOf('.') >= 0) {
        staticFiles.get(pathObj.pathname, rep);
    }
    else if (handler = urlRounter.match(pathObj.pathname,  req.method)) {
        try {
            handler.call(null, req, rep);
        }
        catch(e) {
            util.error(e.stack);
            handler = '<h1>Server Error</h1>';
            rep.writeHead(500, {
                'Content-Type': 'text/html',
                'Content-Length': handler.length
            });
            rep.end(handler);
        }
    }
    else {
        handler = 'Not Found';
        rep.writeHead(404, {
            'Content-Type': 'text/html',
            'Content-Length': handler.length
        });
        rep.end(handler);
    }
};

exports.start = function (rounter, port) {
    var server = http.createServer(onRequireHanlder);

    port = port || PORT;
    urlRounter = rounter;
    server.listen(port)
    util.log('server run');
    return server;
};
