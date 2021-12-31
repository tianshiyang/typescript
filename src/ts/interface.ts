// 可选参数。其他任意类型
interface Person1 {
  name: string,
  age?: number,
  [propName: string]: any
}
const p1: Person1 = {name: "张三", sex: 15, hobbly: "say"}

// 一个接口被定义多次，会被合并为单个接口
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };