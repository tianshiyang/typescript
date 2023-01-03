// 递归复用做循环

// Demo1 获取Promise类型
type GetPromiseType<T> = T extends Promise<infer typeValue> ? GetPromiseType<typeValue> : T
type Demo21Result = GetPromiseType<Promise<Promise<Promise<Record<string, number>>>>>

// Demo2 反转数组 **********************
type ReverseArrDemo2<T extends unknown[]> = 
  T extends [...infer First, infer Last] ? [Last, ...ReverseArrDemo2<First>] : []
type Demo32Result = ReverseArrDemo2<[1,2,3,4]>

// Demo3 查找数组中的某个元素
type MyIncludes<T extends unknown[], P> = 
  T extends [infer First, ...infer Last] ? First extends P ? true : MyIncludes<Last, P> : false
type Demo33Result = MyIncludes<[1,2,3,4], 4>

// Demo4 移除指定元素
type MyRemoveItem<T extends unknown[], P> = 
  T extends [infer First, ...infer Last] ?
    First extends P ? 
      [...MyRemoveItem<[...Last], P>] : [First, ...MyRemoveItem<[...Last], P>]
  : []
type Deme34Result = MyRemoveItem<[1,2,3,2], 3>

// Demo5 创建指定长度数组
type CreateArr<T extends number, P, Arr extends P[] = []> =
  T extends Arr["length"] ? Arr : CreateArr<T, P, [...Arr, P]>
type Demo35Result = CreateArr<2, number>

// Demo6 ReplaceAll替换字符串
type MyReplaceAll<Str1 extends string, Str2 extends string, Str3 extends string> =
  Str1 extends `${infer First}${Str2}${infer End}` ? MyReplaceAll<`${First}${Str3}${End}`, Str2, Str3> : Str1
type Demo36Result = MyReplaceAll<"this ?? is ??", "??", "demo">

// Demo7 每个字符串后插入字符
type InsertChat<Str1 extends string, Str2 extends string> = 
  Str1 extends `${infer First}${infer Last}` ? `${First}${Str2}${InsertChat<Last, Str2>}` : Str1
type Demo37Result = InsertChat<"abcd", "-">