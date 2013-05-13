/**
 * @file Describe the file
 * @author leeight(liyubei@baidu.com)
 */

/**
 * @namespace
 */
var baidu = {};


/**
 * 全局变量说明
 * 
 * @type {number}
 */
var currentStep = 1;

/**
 * 常量说明
 *  
 * @const
 * @type {string}
 */
var REQUEST_URL = 'myurl.do';

/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 * 那就换行了.
 * @param {number=} opt_p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
function hello (p1, p2, opt_p3) {}


/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 * 那就换行了.
 * @param {number=} opt_p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
var foo = function (p1, p2, opt_p3) {};


/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明，比较长
 * 那就换行了.
 * @param {number=} opt_p3 参数3的说明（可选）
 * @return {Object} 返回值描述
 */
baidu.foo = function (p1, p2, opt_p3) {
    var p3 = opt_p3 || 10;

    /**
     * 值变更时触发
     *
     * @event Select#change
     * @param {Object} e e描述
     * @param {string} e.before before描述
     * @param {string} e.after after描述
     */
    this.fire('change', {content: 'hello world'});

    return {
        p1 : p1,
        p2 : p2,
        p3 : p3
    };
};

/**
 * 值变更时触发
 *
 * @event
 * @param {Object} e e描述
 * @param {string} e.before before描述
 * @param {string} e.after after描述
 */
baidu.onchange = function (e) {
    //xxxxxx
};

/**
 * 描述
 *
 * @constructor
 */
function Person() {
    // constructor body
}

/**
 * 描述
 *
 * @constructor
 * @extends Person
 */
function Baiduer() {
    Person.call(this);

    /**
     * 属性描述
     * 
     * @type {string}
     * @private
     */
    this._level = 'T11';

    // constructor body
}

baidu.inherits(Baiduer, Person);

/**
 * @namespace
 */
var module = (function () {

    /**
     * name
     *
     * @const
     * @type {string}
     */
    var NAME = 'cxl';

    /**
     * 获取名字
     *
     * @return {string} name
     */
    function getName() {
        return NAME;
    }

    return {
        /**
         * 你好
         *
         * @method
         */
        sayHello: function () {}
    };
})();

define(function (require, exports, module) {

    /**
     * 初始化视图
     *
     * @private
     */
    function initView() {
    }

    /**
     * 模块入口
     * 
     * @public
     * @param {number} ucid userid
     */
    exports.enter = function (ucid) {
    };

});
