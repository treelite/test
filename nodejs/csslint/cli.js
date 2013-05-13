var CSSLint = require('csslint').CSSLint;

CSSLint.addRule({
    id: 'code-style',
    name: 'Code style check',
    desc: 'Code style check, more detail see http://fe.baidu.com/doc/ecom/std/html-and-css-code-style.text#Css',
    browsers: "All",

    init: function (parser, reporter) {
        var rule = this;

        // 选择器检查
        parser.addListener('startrule', function (event) {
            var lastSelector = event.selectors[event.selectors.length - 1];

            // 单行选择器
            var line = -1;
            for (var i = 0, item; item = event.selectors[i]; i++) {
                if (line == item.line) {
                    reporter.report('Unnecessary selector in one line', item.line, item.col, rule);
                    break;
                }
                else {
                    line = item.line;
                }
            }

            // 空格检查
            var source = reporter.lines[lastSelector.line - 1];
            if (!/\s+\{/.test(source)) {
                reporter.report('Missing necessary blank', lastSelector.line, lastSelector.col, rule);
            }
        });


        var propertys = [];

        // 文件检查
        parser.addListener('startstylesheet', function () {
            propertys = [];

            var index;
            for (var i = 0, line; line = reporter.lines[i]; i++) {
                index = line.search('\t');
                if (index >= 0) {
                    reporter.report('Unnecessary tab', i, index, rule);
                }

                if (line.length > 80) {
                    reporter.report('Line too long', i, index, rule);
                }
            }
        });

        // 属性检查
        parser.addListener('property', function (event) {

            function report(msg) {
                reporter.report(msg, event.line, event.col, rule);
            }

            // 单行属性检查
            var line = event.line - 1;
            if (!propertys[line]) {
                propertys[line] = event.property;
            }
            else {
                report('Unnecessary property in one line');
            }

            // 空格检查
            var source = reporter.lines[line].substring(event.col - 1);
            source = source.split(';');
            // 分号检查
            /*
            if (source.length <= 1) {
                report('Missing semicolon');
            }
            */
            source = source[0];
            var i = source.search(':');
            if (source.charAt(i + 1) != ' ') {
                report('Missing necessary blank');
            }
            else if (source.charAt(i - 1) == ' ') {
                report('Unnecessary blank');
            }

            //expression检查
            if (event.value.text.indexOf('expression') >= 0) {
                report('Unnecessary expression');
            }
            else {
                // url中引号检查
                event.value.text.replace(/url\s*\(([^\)]+\))/, function ($0, $1) {
                    if ($1 && /['"]/.test($1)) {
                        report('Unnecessary quote in url');
                    }
                });
            }
        });
    }
});

var file = require('fs').readFileSync('./test.css', 'utf-8');
console.log(CSSLint.verify(file).messages);
