// 基础类型
// Boolean
const a: boolean = true
// Number
const b: number = 1
// String
const c: string = 'string'
// symbol
// Array
let list: number[] = [1, 2, 3]
let arr: Array<number> = [1, 3, 4]
// Enum
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}
let dir: Direction = Direction.NORTH // 0
let dir1: Direction = Direction["EAST"] // 2
// Any
let val: any = 11111
// Unknown
let d: unknown = 1
// let e: number = d // error, Unknown不能赋值给any以外的具体类型
// let f: any = d // ok, Unknown只可以赋值给any类型

// Tuple 元组
let tupleTypeArr: [string, number] = ["string", 1]
// Void 
function fun(arg1: string, arg2: number): void {
  console.log(arg1, arg2)
}
// Null
let n: null = null
// Undefined
let u: undefined = undefined

// object 用于表示非原始类型
// Object 他是所有Object类的实例的类型

// Never 表示永远无法达到的值
function error(message: string): never {
  throw new Error(message)
}
function infiniteLoop(): never {
  while(true) {}
}