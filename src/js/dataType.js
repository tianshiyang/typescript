// 基础类型
// Boolean
var a = true;
// Number
var b = 1;
// String
var c = 'string';
// symbol
// Array
var list = [1, 2, 3];
var arr = [1, 3, 4];
// Enum
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["SOUTH"] = 1] = "SOUTH";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH; // 0
var dir1 = Direction["EAST"]; // 2
// Any
var val = 11111;
// Unknown
var d = 1;
// let e: number = d // error, Unknown不能赋值给any以外的具体类型
// let f: any = d // ok, Unknown只可以赋值给any类型
// Tuple 元组
var tupleTypeArr = ["string", 1];
// Void 
function fun(arg1, arg2) {
    console.log(arg1, arg2);
}
// Null
var n = null;
// Undefined
var u = undefined;
// object 用于表示非原始类型
// Object 他是所有Object类的实例的类型
// Never 表示永远无法达到的值
function error(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) { }
}
