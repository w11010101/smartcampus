
// ****************** 以下为假的数据 可以删除  ************************ 
// 状态
var stateObj = {
    "data":[
        {
            "Name": "Default",
            "Desc": "全部分类",
            "Val": 0
        },
        {
            "Name": "Waite",
            "Desc": "未回答",
            "Val": 1
        },
        {
            "Name": "Done",
            "Desc": "已回答",
            "Val": 2
        }
    ]
}
// 其他
var classOther = {
    "data": [{
            "id": "598a74e93caa2a1c7c000eb8",
            "name": "所有分类",
            "state": 0,
            "images": [""],
            "type": 0
        }, {
            "id": "598a74e93caa2a1c7c000eba",
            "name": "功能意见",
            "state": 0,
            "images": [""],
            "type": 0
        }, {
            "id": "598a74e93caa2a1c7c000ebc",
            "name": "应用问题",
            "state": 0,
            "images": null,
            "type": 0
        }]
}
// 所有
var classAll = {
    "data": [{
            "id": "598a74e93caa2a1c7c000eb8",
            "name": "学习类",
            "state": 0,
            "images": [""],
            "type": 0
        }, {
            "id": "598a74e93caa2a1c7c000eba",
            "name": "生活类",
            "state": 0,
            "images": [""],
            "type": 0
        }, {
            "id": "598a74e93caa2a1c7c000ebc",
            "name": "综合类",
            "state": 0,
            "images": null,
            "type": 0
        }, {
            "id": "59ccaf1f72d61cd4b02171ca",
            "name": "一卡通",
            "state": 0,
            "images": [""],
            "type": 0
        }]
}
// 类型
var typeObj = {
    "data": [
    {
        "Name": "Fairy",
        "Desc": "校园精灵",
        "Val": 0
    },
    {
        "Name": "Feedback",
        "Desc": "意见反馈",
        "Val": 1
    }]
}
// list
var listObj = {
    "data": [{
            "id": "5a000096324ac62064d58d03",
            "title":"更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。\n苹果公司1980年12月12日",
            "questionersno": "admin498",
            "questionername": "巫行云",
            "category": "学习类",
            "answer": "标志性的测试",
            "creattime": "/Date(1509949590000)/",
            "positionx": null,
            "positiony": null,
            "businesscard": null,
            "telnumber": null,
            "answertime": "/Date(1511853813000)/",
            "repliername": "小超超1 ",
            "repliersno":"12312312312",
            "isanswer":true
        }, {
            "id": "5a0a5846324ac237785e63da",
            "title": "4年6月，苹果公司已经连续三年成为全球市值最大公司。苹果公司在2016年世界500强排行榜",
            "questionersno": "admin498",
            "questionername": "巫行云",
            "category": "一卡通",
            "answer": null,
            "creattime": "/Date(1510627398000)/",
            "positionx": null,
            "positiony": null,
            "businesscard": null,
            "telnumber": null,
            "answertime": "/Date(-62135596800000)/",
            "repliername": "王五",
            "repliersno":"12312312312",
            "isanswer":false
        }, {
            "id": "59fffe6d324ac220642ffc6a",
            "title": "这个APP炒鸡好玩这个APP炒鸡好玩这个APP炒鸡好玩",
            "questionersno": "admin498",
            "questionername": "巫行云",
            "category": "综合类",
            "answer": "车市车市",
            "creattime": "/Date(1509949037000)/",
            "positionx": null,
            "positiony": null,
            "businesscard": null,
            "telnumber": null,
            "answertime": "/Date(1510653343000)/",
            "repliername": "小超超2 ",
            "repliersno":"12312312312",
            "isanswer":true
        }, {
            "id": "5a00028e324ac62064d58d08",
            "title": "苹果公司（APPLE INC. ）是美国的一家高科技公司。由史蒂夫•乔布斯、斯蒂夫•沃兹尼亚克和罗•韦恩(RON WAYNE)等人于1976年4月1日创立，并命名为美国苹果电脑公司（APPLE COMPUTER INC. ），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。\n苹果公司1980年12月12日公开招股上市，2012年创下6235亿美元的市值记录，截至2014年6月，苹果公司已经连续三年成为全球市值最大公司。苹果公司在2016年世界500强排行榜中排名第9名。[1]  2013",
            "questionersno": "admin498",
            "questionername": "巫行云",
            "category": "生活类",
            "answer": "苹果公司（APPLE INC. ）是美国的一家高科技公司。由史蒂夫•乔布斯、斯蒂夫•沃兹尼亚克和罗•韦恩(RON WAYNE)等人于1976年4月1日创立，并命名为美国苹果电脑公司（APPLE COMPUTER INC. ），2007年1月9日更名为苹果公司，总部位于加利福尼亚州的库比蒂诺。",
            "creattime": "/Date(1509950094000)/",
            "positionx": null,
            "positiony": null,
            "businesscard": null,
            "telnumber": null,
            "answertime": "/Date(1510551987000)/",
            "repliername": "小超超  ",
            "repliersno":"12312312312",
            "isanswer":true
        }, {
            "id": "59fffddd324ac220642ffc69",
            "title": "还行",
            "questionersno": "admin498",
            "questionername": "巫行云",
            "category": "生活类",
            "answer": "测试车市666666666666",
            "creattime": "/Date(1509948893000)/",
            "positionx": null,
            "positiony": null,
            "businesscard": null,
            "telnumber": null,
            "answertime": "/Date(1510711960000)/",
            "repliername": "小超超    1 ",
            "repliersno":"12312312312",
            "isanswer":true
        }]
}

