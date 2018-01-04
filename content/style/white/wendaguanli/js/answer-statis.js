// 横向滚动
function scrollPorbe() {
    function runMyScroll(obj) {
        var myScroll;
        myScroll = new IScroll(obj, {
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            preventDefault: false
        });
        $(obj).parent()[0].addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, {
            passive: false
        });
    };

    // 计算 提问分类 的width；
    var classifyLength = $(".smart-probe li").length;
    var classifyWidth = $(".smart-probe li")[0].offsetWidth;
    $("#scroller-probe").css("width", (classifyLength * classifyWidth+ 16*(classifyLength-1)) + "px");
    runMyScroll('#wrapper-probe');
    //  点击事件
    $("#wrapper-probe li").on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");

        runEcharts({
            data:[12,45,32,56,817],
            value:["e|李白|200920020","d|杜甫|200920020","c|白居易|200920020","b|纳兰性德|200920020","a|辛弃疾|200920020"],
        });

        prop = new Proportion(obj,{
            data:[2000,2000],
            viewRate:"40%",     // 查看率
            answerRate:"78%",   // 回答率
            answerTime:"130天",   // 回答时间
        });
        prop_2 = new Proportion(obj_2,{
            data:[200,1109],   // 对比的值
            viewRate:"55%",       // 查看率
            answerRate:"90%",     // 回答率
            answerTime:"130天",   // 回答时间
        });
    })
}


// 柱形图
var weatherIcons = {
    'icon_1': '../../content/style/white/wendaguanli/images/icon-1.png',
    'icon_2': '../../content/style/white/wendaguanli/images/icon-2.png',
    'icon_3': '../../content/style/white/wendaguanli/images/icon-3.png',
    'icon_4': '../../content/style/white/wendaguanli/images/icon-4.png',
    'icon_5': '../../content/style/white/wendaguanli/images/icon-5.png',
};
option = {
    title: {
        text: '管理员回复排行榜1',
        textStyle:{
            fontWeight:"normal",
            fontSize:"15"
        },
        padding:[20,0,0,2]
    },
    grid: {
        left: 25,
        right: '5%',
        bottom: '0%',
        containLabel: true,        
    },
    xAxis: {
        show:false,
        max: function(value) {
            return value.max *1.2;
        },
    },
    yAxis: {
        type: 'category',
        axisLine:{
            show:false,
        },
        axisTick:{
            show:false,
        },
        // maxInterval: 3600 * 24 * 10,
        inverse: true, // 正序
        data:["a|1|李白|200920020","b|2|杜甫|200920020","c|3|白居易啊|200920020","d|4|王安石啊|200920020","d|5|辛弃疾|200920020","d|6|辛弃疾|200920020"],
        axisLabel:{
            width:85,
            formatter: function (value) {
                var textArr = value.split("|");
                var img = textArr[0];
                var th = textArr[1];
                var val1 = textArr[2];
                var val2 = textArr[3];
                return '{' + img + '|'+th+' }{value1|' + val1 + '}\n{value2|'+ val2 +'}';
            },
            rich: {
                value1: {
                    fontSize:12,
                    align: 'left',
                    padding:[0,0,0,10],
                },
                value2:{
                    color:"#a8a8a8",
                    lineHeight:20,
                    fontSize:11,
                },
                a: {
                    padding:[3,2,1,4],
                    align: 'left',
                    color:"#fff",
                    backgroundColor:"#ff5408",
                    borderWidth:1,
                    borderRadius:4,
                },
                b: {
                    padding:[3,2,1,4],
                    align: 'left',
                    color:"#fff",
                    backgroundColor:"#fdab06",
                    borderWidth:1,
                    borderRadius:4,
                },
                c: {
                    padding:[3,2,1,4],
                    align: 'left',
                    color:"#fff",
                    backgroundColor:"#01e699",
                    borderWidth:1,
                    borderRadius:4,
                },
                d: {
                    padding:[3,2,1,4],
                    align: 'left',
                    color:"#fff",
                    backgroundColor:"#e0e0e0",
                    borderWidth:1,
                    borderRadius:4,
                }

            }
        },
    },
    series: [
        {
            name: '2012年',
            type: 'bar',
            barMaxWidth:6,
            barGap:2,
            itemStyle:{
                normal:{
                    color:"#73d2fe",
                    barBorderRadius:6
                },
            },
            label:{
                normal:{
                    show:true,
                    position:"right",
                    barCategoryGap:"50%"
                }
            },
            data: [1, 10, 52, 10, 100]
        },{
            type: 'bar',
            barWidth: 4,
            data: []
        }
    ]
};
// 加载图表
function runEcharts(options){
    option.series[0].data = options.data;
    option.yAxis.data = options.value;
    var myChart = echarts.init(document.querySelector(".Echarts-line"));
    myChart.setOption(option);
}

