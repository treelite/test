var WebSocketServer = require('websocket').server,
    http = require('http'),
    server = http.createServer(function (request, response) {
        console.log((new Date()) + ' Received request for ' + request.url);
        response.writeHead(404);
        response.end();
    }),
    ws, walls = [];

function sendMessage(message) {
    var i, item;

    for (i = 0; item = walls[i]; i++) {
        item.sendUTF(msg);
    }
}

ws = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});

ws.on('request', function () {
    console.log('request');
});

ws.on('close', function () {
    console.log('close');
});

ws.on('connect', function (con) {
    console.log('client connectioned');
    walls.push(con);
});

server.listen(8080, function () {
    console.log('server is ready');
});
