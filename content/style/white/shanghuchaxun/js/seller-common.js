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
        
        fixed_scroll('wrapper-echart',myScrollEchart);
        myScrollEchart =false;
        // console.log($("#picker2").text().indexOf("全部")>=0)
        var EchartConfig = new get_config({
            pageName:pageName,
            type:$("#picker2").text().indexOf("全部")>=0 ?"all":"certain"
        });
        $("body").attr("page-name",pageName);

        myEcharts.createEcharts(EchartConfig.bar);
        myEcharts.createEcharts(EchartConfig.pie);
        return "统计";
    }() : function() {
        myEcharts.clear();
        return "分析";
    }());
});
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
        date = getTime(),

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
function get_config (option){
    var pageName  = option.pageName;
    console.log("pageName : %s",pageName);
    console.log("type : %s",option.type);
    switch (pageName){
        case "tongji":
            if(option.type == "certain"){
                config_bar = new EchartData().bar;
                config_pie = new EchartData().pie;
            }else{
                config_bar = new EchartDataAll().bar;
                config_pie = new EchartDataAll().pie;
            }
        break;
        case "chaliushui":
            if(option.type == "certain"){
                config_bar = new EchartData().bar;
                config_pie = new EchartData().pie;
            }else{
                config_bar = new EchartDataAll().bar;
                config_pie = new EchartDataAll().pie;
            }
        break;
        case "guanli":
            // 图表1 bar and line
            // config_bar.bar.barArr = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220];
            // config_bar.end = 20;
            // config_bar.barColor = "#71d6f5";
            // 图表2 pie
            console.log("type: %s",option.type)
            if(option.type == "certain"){
                console.log(1)
                config_pie.pie.valArr  = [15632,13213];
                config_pie.pie.nameArr = ["POS刷卡","扫一扫"];
                config_pie.pie.color = ['#00e897', '#42c3ef'];
            }else{
                console.log(0)
                config_pie.pie.valArr  = [15632,13213,78455,14132,31561,35645];
                config_pie.pie.nameArr = ["老家肉饼","黄焖鸡米饭","山西刀削面","盖饭盖饭盖饭盖饭","云南过桥米线","麻辣香锅"];
                config_pie.pie.color = ['#00e897', '#42c3ef', '#0096d2', '#fdab06',"#71d6f5","#ee5b16"];
            }  


        break;
    }
    this.bar = config_bar;
    this.pie = config_pie;
}
// 图表数据结构
// EchartDataAll 全部数据
function EchartDataAll(){
    // 图表1 bar and line
    config_bar.bar.barArr = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220];
    config_bar.end = 20;
    config_bar.barColor = "#71d6f5";
    // 图表2 pie
    config_pie.pie.valArr = [2300, 1250, 1000, 1700];
    config_pie.pie.nameArr =["pie1","pie2","pie3","pie4"];
    config_pie.pie.color = ['#00e897', '#42c3ef', '#0096d2', '#fdab06'];

    this.bar = config_bar;
    this.pie = config_pie;
    // ajax 获取数据重新拼接
    
}
// EchartDataAll 单个数据
function EchartData(){
    var month = getTime().month;
    // 图表1 bar and line
    config_bar.bar.barArr = [(month-5)+"月",(month-4)+"月",(month-3)+"月",(month-2)+"月",(month-1)+"月",month+"月"];
    config_bar.end = 100;
    config_bar.barColor = "#bcffbf";
    // 图表2 pie
    config_pie.pie.valArr  = [1000,1200,1000,1500,1400,1700];
    config_pie.pie.nameArr = [(month-5)+"月",(month-4)+"月",(month-3)+"月",(month-2)+"月",(month-1)+"月",month+"月"];
    config_pie.pie.color = ['#00e897', '#42c3ef', '#0096d2', '#fdab06',"#71d6f5","#ee5b16"] 

    this.bar = config_bar;
    this.pie = config_pie;
    // ajax 获取数据重新拼接
}

function getAjaxData(option){
    $.ajax({
        type: "POST",
        url: option.url,
        data:option.data,
        // async:false,        // 设置同步请求
        dataType: "json",
        success: function(data) {
            
        },
        error: function(err) {
            console.log("error = " + JSON.stringify(err));
        }
    })
}