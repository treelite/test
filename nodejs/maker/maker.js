var fs = require('fs');
var path = require('path');
var vm = require('vm');
var uglify = require('./lib/UglifyJS/uglify-js');

var config, mode;

function arrIndexOf(item, source) {
    for (var i = 0, o; o = source[i]; i++) {
        if (o === item) {
            break;
        }
    }

    return i >= source.length ? -1 : i;
}

function parseDependencies(code) {
    var pattern = /\brigel\.require\s*\(\s*['"]?([^'")]*)/g;
    var ret = [];
    var match;
 
    while ((match = pattern.exec(code))) {
        if (match[1]) {
          ret.push(match[1]);
        }
    }
 
    return ret;
}

function parseFile(file) {
    var content = fs.readFileSync(file, 'utf-8');
    return parseDependencies(content);
}

function addDepends(target, source) {
    var i, item;

    for (i = 0; item = target[i]; i++) {
        if (arrIndexOf(item, source) < 0) {
            source.push(item);
        }
    }

    return source;
}

function buildAsset(file, depends, dir) {
    var content = [];
    var i, item, source;

    if (mode == 'debug') {
        content.push('rigel.setDepends({');
        for (i = 0; item = depends[i]; i++) {
            if (i > 0) {
                content.push(', ');
            }
            content.push('"'+ item +'": "' + dir + config.module[item] + '"');
        }
        content.push('});');
        content = content.join('');
    }
    else {
        for (i = 0; item = depends[i]; i++) {
            source = config.dir + '/' + config.module[item];
            if (fs.existsSync(source)) {
                content.push(fs.readFileSync(source));
            }
            else {
                throw 'file not find ' + source;
            }
        }
        content = uglify(content.join(''));
    }

    fs.writeFileSync(file, content);
    console.log('build asset: ' + file);
}

function handleHTML(file) {
    var depends = parseFile(file);
    var i, item, p, dir, reg;

    if (depends.length <= 0) {
        return;
    }

    console.log('parse html: ' + file);

    dir = config.dir + '/';

    for (i = 0; item = depends[i]; i++) {
        p = dir + config.module[item];
        depends = addDepends(parseFile(p), depends);
    }

    item = path.basename(file);
    if (item.indexOf('.') >= 0) {
        item = item.substring(0, item.indexOf('.'));
    }
    reg = new RegExp('<script.+src=[\"\']\\s*(.+' + item + '\\.js)\\s*[\"\']', 'g');
    item = fs.readFileSync(file, 'utf-8');
    item = reg.exec(item);
    if (!item || item.length < 2) {
        return;
    }
    item = item[1];
    dir = '';
    item.replace(/^([.\/]+)/, function ($0, $1) {
        dir = $1;
    });

    buildAsset(path.dirname(file) + '/' + item, depends, dir);
}

function handleDirectory(dir) {
    var files = fs.readdirSync(dir);
    var i, file, stats;

    for (i = 0; file = files[i]; i++) {
        file = path.join(dir, file);
        stats = fs.statSync(file);
        if (stats.isFile() && path.extname(file) == '.html') {
            handleHTML(file);
        }
        else if (stats.isDirectory()) {
            handleDirectory(file);
        }
    }
}

function loadConfig(file) {
    var state;
    
    if (!fs.existsSync(file)) {
        throw 'Can not find the config file';
    }

    state = fs.statSync(file);
    if (state.isDirectory()) {
        file += /[\/\\]/.test(file.charAt(file.length - 1)) ? 'app.json' : '/app.json';
        if (!fs.existsSync(file)) {
            throw 'Can not find the config file';
        }
    }
    

    config = JSON.parse(fs.readFileSync(file, 'utf-8'));
    config.dir = path.dirname(file);
    
    handleDirectory(config.dir);
}

mode = process.argv[3] || 'release';

loadConfig(process.argv[2]);
