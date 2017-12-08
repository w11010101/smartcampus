var pagesize = 5;
var stateObj = {};
var n = 0;
var pages = 1;
var settime;

// 向下展开筛选
var screen_list = {
    // state: ["未回复", "已回复", "全部"],
    // type: ["校园精灵", "意见反馈"],
    // class0: [{text:"学习类",id:"0"}, "就业类", "生活类"],
    // class1: [{text:"666777",id:"2313123"}]
};
var lists = $(".smart-screen div[class^=col-xs]");
var picker;
var classObj = {};
var getHtml;
var pickerState = true;
// html 结构
function getDom(data, type) {
    return `<li class="smart-QA-container smart-border-bottom">
          <div class="smart-Q">
            <h2>
              <span>${data.questionName==null?"":data.questionName}<i>${data.questionNameNum==null?"":"("+data.questionNameNum+")"}</i></span>
              <em>${data.createTime}</em>
            </h2>
            <p>${data.q}</p>
          </div>
    ${data.isanswer?(function(){
        return `<div class="smart-A">
        <h2>
          <span>${data.answerName}<i>${data.answerNameNum==""?"":"("+data.questionNameNum+")"}</i></span>
          <em>${data.answerTime}</em>
        </h2>
        <p>${data.a}</p>
      </div>`
    })():""}
    <div class="smart-A-btns">
      ${type =='1'?(function(){
          return `<label>${data.category}</label>`;
      })():(function(){
          return ` <em class = "classBtn" questionid = "${data.id}">${data.category}</em>`;
        })()} <a href = "/dlmu/FeedbackMGT/Answer?id=${data.id}" class = "smart-A-reviseBtn" > ${ data.isanswer ? "修改回复" : "回复" }</a></div></li>`;
}

function myMap(data) {
    return $.map(data, function(e, i) {
        return {
            questionName: e.questionername,
            questionNameNum: e.questionersno,
            answerName: e.repliername,
            answerNameNum: e.repliersno,
            createTime: timeFormatter(e.creattime),
            q: e.title,
            answerTime: timeFormatter(e.answertime),
            a: e.answer,
            category: e.category,
            isanswer: e.isanswer,
            id: e.id
        }
    })
}
lists.off().on("click", onClick);
// 条件筛选点击事件
function onClick() {
    var type = $(this).attr("setType");
    var index = $(this).index();
    if (!picker) {
        picker = new mui.PopPicker({
            layer: 1,
        });
    }
    // picker.setData： 配置picker插件
    picker.setData(screen_list[type]);
    $(this).toggleClass("smart-active");

    var that = $(this);
    pickerShow(that, index, type);
    // 遮罩层 和 取消按钮 绑定点击事件，取消smart-active样式
    $(".mui-backdrop,.mui-poppicker-btn-cancel").off().on("tap", function() {
        pickerHide();
    });
}
// picker组件显示
function pickerShow(obj, index, type) {
    picker.show(function(items) {
        pickerState = false;
        console.log("items[0] = ", items[0]);
        pickerHide();
        let text = items[0].text;
        let id = items[0].id;
        obj.text(text);
        obj.attr("setId", id);
        
        // 修改筛选条件要清空列表
        $(".smart-QA-container").remove();

        // 判断本地全局变量classObj是否存在other 和all，如果有用存好的，没有就调用ajax；
        // other : 当是 意见反馈 时;
        // all : 当是 校园精灵 时；
        // 更改 校园精灵 和 意见反馈 来切换 所有分类picker的内容
        if (text == "意见反馈" || text == "校园精灵") {
            $("#picker3").text("所有分类").attr("setType",text == "意见反馈"?"class1":"class0");
            // $("#picker3").text("所有分类").attr("setid", "1");
            // console.log("text = " , text);

            // if (classObj["other"] && classObj["all"]) {
            //     console.log("都有");
            //     screen_list.class = text == "意见反馈" ? classObj["other"] : (text == "校园精灵" ? classObj["all"] : "");
            // } else {
            //     console.log("不全都有");
            //     feedbackMGT.checkQuestionCategory(id);      // 在改变分类（class）的时候就会直接调用列表接口
            // }
        } else {
            pages = 1;
            feedbackMGT.qestions(1, pages, pagesize,"changeList");
        }
    });
}
// picker组件隐藏
function pickerHide() {
    lists.removeClass("smart-active");
}

// 更改 $("#picker3") 的值

