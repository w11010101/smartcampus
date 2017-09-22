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
    myScrollPos,
    myScrollObj;
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
    myScrollObj = type == "echart"?myScrollEchart:myScrollPos;
    if (!myScrollObj) {
        myScrollObj = new iScroll(id, {
            vScrollbar: false
        });
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });            
    }
    myScrollObj.refresh();
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

        $("#wrapper-pos").hide(0);
        $(".smart-echart label em").show(0);
        timeOptions($("#picker1").text());
    }else{
        // 没有 pos字样
        $(".pos-tips").show(0);
        $("#picker1,#picker3").off("click").addClass("disabled");
        EchartConfig = new EchartData(); 

        // 过去6个月
        var date = getTime(),
        beforeDate = getTime(date.year, date.month - 6, date.day);
        $(".timeInterval").text(beforeDate.text + " ~ " + date.text);
        $(".smart-echart label em").hide(0);
        $("#wrapper-pos").show(0);
        
        // 获取ajax 列表
        getAjaxList ({
            url:"http://localhost:3000/",
            data:{
                type:"list",
            },
            // listType:"specifyList",
            listType: $(".smart-query").length?"specifyList":"streamSpecifyList",
            parentObj:$("#wrapper-pos ul"),
            num:6
          
        });
        // $(".smart-query").length?"specifyList":"streamSpecifyList"
        setTimeout(function (){
            fixed_scroll('wrapper-pos',"pos");
        },200)
       
    }
    setTop();

    if($(".smart-query-bill").length) {
        // chaliushui.html
        console.log("当前是 chaliushui.html");
    }else{
        // tongji.html
        myEcharts.createEcharts(EchartConfig.bar);
        myEcharts.createEcharts(EchartConfig.pie);
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

// html 同步加载ajax， return data
var html = function (val,type){
    var dom = "";
    switch (type){
        case "allList":
            // 全部列表
            dom = `<li class="smart-sub-list-item">`+val+`
                <div class="smart-accordion-content">
                  <h3><em>交易笔数</em>
                    <i>交易金额</i></h3><p>
                    <em>67笔</em>
                <i>3333.00</i></p></div></li>`;
        break;
        case "specifyList": 
            // 区间列表（如：6个月）
            dom = `<li class="smart-sub-list-item">`+val+`
                <div class="smart-accordion-content">
                  <h3><em>交易笔数</em>
                    <i>交易金额</i></h3><p>
                    <em>67笔</em>
                <i>3333.00</i></p></div></li>`;
        break;
        case "streamSpecifyList": 
            // 区间列表（如：6个月）
            dom = `<li class="smart-sub-list-item"><div class="smart-accordion-head">
                  <span>14:14</span>
                </div>
                <!-- 列表内容 -->
                <div class="smart-accordion-content">
                  <h3><em>POS-201</em><i set-status="pay">-1000.00</i></h3>
                  <p><em>132132132132132</em><i>张三（132132132132312）</i></p>
                </div>
              </li>
              <li class="smart-sub-list-item smart-sub-list-item-content">
                <div class="row">
                  <div class="col-xs-12">
                    <label>交易时间：</label>
                    <span>2017.09.08 14:11：11</span>
                  </div>
                  <div class="col-xs-12">
                    <label>订单号：13245689778948</label>
                    <span></span>
                  </div></div></li>`;
        break;
        case "streamList": 
            // 查流水
            console.log("查流水列表");
            dom = `<li class="smart-sub-list-item">
                <!-- 日期 -->
                <div class="smart-accordion-head">09/09<span>14:14</span></div>
                <!-- 列表内容 -->
                <div class="smart-accordion-content">
                  <h3><em>POS-203</em><i set-status="income">+1000.00</i></h3>
                  <p><em>132132132132132</em><i>张三（132132132132312）</i></p>
                </div>
              </li>
              <li class="smart-sub-list-item smart-sub-list-item-content">
                <div class="row">
                  <div class="col-xs-12">
                    <label>交易时间：</label>
                    <span>2017.09.08 14:11：11</span>
                  </div>
                  <div class="col-xs-12">
                    <label>订单号：13245689778948</label>
                    <span></span>
                  </div></div></li>`;
        break;
    }
    return dom;
};


function getAjaxList (option){
    console.log(option);
    // ajax 
    // $.ajax({
    //     type: "POST",
    //     url: option.url,
    //     data:option.data,
    //     // async:false,        // 设置同步请求
    //     dataType: "json",
    //     success: function(data) {
    //         var li = "",i;
    //         for (i = 1; i < 4; i++) {
    //             // var n = parseInt($("#wrapper .smart-sub-list-item:last-child .smart-accordion-head span").text())+i;
    //             // li += html(`<div class="smart-accordion-head"><span>`+n+`</span></div>`,"tongji");
    //             option.parentObj.append(html(data,option.listType));
    //         }

    //         // option.parentObj.append(html(data,"tongji"));

    //         // option.parentObj.append(option.listType == "allList"?html(data,):function (){
    //         // });
    //     },
    //     error: function(err) {
    //         console.log("error = " + JSON.stringify(err));
    //     }
    // })

    // 本地测试
    var date = getTime();

    var li = "",i;
    for (i = 0; i < option.num; i++) {
        var dom = option.listType == "allList"?function(){
            // 此处有两个结构，其一
            return `<div class="smart-accordion-head"><span>`+(201+i)+`</span></div>`;  
        }():function(){
            option.parentObj.html("");
            // 此处有两个结构，其二
            return `<div class="smart-accordion-head smart-accordion-head-date">`+(date.month-i)+`月<span>`+date.year+`</span></div>`;
        }();
        li += html(dom,option.listType);
    }
    option.parentObj.append(li);
}