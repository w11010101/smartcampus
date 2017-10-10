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
// 条件筛选点击事件
lists.off().on("click", onClick);
// lists.off().on("click", $(".smart-seller-manage").length?onManageClick:onClick);
// 隐藏筛选
function hideBox(val,index) {
    $(".smart-active").removeClass('smart-active');
    // 时间下拉
    timeOptions(val,index);

    // pos机下拉
    if(!$(".smart-seller-manage").length){      // 如果当前页面 不是 guanli.html
        if(index!= 1) return false;
        posOptions(val);

    }else{                    // 如果当前页面 是 guanli.html  
        if(index!= 1) return false; 
        if(val.length <= 4){
            $("#picker2").removeClass("content-rows-2");
        }else{
            $("#picker2").addClass("content-rows-2");
        }
    }

    // 实例化 图表配置对象
    // EchartConfig = ~val.indexOf("POS")?new EchartDataAll():new EchartData();
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
    
    if($(".smart-query-bill").length) {
        // chaliushui.html
        console.log("当前是 chaliushui.html");
    }else{
        // tongji.html
    }
}

// pos机下拉
function posOptions(val){
    var EchartConfig;
    if(~val.indexOf("POS")){
        // 有 pos字样
        $(".pos-tips,#wrapper-pos").hide(0);
        $("#picker1,#picker3").on("click",onClick).removeClass("disabled");

        $(".smart-echart label em").show(0);
        timeOptions($("#picker1").text());
    }else{
        // 没有 pos字样
        $(".pos-tips,#wrapper-pos").show(0);
        $("#picker1,#picker3").off("click").addClass("disabled");
        $("#picker1").text("今日统计");
        $("#wrapper-pos ul").html("");

        // 过去6个月
        var date = getTime(),
        beforeDate = getTime(date.year, date.month - 6, date.day);
        $(".timeInterval").text(beforeDate.text + " ~ " + date.text);
        $(".smart-echart label em").hide(0);
        
        // 获取ajax 列表
        getAjaxList ({
            url:"http://localhost:3000/",
            data:{
                type:"list",
            },
            listType:$("body").attr("specify-list"),
            parentObj:$("#wrapper-pos ul"),
            num:6
          
        });
        setTimeout(function (){
            fixed_scroll('wrapper-pos',myScrollPos);
            myScrollPos = false;
        },200)
       
    }
    setTop();
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
        case "manageList":
            dom = `<li class="smart-sub-list-item">
                <!-- 列表内容 -->
                <div class="smart-accordion-content">
                  <h3><em>海源一餐厅1楼1-16窗口</em><i set-status="income">+1000000.00</i></h3>
                  <p><em>132132132132132</em><i>交易笔数：(121212)</i></p>
                </div>
              </li>`;
        break;
    }
    return dom;
};

// option ：object
function getAjaxList (option){
    // console.log(option);
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

    // 本地测试 ，当使用上面ajax时 ，可删除
    var date = getTime();

    var li = "",i;
    for (i = 0; i < option.num; i++) {
        var dom = option.listType == "allList"?function(){
            // 此处有两个结构，其一
            return `<div class="smart-accordion-head"><span>`+(201+i)+`</span></div>`;  
        }():function(){
            // option.parentObj.html("");
            // 此处有两个结构，其二
            return `<div class="smart-accordion-head smart-accordion-head-date">`+(date.month-i)+`月<span>`+date.year+`</span></div>`;
        }();
        li += html(dom,option.listType);
    }
    option.parentObj.append(li);
}