// 1. 类型断言
// as
let someValue: any = "this is String"
let strLength: number = (someValue as string).length
// "尖括号"
let strLength1: number = (<string>someValue).length

//  非空断言
// 1. 忽略undefined和null类型
function myFunc(maybeString: string | undefined | null): void {
  const onlyString: string = maybeString! // ok
  // const onlyString: string = maybeString // error
  console.log(onlyString)
}
// 2. 确定赋值断言
// let x: number // error
let x!: number
initialize() 
console.log(x*2)
function initialize() {
  x = 10
}