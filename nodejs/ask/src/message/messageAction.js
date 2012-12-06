var action = require('../../action');

action.create('/message', {
    template: {
        GET: __dirname + '/get.html',
        POST: __dirname + '/post.html'
    },

    GET: function (queryString) {
        return this.render(this.template.GET, queryString);
    },

    POST: function (queryString, context) {
        var ws, data = {type: 'message'},
            res = {status: 0};

        if (!queryString.message) {
            res.status = 100;
        }
        else {
            ws = context.getWebSocket();
            data.data = queryString.message;
            ws.broadcast(JSON.stringify(data));
        }

        return this.renderJSON(res);
    }
}, exports);
