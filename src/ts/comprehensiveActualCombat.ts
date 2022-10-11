// KebabCaseToCamelCase

/**
 * Demo1
 *  将 this-is-demo1 转换为 thisIsDemo1
 */
type KebabCaseToCamelCase<Str extends string> = 
  Str extends `${infer First}-${infer Rest}` ? `${First}${KebabCaseToCamelCase<Capitalize<Rest>>}` : Str
type KebabCaseToCamelCaseDemo = KebabCaseToCamelCase<"this-is-demo1">

/**
 * Demo2
 *  将 thisIsDemo1 转换为 this-is-demo1
 */
type CamelCaseToKebabCase<Str extends string> =
  Str extends `${infer First}${infer Rest}` 
    ? First extends Lowercase<First>
      ? `${First}${CamelCaseToKebabCase<Rest>}` : `-${Lowercase<First>}${CamelCaseToKebabCase<Rest>}`
    : Str
type CamelCaseToKebabCaseDemo = CamelCaseToKebabCase<"thisIsDemo1">

/**
 * Demo3 
 *  type Chunk<Arr, number> 将数组每number个分为一组
 *  例 Chunk<[1,2,3,4,5], 2> => [[1, 2], [3, 4], 5]
 */
type Chunk<Arr extends unknown[], Num extends number, CurItem extends unknown[] = [], Result extends unknown[] = []> = 
  Arr extends [infer First, ...infer Rest] 
    ? CurItem["length"] extends Num
      ? Chunk<Rest, Num, [First], [...Result, CurItem]> : Chunk<Rest, Num, [...CurItem, First], Result>
    : [...Result, CurItem]

type ChunkDemo = Chunk<[1,2,3,4,5], 2>

/**
 * Demo4 TupleToNestedObject 数组转嵌套对象
 */
type TupleToNestedObject<Arr extends unknown[], Value> = 
  Arr extends [infer First, ...infer Rest] 
    ? {[key in First as key extends keyof any ? key : never]: TupleToNestedObject<Rest, Value>}
    : Value
type TupleToNestedObjectDemo = TupleToNestedObject<["name", "age", "hobby"], "what">
type TupleToNestedObjectDemo1 = TupleToNestedObject<["name", number, "hobby"], "what">
type TupleToNestedObjectDemo2 = TupleToNestedObject<["name", undefined, "hobby"], "what">

/**
 * Demo5 PartialObjectPropByKeys 除传递的类型变为可选
 */
type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]:Obj[Key]
}
// Partial
type PartialObjectPropByKeys<Obj extends Record<string, any>,Key extends keyof any = keyof Obj> = 
  Copy<Partial<Pick<Obj,Extract<keyof Obj, Key>>> & Omit<Obj,Key>>;

type PartialObjectPropByKeysDemo = PartialObjectPropByKeys<{name: "zhangsan", age: 13, sex: "nan"}, "name" | "age">
  