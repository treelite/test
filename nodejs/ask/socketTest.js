var WebSocketServer = require('websocket').server,
    http = require('http'),
    server = http.createServer(function (request, response) {
        console.log((new Date()) + ' Received request for ' + request.url);
        response.writeHead(404);
        response.end();
    }),
    ws, users = [];

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
    users.push(con);
    con.on('message', function (message) {
        console.dir(message);
        var value = (message.type == 'utf8' ? message.utf8Data : message.binaryDataBuffer),
            i, item;

        console.log('received:' + value);
        for (i = 0; item = users[i]; i++) {
            item.sendUTF(value);
        }
    });
});

server.listen(8080, function () {
    console.log('server is ready');
});
