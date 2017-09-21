// 当前日期
$(".timeInterval").text(getTime().text);
// wrapper top
function setTop() {
    var getTop = 0;
    for (var i = 0; i < $(".smart-top").length; i++) {
        e = $(".smart-top")[i];
        getTop += e.clientHeight;
    }
    $(".smart-accordion").css("top", (getTop + ($(".navbar")[0]?$(".navbar")[0].clientHeight:0)) + "px");
    $(".smart-echart").css("top", (getTop + ($(".navbar")[0]?$(".navbar")[0].clientHeight:0) - $(".smart-query-summarize")[0].clientHeight) + "px");
    wrapper.refresh();
}
// 分析 和 统计 切换
var myScrollEchart;
$(".smart-query-statistics .toggle").on("click", function() {
    $(".smart-content").toggleClass("smart-toggle");
    $(".smart-query-statistics").toggleClass("smart-border");
    // 切换 隐藏日期选择
    $(".smart-time-box").removeClass("smart-screen-show");
    setTop();
    // 
    $(this).text($(".smart-content").hasClass("smart-toggle") ? function() {
        // echart 
        if (!myScrollEchart) {
            myScrollEchart = new iScroll('wrapper-echart', {
                vScrollbar: false
            });
            document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });            
        }
        myEcharts.createEcharts(config1);
        myEcharts.createEcharts(config2);
        return "统计";
    }() : function() {
        myEcharts.clear();
        return "分析";
    }());
});

// 向下展开筛选
var screen_list = [
    ["今日统计", "近一周", "近一个月", "任意时间"],
    ["201", "202", "203", "204", "205", "全部POS"],
    ["5:00~9:00", "11:30~13:30", "17:30~19:30", "全部时段"]
];
var lists = $(".smart-screen div[class^=col-xs-4]");

picker = new mui.PopPicker({
    layer: 1,
});
var state = true;
var id = "";
function onClick(){
    var index = $(this).index();
    picker.setData(screen_list[index]);
    $(this).toggleClass("smart-active").siblings().removeClass("smart-active");
    var that = $(this);
    if (state) {
        picker.show(function(items) {
            lists.removeClass("smart-active");
            state = true;
            that.text(items[0]);
            hideBox(items[0],index);
        });
        id = $(this)[0].id;
        state = false;
    } else {
        if (id == $(this)[0].id) {
            // 如果点击的是自己，就hide;
            picker.hide();
            picker.setData(screen_list[index]);
            state = true;
        } else {
            // 如果点击的不是自己，就show;
            id = $(this)[0].id;
            state = false;
        }
    }

    // 遮罩层 和 取消按钮 绑定点击事件，取消smart-active样式
    $(".mui-backdrop,.mui-poppicker-btn-cancel").off().on("tap", function() {
        lists.removeClass("smart-active");
        state = true;
    });
}
// 列表点击事件
lists.on("click", onClick);

// 隐藏筛选
function hideBox(val,index) {
    $(".smart-active").removeClass('smart-active');
    smart_screen_toggle("hide");
    // 时间下拉
    timeOptions(val,index);
    if($("body").hasClass("smart-query")){
        // samrt-query
        // pos机下拉
        posOptions(val,index);
    }else{
        //  samrt-query-bill
        console.log("samrt-query-bill");
    }
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
                $(".smart-query-summarize h1,.smart-query-summarize >p,.smart-echart >p").text(date.text);
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
// pos机下拉
function posOptions(val,index){
    console.log(index)
    if(index!= 1) return false;

    if(~val.indexOf("POS")){
        // 有
        $(".pos-tips").hide(0);
        $("#picker1,#picker3").on("click",onClick).removeClass("disabled");
        // config1
        config1.bar.barArr = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220];
        config1.end = 20;
        config1.barColor = "#71d6f5";
        // config2
        config2.pie.valArr = [2300, 1250, 1000, 1700];
        config2.pie.nameArr =["pie1","pie2","pie3","pie4"];
        config2.pie.color = ['#00e897', '#42c3ef', '#0096d2', '#fdab06'];
    }else{
        // 没有
        $(".pos-tips").show(0);
        $("#picker1,#picker3").off("click").addClass("disabled");

        var month = getTime().month;
        // config1
        config1.bar.barArr = [(month-5)+"月",(month-4)+"月",(month-3)+"月",(month-2)+"月",(month-1)+"月",month+"月"];
        config1.end = 100;
        config1.barColor = "#bcffbf";
        // config2
        config2.pie.valArr  = [1000,1200,1000,1500,1400,1700];
        config2.pie.nameArr = [(month-5)+"月",(month-4)+"月",(month-3)+"月",(month-2)+"月",(month-1)+"月",month+"月"];
        config2.pie.color = ['#00e897', '#42c3ef', '#0096d2', '#fdab06',"#71d6f5","#ee5b16"] 

    }
    myEcharts.createEcharts(config1);
    myEcharts.createEcharts(config2);
    setTop();
}
// 时段下拉

// smart_screen_toggle
function smart_screen_toggle(type) {
    if (type == "hide") {
        // hide
        $(".set-popup").slideUp(200);
        $(".smart-screen-mask").fadeOut(200, function() {
            setTop();
        });
    } else {
        // show
        $(".set-popup").slideDown(200);
        $(".smart-screen-mask").fadeIn(200);
    }
}
// 详情
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

function getTime(y, m, d) {
    var time = y ? new Date(y, m, d) : new Date();
    return {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate(),
        text: time.getFullYear() + "." + (time.getMonth() + 1) + "." + time.getDate()
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
        }

        picker.dispose();
    });
}
// 加载中
function loading() {
    return '<!-- 加载中 --><div class="smart-loading"><div class="smart-waiting"></div></div>';
}