// ******************** end **************************
// 向下展开筛选
var screen_list = {
    state:["未回复", "已回复", "全部"],
    type:["校园精灵", "意见反馈"],
    class:["学习类","就业类","生活类"]
};
var lists = $(".smart-screen div[class^=col-xs]");
var picker;
var state = true;
var classObj = {};
var getHtml;
var pickerState = true;
// html 结构
function getDom(data,type){
    console.log(data)
    return `<li class="smart-QA-container smart-border-bottom">
          <div class="smart-Q">
            <h2>
              <span>${data.questionName}<i>（${data.questionNameNum}）</i></span>
              <em>${data.createTime}</em>
            </h2>
            <p>${data.q}</p>
          </div>
          ${data.isanswer?(function(){
            return `<div class="smart-A">
            <h2>
              <span>${data.answerName}<i>（${data.answerNameNum}）</i></span>
              <em>${data.answerTime}</em>
            </h2>
            <p>${data.a}</p>
          </div>`
          })():""}
          <div class="smart-A-btns">
            ${type ==1?(function(){
                return `<label>功能建议</label>`;
            })():(function(){
                return `<em class="classBtn">${data.category}</em>`;
            })()}
            <a class="smart-A-reviseBtn">${data.isanswer?"修改回复":"回复"}</a>
          </div>
        </li>`;
}
function myMap(data){
    return $.map(data,function(e,i){

        return {
            questionName:e.questionername,
            questionNameNum:e.questionersno,
            answerName:e.repliername,
            answerNameNum:e.repliersno,
            createTime:e.creattime,
            q:e.title,
            answerTime:e.answertime,
            a:e.answer,
            category:e.category,
            isanswer:e.isanswer
        }
    })
}
// 条件筛选点击事件
function onClick() {

    var type = $(this).attr("setType");
    var index = $(this).index();
    if(!picker){
        picker = new mui.PopPicker({
            layer: 1,
        });
    }
    // picker.setData： 配置picker插件
    picker.setData(screen_list[type]);
    $(this).toggleClass("smart-active");
    var that = $(this);
    pickerShow(that, index,type);
    state = false;
    // 遮罩层 和 取消按钮 绑定点击事件，取消smart-active样式
    $(".mui-backdrop,.mui-poppicker-btn-cancel").off().on("tap", function() {
        pickerHide();
    });
}
// picker组件显示
function pickerShow(obj, index,type) {
    picker.show(function(items) {
        console.log("items[0] = ", items[0]);
        pickerHide();
        let text = items[0].text;
        let id = items[0].id;
        obj.text(text);
        obj.attr("setId",id);
        // 加载数据
        $(".smart-iScroll-container li").remove();
        getAjaxList({
            url:"http://localhost:3000/",
            data: {
              type:"list",
            }
        },function(data){
            getHtml = myMap(data.data);
            for(var i = 0;i<getHtml.length;i++){
                $(".smart-iScroll-container ul").append(getDom(getHtml[i],$("#picker2").attr("setid")));
            }
            wrapper.refresh();
            scrollState = true;
        },function(){
          // failCallBacl
          console.log(3)
          getHtml = myMap(listObj.data);
            for(var i = 0;i<getHtml.length;i++){
                $(".smart-iScroll-container ul").append(getDom(getHtml[i],$("#picker2").attr("setid")));
            }
            $("body .classBtn").off().on("click",changeClassType);
            wrapper.refresh();
            scrollState = true;
        });
        
        // 判断本地全局变量classObj是否存在other 和all，如果有用存好的，没有就调用ajax；
        // other : 当是 意见反馈 时;
        // all : 当是 校园精灵 时；
        
        console.log(classObj)
        if(classObj["other"] && classObj["all"]){
            screen_list.class = text =="意见反馈"? classObj["other"]:(text =="校园精灵"?classObj["all"]:"");
        }else{
            // 更改 校园精灵 和 意见反馈 来切换 所有分类picker的内容
            changeClass(text);
        }
    });
}
// picker组件隐藏
function pickerHide(){
    lists.removeClass("smart-active");
    state = true;
}
function changeClass(text){
    let classType = text == "意见反馈"?"class1":(text == "校园精灵"?"class":"");
    // 更改类型
    getAjaxList({
        url:"http://localhost:3000/",
        data: {
          type:classType,
        }
    },function(data){
        classObj[classType == "class1"?"other":"all"] = successFn(data.data,"class");
    },function(){
      // failCallBack
      console.log(5);
      classObj[classType == "class1"?"other":"all"] = successFn(classType == "class1"?classOther.data:classAll.data,"class");
      $("body .classBtn").off().on("click",changeClassType);
    });
}
// 添加更改类型按钮事件

