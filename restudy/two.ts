// 重新构造做变换

// Demo1 push
type myPush<Arr extends unknown[], item extends unknown> = [...Arr, item]
type Demo11Result= myPush<[1,2,3], 4>

// Demo2 zip
type ZipArr<Arr1 extends unknown[], Arr2 extends unknown[], result extends unknown[][] = []> = 
  Arr1 extends [infer first, ...infer last] ?
    Arr2 extends [infer Arr2First, ...infer Arr2Last] ?
    ZipArr<last, Arr2Last, [...result, [first, Arr2First]]> : result
    :result
type Demo12Reusult = ZipArr<[1, 2], ["北京", "上海"]>

// Demo3 首字母大写
type ToUpperFirst<Str extends string> = Str extends `${infer first}${infer last}` ? `${Uppercase<first>}${last}` : never
type Demo13Result = ToUpperFirst<"abc">

// Demo4 转换为特定格式
type TransfromUnit<Str1 extends string, Str2 extends string> = 
  Str1 extends `${infer first}${Str2}${infer last}` ? TransfromUnit<`${first}${last}`, Str2> : Str1
type Demo14Result = TransfromUnit<"dong_dong_dong", "_">

// Demo5 删除字符串中的某个字符串
type DeleteStr<Str1 extends string, Str2 extends string> = 
  Str1 extends `${infer first}${Str2}${infer last}` ? `${first}${last}` : never
type Demo15Result = DeleteStr<"this is aaa demo3", " aaa">

// Demo6 给函数扩展参数 ***************************************
type FuncExpand<Func extends Function, arg> =
  Func extends (Args: infer params) => unknown ? (...arg: [params, arg]) => unknown : never
type Demo16Result = FuncExpand<(name: number) => boolean, string>

// Demo7 value数组化
type MyObject<obj extends Object> = obj extends {
  [k in keyof obj]: unknown
} ? {
  [k in keyof obj]: [obj[k], obj[k], obj[k]]
}: never
type Demo17Result = MyObject<{name: "张三", age: 123}>

// Demo8 索引大写 *****************
type UpperKey<Obj extends Object> = {
  [k in keyof Obj as Uppercase<k & string>]: Obj[k]
}
type Demo18Result = UpperKey<{name: "张三", age: 123}>

// Demo9 去掉可选修饰符
type DeleteChoose<Obj extends object> = {
  [key in keyof Obj] - ?: Obj[key]
}
type Demo9Result = DeleteChoose<{
  name?: "张三",
  age: 23
}>

// Demo10 过滤指定类型 *************************
type MyExclude<Obj extends Object, SelfType> = {
  [k in keyof Obj as Obj[k] extends SelfType ? k : never]: Obj[k]
}
type Demo110 = MyExclude<{name: "张三", age: 123, hobby: ["a", "b"]}, string | number>