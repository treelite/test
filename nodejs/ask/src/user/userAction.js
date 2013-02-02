exports.url = '/user/:id';

exports.GET = function (req, rep, options, context) {
    rep.writeHead(200);
    rep.end('user - ' + options.id);
}
