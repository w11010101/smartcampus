// wrapper top
$(".smart-accordion").css("top",($(".smart-query-summarize")[0].clientHeight+$(".smart-query-statistics")[0].clientHeight+45)+"px");
// 分析 和 统计 切换
$(".smart-query-statistics .toggle").on("click",function (){
    $(".smart-content").toggleClass("smart-toggle");
    $(this).text($(".smart-content").hasClass("smart-toggle")?"统计":"分析");
});
// 向下展开筛选
var screen_list = [
    ["今日", "近一周", "近一个月", "任意时间"],
    ["201", "202", "203", "204", "205"],
    ["5:00~9:00", "11:30~13:30","17:30~19:30"]
];
var lists = $(".smart-screen div[class^=col-xs-4]");
lists.on("click", function() {
    $(this).toggleClass("smart-active").siblings().removeClass("smart-active");
    $(".smart-screen-list div").remove();
    var that = this;
    for (var i in screen_list[$(this).index()]) {
        $(".smart-screen-list").append('<div class="col-xs-12" type="list" onclick="hideBox(this);">' + screen_list[$(this).index()][i] + '</div>');
    }
    if ($(this).hasClass("smart-active")) {
        smart_screen_toggle("show");
    } else {
        smart_screen_toggle("hide");
    }
})

// 隐藏筛选
function hideBox(obj){
    var text = $(".smart-screen .smart-active").text();
    $(".smart-screen .smart-active").text($(obj).text()?$(obj).text():text);
    $(".smart-active").removeClass('smart-active');
    smart_screen_toggle("hide");
}

$(".smart-screen-mask").on("click", function() {
  hideBox();
})

function smart_screen_toggle(type) {
    if (type == "hide") {
        // hide
        $(".set-popup").slideUp(200);
        $(".smart-screen-mask").fadeOut(200);
    } else {
        // show
        $(".set-popup").slideDown(200);
        $(".smart-screen-mask").fadeIn(200);
    }
}
// 详情
function accordionClick(){
    $(".smart-sub-list-item").off().on("click", function(){
        var hasSub = $(this).next();
        if (hasSub.hasClass("smart-sub-list-item-content")){
            $(".smart-sub-list-item-content").not(hasSub).slideUp(200);
            hasSub.slideToggle(200,function (){
                wrapper.refresh();
            });
        }
    })
}
// 加载中
function loading(){
    return '<!-- 加载中 --><div class="smart-loading"><div class="smart-waiting"></div></div>';
}

$(function() {
    function load_charts_bar() {
        var objs = document.querySelectorAll(".smart-accordion-bar");
        for (var i in objs) {
            if (typeof objs[i] == "object") {
                smart_charts_bar(objs[i]);
            }
        }
    }
    // smart_charts_bar 横向柱形图表
    function smart_charts_bar(obj) {
        var income, pay, myChart;
        myChart = echarts.init(obj);
        income = $(obj).attr("income");
        pay = $(obj).attr("pay");
        // 指定图表的配置项和数据
        option = {
            xAxis: {
                show: false,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                },
            },
            yAxis: {
                type: 'category',
                axisLine: {
                    show: false,

                },
                splitLine: {
                    show: false
                },
                data: []
            },
            barGap: "0",
            series: [{
                name: '',
                type: 'bar',
                data: [income],
                label: {
                    normal: {
                        show: "true",
                        position: "insideLeft",
                        formatter: function(value) {
                            return "收￥" + value.data
                        },
                        offset: [5, 8],
                        textStyle: {
                            color: (income / pay) > 0.2 ? "#fff" : "#a5a5a5",
                            fontSize: "10"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#01e699",
                        borderWidth: 100,
                        borderType: "solid"
                    }
                }

            }, {
                name: '2012年',
                type: 'bar',
                data: [pay],
                label: {
                    normal: {
                        show: true,
                        position: "insideLeft",
                        formatter: function(value) {
                            return "支￥" + value.data
                        },
                        offset: [5, -12],
                        textStyle: {
                            // color:"#01e699",
                            color: (income / pay) > 2 ? "#a5a5a5" : "#fff",
                            fontSize: "10"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#ee5b17"
                    }
                }
            }, ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
    // 
    function smart_charts_pie(obj, parameter) {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(obj);
        // 指定图表的配置项和数据
        option = {
            title: {
                text: "￥2500.00",
                subtext: "总资产",
                x: 'center',
                y: 'middle',
                textStyle: {
                    fontSize: "14",
                    color: "#3c3c3c"
                },
                subtextStyle: {
                    fontSize: "12",
                    color: "#3c3c3c"
                }
            },
            color: ['#45d6c5', '#41c6f3', '#ff5408', '#fdab07'],
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['35%', '50%'],
                avoidLabelOverlap: false,
                labelLine: {
                    normal: {
                        length: 5,
                        lenght2: 5,
                        smooth: true
                    }
                },
                data: [{
                    value: 140,
                    name: '电子账户', // 当name值相同，加空格区分（颜色）
                }, {
                    value: 140,
                    name: '校园卡' // 当name值相同，加空格区分（颜色）
                }, {
                    value: 120,
                    name: '补助账户'
                }, {
                    value: 50,
                    name: '上网余额'
                }]
            }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
})