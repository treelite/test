var ws = require('websocket-server'),
    http = require('http'),

    server, handlerMap = {},
    ids = [];

function messageHandler(con, data) {
    var handler;

    data = JSON.parse(data);
    if (handler = handlerMap[data.type]) {
        handler.call(null, con, data.data);
    }
}

server = ws.createServer({
    debug: true
});

server.addListener('connection', function (con) {
    if (con.state == 4) {
        console.log('connected ' + con.id);
        messageHandler(con, {type: 'connected'});
    }
});

server.addListener("error", function(){
    console.log(Array.prototype.join.call(arguments, ", "));
});

server.addListener("disconnected", function(conn){
    console.log("disconnected " + con.id);
});

handlerMap.connected = function (con) {
    ids.push(con.id);
    con.send('{type: "connectioned", data: '+ con.id +'}');
    con.addListener('message', function (data) {
        messageHandler(this, data);
    });
}

handlerMap.message = function (con, message) {
    con.broadcast('{type: "message", data: '+ message +'}');
}

server.listen(8888);
console.log('ws started');
