var walker = require('./walker'),
    querystring = require('querystring');

function Rounter(actionsMap, context) {
    this.actionsMap = actionsMap;
    this.context = context;
}

function parseUrlParams(str, source) {
    var items = querystring.parse(str),
        key;

    for (key in items) {
        source[key] = items[key];
    }
}

Rounter.prototype.match = function (path, method) {
    var params = [], matchs, key,
        actionsMap = this.actionsMap,
        context = this.context,
        action,
        res = false;

    for (key in actionsMap) {
        action = actionsMap[key];
        params = [];

        key = key.replace(/:([^\/]+)/g, function ($0, $1) {
            params.push({key: $1});
            return '([^\\/]+)';
        });

        matchs = new RegExp('^' + key + '$').exec(path);
        if (matchs) {
            for (key = 1; key < matchs.length; key++) {
                params[key - 1].value = matchs[key];
            }
            break;
        }
        else {
            action = null;
        }
    }

    if (action && action.hasMethod(method)) {
        res = function (req, rep) {
            var optinos = {}, i, item,
                pathObj = require('url').parse(req.url),
                search = pathObj.search ? pathObj.search.substring(1) : '',
                postData = [];
            
            for (i = 0; item = params[i]; i++) {
                optinos[item.key] = decodeURIComponent(item.value);
            }

            parseUrlParams(search, optinos);

            action = action.create(req, rep, context);

            if (req.method == 'POST') {
                req.on('data', function (chunk) {
                    if (postData.length > 100) {
                        req.connection.destory();
                    }
                    else {
                        postData.push(chunk);
                    }
                });

                req.on('end', function () {
                    parseUrlParams(postData.join(''), optinos);
                    action.__do__('POST', optinos);
                });
            }
            else {
                action.__do__(method, optinos);
            }
        }
    }
  
    return res;
}

exports.SUFFIX = 'Action';

exports.create = function (actionsMap, context) {
    return new Rounter(actionsMap, context);
}

exports.load = function (path, context) {
    var i, item, actionsMap = {},
        paths = walker.find(path, exports.SUFFIX +'.js$');

    for (i = 0; item = paths[i]; i++) {
        item = require('./' + item);
        actionsMap[item.url] = item;
    }

    return exports.create(actionsMap, context);
}
