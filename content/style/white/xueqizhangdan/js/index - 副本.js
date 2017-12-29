// $(function() {

var EchartsObj = [];
var echartOption = {}

// echartOption = {
//     el:document.querySelector(".smart-bubble-chart"),
//     type:"graph",
//     data:["美食\n60%","水费","运动","图书馆","网费","转账","其他"],
//     dataShow:true,
//     val:[800,600,500,400,300,200,100],
//     // repulsion:100,
// }
// // Echarts.run 生成图表
// EchartsObj.push(Echarts.run(echartOption));

// 单屏滚动 onepage_scroll  

/**
 * [onepageScroll 单屏滚动]
 * @param  {[Object]}   data        [ajax 请求成功后的data，不需要data.data]
 * @param  {[Array]}    arrObj      [ajax 请求成功后所有版块的键值的集合]
 * @return {[type]}         [description]
 */

function onepageScroll(newData){
    // fullpage生成滑动
    
    $('.smart-content').fullpage({
        afterLoad:function(anchorLink,index){

            // afterLoad 滑动后回调
            console.log(`当前是第${index}页`);
            var thisPage = $(".smart-parts").eq(index-1);
            var pageType = thisPage.attr("pagetype");
            console.log(newData[pageType]);

            // $(".smart-parts").eq(index-1).find("h1");

            switch (pageType){
                case 'oneCard-consume':

                break;
                case 'oneCard-maxConsume':
                    // thisPage.find('em').text(newData[pageType].name);
                break;
                case 'oneCard-maxPlace':
                    // thisPage.find('p').text(newData[pageType].meccName);
                    
                break;
                case 'oneCard-trancOut':
                
                break;
                case 'oneCard-trancIn':

                break;
                case 'oneCard-collegeBills':

                break;
                case 'library':

                break;
                case 'run':

                break;
                case 'attend':

                break;
                case 'evaluates':

                break;
            }
            settotalNum(newData[pageType].totalNum);
            function settotalNum(totalNum){
                $(".totalNum").text(totalNum);

            }
            // console.log(arguments)
            // if(index == 1){
            
            // }else if(index == 8){
            //     echartOption = {
            //         el:document.querySelector(".smart-bubble-chart-1"),
            //         type:"graph",
            //         data:["张三","李四","王五",],
            //         dataShow:false,
            //         val:[800,600,500],
            //         head:['photo1.png','photo2.png','photo3.png','photo1.png','photo2.png'],
            //         headShow:true,  
            //         headSize:true,
            //         repulsion:600,
            //     }
            //     // Echarts.run 生成图表
            //     EchartsObj.push(Echarts.run(echartOption));
            //  }else if(index == 11){
            //     var setVal = [
            //             {value:0},
            //             {value:500},
            //             {value:600},
            //             {value:700},
            //             {value:800}
            //         ]
            //     setVal.push(activeLineEchartLabel({
            //         name:"船舶工程学舶工程学院船舶工程学舶工程学院舶工程学院",
            //         val:1000
            //     }));
            //     EchartsObj.push(Echarts.run({
            //         el: document.querySelector(".Echart-line-1"),
            //         type:"line", 
            //         data:setVal
            //     }));
            //     // $(".Echart-line-1").css("margin-top","100px");
            // }else if(index == 12){
            //     var setVal = [
            //             {value:0},
            //             {value:200},
            //             {value:400},
            //             {value:600},
            //             {value:800}
            //         ]
            //     setVal.push(activeLineEchartLabel({
            //         name:"船舶工程学院船舶工程学院",
            //         val:1000
            //     }));
            //     EchartsObj.push(Echarts.run({
            //         el: document.querySelector(".Echart-line-2"),
            //         type:"line",
            //         data:setVal
            //     }));
            //     // $(".Echart-line-2").css("margin-top","100px");
            // }else if(index == 21){
            //     EchartsObj.push(Echarts.run({
            //         el: document.querySelector(".Echart-pie-1"),
            //         type:"pie",
            //         name:["点名","网络签到"],
            //         value:[111,200]
            //     }));
            // }else if(index == 22){
            //     EchartsObj.push(Echarts.run({
            //         el: document.querySelector(".Echart-pie-2"),
            //         type:"pie",
            //         name:["点名","网络签到"],
            //         value:[321,2000]
            //     }));
            // }
        }
    });
}
// 主要结构
function getMainHtml(myarr,objs){
    let dom = [];
    for(var i of myarr){
        if(objs[i]){
            dom.push( `<div class="smart-parts section " pageType=${i}>
                        <div class="qutou_temp">
                            <div class="bg">
                                <span class="tl"></span>
                                <span class="tr"></span>
                                <span class="bl"></span>
                                <span class="br"></span>
                            </div>
                            <div class="bg_line"></div>
                            <div class="arr"></div>
                            <h1></h1>
                            <p>当前是第${i}屏</p>
                            <p class='totalNum'></p>
                        </div>
                    </div>`);
        }
    }
    return dom;
}

