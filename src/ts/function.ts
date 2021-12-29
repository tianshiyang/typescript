// 函数类型
let IdGenerator: (chars: string, nums: number) => string
function createUserId(name: string, id: number): string {
  return name + id
}
IdGenerator = createUserId

// 剩余参数
function push(array, ...items: Array<number>) {
  items.forEach(res => {
    array.push(res)
  })
  console.log(array)
}

push([1], 2, 3)


// 函数重载
// TypeScript 编译器处理函数重载时，
// 它会查找重载列表，尝试使用第一个重载定义
// 如果匹配的话就使用这个
// 因此，在定义重载的时候，一定要把最精确的定义放在最前面

// demo1
type Combinable = string | number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

// demo2
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
    return a + b;
  }
}
