// 当前日期
$(".timeInterval").text(getTime().text);
// wrapper top
function setTop() {
    var getTop = 0;
    for (var i = 0; i < $(".smart-top").length; i++) {
        e = $(".smart-top")[i];
        getTop += e.clientHeight;
    }
    $(".smart-accordion,.pos-container").css("top", (getTop + ($(".navbar")[0]?$(".navbar")[0].clientHeight:0)) + "px");
    $(".smart-echart").css("top", (getTop + ($(".navbar")[0]?$(".navbar")[0].clientHeight:0) - $(".smart-query-summarize")[0].clientHeight) + "px");
    wrapper.refresh();
}
// 分析 和 统计 切换
var myScrollEchart,
    myScrollPos;
$(".smart-query-statistics .toggle").on("click", function() {
    $(".smart-content").toggleClass("smart-toggle");
    $(".smart-query-statistics").toggleClass("smart-border");
    // 切换 隐藏日期选择
    $(".smart-time-box").removeClass("smart-screen-show");
    setTop();
    // 
    $(this).text($(".smart-content").hasClass("smart-toggle") ? function() {
        // echart 
        fixed_scroll('wrapper-echart');
        // if (!myScrollEchart) {
        //     myScrollEchart = new iScroll('wrapper-echart', {
        //         vScrollbar: false
        //     });
        //     document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });            
        // }
        myEcharts.createEcharts(config_bar);
        myEcharts.createEcharts(config_pie);
        return "统计";
    }() : function() {
        myEcharts.clear();
        return "分析";
    }());
});
// 固定滑动 （不会上下拉加载）
function fixed_scroll(id,type){
    var myScrollObj = type == "echart"?myScrollEchart:myScrollPos;
    if (!myScrollObj) {
        myScrollObj = new iScroll(id, {
            vScrollbar: false
        });
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });            
    }
}
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
        pickerShow(that,index);
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
            pickerShow(that,index);
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
// picker组件显示
function pickerShow(obj,index){
    picker.show(function(items) {
        lists.removeClass("smart-active");
        state = true;
        obj.text(items[0]);
        hideBox(items[0],index);
    });
}
// 列表点击事件
lists.off().on("click", onClick);

// 隐藏筛选
function hideBox(val,index) {
    $(".smart-active").removeClass('smart-active');
    smart_screen_toggle("hide");
    // 时间下拉
    timeOptions(val,index);

    // pos机下拉
    if(index!= 1) return false;
    posOptions(val);

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
// pos机下拉
function posOptions(val){
    var EchartConfig;
    if(~val.indexOf("POS")){
        // 有 pos字样
        $(".pos-tips").hide(0);
        $("#picker1,#picker3").on("click",onClick).removeClass("disabled");
        EchartConfig = new EchartDataAll();
    }else{
        // 没有 pos字样
        $(".pos-tips").show(0);
        $("#picker1,#picker3").off("click").addClass("disabled");
        EchartConfig = new EchartData();
    }
    setTop();
    if($(".smart-query-bill").length) {
        // chaliushui.html
        console.log("当前是 chaliushui.html");
    }else{
        // tongji.html
        myEcharts.createEcharts(EchartConfig.bar);
        myEcharts.createEcharts(EchartConfig.pie); 

        var date = getTime(),
        beforeDate = getTime(date.year, date.month - 6, date.day);
        $(".timeInterval").text(beforeDate.text + " ~ " + date.text);
        // 过去6个月
        // $("#wrapper ul").html("");
        for(var i =0;i<6;i++){
            // $("#wrapper ul").append(html(201+i));
            $("#wrapper-pos").show(0,function (){
                $("ul",this).append(html(`<div class="smart-accordion-head smart-accordion-head-date">`+(date.month-i)+`月<span>`+date.year+`</span></div>`));
            })
            
        }

        fixed_scroll('wrapper-pos',"pos");
    }
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
}
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
// 加载中
function loading() {
    console.log("loading")
    return '<!-- 加载中 --><div class="smart-loading"><div class="smart-waiting"></div></div>';
}

// html 
var html = function (val){
    return `<li class="smart-sub-list-item">
        `+val+`
        <div class="smart-accordion-content">
          <h3><em>交易笔数</em>
            <i>交易金额</i></h3><p>
            <em>67笔</em>
        <i>3333.00</i></p></div></li>`;
};
for(var i =0;i<6;i++){
    $("#wrapper ul").append(html(`<div class="smart-accordion-head"><span>`+(201+i)+`</span></div>`));
}
// scroll
var option = {
    id:"wrapper", 
    pullDown:function (){
        wrapper.refresh();
    },
    pullUp:function (){
        setTimeout(function() {
            var li = "",
              i;
            for (i = 1; i < 4; i++) {
                var n = parseInt($(".smart-sub-list-item:last-child .smart-accordion-head span").text())+i;
                li += html(`<div class="smart-accordion-head"><span>`+n+`</span></div>`);
            }
            $("#wrapper ul").append(li);
            wrapper.refresh();
        }, 1000);
    }
}
loadMore.scroll(option);