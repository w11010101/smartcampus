;(function(global){
    "use strict";
    var myPlugin = function (options){

        this.options = {
            name:"Wang Chi",
            age:28,
            job:"web"
        }

        for(var i in options){
            this.options[i] = options[i]
        }
        // 隐藏属性
        this._setName = this._say();
        // 公开属性
        return {
            name:this.options.name,
            init:this._init
        }
    }
    myPlugin.prototype = {
        _init:function(){
            console.log("my name is",this.name);
        },
        _say:function(){
            console.log("私有方法 _say ");
        }
    }

    if(typeof module ==! undefined && module.exports) module.exports = myPlugin;
    if(typeof define === "function") define(function(){return myPlugin});

    global.myPlugin = myPlugin;

})(this);

var my_plugin = new myPlugin({
    name:"super man",
    age:18
});

console.log(my_plugin);
my_plugin.init("abc");
// my_plugin._init()
// my_plugin._say()
// ================= MDN 面向对象的 举例 =================


// function Person(firsName){
//     this.firsName = firsName;
//     // console.log('Person instantiated');
// }
// Person.prototype.walk = function(){
//     console.log("I am walking!");
// }
// Person.prototype.sayHello = function(){
//     console.log("hello ,I'm ",this.firsName);
// }

// function Student(firsName,subject){
//     Person.call(this,firsName);
//     this.subject = subject;
// }
// // 继承方法一
// // Student.prototype = Object.create(Person.prototype);
// // 继承方法二
// function createObject(proto){
//     function ctor(){}
//     ctor.prototype = proto;
//     return new ctor();
// }
// Student.prototype = createObject(Person.prototype);
// // 
// Student.prototype.constructor = Student;
// Student.prototype.sayHello = function(){
//     console.log("hello ,I'm ",this.firsName , ". I'm studying ",this.subject)
// }
// Student.prototype.sayGoodBye = function(){
//     console.log("Goodbye!");
// }

// var student1 = new Student("Janet","Applied Physics");
// console.log(student1);
// student1.sayHello();
// student1.walk();
// student1.sayGoodBye();


// var person1 = new Person('name1');
// var person2 = new Person('name2');

// // console.log('person1 is ', person1.firsName);
// // console.log('person2 is ', person2.firsName);

// person1.sayHello();
// person2.sayHello();
// ================= end =================