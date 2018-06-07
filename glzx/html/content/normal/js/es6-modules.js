var firstName = 'wangchi';
var age = 27;
function myFn(x,y){
    this.run = function(){
        console.log("run")
    }
    return x+y;
}
export {age,myFn};