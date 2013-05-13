/**
 * 扫描文件 获取需要合并的moduleId
 *
 * @param {string} file 文件路径
 * @return {Array.<string>} moduleId数组
 */
function scanFile(file) {
    var res = [];
    var extname = path.extname(file).substring(1);
    if (INCLUDE_FILES.indexOf(extname) < 0) {
        return res;
    }

    var code = fs.readFileSync(file, 'utf-8');
    if (extname != 'js') {
        code = getScripts(code);
    }

    // 不使用esprima 改用简单状态机
    // 对于大文件速度能提升不少
    code = filterComment(code);
    var index = code.search(/([^!]?\s*require\s*\(\s*\[([^\]]+)\])/);
    while(index >= 0) {
        res = res.concat(parseModuleId(RegExp.$2));
        code = code.substring(index + RegExp.$1.length);
        index = code.search(/[^!]?\s*require\s*\(\s*\[([^\]]+)\]/);
    }

    /*
    var content = esprima.parse(code);

    estraverse.traverse(content, {
        enter: function (element) {
            // 找到global require
            if (element.type == SYNTAX.CallExpression
                && element.callee.name == SYNTAX_REQUIRE
                && element.arguments[0].type == SYNTAX.ArrayExpression
            ) {
                element.arguments[0].elements.forEach(function(item) {
                    res.push(item.value);
                });
            }
        }
    });
    */

    return res;
}
//test
