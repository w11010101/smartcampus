(function(window) {
    // 'use strict';
    /**
     * [Proportion description]
     * @param {[type]} el      [description]
     * @param {[type]} options [description]
     */
    function Proportion(el,options) { 
        if(typeof el !== "object") return false;
        this.el = el||document.querySelector(".proportion-box");
        this.el.style.fontSize = 0;
        this.el.style.width = "80%";
        this.el.style.margin = ".1rem auto 0";
        this.el.style.backgroundColor = "#fff";
        /**
         * [options 默认配置项]
         * @attribute {Object}
         * @attribute {Array}   data                [parame1,parame2, ...]
         * @attribute {Array}   dataTitle           [parame1,parame2, ...]
         * @attribute {Object}  dataStyle           [{css样式书写规略}]
         * @attribute {Object}  otherSeries         [其他数据]
         * @attribute {Object}  otherSeries.type    [类型：如list，btns]
         * @attribute {Object}  otherSeries.data    [自定义类型]
         * 
         */
        this.options = {
            data:[0,0],
            dataTitle:['Q','A'],  // 数据对应标签
            dataStyle:{
                color:""
            },
            otherSeries:{
                type:"list",
                data:{
                    viewRate:"40%",     // 查看率
                    answerRate:"78%",   // 回答率
                    answerTime:"130天",   // 回答时间
                }
            },
        }
        // 重置options
        if(typeof options !== "undefined"){
            for(var i in options){
                this.options[i] = options[i];
            }
        }
        // 创建dom
        this.create();
    }

    Proportion.prototype = {
        create:function(){ 
            var box = this.el;
            let options = {
                Q_val : this.options.data[0],
                A_val : this.options.data[1],
                Q_title : this.options.dataTitle[0],
                A_title : this.options.dataTitle[1],
                align : this.options.dataAlign,
                dataStyle : this.options.dataStyle, 
                otherSeries : this.options.otherSeries
            }

            var html = [];
            html.push( `<div class="clearfix">
                      <!-- part-1 -->
                      <div class="proportion-part proportion-part-left">
                        <label>${options.Q_title}</label>
                        ${this.addVal(options,"left")}
                        ${this.addProportion(this.options,"left")}
                        <div class="proportion-bars"></div>
                      </div>
                      <!-- part-2 -->
                      <div class="proportion-part proportion-part-right">
                        <label>${options.A_title}</label>
                        ${this.addVal(options,"right")}
                        ${this.addProportion(this.options,"right")}
                        <div class="proportion-bars"></div>
                      </div>
                    </div>`);

            if(options.otherSeries){
                var data = options.otherSeries.data;
                switch (options.otherSeries.type){
                    case "list":
                        html.push(`<!-- info -->
                        <div class="proportion-info-container">
                          <ul>
                            <li><span>回答查看率</span><em>${data.viewRate}</em></li>
                            <li><span>回答率</span><em>${data.answerRate}</em></li>
                            <li><span>平均回答时间</span><em>${data.answerTime}</em></li>
                          </ul>
                        </div> `);
                    break;
                    case "btns":
                        html.push(`<!-- info -->
                            <div class="proportion-btns">
                              <button></button>
                              <button></button>
                            </div> `);
                    break;
                    case "href":
                        html.push(`<!-- info -->
                            <div class="proportion-href">
                              <a href="${options.otherSeries.href[0]}">${options.otherSeries.value[0]}</a>
                              <a href="${options.otherSeries.href[1]}">${options.otherSeries.value[1]}</a>
                            </div> `);
                    break;
                }
            }else{
                console.log(false)
            }
            
            box.innerHTML = html.join("");
            this.setDataStyle(options.dataStyle);
            this.setValue(options.Q_val,options.A_val);
        },
        addVal:function (option,type){
            switch (option.align){
                case "inter":
                    return "";
                break;
                default:
                    if(type == "left"){
                        return `<div class="bars-value-container">
                          <span class="bars-value">${option.Q_val}</span>
                        </div>`;
                    }else{
                        return `<div class="bars-value-container">
                          <span class="bars-value">${option.A_val}</span>
                        </div>`;
                    }
                break;
            }
        },
        // 显示刻度对比数
        addProportion:function (option,type) {
            let proportion = option['dataProportion'] || false;
            console.log(proportion);
            if(proportion){
                return ""
            }
        },
        // 设置style
        setValue:function (q,a){
            let leftPart = this.queryDom(this.el,".proportion-part-left"),
                rightPart = this.queryDom(this.el,".proportion-part-right"),
                leftPartWidth = (q/(q+a) * 100).toFixed(2),
                rightPartWidth = 98 - parseFloat(leftPartWidth),
                leftBar = this.queryDom(leftPart,".proportion-bars"),
                rightBar = this.queryDom(rightPart,".proportion-bars");
            
            setTimeout(()=>{

                leftBar.style.width = leftPartWidth+"%";
                rightBar.style.width = rightPartWidth+"%";
                // 如果不存在dataAlign
                if(!this.options["dataAlign"]){
                    this.trim(leftBar,rightBar);
                }
            },100);
        },
        setDataStyle:function(style){
            let label = document.querySelectorAll(".proportion-part label");
            for(var j = 0; j<label.length;j++){
                for(let i in style){
                    label[j].style[i] = style[i];
                }
            }
        },
        createDom:function(tag){
            return document.createElement(tag);
        },
        queryDom:function(parent,name){
            let doc = typeof arguments[0] === "object" ? arguments[0] : document;
            let docName = typeof arguments[0] === "string" ? arguments[0] : name;
            return doc.querySelector(docName);
        },
        // 微调css
        trim:function(left,right){
            var W = document.querySelector(".proportion-part").offsetWidth;
            let LP = parseFloat(left.style.width.substr(0,left.style.width.length - 2));
            // left     ------------------
            let leftVal = this.queryDom(left.parentElement,".bars-value-container");
            let leftValW = this.queryDom(leftVal,".bars-value").offsetWidth;
            let leftLabel = this.queryDom(left.parentElement,"label");
            let leftBar = this.queryDom(left.parentElement,".proportion-bars");
            let LBW = W * LP / 100;
            // right    ------------------
            let rightVal = this.queryDom(right.parentElement,".bars-value-container");
            let rightValW = this.queryDom(rightVal,".bars-value").offsetWidth;
            let rightLabel = this.queryDom(right.parentElement,"label");
            let rightBar = this.queryDom(right.parentElement,".proportion-bars");
            let RBW = W - LBW;
            // left
            if (LBW/2-10>leftLabel.offsetWidth) {
                leftVal.style.left = LBW/2-leftValW/2+"px";
            }else{
                leftVal.style.left = parseFloat(leftLabel.offsetWidth) + 10+"px";
            }
            // right
            if (RBW/2-10>rightLabel.offsetWidth) {
                rightVal.style.right = RBW/2+rightValW/2+"px";
            }else{
                rightVal.style.right = parseFloat(rightLabel.offsetWidth) + 15+rightValW/2+"px";
            }
        }
    }
    
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Proportion;
    } else if ( typeof define == 'function' && define.amd ) {
            define( function () { return Proportion; } );
    } else {
        window.Proportion = Proportion;

    }

})(this);


