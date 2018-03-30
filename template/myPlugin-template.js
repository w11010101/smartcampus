;(function(global){
    "use strict";
    var myPlugin = function (){
        var that = this;
        // 隐藏属性
        this._abc = 11;
        // 公开属性
        return {
            f1:22*this._abc,
            f2:123,
            fn1:function(){
                console.log(that._abc);
            }
        }
    }
    if(typeof module ==! undefined && module.exports) module.exports = myPlugin;
    if(typeof define === "function") define(function(){return myPlugin});
    global.myPlugin = new myPlugin();
})(this);