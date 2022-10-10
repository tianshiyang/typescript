/**
 * 将 "a=1&b=2&c=3"
 * 解析为
 * {
 *    a: "1";
 *    b: "2";
 *    c: "3";
 * }
 */
// 解析键值对字符串
type ParseParams<Str extends string> = Str extends `${infer Key}=${infer Value}` ? {[K in Key]: Value} : {}
type ParseParamsDemo = ParseParams<"a=123">
// 合并多个对象
type MergeParams<Obj1 extends Record<string, any>, Obj2 extends Record<string, any>> = {
  [Key in keyof Obj1 | keyof Obj2]: 
    Key extends keyof Obj1 
      ? Key extends keyof Obj2 
        ? [Obj1[Key], Obj2[Key]] : Obj1[Key]
      : Key extends keyof Obj2 
        ? Obj2[Key] : never 
}
type MergeParamsDemo = MergeParams<{name: "zhangsan", age: 14}, {name: "lisi", sex: "nan"}>
// 字符串键值对解析为对象
type ParseQueryString<Str extends string> = 
  Str extends `${infer First}&${infer Rest}` ? MergeParams<ParseParams<First>, ParseQueryString<Rest>> : ParseParams<Str>
type ParseQueryStringDemo =  ParseQueryString<"a=1&b=2&c=3">

