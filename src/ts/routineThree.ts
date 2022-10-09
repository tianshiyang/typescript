/**
 * 套路三：递归复用做循环
 */

/**
 * 1. Promise 的递归复用
 */
// Demo Promise递归
// type DeepPromiseValueType<P extends Promise<unknown>> =
//     P extends Promise<infer ValueType> 
//         ? ValueType extends Promise<unknown>
//             ? DeepPromiseValueType<ValueType>
//             : ValueType
//         : never;
type DeepPromiseValueType<T> = T extends Promise<infer ValueType> ? 
  DeepPromiseValueType<ValueType> : T // 简化版
type DeepPromiseValueTypeDemo = DeepPromiseValueType<Promise<Promise<Promise<Record<string, number>>>>>

/**
 * 2. 数组类型的递归
 */

// Demo1 反转数组
type ReverseArr<P extends Array<unknown>> = P extends [...infer Args, infer Arg] ? [Arg, ...ReverseArr<Args>] : []
type ReverseArrDemo = ReverseArr<[1,2,3,4,5]>

// Demo2 Includes查找
type Includes<P extends unknown[], T> = P extends [...infer Args, infer Arg]
  ? T extends Arg ? true : 
    Includes<Args, T>
  : false
type IncludesDemo = Includes<[1,2,3,4], 4>

// Demo3 RemoveItem移除指定元素
type RemoveItem<Arr extends unknown[], Item, Result extends unknown[] = []> = Arr extends [infer Arg, ...infer Args,]
  ? Arg extends Item ? RemoveItem<Args, Item, Result> : RemoveItem<Args, Item, [...Result, Arg]>
  : Result

type RemoveItemDemo = RemoveItem<[1,2,2,3], 2>

// 创建指定长度的数组
type BuildArray<Length extends number, Ele = unknown, Arr extends unknown[] = []> = 
  Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>
type BuildArrayDemo = BuildArray<5, number>

/**
 * 2. 字符串类型的递归
 */

// Demo1 ReplaceAll替换字符串
type ReplaceAll<Str extends string, From extends string, To extends string> = 
  Str extends `${infer First}${From}${infer Last}` ? ReplaceAll<`${First}${To}${Last}`, From, To> : Str

  /**
   * 官方写法
  type ReplaceAll<Str extends string, From extends string, To extends string> =
    Str extends `${infer Left}${From}${infer Right}` ? `${Left}${To}${ReplaceAll<Right, From, To>}` : Str;
   */
type ReplaceAllDemo = ReplaceAll<"this is ??", "??", "ReplaceAll">

// Demo2 StringToUnion在每个字符串后插入字符
type StringToUnion<Str extends string, Prefix extends string, Result extends string = ""> = 
  Str extends `${infer Start}${infer Rest}` ? StringToUnion<Rest, Prefix, `${Result}${Prefix}${Start}`> : Result 
type StringToUnionDemo = StringToUnion<"zhangsan", "-">

type StringToUnion1<Str extends string> = 
    Str extends `${infer First}${infer Rest}`
        ? First | StringToUnion1<Rest>
        : never;
type StringToUnion1Demo = StringToUnion1<"hello">

// Demo3 ReverseStr 字符串反转
type ReverseStr<Str extends string, Result extends string = ""> = 
  Str extends `${infer First}${infer Last}` ? ReverseStr<Last, `${First}${Result}`> : Result
type ReverseStrDemo = ReverseStr<"hello">

/**
 * 3. 对象类型的递归
 */

type DeepReadonly<Obj extends object> = {
  readonly [key in keyof Obj]: Obj[key] extends object ? DeepReadonly<Obj[key]> : Obj[key]
} 
type obj = {
  a: {
      b: {
          c: {
              f: () => 'dong',
              d: {
                  e: {
                      guang: string
                  }
              }
          }
      }
  }
}
type ObjDemo = DeepReadonly<obj>