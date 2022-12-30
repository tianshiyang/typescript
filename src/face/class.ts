class MyClass {
  public classname = "张三"
  protected age = 15
  private role = "销售"
  static education = "学历"
  constructor(name: string) {
    this.classname = name
  }
  say() {
    console.log("myClass Say")
  }
}

const myClass = new MyClass("new Name")
console.log(myClass.classname)
console.log(MyClass.education)

class ChildClass extends MyClass {
  public childAge
  public childName
  constructor(name: string) {
    super(name)
    this.childName = name
    console.log("child: " + this.childName, "father age =" + this.age)
  }
}
new ChildClass("childClass")