function changeClassType() {
    let that = $(this);
    var questionid = that.attr("questionid");
    console.log(classObj);
    campus.popup({
        value: classObj.all, // classAll 假数据替换classObj.all
        type: "selectBtns",
        data: {
            val: $(this).text()
        }
    }, function(e) {
        console.log("e", e);
        that.text(e.val).attr("setid", e.id);
        feedbackMGT.updateQestion(e.id, questionid);
    });
}
// scroll 事件
var scrollState = true;
var option = {
    id: "wrapper",
    pullDown: function() {
        $(".smart-iScroll-container li").remove();
        n = 3;
        feedbackMGT.qestions(1, 1, pagesize);
        wrapper.refresh();
    },
    pullUp: function() {
        if (scrollState) {
            scrollState = false;
            setTimeout(function() {
                // 加载 ... 
                console.log("加载 ... ");
                feedbackMGT.qestions(2, ++pages, pagesize);
                
            }, 1000);
        }
    }
}
var data = {
    "states": [{
            "key": 0,
            "value": "全部"
        }, {
            "key": 1,
            "value": "未回答"
        }, {
            "key": 2,
            "value": "已回答"
        }],
    "types": [
        {
            "categorys": [{
                    "key": "598a74e93caa2a1c7c000eb8",
                    "value": "学习类"
                }, {
                    "key": "598a74e93caa2a1c7c000eba",
                    "value": "教务类"
                }, {
                    "key": "598a74e93caa2a1c7c000ebc",
                    "value": "就业类"
                }],
            "key": 0,
            "value": "校园精灵"
        }, 
        {
            "categorys": [{
                    "key": "59ffbbe409e5ad2aa0bd7b11",
                    "value": "666777"
                }],
            "key": 1,
            "value": "意见反馈"
        }]
}
loadMore.scroll(option);

// 1、图书管家，已完成。 用时（3.5天）；
// 2、特别图书馆页面已经完成，剩余js脚本问题；用时（1天）；
// 3、修改问答管理ajax 用时（0.5天）；

successFn(data,lists);
// success ajax 成功执行方法
function successFn(data) {
    // 分别设置picker
    for(var f of lists){
        // console.log(f);
        var type = $(f).attr("setType");
        var _data;
        switch (type){
            case "states":
                _data = data[type];
                setDefualt($(f),_data,type);
            break;
            case "types": 
                _data = data[type];
                setDefualt($(f),_data,type);
            break;
            case "class0": // 校园精灵
                _data = data["types"];
                setDefualt($(f),_data,type);
            break;
            case "class1": // 意见反馈
                _data = data["types"];
                setDefualt($(f),_data,type);
            break;
        }
    }
    // 设置默认值
    function setDefualt(obj,data,type){
        // 第一部分 picker 默认值
        var key;
        var val;
        for(var e of data){
            if(obj[0].id == "picker1" || obj[0].id == "picker2"){
                // picker1、picker2的默认值
                if(e.key == 1){
                    key = e.key;
                    val = e.value;
                }
                setDefualtArr(data,type);
            }else{
                // picker3的默认值
                key = 1;
                val = "所有类型";
                
                setDefualtArr(data[0].categorys,"class0");
                setDefualtArr(data[1].categorys,"class1");
                
            }
        }
        obj.attr("key",key);
        obj.text(val);
    }
    function setDefualtArr(data,type){
        // 设置默认picker数组
        screen_list[type] = $.map(data, function(e, i) {
            return {
                "text": e.value,
                "id":e.key
            };
        });
    }

    // $.each(objs,function(i,e){
    //     // console.log(e);;
    //     for (var f of e){
    //         console.log(f);
    //         // var key = type != "class":data[type == "states"?"states":"types"][1].key:data["types"][1].categorys.key;
    //     }
    // })

    // for (var f of data[type]) {
    //     console.log(f);
    //     // 设置默认值
    //     var key = type != "class":data[type == "states"?"states":"types"][1].key:data["types"][1].categorys.key;
    //     console.log("key = ", key);
    //     // var value = type != "class": data[type == "states"?"states":"types"][1].value:data["types"][1].categorys.value;

    //     // if (f.Name === "Waite" || f.Name === "Feedback" || f.name == "所有分类") {
    //         // clickObj.text(value);
    //         // clickObj.attr(key);
    //     // }
    // }

    // var obj = $.map(type != "class"?data[type]:data[type].categorys, function(e, i) {
    //     console.log(e);
    //     return {
    //         "text": e.val
    //         "id":e.key
    //     };
    // })
    // screen_list[type] = obj;
    // // 绑定下拉选择的点击事件
    // lists.off().on("click", onClick);
    // return obj;
}

// 请求地址
var baseUrl = "/dlmu/feedbackmgt/";
// var urls ={
//     Qestions:baseUrl + "Qestions",      // list
//     IsAuthorization:baseUrl + "IsAuthorization",
//     QueryQuestionsState:baseUrl + "QueryQuestionsState",
//     QueryQuestionType:baseUrl + "QueryQuestionType",
//     CheckQuestionCategory:baseUrl + "CheckQuestionCategory",
//     UpdateQestion:baseUrl + "UpdateQestion"
// }
// 本地延迟3秒返回数据
var urls ={
    Qestions:"http://localhost:3000/",      // list
    IsAuthorization:"http://localhost:3000/",
    QueryQuestionsState:"http://localhost:3000/",
    QueryQuestionType:"http://localhost:3000/",
    CheckQuestionCategory:"http://localhost:3000/",
    UpdateQestion:"http://localhost:3000/",
}

console.error("检查: 请求的data.type ,把val删除换成type");
console.error("检查: successFn() 返回值");
console.error("检查: pickerState、state 等值是true 还是false");
mui.init();

