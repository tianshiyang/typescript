// instanceof
const myInstanceof = (left, right) => {
   // 获取对象的原型
   let proto = Object.getPrototypeOf(left)
   // 获取构造函数的 prototype 对象
   let prototype = right.prototype
  
   // 判断构造函数的 prototype 对象是否在对象的原型链上
   while (true) {
     if (!proto) return false
     if (proto === prototype) return true
     // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
     proto = Object.getPrototypeOf(proto)
   }
}
console.log(myInstanceof("", String))

// new
function MyNew() {
  let newObj = null
  let construtor = Array.prototype.shift.call(arguments)
  let result = null

  if (typeof construtor === "function") {
    return
  }

  newObj = Object.create(construtor.prototype)
  result = construtor.apply(newObj, arguments)

  let flag = result && (typeof result === "object" || typeof result === "function");
  // 判断返回结果
  return flag ? result : newObj;
}


// call
// @ts-ignore
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw Error("error")
  }

  context = context || window

  const args = Array.from(arguments).slice(1)
  context.fn = this

  let result = context.fn(...args)
  delete context.fn
  return result
}

const obj = {
  name: "zhangsan",
  fn: function(age) {
    console.log(this.name)
    console.log(age)
  }
}
// @ts-ignore
obj.fn.myCall({name: "lisi"}, 22)