function changeClassType(){
    console.log($(this));
    let that = $(this);
    campus.popup({
        value:successFn(classAll.data,"class"), // classAll 假数据替换
        type:"selectBtns",
        data:{
            val:$(this).text()
        }
    },function(e){
        console.log(e);
        that.text(e.val).attr("setid",e.id);
    });
}   
// scroll 事件
var scrollState = true;
var option = {
    id:"wrapper", 
    pullDown:function (){
        wrapper.refresh();
    },
    pullUp:function (){
      if(scrollState){
        scrollState = false;
        setTimeout(function() {
            // 加载 ... 
            console.log("加载 ... ");
            getAjaxList({
                url:"http://localhost:3000/",
                data: {
                  type:"list",
                }
            },function(data){
                getHtml = myMap(data.data);
                for(var i = 0;i<getHtml.length;i++){
                    $(".smart-iScroll-container ul").append(getDom(getHtml[i],$("#picker2").attr("setid")));
                }
                // wrapper.refresh();
                scrollState = true;
            },function(){
                // failCallBacl
                console.log(3)
                getHtml = myMap(listObj.data);
                for(var i = 0;i<getHtml.length;i++){
                    $(".smart-iScroll-container ul").append(getDom(getHtml[i],$("#picker2").attr("setid")));
                }
                $("body .classBtn").off().on("click",changeClassType);
                // wrapper.refresh();
                scrollState = true;
            });
        }, 1000);
      }
    }
}

loadMore.scroll(option);

// success 
function successFn(data,type){
  var clickObj = type == "state"?$("#picker1"):(type == "type"?$("#picker2"):$("#picker3"));
  for(var f of data){
    if(f.Name === "Default" ||f.Name === "Feedback"  || f.name == "所有分类" ){
        clickObj.text(f.Desc || f.name);
        clickObj.attr("setId",f.Val);
    }
  }
  var obj = $.map(data,function (e,i){
    return {
        "text":type !== "class"?e.Desc:e.name,
        "id":type !== "class"?e.Val:e.id
    };
  })
  screen_list[type] = obj; 
  lists.off().on("click", onClick);
  return obj;
}

function getAjaxList(option,callback,failCallBack){
    if(option.url){
        $.ajax({
            type: "POST",
            url: option.url,
            data: option.data,
            dataType: "json",
            success: function(data) {
                callback(data);
            },
            error: function(err) {
                failCallBack("error = " + JSON.stringify(err));
            }
        })
    }
}

