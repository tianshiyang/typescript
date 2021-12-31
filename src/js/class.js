var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person() {
    }
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            console.log("get");
            return this._name;
        },
        set: function (val) {
            console.log("set");
            this._name = val;
        },
        enumerable: false,
        configurable: true
    });
    return Person;
}());
var semlinker = new Person();
console.log(semlinker.fullName = "zahng");
console.log(semlinker.fullName);
// 继承
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering...");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var sam = new Snake("Sammy the Python");
sam.move();
// 抽象类不能被直接实例化，我们只能实例化实现了所有抽象方法的子类。具体如下所示：
var Person2 = /** @class */ (function () {
    function Person2(name) {
        this.name = name;
    }
    return Person2;
}());
var Developer = /** @class */ (function (_super) {
    __extends(Developer, _super);
    function Developer(name) {
        return _super.call(this, name) || this;
    }
    Developer.prototype.say = function (words) {
        console.log(this.name + " says " + words);
    };
    return Developer;
}(Person2));
var lolo = new Developer("lolo");
lolo.say("I love ts!"); // lolo says I love ts!
// 类的重载
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.getProducts = function (id) {
        if (typeof id === 'number') {
            console.log("\u83B7\u53D6id\u4E3A " + id + " \u7684\u4EA7\u54C1\u4FE1\u606F");
        }
        else {
            console.log("\u83B7\u53D6\u6240\u6709\u7684\u4EA7\u54C1\u4FE1\u606F");
        }
    };
    return ProductService;
}());
var productService = new ProductService();
productService.getProducts(666); // 获取id为 666 的产品信息
productService.getProducts(); // 获取所有的产品信息 
