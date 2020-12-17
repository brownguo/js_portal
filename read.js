const parser = require("@babel/parser");//将JS源码转换成语法树的函数
const traverse = require("@babel/traverse").default;//遍历AST的函数
const types = require("@babel/types");//操作节点的函数，比如判断节点类型，生成新的节点等:
const generator = require("@babel/generator").default;//将语法树转换为源代码的函数
const fs = require("fs");//const fs = require('fs')

const visitor = {
    StringLiteral: {
        enter: [replace_unicode]//遍历所有StringLiteral属性
    },
    // VariableDeclaration 声明一个变量 例如：let var
    VariableDeclarator:{
        enter: [get_array]
    },
    MemberExpression:{
        // enter: [replace_var_ac]
    }
};

function get_array(path) {
    var node = path.node;
    if (node.id.name == '_ac'){
        // console.log(node.init.elements[1].value)  //_ac 那个大数组
    }
}
// 解析一下ac的16进制
function replace_unicode(path) {
    // console.log(path.id)
    delete path.node.extra;
}

var array_name = "_ac"
// 替换 _ac 变量
function replace_var_ac(path) {
    var node = path.node
    console.log(array_name)
    if (node.object.name == "_ac"){
        // console.log(node.property.value) // var _ac 在各个地方调用的值
    }
}

var js_code = fs.readFileSync("nikecn.js",{
    encoding: "utf-8"
})
let ast = parser.parse(js_code)
traverse(ast,visitor)
let { code }  = generator(ast)

console.log(code)

// 将转换后的代码写入新文件
// fs.writeFile('output_1.js',code,(err)=>{
//     console.log(err)
// })