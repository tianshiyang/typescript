type Name = { name: string }
type Age = { age: number }
type Union = Name | Age

type UnionKey<P> = P extends infer P ? keyof P : never
type keys = UnionKey<Union>

let a: unknown
let b: any
let c: string
a = b
b = a
c = a as string
c = b