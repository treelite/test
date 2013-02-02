var mu = require('mu2'),
    util = require('util'),
    BaseAction = function (req, rep, context) {
        this._req = req;
        this._rep = rep;
        this._context = context;
    };

BaseAction.prototype.render = function (template, options) {
    return mu.compileAndRender(template, options);
}

BaseAction.prototype.renderText = function (template, options) {
    return mu.renderText(template, options);
}

BaseAction.prototype.renderJSON = function (options, replacer) {
    return JSON.stringify(options, replacer);
}

BaseAction.prototype.__do__ = function (method, queryString) {
    var rep = this._rep,
        html = this[method](queryString, this._context);

    if (typeof html == 'string') {
        rep.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': html.length
        });
        rep.end(html);
    }
    else {
        util.pump(html, rep);
    }
}

function extend(source, target) {
    for (key in target) {
        source[key] = target[key];
    }
}

exports.create = function (url, methods, modules) {
    var Action = function (req, rep, context) {
            this.super.constructor.call(this, req, rep, context);
        };

    Action.prototype = new BaseAction();
    methods = methods || {};
    methods.super = Action.prototype;
    extend(Action.prototype, methods);

    modules.url = url;
    modules.create = function (req, rep, context) {
        return new Action(req, rep, context);
    }
    modules.hasMethod = function (method) {
        return !!methods[method];
    }
}
