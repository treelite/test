var http = require("http"),
    url = require('url'),
    querystring = require('querystring'),
    reqId = 0,
    PORT = 9999;

function sleep(milliSecond) { 
    var startTime = new Date().getTime(); 

    console.log('[sleep] ' + milliSecond);
    while(new Date().getTime() <= milliSecond + startTime) {}
} 


function onRequireHanlder(req, rep) {
    var urlObj = url.parse(req.url),
        params = {};

    console.log('[req] id:' + (++reqId));
    
    if (urlObj.search) {
        params = querystring.parse(urlObj.search.substring(1));
    }
    if (params.sleep) {
        sleep(parseInt(params.sleep, 10));
    }
    rep.writeHead(200);
    rep.end('hello nodejs');
    console.log('[rep] id:' + reqId);
};

http.createServer(onRequireHanlder).listen(PORT);
console.log('start...');
