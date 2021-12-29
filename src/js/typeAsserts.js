// 1. 类型断言
// as
var someValue = "this is String";
var strLength = someValue.length;
// "尖括号"
var strLength1 = someValue.length;
//  非空断言
// 1. 忽略undefined和null类型
function myFunc(maybeString) {
    var onlyString = maybeString; // ok
    // const onlyString: string = maybeString // error
    console.log(onlyString);
}
// 2. 确定赋值断言
// let x: number // error
var x;
initialize();
console.log(x * 2);
function initialize() {
    x = 10;
}
