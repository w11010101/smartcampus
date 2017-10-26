// 当前日期
$(".timeInterval").text(getTime().text);
// wrapper top
function setTop() {
    var getTop = 0;
    for (var i = 0; i < $(".smart-top").length; i++) {
        e = $(".smart-top")[i];
        getTop += e.clientHeight;
    }
    $(".smart-accordion,.smart-list-nothing").css("top", ($(".smart-content")[0].clientHeight+$(".smart-screen")[0].clientHeight)+ "px");
    $(".smart-echart").css("top", (getTop + ($(".navbar")[0]?$(".navbar")[0].clientHeight:0) - $(".smart-query-summarize")[0].clientHeight) + "px");
    wrapper.refresh();
}

// 用来区分不同页面加载不同的数据
var hrefArr = window.location.href.split("/");
var pageName = hrefArr[hrefArr.length-1].split(".")[0];

// 分析 和 统计 切换
var myScrollEchart=true,
    myScrollPos=true,
    myScrollObj,
    config_bar,
    config_pie;
$(".smart-query-statistics .toggle").off().on("click", function() {
    $(".smart-content").toggleClass("smart-toggle");
    $(".smart-query-statistics").toggleClass("smart-border");
    // 切换 隐藏日期选择
    $(".smart-time-box").removeClass("smart-screen-show");
    setTop();
    // 
    $(this).text($(".smart-content").hasClass("smart-toggle") ? function() {
        // echart 
        console.log(213123)
        fixed_scroll('wrapper-echart',myScrollEchart);
        

        if(!myScrollEchart) return;
        // ajax 请求饼状图数据
        
        var state = $("#picker2").text().indexOf("全部")>=0;
        getAjaxData ({
          url:"http://localhost:3000/",         // 接口地址
          data:{
            type:"echarts",                     // 
            sellers:state?"all":"certain",      // all:全部，centain:某个
            pageName:pageName
          },                                   
          listType:"allList",               
          parentObj:$("#wrapper ul"),           // 列表容器
          num:4                                 // 列表个数（仅限本地模拟）
        },creatEchart,creatEchartFail);

        myScrollEchart = false;

        return "统计";
    }() : function() {
        // myEcharts.clear();
        return "分析";
    }());
});
// ajax 图表数据请求成功后的callback

function creatEchart(data){
    console.log(JSON.stringify(data))
    // 配置图表参数
    // 图表1 bar and line
    config_bar.bar.barArr = data.bar.barArr;
    config_bar.bar.barArr_val = data.bar.barArr_val;
    config_bar.bar.lineArr = data.bar.lineArr;
    config_bar.bar.lineArr_val = data.bar.lineArr_val;
    config_bar.end = data.bar.end;
    config_bar.barColor = data.bar.barColor;
    // 图表2 pie
    config_pie.pie.valArr = data.pie.vals;
    config_pie.pie.nameArr = data.pie.names;
    config_pie.pie.color = data.pie.color;
    config_pie["borderWidth"] = data.pie.vals.length == 1?0:5;
    myEcharts.createEcharts(config_bar);
    myEcharts.createEcharts(config_pie);
}
// ajax 图表数据请求失败后的callback
function creatEchartFail(err){
    console.log(err)
}
// 固定滑动 （不会上下拉加载）
function fixed_scroll(id,type){ 

    if (!type) return;
    myScrollObj = new iScroll(id, {
        vScrollbar: false
    });
    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
    
    myScrollObj.refresh(); 
}
// 列表详情点击
function accordionClick() {
    $(".smart-sub-list-item").off().on("click", function() {
        var hasSub = $(this).next();
        if (hasSub.hasClass("smart-sub-list-item-content")) {
            $(".smart-sub-list-item-content").not(hasSub).slideUp(200);
            hasSub.slideToggle(200, function() {
                wrapper.refresh();
            });
        }
    })
}
// 获取时间
function getTime(y, m, d) {
    var time = y ? new Date(y, m, d) : new Date();
    var month = time.getMonth() + 1;
    month = month<10?("0"+month):month;
    var day = time.getDate();
    day = day<10?("0"+day):day;
    return {
        year: time.getFullYear(),
        month: month,
        day: time.getDate(),
        text: time.getFullYear() + "-" + month + "-" + day
    }
}
// 选择时间
function selectTime(obj) {
    mui.init();
    var type = $(obj).attr("set-time"),
        startP = $(".smart-time-box p[set-time=start]"),
        endP = $(".smart-time-box p[set-time=end]"),
        date = getTime(2010,1,1),

        options = {
            type: "date",
            beginDate: type == "start" ? new Date(date.year, date.month - 1, date.day) : function() {
                var start = startP.text();
                var startArr = start.split("-");
                return new Date(startArr[0], startArr[1] - 1, startArr[2]);
            }(), //设置开始日期 
            endDate: type == "start" ? new Date(date.year + 10, date.month, date.day) : "", //设置结束日期 
        };

    var picker = new mui.DtPicker(options);
    picker.show(function(rs) {

        obj.innerText = rs.text;
        if (type == "end") {
            $(".timeInterval").text(startP.text() + " ~ " + endP.text());
        }else{
            endP.text("结束时间");
            selectTime(document.querySelector(".smart-time-box p[set-time=end]"));
        }

        picker.dispose();
    });
}
// 时间下拉
function timeOptions(val){
    if (val == "任意时间") {
        $(".smart-time-box").addClass("smart-screen-show");
        
    } else {
        $(".smart-time-box").removeClass("smart-screen-show");
        var date = getTime(),
            beforeDate = 0;
        // 日期范围
        switch (val) {
            case "今日统计":
                $(".timeInterval").text(date.text);
                break;
            case "近一周":
                beforeDate = getTime(date.year, date.month - 1, (date.day - 7));
                $(".timeInterval").text(beforeDate.text + " ~ " + date.text);
                break;
            case "近一个月":
                beforeDate = getTime(date.year, date.month - 1, (date.day - 30));
                $(".timeInterval").text(beforeDate.text + " ~ " + date.text);
                break;
        }
    }
    setTop();
}
// 随机数，本地测试用
function getRandomm(i, max) {
    var arr = [];
    while (i > 0) {
        var num = Math.floor(Math.random() * max + 1);
        arr.push(num);
        i--;
    }
    return arr;
}
// 图表初始配置
config_bar = {
    el: ".smart-line-charts", // 图表容器 
    type: "bar", // pie or (bar & line);
    bar: {
        barArr: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220],
        lineArr: getRandomm(20, 100),
        lineArr_val: function() {
            var arr = getRandomm(20, 1000);
            var newArr = [];
            for (var i in arr) {
                newArr.push({
                   name: arr[i],
                    value: arr[i],
                    symbol: "circle",
                    symbolSize: "10", 
                })
            }
            return newArr;
        }(),
        barArr_val: getRandomm(20, 10000),
        axis:false
    },
    start:0,
    end:25,
    barColor:"#71d6f5" //  bcffbf
}
config_pie = {
    el: ".smart-pie-charts",
    type: "pie", // pie or (bar & line);
    pie: { 
        valArr : [2300, 1250, 1000, 1700],
        nameArr : [2300, 1250, 1000, 1700],
        color:['#00e897', '#42c3ef', '#0096d2', '#fdab06'] 
    }
}

function getAjaxData(option,callBack,failCallBack){
    $.ajax({
        type: "POST",
        url: option.url,
        data: option.data,
        dataType: "json",
        success: function(data) {
            callBack(data);
        },
        error: function(err) {
            failCallBack("error = " + JSON.stringify(err));
        }
    })
}