var feedbackMGT = {
    // list
    qestions: function(count, pageindex, pagesize,changeList) {
        var data = {
            'categoryid': $("#picker3").attr('setid') == "1" ? " " : $("#picker3").attr('setid'),
            'pageindex': pageindex,
            'pagesize': pagesize,
            'questionstate': $("#picker1").attr('setid'),
            'type': $("#picker2").attr('setid')
        }
        
        ajaxList({
            url:"http://localhost:3000/",
            data:{
                type:$("#picker2").attr('setid') == "1"?"list1":"list"
            }
        },function(data){
            if (data.ret && data.data.length > 0) {
                if(changeList){
                    // 如果 changeList 存在并有值，说明是改变了下拉标签，就请空列表；
                    // 修改筛选条件要清空列表
                    $(".smart-QA-container").remove();
                }
                scrollState = true;
                console.log(data.data);
                getHtml = myMap(data.data);
                var html = []
                for (var i = 0; i < getHtml.length; i++) {
                    html.push(getDom(getHtml[i], $("#picker2").attr("setid")));
                }
                $(".smart-iScroll-container ul").append(html.join(""));
                $("body .classBtn").off().on("click", changeClassType);
                wrapper.refresh();
            }else {
                wrapper.refresh();
            }
        });
    },
    isAuthorization: function() {
        // $.post(urls.IsAuthorization, function(data) {
        //     if (!data.ret) {
        //         $("#feedback-admin-list").css("display", "none");
        //         $(".feedback-admin-notice").css("display", "block");

        //     } else {
                // settime = setInterval(function() {
                //     console.log(0)
                //     feedbackMGT.qestions(1, pages, pagesize);
                // }, 1000);
                feedbackMGT.queryQuestionsState();
                feedbackMGT.queryQuestionType();
                
        //     }
        // })
    },
    // state
    queryQuestionsState: function() {
        ajaxList({
            url:"http://localhost:3000/",
            data:{
                type:"state"
            }
        },function(data){
            if (data.ret) {
                successFn(data.data, "state");
            }
        });
    },
    //type
    queryQuestionType: function() {
        ajaxList({
            url:"http://localhost:3000/",
            data:{
                type:"type"
            }
        },function(data){
            if (data.ret) {
                let obj = successFn(data.data, "type");
                if(obj){
                    feedbackMGT.checkQuestionCategory($("#picker2").attr("setid"));
                }else{
                    console.err("successFn() 返回值 为",obj);
                }  
            }
        });
    },
    //class
    checkQuestionCategory: function(type) {
        var val = type =="1"?"class1":"class"
        ajaxList({
            url:"http://localhost:3000/",
            data:{
                type:val // 删除val
            }
        },function(data){
            if (data.ret && data.data != null) {
                let obj = successFn(data.data,val); 
                if(obj){
                    feedbackMGT.qestions(1, pages, pagesize);
                    var classType = $("#picker2").attr('setid') == "0" ? "all" : "other";
                    console.log("classType = " , classType);
                    classObj[classType] = obj;
                    console.log("classObj = " ,classObj)
                }else{
                    
                } 
            }
        })

        // $.post(urls.CheckQuestionCategory, { 'type': type }, function(data) {
        //     //console.log(data.ret);
        //     ////console.log(data.data.length);
        //     console.log(JSON.stringify(data.data));
        //     if (data.ret && data.data != null) {
        //         //successFn(data.data,"class"); 
        //         var classType = $("#picker2").attr('setid') == "0" ? "all" : "other";

        //         classObj[classType] = successFn(data.data, "class");
        //         
        //         console.log(classObj)
        //         $("body .classBtn").off().on("click", changeClassType);
        //         n++;
        //         //  feedbackMGT.qestionsnew(1,1,5);
        //         // console.log($("#picker2").attr('setid'));
        //         //var classType = $("#picker2").attr('setid') == "0" ? "all":"other";
        //         //classObj[classType] = successFn(data.data,"class");  
        //         pickerState = true;
        //     }

        //     return false;
        // });
    },
    updateQestion: function(categoryid, qestionid) {
        console.log(categoryid);
        console.log(qestionid);
        $.post(urls.UpdateQestion, { 'categoryid': categoryid, 'id': qestionid }, function(data) {
            if (data.ret) {
                mui.toast("修改成功！");
            }
            return false;
        });
    }

}

function timeFormatter(value) {

    var da = new Date(parseInt(value.replace("/Date(", "").replace(")/", "").split("+")[0]));

    return da.getFullYear() + "/" + (da.getMonth() + 1) + "/" + da.getDate() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds();

}


function ajaxList(option,callback,failCallBack){
    if(option.url){
        $.ajax({
            type: "POST",
            url: option.url,
            data: option.data,
            dataType: "json",
            success: function(data) {
                setTimeout(function(){
                    callback(data);
                },3000);
            },
            error: function(err) {
                // failCallBack("error = " + JSON.stringify(err));
            }
        })
    }
}