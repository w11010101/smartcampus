/**
 * form.html 和 checkboxs.html 表单中，普通多选 和 层级多选的封装
 * @author wangchi
 * @DateTime 2018-5-30
 * @requires {function} jQuery.min.js
 * @param  {function} $         jQuery
 * @param  {object} win         window
 * @param  {object} doc         document
 * @param  {object} undefined   undefined
 * @return {object}           
 */
;(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // export {factory};
        // Browser globals
        factory(jQuery);
    }
}(function($){
    'use strict';
    // 
    function SelectCheckbox(el,option){
        this.default = {
            ele:".checkbox-inline",
            selectType:"onSelect",
            onclickCB:"",
        }
        this.option = $.extend({},this.default,option);
        this.name = "wangchi";
        this.config(el);
    }
    // 配置
    SelectCheckbox.prototype.config = function(el){
        if($(el).hasClass("level-checkbox") && this.option.selectType == 'levelSelect'){
            // levelSelect
            this[this.option.selectType]($('.checkbox-btns>label'+this.option.ele,el),$('label+.checkbox-childs '+this.option.ele,el),this.option.onclickCB);
        }else if(this.option.selectType == 'onSelect'){
            // onSelect
            this[this.option.selectType]($(this.option.ele,el),this.option.onclickCB);
        }else{
            // ardio select
            this[this.option.selectType]($(this.option.ele,el));
        }
    }
    // 普通选择多选
    SelectCheckbox.prototype.onSelect = function(el,callback){
        var _this = this;
        $(el).on("click",function(event){
            if(!$(this).hasClass("disabled") && !$(this).hasClass("default")){
                $(this).toggleClass("active");
            }
            callback?callback(_this.callback(el)):{};
        });
        // return $(el);
    }

    // 层级选择多选
    SelectCheckbox.prototype.levelSelect = function(labelEle,childEle,callback){  
        var _this = this;      
        // 父级
        $(labelEle).on("click",function(){
            if(!$(this).hasClass("disabled")){
                $(this).toggleClass("active");
            }
            if($(labelEle).hasClass("active")){
                $(childEle).not('.disabled,.default').addClass("active");
            }else{
                $(childEle).not('.disabled,.default').removeClass("active");
            }
            
        });
        // 子级
        
        this.onSelect(childEle,function(items){
            if(items.length == $(childEle).not(".disabled").length){
                $(labelEle).addClass("active");
            }else{
                if($(labelEle).hasClass("active")){
                    $(labelEle).removeClass("active");
                }
            }
            callback?callback(_this.callback(childEle)):{};
        }); 
    }
    // callback
    SelectCheckbox.prototype.callback = function(el){
        var arr = $.map(el,function(e,i){
            if($(e).hasClass("active")){
                return $(e);
            }
        });
        return arr;
    }
    // 普通选择单选
    SelectCheckbox.prototype.onRadioSelect = function(el){
        // 单选
        $(el).on("click",function(){
            if(!$(this).hasClass("active") && !$(this).hasClass("disabled")){
                $(this).addClass("active").siblings().removeClass("active");    
            }
        });
    }
    // 
    console.log($)
    $.fn.selectCheckbox = function(option){

        var selectCheckbox = new SelectCheckbox(this,option);
        
        return $(this);
    }
}));

