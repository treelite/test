exports.url = '/news/:id';

exports.GET = function (req, rep, options, context) {
    rep.writeHead(200);
    rep.end('news - ' + options.id + ' page:' + options.page);
}
