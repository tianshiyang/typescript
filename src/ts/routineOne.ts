/**
 * 套路一、模式匹配做提取
 */

// Demo 模式匹配
type GetValueType<P> = P extends Promise<infer value> ? value : never
type Demo1 = Promise<"abc">
type GetValueResult = GetValueType<Demo1>

/**
 * 1. 数组类型
 */

// Demo1 获取数组中的第一个元素
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never
// 类型参数 Arr 通过 extends 约束为只能是数组类型，数组元素是 unkown 也就是可以是任何值
type first = GetFirst<[1,2,3]>

// Demo2 获取数组中的最后一个元素
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never 
type Last = GetLast<[1,2,3]>

// Demo3 去掉最后一个元素的数组
type PopArr<Arr extends unknown[]> = Arr extends [] ? [] : 
                                        Arr extends [...infer Rest, unknown] ? Rest : never

type arr1 = PopArr<[1,2,3,4]>
// Arr extends []的目的是防止数组为空数组

// Demo4 去掉第一个元素的数组
type ShiftArr<Arr extends unknown[]> = Arr extends [] ? [] :
                                        Arr extends [unknown, ...infer Rest] ? Rest : never
type arr2 = ShiftArr<[1,2,3,4]>


/**
 * 2. 字符串类型
 */

// Demo1 判断字符串是否以某个前缀开头
type StartWith<Str extends string, Prefix extends string> =
  Str extends `${Prefix}${string}` ? true : false
type StringDemo1 = StartWith<"this is StringDemo1", "this"> 

// Demo2 判断字符串是否以某个后缀结尾
type EndWith<Str extends string, Prefix extends string> =
  Str extends `${string}${Prefix}` ? true : false
type StringDemo2 = EndWith<"this is StringDemo2", "StringDemo2"> 

// Demo3 替换字符串AA为BB
type Replace<Str extends string, From extends string, To extends string> = 
  Str extends `${infer Start}${From}${infer End}` ? `${Start}${To}${End}` : Str
type StringDemo3 = Replace<"this is ??", "??", "demo3">

// Demo4 去掉首位空格
type TrimRight<Str extends string> = Str extends `${infer FristStr}${' ' | '\n' | '\t'}` ?
  TrimRight<FristStr> : Str
type TrimLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer FristStr}` ?
  TrimLeft<FristStr> : Str
type Trim<Str extends string> = TrimRight<TrimLeft<Str>>
type StringDemo4 = Trim<"       this is demo4       ">

/**
 * 3. 函数类型
 */

// Demo1 获取参数类型
type GetParameters<Func extends Function> =
  Func extends (...Args: infer Params) => unknown ? Params : never
type FuncDemo1 = GetParameters<(name: string, age: number) => string>

// Demo2 获取返回值类型
type GetReturnType<Func extends Function> =
  Func extends (...arg: unknown[]) => infer Return ? Return : never
  type FuncDemo2 = GetReturnType<(name: string, age: number) => string | number>

/**
 * 4. this
 */
class Teacher {
  name: string
  constructor(name: string) {
    this.name = name
  }
  say(this: Teacher) {
    return "my name is" + this.name
  }
}
const teacher = new Teacher("zhangsan")
type GetThisType<T> = T extends (this: infer This, ...args: unknown[]) => unknown ? This : never
type ThisDemo = GetThisType<typeof teacher.say>

/**
 * 5. 构造器
 */
interface TeacherConstructor {
  new(name: string): Teacher;
}
type GetInstanceType<InstanceType extends new (...arg: unknown[]) => unknown> = 
  InstanceType extends new (...arg: unknown[]) => infer ConstructorType ? ConstructorType : never
type ConstructorDemo = GetInstanceType<TeacherConstructor>


/**
 * 6. 索引类型
 */
type GetNameProps<Props> = "name" extends keyof Props ? 
    Props extends { "name": infer Value | undefined } ? Value : never
  : never

type IndexDemo = GetNameProps<{name: "张三", age: 123}>