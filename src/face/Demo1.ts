
// 创建定长数组
type CreateArray1<T extends number, P extends unknown[] = []> = P["length"] extends T ? P : CreateArray1<T, [...P, unknown]> 
type TestNumber = CreateArray1<3>

// Demo1 toNumber 
type toNumber<T extends string, arr extends unknown[] = []> = T extends `${arr["length"]}` ? arr["length"] : toNumber<T, [...arr, unknown]>
type TestToNumber = toNumber<"40">

// 判断是不是any
type IsAny1<T> = 0 extends (T & 1) ? true : false

// Filter 过滤指定类型
type MyFilter<T extends unknown[], SelfType, Result extends unknown[] = []> =
 T extends [infer First, ...infer Last] ?
  First extends SelfType ?
    MyFilter<Last, SelfType, [...Result, First]>
    : MyFilter<Last, SelfType, [...Result]>
  : Result
type A = MyFilter<[1,'BFE', 2, true, 'dev'], string> 

// TupleToString
type TupleToString<T extends unknown[] = []> = 
  T extends [infer First, ...infer Last] ? `${First & string}${TupleToString<Last>}` : ""
type B = TupleToString<['B', 'F', 'E']>

// RepeatString
type RepeatString<T extends string, P extends number, Result extends string = "", Count extends unknown[] = []> = 
  Count["length"] extends P ? Result : RepeatString<T, P,  `${Result}${T}`, [...Count, unknown]>
type C = RepeatString<"a", 0>

// Flat 扁平化
type Flat<T extends unknown[], Result extends unknown[] = []> = 
  T extends [infer First, ...infer Last] ? 
    First extends unknown[] ?
      Flat<[...First, ...Last], Result> : Flat<Last, [...Result, First]>
    : Result
type D = Flat<[1,[2,3], [4,[5,[6]]]]>

// Shift
type Shift<T extends unknown[]> = T extends [infer First, ...infer Last] ? Last : []
type E = Shift<[]>

// ReverseTuple
type ReverseTuple<T extends unknown[], Result extends unknown[] = []> = T extends [infer First, ...infer Last] ? ReverseTuple<Last, [...Result, First]> : Result
type F = ReverseTuple<[string, number, boolean]>

// LengthOfString
type LengthOfString<T extends string, Result extends unknown[] = []> = T extends `${infer First}${infer Last}` ? LengthOfString<Last, [...Result, First]> : Result["length"]
type G = LengthOfString<'BFE.dev'> // 7

// Pick ********
type Foo = {
  a: string
  b: number
  c: boolean
}
type MyPick<T extends Object, P extends keyof T> = {
  [K in P]: T[K]
}
type H = MyPick<Foo, 'a' | 'b'>

// Record *************
type MyRecord<T extends string | number | symbol, P extends unknown> = {
  [K in T]: P
}
type Key = 'a' | 'b' | 'c'
const I: MyRecord<Key, string> = {
  a: "",
  b: "",
  c: ""
}

// Exclude
type MyExclude1<T, P> = T extends P ? never : T
type J = MyExclude1<"a" | "b" | "c", 'c' | 'd'> 

// Omit
type MyOmit<T extends Object, P extends keyof T> = {
  [K in MyExclude1<keyof T, P>]: T[K]
}
type K = MyOmit<Foo, 'a' | 'b'>