// 其他结构
function otherHtml(type,option){
    // option = {
    //   name:"Dear本学期的校园宝藏如下～"  ,
        // head:"Dear本学期的校园宝藏如下～"
    // }
    // 
    switch(type){
        case "type1":
            return `<div class="none">
                    <div class="key-1"></div>
                    <div class="cloudy cloudy1"></div>
                    <div class="cloudy cloudy2"></div>
                    <div class="page_bt"></div>
                    <h1>${option.head}</h1>
                    <div class="king_think king_sad ${option.class}"></div>
                    <div class="summed">
                        <h2><i class="rhombus"></i>我的本学期总支出<i class="rhombus"></i></h2>
                        <p class="p1"><em>0</em><span>元</span></p>
                    </div>
                    <div class="no-tip">Oh My God</div>
                    <h3 class="no-shu">我太穷了，生成帐单失败。</h3>
                    <div class="terrible-male"></div>
                    <div class="comfirm-tip-1"></div>
                    <div class="confirm-btn-1">朕要召告天下</div>
                </div>`
        break;
        case "type2":
            return `<div class="none">
                    <div class="key-1"></div>
                    <div class="cloudy cloudy1"></div>
                    <div class="cloudy cloudy2"></div>
                    <div class="page_bt"></div>
                    <h1>Dear本学期的校园宝藏如下～</h1>
                    <div class="king_think king_sad"></div>
                    <div class="summed">
                        <h2><i class="rhombus"></i>我的本学期总支出<i class="rhombus"></i></h2>
                        <p class="p1"><em>0</em><span>元</span></p>
                    </div>
                    <div class="no-tip">Oh My God</div>
                    <h3 class="no-shu">我太穷了，生成帐单失败。</h3>
                    <div class="terrible-male"></div>
                    <div class="comfirm-tip-1"></div>
                    <div class="confirm-btn-1">朕要召告天下</div>
                </div>`
        break;
        case "echart-line":
         return `<div class="echart">echart</div>`
        break;
    }
}

// ajax
function ajaxDate(option,successCB){
    $.ajax({
      url:option.url,
      type:"post",
      data:option.data,
      dataType: "json",
      success:function(data){
        if(data.ret){
            successCB(data.data);
        }else{
            console.warn(' data = ',data)
        }
        
      },
      error:function(){
        console.warn(' ajax error !!!')
      }
    })
}


// *******************  图表  *******************
// line 
/**
 * [activeLineEchartLabel 折线图当前学校的样式属性]
 * @param  {[Object]} option    [description]
 * @param  {[String]} name      [当前学校名字]
 * @param  {[String]} value     [当前学校排名]
 * @return {[Object]} Object    [description]
 */
function activeLineEchartLabel(option){

    return {
        name:option.name,
        value:option.val,
        symbolSize:15,
        label:{
            normal:{
                show:true,
                distance:10,
                formatter: [
                    `{a|${option.name}}`,
                ].join('\n'),
                
                rich: {
                    a: {
                        color: '#000',
                        lineHeight: 10,
                        backgroundColor:"#fff",
                        padding:6,
                        borderColor:"#000",
                        borderWidth:2,
                        borderRadius:6
                    }
                }
            }
        },
        itemStyle:{
            normal:{
                borderColor:"#000",
                borderWidth:2
            }
        }
    }
}