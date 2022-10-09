/**
 * 模式二、重新构造做变换
 */

/**
 * 1. 数组类型的重新构造
 */

// Demo1 push
type PushResult<Arr extends unknown[], Ele> = [...Arr, Ele]
type tuple = [1, 2, 3]
type ArrDemo1 = PushResult<tuple, 4>

// Demo2 zip
type Zip<Index extends [number, number], Position extends [string, string]> = Index extends [infer Index1, infer Index2] ?
    Position extends [infer Position1, infer Position2] ? [[Index1, Position1], [Index2, Position2]] : []
  :[]
type tuple1 = [1, 2]
type tuple2 = ["北京", "上海"]
type ArrDemo2 = Zip<tuple1, tuple2>

// Demo2 zipPlus
type ZipPlus<Index extends unknown[], Position extends unknown[]> = Index extends [infer FristIndex, ...infer LastIndexs] ? 
    Position extends [infer FirstPosition, ...infer LastPostions] ? [[FristIndex, FirstPosition], ...ZipPlus<LastIndexs, LastPostions>] : []
  : []
type ArrDemo3 = ZipPlus<[1,2,3,4], ["北京", "上海", "广州", "深圳"]>


/**
 * 2. 字符串类型的重新构造
 */

// Demo1 首字母变为大写
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str
type StrDemo1 = CapitalizeStr<"zhangsan">

// Demo2 转化为特定格式
type CamelCase<Str extends string, Prefix extends string> = Str extends `${infer Start}${Prefix}${infer End}${infer Last}` ? 
  `${Start}${Uppercase<End>}${CamelCase<Last, Prefix>}` : Str
type StrDemo2 = CamelCase<"dong_dong_dong", "_">

// Demo3 删除字符串中的某个字符串
type DropSubStr<Str extends string, Prefix extends string> = Str extends `${infer Left}${Prefix}${infer Right}` ?
  `${Left}${Right}` : Str
type StrDemo3 = DropSubStr<"this is aaa demo3", " aaa">

/**
 * 3. 函数类型的重新构造
 */

// Demo AppendArgument
type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer ReturnType ?
  (...args: [...Args, Arg]) => ReturnType : never
type AppendArgumentDemo = AppendArgument<(name: number) => boolean, string>

/**
 * 4. 索引类型的重新构造
 */

// Demo1 Mapping
type Mapping<Obj extends object> = {
  [key in keyof Obj]: [Obj[key], Obj[key], Obj[key]]
}
type MappingDemo = Mapping<{name: "张三", age: 123}>

// Demo2 索引变成大写
type UppercaseKey<Obj extends object> = {
  [key in keyof Obj as Uppercase<key & string>] : Obj[key]
}
type UppercaseKeyDemo = UppercaseKey<{name: "张三", age: 123}>

// Demo3 变成只读模式
type ToReadonly<Obj extends object> = {
  readonly [key in keyof Obj]: Obj[key]
}
type ToReadonlyDemo = ToReadonly<{name: "张三", age: 123}>

// Demo4 增加可选修饰符
type ToPartial<Obj extends object> = {
  [key in keyof Obj]?: Obj[key]
} 
type ToPartialDemo = ToPartial<{name: "张三", age: 123}>

// Demo5 去掉readonly修饰符
type ToMutable<Obj extends object> = {
  -readonly [key in keyof Obj]: Obj[key]
}
type ToMutableDemo = ToMutable<{
  readonly name: "张三",
  age: 23
}>

// Demo6 去掉可选修饰符
type ToRequired<Obj extends object> = {
  [key in keyof Obj] - ?: Obj[key]
}
type ToRequiredDemo = ToRequired<{
  name?: "张三",
  age: 23
}>

// Demo7 过滤指定类型的值
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [key in keyof Obj as Obj[key] extends ValueType ? key : never]: Obj[key]
}
type FilterByValueTypeDemo = FilterByValueType<{name: "张三", age: 123, hobby: ["a", "b"]}, string | number>