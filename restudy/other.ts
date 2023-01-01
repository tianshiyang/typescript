// 解析字符串
/**
 * 将 "a=1&b=2&c=3"
 * 解析为
 * {
 *    a: "1";
 *    b: "2";
 *    c: "3";
 * }
 */
type MyParseParams<T extends string> = T extends `${infer Key}=${infer Value}` ? {[k in Key]: Value} : {}
type Test1 = MyParseParams<"a=1">

type MyMergeParams<T extends Object, P extends Object> = {
  [K in keyof T | keyof P]: 
    K extends keyof T ? T[K] : 
      K extends keyof P ? P[K] : never
}
type Test2 = MyMergeParams<{name: 1}, {age: 2}>

type Parse<T extends string> = T extends `${infer First}&${infer Last}` ? MyMergeParams<MyParseParams<First>, Parse<Last>> : MyParseParams<T>
type Test3 = Parse<"a=1&b=2&c=3">

/**
 * 柯里化
 * const func = (a: string, b: number, c: boolean) => object;
 * 转换为
 * (a: string) => (b: number) => (c: boolean) => object
 */

type ReturnFun<T extends unknown[], ReturnType> = T extends [infer First, ...infer Last] ? (arg: First) => ReturnFun<Last, ReturnType> : ReturnType
type KeLi<T extends Function> = T extends (...Arg: infer Params) => infer ReturnType ? ReturnFun<Params, ReturnType> : never
type Test4 = KeLi<(a: string, b: number, c: boolean) => Number>

  