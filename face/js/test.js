const myInstanceof1 = (left, right) => {
  // 1. 获取对象的原型
  let proto = Object.getPrototypeOf(left)
  // 2. 获取右侧数据的原型链
  const prototype = right.prototype

  while(true) {
    if (proto == null) {
      return false
    }
    if (proto == prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
}
console.log(myInstanceof1("", String))

function myNew1(context, ...args) {
  let obj = {}
  obj.__proto__ = context.prototype
  let result = context.apply(obj, args)
  return typeof result === "object" ? result : obj;
}
myNew1(() => {}, 1,2,3)

// 