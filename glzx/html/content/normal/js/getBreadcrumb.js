;(function(){
    /**
     * 根据树形结构，来获取子节点的面包屑路径
     * @param  {tree Array} arr     原始树形结构的arr数据
     * @param  {Number} selectedID  你所要查找到的id
     * @param  {Object} option      相关配置项
     * @return {Array}  arr         返回一个正序数组，如果没有则返回一个空数组
     */
    function getBreadcrumb(arr,selectedID,option){
        'use strict';
        // 默认配置项
        this.option = {
           nodesName:"nodes",   // 默认子节点的集合为nodes
           param:'id'   // 默认根据id属性来查找
        }
        // 修改默认配置项
        for(var item in option){
            this.option[item] = option[item];
        }
        //
        selectedID = typeof selectedID === "string"?parseInt(selectedID):selectedID;
        this.data = arr;    // 原始数据
        this.nodeArr = [];  // 节点数据集合
        this.topID = [];    // 顶层id集合
        for(var j = 0;j<arr.length;j++){
            this.topID.push(arr[j].id);
        }
        // 获取节点父级
        this.getNodeParent = function (arr,selectedID){
            var i = 0;
            var l = arr.length;
            while (i<l){
                
                if(arr[i].id === selectedID){
                    // 如果相同 ，就插入arr，并终止；
                    // this.nodeArr.unshift(arr[i].text);
                    if(this.nodeArr.indexOf(arr[i].text)<0){
                        this.nodeArr.unshift(arr[i].text);
                    }
                    break;
                }else{
                    // 如果不相同 ，就判断子集
                    if(arr[i][this.option.nodesName] && arr[i][this.option.nodesName].length){
                        // 如果有子集
                        var state = this.isParent(arr[i][this.option.nodesName],selectedID);
                        if(state){
                            // 获取当前的父节点，如果在数组里已经存在就不添加
                            if(this.nodeArr.indexOf(arr[i].text)<0){
                                this.nodeArr.unshift(arr[i].text);
                            }
                            // 如果当前不是顶层，则继续调用
                            if(this.topID.indexOf(arr[i].id)<0){
                                this.getNodeParent(this.data,arr[i].id)
                            }
                            break;
                        }else{
                            // 如果没有继续调用
                            this.getNodeParent(arr[i][this.option.nodesName],selectedID);
                        }
                    }
                }

                i++;
            }
            return this.nodeArr;
        }
        // 判断是否是父级节点，返回 boolean
        this.isParent = function (arr,selectedID){
            var i = 0;
            var state;
            while(i<arr.length){
                if(arr[i].id === selectedID){
                    if(this.nodeArr.indexOf(arr[i].text)<0){
                        this.nodeArr.unshift(arr[i].text);
                    }
                    state = true;
                    break;
                }
                i++;
            }
            return state;
        }
        this.init = function(arr,selectedID,option){
            console.log(123)
        }
        return {
            node:this.getNodeParent(arr,selectedID),
            init:this.init
        }
        // return this.getNodeParent(arr,selectedID);
    }

    var breadcrumb = getBreadcrumb;
    if(typeof define === 'function' && define.amd){
        define(function(){
            return getBreadcrumb;
        });
    }else if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = getBreadcrumb;
    }else{
        this.breadcrumb = breadcrumb;
    }

}).call(this || (typeof window !== 'undefined' ? window : global));


