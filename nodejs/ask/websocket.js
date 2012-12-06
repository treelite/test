var WebSocketServer = require('websocket').server,
    util = require('util'),
    ws, rounter;

var connectPoolMgr = (function () {
        var connects = [];         

        function createUID() {
            return new Date().getTime();
        }

        function each(callback) {
            var i, item;

            for (i = 0; item = connects[i]; i++) {
                if (callback.call(null, item, i) === false) {
                    break;
                }
            }
        }

        return {
            add: function (connect) {
                connect.__UID = createUID();
                connects.push(connect);
            },

            get: function (uid) {
                var res = null;

                each(function (item, index) {
                    if (item.__UID == uid) {
                        res = item;
                        return false;
                    }
                });
                return res;
            },

            forEach: function (callback) {
                each(callback);
            }
        }
    })();

function extend(source, target) {
    for (var key in target) {
        source[key] = target[key];
    }

    return source;
}

function createMessageHandler(uid) {
    return function (message) {
        var data = JSON.parse(message.utf8Data),
            action = rounter[data.action];

        if (action) {
            action.call(null, data.data, ws);
        }
    }
}

function createCloseHandler(uid) {
    return function () {
        util.log(uid + ' close connection');
    };
}

function createErrorHandler(uid) {
    return function () {
        util.log(uid + ' error');
    }
}

exports.start = function (httpServer, rounterMap, options) {
    options = extend({
        httpServer: httpServer,
        autoAcceptConnections: true
    }, options || {});

    ws = new WebSocketServer(options);

    rounter = rounterMap;

    ws.on('connect', function (connect) {
        connectPoolMgr.add(connect);
        util.log('new ws connect:' + connect.__UID);
        connect.on('message', createMessageHandler(connect.__UID));
        connect.on('close', createCloseHandler(connect.__UID));
        connect.on('error', createErrorHandler(connect.__UID));
    });

    return {
        broadcast: function (str) {
            connectPoolMgr.forEach(function (item, index) {
                item.sendUTF(str);
            });
        }
    }
}
