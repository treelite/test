var server = require('./server'),
    rounter = require('./rounter'),
    WebSocketServer = require('websocket').server,
    webSocket = require('./websocket'),
    httpServer, ws;

httpServer = server.start(rounter.load('./', {
    getWebSocket: function () {
        return ws;
    }
}));

ws = webSocket.start(httpServer);
