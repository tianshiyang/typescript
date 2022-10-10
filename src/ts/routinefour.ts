/**
 * 套路四：数组长度做计数
 */

// 创建定长数组
type BuildArrayFour<Num extends number, Ele = unknown, Arr extends unknown[] = []> =
  Arr["length"] extends Num ? Arr : BuildArrayFour<Num, Ele, [...Arr, Ele]>
type BuildArrayFourDemo = BuildArrayFour<4>

// Demo1 数组长度实现加法
type Add<Num1 extends number, Num2 extends number> = [...BuildArrayFour<Num1>, ...BuildArrayFour<Num2>]["length"]
type AddDemo = Add<32, 57>

// Demo2 数组长度实现减法
type Sub<Num1 extends number, Num2 extends number> = 
  BuildArrayFour<Num1> extends [...BuildArrayFour<Num2>, ...infer Result] ? Result["length"] : never
type SubDemo = Sub<10, 2>

// Demo3 数组长度实现乘法运算
type Multiply<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> =
  Num2 extends 0 ? ResultArr["length"] : Multiply<Num1, Sub<Num2, 1>, [...ResultArr, ...BuildArrayFour<Num1>]>
type MultiplyDemo = Multiply<16, 3>

// Demo4 数组长度实现除法运算

type Divide<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> =
  Num1 extends 0 ? ResultArr["length"] : Divide<Sub<Num1, Num2>, Num2, [...ResultArr, ...BuildArrayFour<1>]>
type DivideDemo = Divide<15, 5>

// Demo4 数组长度实现计数(计算字符串长度)
type StrLen<Str extends string, Count extends unknown[] = []> = 
  Str extends `${infer First}${infer Rest}` ? StrLen<Rest, [...Count, unknown]> : Count["length"]
type StrLenDemo = StrLen<"hello world">

// Demo5 比较两个数值的大小 GreaterThan<a,b> => a < b
type GreaterThan<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> =
  Num1 extends Num2 ? false : 
    ResultArr["length"] extends Num1 ? true : 
      ResultArr["length"] extends Num2 ? false : GreaterThan<Num1, Num2, [...ResultArr, unknown]>
type GreaterThanDemo = GreaterThan<10, 11>