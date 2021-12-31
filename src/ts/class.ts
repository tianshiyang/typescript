class Person {
  private _name: string;

  constructor() {
  }

  get fullName() {
    console.log("get")
    return this._name
  }

  set fullName(val: string) {
    console.log("set")
    this._name = val
  }
}

let semlinker = new Person();
console.log(semlinker.fullName = "zahng")
console.log(semlinker.fullName)

// 继承
class Animal {
  name: string;
  
  constructor(theName: string) {
    this.name = theName;
  }
  
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name); // 调用父类的构造函数
  }
  
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
sam.move();

// 抽象类不能被直接实例化，我们只能实例化实现了所有抽象方法的子类。具体如下所示：
abstract class Person2 {
  constructor(public name: string){}

  // 抽象方法
  abstract say(words: string) :void;
}

class Developer extends Person2 {
  constructor(name: string) {
    super(name);
  }
  
  say(words: string): void {
    console.log(`${this.name} says ${words}`);
  }
}

const lolo = new Developer("lolo");
lolo.say("I love ts!"); // lolo says I love ts!



// 类的重载
class ProductService {
  getProducts(): void;
  getProducts(id: number): void;
  getProducts(id?: number) {
    if(typeof id === 'number') {
        console.log(`获取id为 ${id} 的产品信息`);
    } else {
        console.log(`获取所有的产品信息`);
    }  
  }
}

const productService = new ProductService();
productService.getProducts(666); // 获取id为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息 
