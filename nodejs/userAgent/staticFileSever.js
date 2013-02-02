var fs = require('fs'),
    contentTypeMap = {
        'html'  : 'text/html',
        'js'    : 'text/javascript',
        'css'   : 'text/css',
        'gif'   : 'image/gif',
        'jpeg'  : 'image/jpeg',
        'png'   : 'image/x-png'
    };

exports.render = function (path, rep) {
    var fileType = path.split('.')[1].toLowerCase();

    fs.readFile('.' + path, function (err, data) {
        if (err) {
            rep.writeHead(404);
            rep.end();
        }
        else {
            rep.writeHead(200, {
                'Content-Length': data.length,
                'Content-type': contentTypeMap[fileType] || 'text/plain'
            });
            rep.end(data);
        }
    });
}
