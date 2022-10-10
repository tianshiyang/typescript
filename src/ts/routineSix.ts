/**
 * 套路六：特殊类型要记清
 */

// Demo1 判断是否是any类型
// 解释：any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any
type IsAny<T> = 1 extends (2 & T) ? true : false 
type IsAnyDemo = IsAny<number>

// Demo2 判断是否全等
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false
type IsEqualDemo = IsEqual<1, any>

// Demo3 判断是否是联合类型
// 原理是让A触发了分布式条件类型，而B没有，A 是单个类型，B 是整个联合类型
type IsUnion<A, B = A> = A extends A ?
    [B] extends [A] ? false : true
  : never
type IsUnionDemo = IsUnion<1 | 2>

// Demo3 判断是否是never类型
type IsNever<T> = [T] extends [never] ? true : false
type IsNeverDemo = IsNever<never>

// Demo4 判断是不是元组类型
type NotEqual<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? false : true;
type IsTuple<T> = T extends [...params: infer Eles]["length"] ? NotEqual<Eles, number> : false
type IsTupleDemo =  IsTuple<[1,2]>

// Demo5 GetOptional 提取可选索引
type GetOptional<Obj extends Record<string, any>> = {
  [k in keyof Obj as {} extends Pick<Obj, k> ? k : never] : Obj[k]
}
type GetOptionalDemo = GetOptional<{name?: "zhangsan", age: 12}>

// Demo6 GetRequired
type isRequired<Key extends keyof Obj, Obj> = {} extends Pick<Obj, Key> ? never : Key
type GetRequired<Obj extends Record<string, any>> = { 
  [Key in keyof Obj as isRequired<Key, Obj>]: Obj[Key] 
}
type GetRequiredDemo = GetRequired<{name?: "zhangsan", age: 12}>

// Demo7 RemoveIndexSignature去除可索引签名
type RemoveIndexSignature<Obj extends Record<string, any>> = {
  [key in keyof Obj as key extends `${infer Str}` ? Str : never]: Obj[key]
}
type RemoveIndexSignatureDemo = RemoveIndexSignature<{
  [key: string]: any,
  sleep: () => number
}>

// Demo8 过滤出class中的public修饰符的属性
class Dong {
  public name: string;
  protected age: number;
  private hobbies: string[];

  constructor() {
    this.name = 'dong';
    this.age = 20;
    this.hobbies = ['sleep', 'eat'];
  }
}
type ClassPublicProps<Obj extends Record<string, any>> = {
  [key in keyof Obj]: Obj[key]
}
type ClassPublicPropsDemo = ClassPublicProps<Dong>

// Demo9 将类型转换为字面量类型
const Obj = {
  name: "zhangsan",
  age: 12
} as const
type ObjDemo1 = typeof Obj

