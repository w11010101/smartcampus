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
        // 默认样式
        this.el.style.fontSize = 0;
        this.el.style.width = "100%";
        this.el.style.margin = "0";
        this.el.style.backgroundColor = "#fff";
        this.el.style.position = "relative";
        /**
         * [options 默认配置项]
         * @attribute {Object}
         * @attribute {Array}   data                [parame1,parame2, ...]
         * @attribute {Array}   dataTitle           [parame1,parame2, ...]
         * @attribute {Object}  dataStyle           [{css样式书写规略}]
         * @attribute {String}  dataAlign           [edge:靠边;inter:"靠中";默认inter]
         * @attribute {boolean} dataProportion      [true,默认不显示false]
         * @attribute {Object}  otherSeries         [其他数据]
         * @attribute {Object}  otherSeries.type    [类型：目前只有 list、href]
         * @attribute {Object}  otherSeries.data    [自定义类型]
         * 
         */
        this.options = {
            data:[0,0],
            dataTitle:['Q','A'],  // 数据对应标签
            dataStyle:{
                color:" "
            },
            dataAlign: "inter", 
            dataProportion: false,
            otherSeries:{
                show:true,
                type:"list",
            },
        }
        // 重置options (伪深拷贝)
        function* objectEntries() {
          let propKeys = Object.keys(this);
          for (let propKey of propKeys) {
            yield [propKey, this[propKey]];
          }
        }
        this.options[Symbol.iterator] = objectEntries;
        
        var config = Object.assign({},options);

        for(var [key,val] of this.options){
            if(!val.length){
                if(typeof this.options[key] == "object"){
                    for(var j in val){
                        this.options[key] = Object.assign({},this.options[key],options[key])
                    }
                }else{
                    this.options[key] = options[key];
                }                
            }else{
                if(options[key]){
                    this.options[key] = options[key];
                }
            }
        }
        console.log(this.options)
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
            html.push( `<div class="proportion-container">
                      <!-- part-1 -->
                      <div class="proportion-part proportion-part-left">
                        <label>${options.Q_title}</label>
                        ${this.addVal(options,"left")}
                        <div class="proportion-bars-box">
                            ${this.addProportion(this.options,"left")}
                            <div class="proportion-bars"></div>
                        </div>
                      </div>
                      <!-- part-2 -->
                      <div class="proportion-part proportion-part-right">
                        <label>${options.A_title}</label>
                        ${this.addVal(options,"right")}
                        <div class="proportion-bars-box">
                            <div class="proportion-bars"></div>
                            ${this.addProportion(this.options,"right")}
                        </div>
                      </div>
                    </div>`);

            if(options.otherSeries){
                var data = options.otherSeries.data;
                if(options.otherSeries.show){
                    switch (options.otherSeries.type){
                        case "list":
                            html.push(`<!-- info -->
                            <div class="otherSeries proportion-info-container">
                              <ul>
                                <li><span>回答查看率</span><em>${data.viewRate}</em></li>
                                <li><span>回答率</span><em>${data.answerRate}</em></li>
                                <li><span>平均回答时间</span><em>${data.answerTime}</em></li>
                              </ul>
                            </div> `);
                        break;
                        case "btns":
                            html.push(`<!-- info -->
                                <div class="otherSeries proportion-btns">
                                  <button></button>
                                  <button></button>
                                </div> `);
                        break;
                        case "href":
                            html.push(`<!-- info -->
                                <div class="otherSeries proportion-href">
                                  <a href="${options.otherSeries.href[0]}">${options.otherSeries.value[0]}</a>
                                  <a href="${options.otherSeries.href[1]}">${options.otherSeries.value[1]}</a>
                                </div> `);
                        break;
                    }
                }
            }else{
                console.log(false)
            }
            
            box.innerHTML = html.join("");
            this.setDataStyle(options.dataStyle);
            this.setValue(options.Q_val,options.A_val);
            this.setOtherSeriesStyle(options.otherSeries);
            this.setProportionStyle(this.options.dataProportion)
        },
        addVal:function (option,type){
            switch (option.align){
                case "inter":
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
                default:
                    return "";
                break;
            }
        },

        // 设置 bar style
        setValue:function (q,a){
            let leftPart = this.queryDom(this.el,".proportion-part-left"),
                rightPart = this.queryDom(this.el,".proportion-part-right"),
                leftPartWidth = (q/(q+a) * 100).toFixed(2),
                rightPartWidth = 100 - parseFloat(leftPartWidth),
                leftBar = this.queryDom(leftPart,".proportion-bars").parentElement,
                rightBar = this.queryDom(rightPart,".proportion-bars").parentElement;
            
            setTimeout(()=>{

                leftBar.style.width = leftPartWidth+"%";
                rightBar.style.width = rightPartWidth+"%";
                // 如果不存在dataAlign
                if(this.options.dataAlign== "inter"){
                    this.trim(leftBar,rightBar);
                }
            },100);
        },
        // 设置 leftLabel 的css
        setDataStyle:function(style){
            let label = document.querySelectorAll(".proportion-part label");
            for(var j = 0; j<label.length;j++){
                for(let i in style){
                    label[j].style[i] = style[i];
                }
            }
        },
        // 设置 OtherSeries的css
        setOtherSeriesStyle:function(option){
            if(option.show){
                var otherSeries = document.querySelector(".otherSeries");
                // otherSeries.style.
                // console.log(otherSeries)
            }
        },
        // 显示刻度对比数
        addProportion:function (option,type) {
            let proportion = option.dataProportion;
            let sum = option.data[0]+option.data[1];
            let PropNum = ((type == "left"?option.data[0]/sum:option.data[1]/sum)*100).toFixed(2);
            if(proportion){
                return `<div class="proportion-num">${PropNum}%</div>`;
            }
        },
        // 设置对比数的css
        setProportionStyle:function(proportion){
            console.log(proportion)
            if(proportion){
                document.querySelector(".proportion-container").classList.add('proportion-num-show');
            }
            return "";
            return proportion?`width:calc(99% - .5rem)`:"";
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
                leftVal.style.left = LBW/2 - leftValW/2+"px";
            }else{
                leftVal.style.left = parseFloat(leftLabel.offsetWidth) + 10+"px";
            }
            // right
            if (RBW/2-10>rightLabel.offsetWidth) {
                rightVal.style.right = RBW/2 - rightValW/2+"px";
            }else{
                console.log("小")
                rightVal.style.right = parseFloat(rightLabel.offsetWidth) + 10+"px";
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


