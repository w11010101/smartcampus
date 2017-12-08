(function(window) {
    // 'use strict';
    function Proportion(el,options) { 
        if(typeof el !== "object") return false;
        this.el = el||document.querySelector(".proportion-box");
        this.el.style.fontSize = 0;
        this.el.style.width = "80%";
        this.el.style.margin = ".1rem auto 0";
        // this.el.style.backgroundColor = "#456789";
        this.options = {
            // data:[
            //     {
            //         value:0,
            //         style:{
            //             color:"#73d2fe",
            //             backgorund:"#73d2fe"
            //         }
            //     },
            //     {
            //         value:0,
            //         style:{
            //             color:"#ff5408",
            //             backgorund:"#ff5408"
            //         }
            //     }
            // ],
            data:[0,0],
            viewRate:"50%",     // 查看率
            answerRate:"50%",   // 回答率
            answerTime:"3天",   // 回答时间
        }

        if(typeof options !== "undefined"){
            for(var i in options){
                this.options[i] = options[i];
            }
        }
        
        this.create();
    }

    Proportion.prototype = {
        create:function(){ 
            var box = this.el;
            // let Q_val = this.options.data[0].value,
            //     A_val = this.options.data[1].value;
            let Q_val = this.options.data[0],
                A_val = this.options.data[1],
                viewRate = this.options.viewRate,
                answerRate = this.options.answerRate,
                answerTime = this.options.answerTime;

            box.innerHTML = `<div class="clearfix">
                              <!-- part-1 -->
                              <div class="proportion-part proportion-part-left">
                                <label>Q</label>
                                <div class="bars-value-container">
                                  <span class="bars-value">${Q_val}</span>
                                </div>
                                <div class="proportion-bars"></div>
                              </div>
                              <!-- part-2 -->
                              <div class="proportion-part proportion-part-right">
                                <label>A</label>
                                <div class="bars-value-container">
                                  <span class="bars-value">${A_val}</span>
                                </div>
                                <div class="proportion-bars"></div>
                              </div>
                            </div>
                            <!-- info -->
                            <div class="proportion-info-container">
                              <ul>
                                <li><span>回答查看率</span><em>${viewRate}</em></li>
                                <li><span>回答率</span><em>${answerRate}</em></li>
                                <li><span>平均回答时间</span><em>${answerTime}</em></li>
                              </ul>
                            </div>`;
            this.setStyle(Q_val,A_val);
        },
        // 设置style
        setStyle:function (q,a){
            let leftPart = this.queryDom(this.el,".proportion-part-left"),
                rightPart = this.queryDom(this.el,".proportion-part-right"),
                leftPartWidth = (q/(q+a) * 100).toFixed(2),
                rightPartWidth = 100 - parseFloat(leftPartWidth),
                leftBar = this.queryDom(leftPart,".proportion-bars"),
                rightBar = this.queryDom(rightPart,".proportion-bars");
            
            setTimeout(()=>{
                leftPart.style.width = leftPartWidth + "%";
                rightPart.style.width = rightPartWidth + "%";
                leftBar.style.width = rightBar.style.width =  "98%";
                this.trim(leftPart,rightPart);
            },100);
        },
        createDom:function(tag){
            return document.createElement(tag);
        },
        queryDom:function(parent,name){
            let doc = typeof arguments[0] === "object" ? arguments[0] : document;
            let docName = typeof arguments[0] === "string" ? arguments[0] : name;
            // let re = /^\./;
            // console.log(re.test(docName))
            return doc.querySelector(docName);
        },
        // 微调css
        trim:function(left,right){
            
            let leftVal = this.queryDom(left,".bars-value");
            let rightVal = this.queryDom(right,".bars-value");

            let leftW = parseInt(left.style.width.substr(0,left.style.width.length-1));
            let rightW = parseInt(right.style.width.substr(0,right.style.width.length-1));

            if(leftW < 25 ){
                // leftVal.parentElement.style.left = 0;
                // leftVal.style.position = "fixed";
                // leftVal.style.right = "auto"; 
                // leftVal.style.left = `calc(10% + .2rem )`;
                // leftVal.style.left = `calc(100% - ${leftW/2}px)`;
            }
            if(rightW < 25 ){
                rightVal.parentElement.style.left = "auto";
                rightVal.parentElement.style.right = 0;
                rightVal.style.right = `.2rem`;
                rightVal.style.left = `auto`;
                // rightVal.style.left = `calc(-50% - .14rem)` ;
                // rightVal.parentElement.style.left = "-100%";
                // rightVal.style.left = `0`;
                // 
                // rightVal.style.position = "fixed";
                // rightVal.style.left = "auto"; 
                // rightVal.style.right = `calc(10% + .4rem )`;
                // rightVal.style.left = `calc(-100% + ${rightW/2}px)`;
            }
        }
        // addClass:function(dom,className){
        //     // dom.classNmae = className;
        //     return dom;
        // },
        // remove:function (){
        // }
    }
    // Proportion.run = function (el,options){
    //     return new Proportion(el,options);
    // }
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Proportion;
    } else if ( typeof define == 'function' && define.amd ) {
            define( function () { return Proportion; } );
    } else {
        window.Proportion = Proportion;

    }

})(this);


