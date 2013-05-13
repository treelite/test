[
  {
    "tags": [
      {
        "type": "author",
        "string": "leeight(liyubei@baidu.com)"
      }
    ],
    "description": {
      "full": "<p>@file Describe the file</p>",
      "summary": "<p>@file Describe the file</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false
  },
  {
    "tags": [],
    "description": {
      "full": "<p>@namespace</p>",
      "summary": "<p>@namespace</p>",
      "body": ""
    },
    "ignore": false,
    "code": "var baidu = {};",
    "ctx": {
      "type": "declaration",
      "name": "baidu",
      "value": "{}",
      "string": "baidu"
    }
  },
  {
    "tags": [
      {
        "type": "type",
        "types": [
          "number"
        ]
      }
    ],
    "description": {
      "full": "<p>全局变量说明</p>",
      "summary": "<p>全局变量说明</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "var currentStep = 1;",
    "ctx": {
      "type": "declaration",
      "name": "currentStep",
      "value": "1",
      "string": "currentStep"
    }
  },
  {
    "tags": [
      {
        "type": "const",
        "string": ""
      },
      {
        "type": "type",
        "types": [
          "string"
        ]
      }
    ],
    "description": {
      "full": "<p>常量说明</p>",
      "summary": "<p>常量说明</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "var REQUEST_URL = 'myurl.do';",
    "ctx": {
      "type": "declaration",
      "name": "REQUEST_URL",
      "value": "'myurl.do'",
      "string": "REQUEST_URL"
    }
  },
  {
    "tags": [
      {
        "type": "param",
        "types": [
          "string"
        ],
        "name": "p1",
        "description": "参数1的说明"
      },
      {
        "type": "param",
        "types": [
          "string"
        ],
        "name": "p2",
        "description": "参数2的说明，比较长"
      },
      {
        "type": "那就换行了.",
        "string": ""
      },
      {
        "type": "param",
        "types": [
          "number="
        ],
        "name": "opt_p3",
        "description": "参数3的说明（可选）"
      },
      {
        "type": "return",
        "types": [
          "Object"
        ],
        "description": "返回值描述"
      }
    ],
    "description": {
      "full": "<p>函数描述</p>",
      "summary": "<p>函数描述</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "baidu.foo = function (p1, p2, opt_p3) {\n    var p3 = opt_p3 || 10;",
    "ctx": {
      "type": "method",
      "receiver": "baidu",
      "name": "foo",
      "string": "baidu.foo()"
    }
  },
  {
    "tags": [
      {
        "type": "event",
        "string": "Select#change"
      },
      {
        "type": "param",
        "types": [
          "Object"
        ],
        "name": "e",
        "description": "e描述"
      },
      {
        "type": "param",
        "types": [
          "string"
        ],
        "name": "e.before",
        "description": "before描述"
      },
      {
        "type": "param",
        "types": [
          "string"
        ],
        "name": "e.after",
        "description": "after描述"
      }
    ],
    "description": {
      "full": "<p>值变更时触发</p>",
      "summary": "<p>值变更时触发</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "this.fire('change', {content: 'hello world'});\n\n    return {\n        p1 : p1,\n        p2 : p2,\n        p3 : p3\n    };\n}"
  },
  {
    "tags": [
      {
        "type": "event",
        "string": ""
      },
      {
        "type": "param",
        "types": [
          "Object"
        ],
        "name": "e",
        "description": "e描述"
      },
      {
        "type": "param",
        "types": [
          "string"
        ],
        "name": "e.before",
        "description": "before描述"
      },
      {
        "type": "param",
        "types": [
          "string"
        ],
        "name": "e.after",
        "description": "after描述"
      }
    ],
    "description": {
      "full": "<p>值变更时触发</p>",
      "summary": "<p>值变更时触发</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "baidu.onchange: function (e) {\n    //xxxxxx\n}"
  },
  {
    "tags": [
      {
        "type": "constructor",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>描述</p>",
      "summary": "<p>描述</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Person() {\n    // constructor body\n}",
    "ctx": {
      "type": "function",
      "name": "Person",
      "string": "Person()"
    }
  },
  {
    "tags": [
      {
        "type": "constructor",
        "string": ""
      },
      {
        "type": "extends",
        "string": "Person"
      }
    ],
    "description": {
      "full": "<p>描述</p>",
      "summary": "<p>描述</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "function Baiduer() {\n    Person.call(this);",
    "ctx": {
      "type": "function",
      "name": "Baiduer",
      "string": "Baiduer()"
    }
  },
  {
    "tags": [
      {
        "type": "type",
        "types": [
          "string"
        ]
      },
      {
        "type": "private",
        "string": ""
      }
    ],
    "description": {
      "full": "<p>属性描述</p>",
      "summary": "<p>属性描述</p>",
      "body": ""
    },
    "isPrivate": false,
    "ignore": false,
    "code": "this._level = 'T11';\n\n    // constructor body\n}\n\nbaidu.inherits(Baiduer, Person);",
    "ctx": {
      "type": "property",
      "receiver": "this",
      "name": "_level",
      "value": "'T11'",
      "string": "this._level"
    }
  }
]