var esprima = require('./esprima-1.0.2');
var escodegen = require('./escodegen-0.0.22');
var estraverse = require('./estraverse-1.1.1');
var fs = require('fs');

var code = fs.readFileSync('code.js');

var content = esprima.parse(code);

var SYNTAX = estraverse.Syntax;

estraverse.replace(content, {
    enter: function(element) {
        if (element.type  == SYNTAX.CallExpression && element.callee.name == 'define') {
            element.arguments.splice(0, 0, {
                type: 'Literal',
                value: 'modeId'
            });
        }
        return element;
    }
});

estraverse.traverse(content, {
    enter: function (element) {
        if (element.type  == SYNTAX.CallExpression && element.callee.name == 'define') {
            console.log(element);
        }
    }
});

console.log(escodegen.generate(content));
