var util = require('./util');

/*
// module.conf
{
    "baseUrl": "./src",
    "paths": {
        "util": "common/util",
        "tangram": "../other/tangram",
        "jQuery": "http://img.google.com/js/query"
    },
    "packages": [
        {
            "name": "ui",
            "location": "../lib/ui/0.1/src",
            "main": "main"
        },
        {
            "name": "er",
            "location": "/module/er/3.0/src",
            "main": "main"
        }
    ]
}
*/

console.log('--- getModuleFile ---');
console.log(util.getModuleFile('home/main', './module.conf'));
console.log(util.getModuleFile('util', './module.conf'));
console.log(util.getModuleFile('tangram/string', './module.conf'));
console.log(util.getModuleFile('ui', './module.conf'));
console.log(util.getModuleFile('ui/button', './module.conf'));
console.log(util.getModuleFile('jQuery/dom', './module.conf'));
console.log(util.getModuleFile('er/Action', './module.conf'));

console.log('\n--- getModuleId ---');
console.log(util.getModuleId('src/home/main.js', './module.conf'));
console.log(util.getModuleId('src/common/util.js', './module.conf'));
console.log(util.getModuleId('other/tangram/string.js', './module.conf'));
console.log(util.getModuleId('lib/ui/0.1/src/main.js', './module.conf'));
console.log(util.getModuleId('lib/ui/0.1/src/button.js', './module.conf'));
console.log(util.getModuleId('http://img.google.com/js/query/dom.js', './module.conf'));
console.log(util.getModuleId('/module/er/3.0/src/Action.js', './module.conf'));
