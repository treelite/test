/*jshint node:true*/
var util = require('util');

function log(msg) {
    util.debug('[template-jasmine-qiao] ' + msg);
}

exports.process = function (grunt, task, context) {
    var src = context.scripts.src;

    var baseUrl = context.options.baseUrl = context.options.baseUrl || './';

    log('src length:' + src.length);
    src.forEach(function (item, index) {
        if (item.indexOf(baseUrl) === 0) {
            item = item.replace(baseUrl, '');
        }

        item = item.replace(/\.js$/, '');
        src[index] = item;

        log('src file: ' + item);
    });

    var prev = 0;
    baseUrl.split('/').forEach(function (item, index) {
        if (item && item != '.') {
            prev++;
        }
    });

    if (prev > 0) {
        prev = (new Array(prev + 1)).join('../');
    }
    else {
        prev = './';
    }

    var specs = context.scripts.specs;
    log('specs length:' + specs.length);
    specs.forEach(function (item, index) {
        item = item.replace(/\.js$/, '').replace('./', prev);
        specs[index] = item;
    });

    var startjs = context.scripts.start;
    startjs.forEach(function (item, index) {
        item = item.replace(/\.js$/, '').replace('./', prev);
        startjs[index] = item;
    });

    //task.copyTempFile(__dirname + '/../vendor/qiao.js', 'qiao.js');

    var template = __dirname + '/templates/jasmine-qiao.html';
    var source = grunt.file.read(template);

    var html = grunt.util._.template(source, context);
    log('output html:' + html);
    return html;
};
