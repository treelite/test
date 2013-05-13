{
    "data": ["comment2", "*\n * @file Describe the file\n * @author leeight(liyubei@baidu.com)\n "]
} {
    "data": ["comment2", "*\n * @namespace\n "],
    "next": ["var", [
        ["baidu", ["object", []]]
    ]]
} {
    "data": ["comment2", "*\n * 全局变量说明\n * \n * @type {number}\n "],
    "next": ["var", [
        ["currentStep", ["num", 1]]
    ]]
} {
    "data": ["comment2", "*\n * 常量说明\n *  \n * @const\n * @type {string}\n "],
    "next": ["var", [
        ["REQUEST_URL", ["string", "myurl.do"]]
    ]]
} {
    "data": ["comment2", "*\n * 函数描述\n *\n * @param {string} p1 参数1的说明\n * @param {string} p2 参数2的说明，比较长\n * 那就换行了.\n * @param {number=} opt_p3 参数3的说明（可选）\n * @return {Object} 返回值描述\n "],
    "next": ["var", [
        ["foo", ["function", null, ["p1", "p2", "opt_p3"],
            []
        ]]
    ]]
} {
    "data": ["comment2", "*\n * 函数描述\n *\n * @param {string} p1 参数1的说明\n * @param {string} p2 参数2的说明，比较长\n * 那就换行了.\n * @param {number=} opt_p3 参数3的说明（可选）\n * @return {Object} 返回值描述\n "],
    "next": ["stat", ["assign", true, ["dot", ["name", "baidu"], "foo"],
        ["function", null, ["p1", "p2", "opt_p3"],
            [
                ["var", [
                    ["p3", ["binary", "||", ["name", "opt_p3"],
                        ["num", 10]
                    ]]
                ]],
                ["comment2", "*\n     * 值变更时触发\n     *\n     * @event Select#change\n     * @param {Object} e e描述\n     * @param {string} e.before before描述\n     * @param {string} e.after after描述\n     "],
                ["stat", ["call", ["dot", ["name", "this"], "fire"],
                    [
                        ["string", "change"],
                        ["object", [
                            ["content", ["string", "hello world"]]
                        ]]
                    ]
                ]],
                ["return", ["object", [
                    ["p1", ["name", "p1"]],
                    ["p2", ["name", "p2"]],
                    ["p3", ["name", "p3"]]
                ]]]
            ]
        ]
    ]]
} {
    "data": ["comment2", "*\n     * 值变更时触发\n     *\n     * @event Select#change\n     * @param {Object} e e描述\n     * @param {string} e.before before描述\n     * @param {string} e.after after描述\n     "],
    "next": ["stat", ["call", ["dot", ["name", "this"], "fire"],
        [
            ["string", "change"],
            ["object", [
                ["content", ["string", "hello world"]]
            ]]
        ]
    ]]
} {
    "data": ["comment2", "*\n * 值变更时触发\n *\n * @event\n * @param {Object} e e描述\n * @param {string} e.before before描述\n * @param {string} e.after after描述\n "],
    "next": ["stat", ["assign", true, ["dot", ["name", "baidu"], "onchange"],
        ["function", null, ["e"],
            [
                ["comment1", "xxxxxx"]
            ]
        ]
    ]]
} {
    "data": ["comment2", "*\n * 描述\n *\n * @constructor\n "],
    "next": ["defun", "Person", [],
        [
            ["comment1", " constructor body"]
        ]
    ]
} {
    "data": ["comment2", "*\n * 描述\n *\n * @constructor\n * @extends Person\n "],
    "next": ["defun", "Baiduer", [],
        [
            ["stat", ["call", ["dot", ["name", "Person"], "call"],
                [
                    ["name", "this"]
                ]
            ]],
            ["comment2", "*\n     * 属性描述\n     * \n     * @type {string}\n     * @private\n     "],
            ["stat", ["assign", true, ["dot", ["name", "this"], "_level"],
                ["string", "T11"]
            ]],
            ["comment1", " constructor body"]
        ]
    ]
} {
    "data": ["comment2", "*\n     * 属性描述\n     * \n     * @type {string}\n     * @private\n     "],
    "next": ["stat", ["assign", true, ["dot", ["name", "this"], "_level"],
        ["string", "T11"]
    ]]
}

Beautified 1 files
