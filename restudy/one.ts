// 套路1: 模式匹配做提取

// demo1 获取Promise<"abc">中的范型参数
type MyPromise = Promise<"abc">
type GetPromiseValue<T> = T extends Promise<infer value> ? value : never
type Demo1Result = GetPromiseValue<MyPromise>

// Demo2 获取数组中的第一个元素
type GetFirstArray<T extends unknown[]> = T extends [infer first, ...infer last] ? first : never
type Demo2Result = GetFirstArray<[1, 2, 3]>

// Demo3 判断字符串是否以某个元素开头
type StrStartWith<T extends string, prefix extends string> = T extends `${prefix}${infer last}` ? 
  true : false
type Demo3Result =  StrStartWith<"abc", "a">


// Deom4 替换字符串中的AA为BB
type StrReplace<T extends string, str1 extends string, str2 extends string> = 
  T extends `${infer first}${str1}${infer end}` ? `${first}${str2}${end}` : never
type Demo4Result = StrReplace<"AAcccccc", "AA", "BB">

// Demo5 去除开头空格
type DeleteSpace<T extends string> = T extends `${' '}${infer last}` ? DeleteSpace<last> : T
type Demo5Result = DeleteSpace<"  123">

// Demo6 获取函数返回值
type MyGetReturnType<T extends Function> = T extends () => infer result ? result : void
type Demo6Result = MyGetReturnType<() => number>

// Demo7 获取函数参数 ***************************************************
type MyGetParams<T extends Function> = T extends (...args: infer params) => any ? params : void
type Demo7Result = MyGetParams<(name: string, age: number) => void>