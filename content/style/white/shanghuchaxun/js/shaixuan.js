// wrapper top
function setTop(){
    var getTop = 0;
    for(var i= 0;i<$(".smart-top").length;i++){
        e = $(".smart-top")[i];
        getTop += e.clientHeight;
    }
    
    $(".smart-accordion").css("top",(getTop+45)+"px");
}
// 分析 和 统计 切换
$(".smart-query-statistics .toggle").on("click",function (){
    $(".smart-content").toggleClass("smart-toggle");
    $(this).text($(".smart-content").hasClass("smart-toggle")?"统计":"分析");
});
// 向下展开筛选
var screen_list = [
    ["今日", "近一周", "近一个月", "任意时间"],
    ["201", "202", "203", "204", "205","全部POS"],
    ["5:00~9:00", "11:30~13:30","17:30~19:30","全部时段"]
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
    if($(obj).text() == "任意时间"){
        $(".smart-time-box").addClass("smart-show");
    }else{
        $(".smart-time-box").removeClass("smart-show");
        var date = getTime(),
        beforeDate = 0;
        // 日期范围
        switch ($(obj).text()){
            case "今日":
                $(".smart-query-summarize h1").text(date.text);
            break;
            case "近一周":
                beforeDate = getTime(date.year,date.month-1,(date.day-7));
                $(".smart-query-summarize h1").text(beforeDate.text+" ~ "+date.text);
            break;
            case "近一个月":
                beforeDate = getTime(date.year,date.month-1,(date.day-30));
                $(".smart-query-summarize h1").text(beforeDate.text+" ~ "+date.text);
            break;

        }
    }
}

$(".smart-screen-mask").on("click", function() {
  hideBox();
})

function smart_screen_toggle(type) {
    if (type == "hide") {
        // hide
        $(".set-popup").slideUp(200);
        $(".smart-screen-mask").fadeOut(200,function (){
            setTop();
            wrapper.refresh();
        });
    } else {
        // show
        $(".set-popup").slideDown(200);
        $(".smart-screen-mask").fadeIn(200);
    }
}
// 详情
function accordionClick(){
    $(".smart-sub-list-item").off().on("click", function(){
        console.log(this)
        var hasSub = $(this).next();
        if (hasSub.hasClass("smart-sub-list-item-content")){
            $(".smart-sub-list-item-content").not(hasSub).slideUp(200);
            hasSub.slideToggle(200,function (){
                wrapper.refresh();
            });
        }
    })
}
function getTime(y,m,d){
    var time = y?new Date(y,m,d):new Date();
    return {
        year : time.getFullYear(),
        month : time.getMonth()+1,
        day : time.getDate(),
        text: time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()
    }
}

// 选择时间
function selectTime (obj){
    mui.init();
    var type = $(obj).attr("set-time"),
    startP = $(".smart-time-box p[set-time=start]"),
    endP = $(".smart-time-box p[set-time=end]"),
    date = getTime(),

    options = {
        type:"date",
        beginDate: type == "start"?new Date(date.year,date.month-1,date.day):function(){
            var start = startP.text();
            var startArr = start.split("-");
            return new Date(startArr[0],startArr[1]-1,startArr[2]);
        }(),//设置开始日期 
        endDate: type == "start"?new Date(date.year+10,date.month, date.day):"",//设置结束日期 
    };
    /*
     * 首次显示时实例化组件
     * 示例为了简洁，将 options 放在了按钮的 dom 上
     * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
     */
    var picker = new mui.DtPicker(options);
    picker.show(function(rs) {
        /*
         * rs.value 拼合后的 value
         * rs.text 拼合后的 text
         * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
         * rs.m 月，用法同年
         * rs.d 日，用法同年
         * rs.h 时，用法同年
         * rs.i 分（minutes 的第二个字母），用法同年
         */
        obj.innerText = rs.text;
        if(type == "end"){
            $(".smart-query-summarize h1").text(startP.text()+" — "+endP.text());
        }
        /* 
         * 返回 false 可以阻止选择框的关闭
         * return false;
         */
        /*
         * 释放组件资源，释放后将将不能再操作组件
         * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
         * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
         * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
         */
        picker.dispose();
    });
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