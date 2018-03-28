
// 本地存储 ================================================================
function setlocal() {
    this.saveDate = function(key, val) {
        localStorage.setItem(key, val);
    }
    this.delDate = function(key) {
        localStorage.removeItem(key);
    }
}

window.local = new setlocal();
// 创建侧边栏 ================================================================

function createAside(option) {
    var aside;
    if(!option.isHas){
        var container = '<aside></aside>';
        $("body").append(container);
        aside = $("aside");
    }else{
        aside = $("aside");
        aside.html("");
    }

    // 存储数据
    // local.saveDate("b123", 212312);
    
    var header = `<h2><label>${option.label}</label><button class="close"></button></h2>`;
    var fromHtml = getFromHtml(option.formType);
    var listHtml = getLiHtml(option.listType);

    aside.append(header);
    aside.append(fromHtml);
    aside.append(listHtml);
    
    switch (option.listType){
        case "list":
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            break;
        default:
            levelEventFn();  
            break;
    }
    // 关闭
    $("body").on("click","aside .close",function(argument) {
        aside.removeClass("show");
        setTimeout(()=>{
            aside.remove();
        },300)
       
    });
    // 显示
    aside.fadeIn(100,function(argument) {
        aside.addClass("show");
    });
    return aside;
}

// 选择form
function getFromHtml(type) {
    switch (type) {
        case "comment":
            return `<form action="">
                <input type="search" name="" placeholder="写下你的评论...">
                <button>搜索</button>`;
            break;
        case "search":
            return `<form action="">
                <input type="text" name="" placeholder="搜索联系人">
                <input type="submit" name="" value="搜索">
            </form>`;
            break;

    }
}

// 选择li
function getLiHtml(type, data) {
    switch (type) {
        case "comment":
            var html = [];
            for (var i = 0; i < 10; i++) {
                html.push(`<li>
                    <div class="list-header">
                        <img src="../../content/common/img/header.png">
                        <em>周红<i>回复</i>廖凡</em>
                        <i class="laud">16</i>
                    </div>
                    <p class="list-word">天气一天比一天冷，穿什么更时髦讲真我们已经没那么care了。要知道，最近oversize毛衣已经成为编辑部出勤率最高的员工了。</p>
                    <div class="comment-state">
                        <div>刚刚·<a class="comment-state-reply-btn">回复</a></div>
                        <form>
                            <input type="text" name="" placeholder="回复周一围">
                            <a class="state-laud">评论</a>
                            <a class="state-cancel" onclick="$(this).parent().prev().removeClass('none')">取消</a>
                        </form>
                    </div>
                </li>`);
            }

            return html.join("");
            break;
        case "laud":
            return ``;
            break;
        case "level":
            return `<div class='level-catalog'>
                <h3 class="">通讯录 <em></em></h3>
                <ul class="level-parent">
                    <li class="all"><i selectType=false></i>全部</li>
                    <li listType = "item"><i></i><p>总裁办公室</p></li>
                    <li listType = "item"><i></i><p>发展研究院</p></li>
                    <li listType = "item"><i></i><p>治理中心</p></li>
                    <li listType = "item"><i></i><p>资本经营中心</p></li>
                    <li listType = "item"><i></i><p>2c业务发展中心</p></li>
                </ul>
                <p class="person-sum">共162人</p>

            </div>`;
            break;
        case "list":
            return `
                <ul id="treeDemo" class="ztree showIcon"></ul>
                <p class="person-sum">共162人</p>`;
            break;

    }
}

// 通讯录选择 —— 事件 ================================================================

function levelEventFn(){
    var allBtn = $("body .level-catalog li.all i");
    var allLi = $("body .level-catalog li.all");
    var selectAllBtn = $("body .level-catalog li i");
    var selectLiAllBtn = $("body .level-catalog li:not(.all) p");
    var levelContainer = $("body .level-catalog");

    // 全选
    var queryAll = ".level-catalog li.all";
    $("body").off("click",queryAll).on("click",queryAll,function (argument) {
        var state = allBtn.attr("selectType");

        if(typeof allBtn.attr("selectType") === 'string'){
            state = JSON.parse(allBtn.attr("selectType"));
        }
        if(state){
            selectAllBtn.removeClass("active");
            allBtn.attr("selectType",false);
        }else{
            allBtn.attr("selectType",true);
            selectAllBtn.addClass("active");
        }
    });
    
    // 单选 (除了全选按钮)
    var queryNotAll = ".level-catalog li:not(.all) i";
    $("body").off("click",queryNotAll).on("click",queryNotAll,function (argument) {
        $(this).toggleClass("active");
        var allLength = selectAllBtn.not(allBtn).length;
        if(allLength === selectAllBtn.not(allBtn).parent().find(".active").length){
            allBtn.addClass("active").attr("selectType",true);
        }else{
            allBtn.removeClass("active").attr("selectType",false);
        }
    });

    // 创建2+层级列表
    var levelIndex = 1;
    var levelOldIndex;
    var levelList = [];
    var queryLevel = ".level-catalog li:not(.all)[listType='item'] p";
    $("body").off("click",queryLevel).on("click",queryLevel,function (){
        
        var ul = '<ul class="level-sub-'+levelIndex+'"></ul>';
        levelContainer.append(ul);
        // lis 假列表
        var lis = [
            '<li listType = "item"><i></i><p>部门1'+levelIndex+'</p></li>',
            '<li listType = "item"><i></i><p>部门2'+levelIndex+'</p></li>',
            '<li listType><i></i><p>周一围'+levelIndex+'</p></li>',
            '<li listType><i></i><p>张晋'+levelIndex+'</p></li>'];
        $(".level-sub-"+levelIndex).append(lis.join(''));

        levelList.push({
            levelIndex:0,
            levelName:$(this).text(),
            subtitle:"副标题副标题"+levelIndex
        });
        
        setTimeout(()=>{
            if(levelIndex <= 1){
                $('.level-parent').addClass("hide");
            }else{
                $(".level-sub-"+levelOldIndex).addClass("hide");
            }
            $(".level-sub-"+levelIndex).addClass("show");
            levelOldIndex = levelIndex;
            levelIndex++;

        },100);
        // 修改标题

        $('.level-catalog h3').html(levelList[levelIndex-1].levelName+' <em>'+levelList[levelIndex-1].subtitle+'</em>').addClass("back");
    });
    // 返回上一级
    // 
    $("body").on("click","h3.back",function (argument) {
        levelIndex--;
        levelOldIndex--;
        if(levelOldIndex == 0){
            $("h3.back").removeClass("back");
            $(".level-parent").removeClass("hide");
        }else{
            $(".level-sub-"+levelOldIndex).removeClass("hide");
            
        }
        $(".level-sub-"+levelIndex).remove();
        levelList.splice(levelList.length-1);
        var last = levelList.length-1;
        if(last >= 0){
            $('.level-catalog h3').html(levelList[last].levelName+' <em>'+levelList[last].subtitle+'</em>');
        }
        
    });
}

// 创建弹出层 ================================================================
function createPopupFn(option) {
    var alertObj;
    if(!$(".mask").length){
        $("body").append('<div class="mask"></div>');
    }
    if(!option.isHas){
        var container = '<div class="popupBox"></div>';
        $("body").append(container);
        popupBox = $(".popupBox");

    }else{
        popupBox = $(".popupBox");  
        popupBox.html("");  
    }

    popupBox.addClass('popup-'+option.type);
    popupBox.append(`<h2><label>${option.title}</label><button onclick='$(".popupBox,.mask").remove(0);'></button></h2>`);
    popupBox.append(getMainHtml(option));


    
    if(option.type == "share"){
        var areas = document.getElementById('textarea');
        makeExpandingArea(areas);
    }
    
    $('.popupBox,.mask').show(0);


}
function getMainHtml(option){
    switch (option.type){
        case "share":
            return '<div class="list-title">\
                    <h1>'+option.setData.name+'</h1>\
                    <img src="../../content/collection/img/inset.png" alt="">\
                </div>\
                <div class="expandingArea " id="textarea">\
                    <pre><span class="textarea-span"></span><br></pre>\
                    <textarea class="textarea" placeholder="推荐理由..." maxlength="120"></textarea>\
                </div>\
                <p class="font-statis">0/120</p>\
                <h3>选择推荐人</h3>\
                <ul>\
                    <li><img src="../../content/common/img/header.png"><a class="del"></a></li>\
                    <li><img src="../../content/common/img/head-1.png"><a class="del"></a></li>\
                    <li><img src="../../content/common/img/head-3.png"><a class="del"></a></li>\
                    <li class="add"></li>\
                </ul>\
                <div class="send popup-btns">\
                    <label><a></a>公开次推送</label>\
                    <button class="sendBtn">发送</button>\
                </div>';
        break;
        case "upload-photo":
            // 加载列表
            var classArr = [{ title: "汽车", num: 2 }, { title: "新闻1", num: 10 }, { title: "视频2", num: 17 }, { title: "互联网", num: 8 }, { title: "人工智能", num: 5 }, { title: "消费升级", num: 7 }, { title: "娱乐", num: 30 }, { title: "体育", num: 15 },{ title: "汽车", num: 2 }, { title: "新闻1", num: 10 }, { title: "视频2", num: 17 }, { title: "互联网", num: 8 }, { title: "人工智能", num: 5 }, { title: "消费升级", num: 7 }, { title: "娱乐", num: 30 }, { title: "体育", num: 15 }];
            var lis = '';
            for (var i = 0; i < classArr.length; i++) {
                lis+='<li>' + classArr[i].title + '(' + classArr[i].num + ')</li>';
            }
            return '<div class="files">\
                        <div class="file-add-btn"><input type="file" multiple/></div>\
                    </div>\
                    <div class="collapse-box">\
                        <h3 class="collapse-title">上传到：<em>互联网</em><button class="collapse-btn" onclick="toggleFadeCollapse(this)"></button></h3>\
                        <div class="collapse-container">\
                            <ul>\
                                <li class="active">全部分类(94)</li>'+lis+'\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="send popup-btns">\
                        <button class="upload-btn" onclick="uploadFn(this);">上传</button>\
                        <button class="upload-cancel" onclick=$(".popupBox,.mask").remove();>取消</button>\
                    </div>';
        break;
    }
}
// 类型 展开 和 收起 事件
function toggleFadeCollapse(obj){
    $(obj).toggleClass("active").parent().next(".collapse-container").stop().slideToggle(200);

}
// uploadFn 上传 按钮点击事件 ================================================================
var percentsObj = {};
var n = 0;
function uploadFn(obj){
    console.log("uploadFn 这里");
    
    // 判断 要上传的图片个数
    if($(".file").length>=1){
        $(".upload-container").removeClass("toggleShow");

        $.each($(".file"),function(i,e){
            var obj = {
                name:$("em",e).text(),
                src:$("img",e).attr("src"),
                size:$(e).attr("setSize"),
            }
            $(".upload-file-list").append(getUploadListHtml(obj));
            // window["currentIndex"] = i;
            // 启动 进度条（用 计时器 来 模拟，设置css 样式；percent 为百分比）
            // progressBar("start",i);
        });
        progressBar("start");
        $(".popupBox,.mask").remove(0);

    }else{
        console.log("长度为<1");
    }

    var data = {
        files:123
    }
}
// 设置 进度条 显示效果 百分比
var num = 0;
var startTime = 0;
var pauseTime = 0;
function progressBar(type,i){
    console.log('percent');
    
    var files = $(".upload-file-list .upload-file");
    for (var i = 0; i < files.length; i++) {
        
        // setTimeout(function(){
        //     num = i;
        //     console.log("num = " ,num);
        // },10);
        // percentsObj["percent"+i] = setInterval(setPercent,10); 
        // num++
        files.attr('startTime',startTime = new Date().getTime());
        files.eq(i).find(".bar-track").animate({
            width:"100%"
        },5000,function(){
            console.log("done1");
        });
    }

    // if(type == 'start'){
    //     console.log("progressBar= ",currentIndex);
    //     console.log("progressBar= ",i); 
    //     percentsObj["percent"+i] = setInterval(setPercent,10); 
    // }else if(type == "pause"){
    //     clearInterval(percentsObj["percent"+i]);
    // }
    
}
function setPercent(){
    
    var files = $(".upload-file-list .upload-file");

    console.log(num);


    if(n <= 1000){
        files.eq(num).find(".bar-track").css('background-size', (n/10) + '% 100%' ); 
        // $(".bar-track").css('background-size', (n/10) + '% 100%' )     
    }else{
        console.log(" > 1000 停止")
        // progressBar(currentIndex,"pause")
        clearInterval(percentsObj["percent"+num]);
    }   
    n++;
}
// 获取上传列表的html结构
function getUploadListHtml(options){
    return (function(){
        var html = '<div class="upload-file">\
            <div class="upload-img">\
                <img src="'+options.src+'" alt="">\
            </div>\
            <div>\
                <div class="upload-info">\
                    <p>'+options.name+'</p>\
                    <em class="file-size">'+options.size+'</em>\
                    <div class="bar-range">\
                        <div class="bar-track"></div>\
                    </div>\
                </div>\
                <div class="upload-edit">\
                    <em class=""></em>\
                    <em class="paused"></em>\
                    <em class="close"></em>\
                </div>\
            </div>\
        </div>';
        // <em class="start"></em>
        // <em class="paused"></em>
        // <em class="close"></em>
        return html;
    })()
}

// 输入框自动调整高度 ================================================================
function makeExpandingArea(container) {
    if(!container) return false;
    var area = container.querySelector('.textarea');
    var span = container.querySelector('.textarea-span');
    if (area.addEventListener) {
        area.addEventListener('input', function() {
            span.textContent = area.value;
            fontStatis($(area).val());
        }, false);
        span.textContent = area.value;
    } else if (area.attachEvent) {
        area.attachEvent('onpropertychange', function() {
            var html = area.value.replace(/\n/g, '<br/>');
            span.innerText = html;
            fontStatis($(area).val());
        });
        var html = area.value.replace(/\n/g, '<br/>');
        span.innerText = html;

    }
    if (window.VBArray && window.addEventListener) { //IE9
        area.attachEvent("onkeydown", function() {
            var key = window.event.keyCode;
            if (key == 8 || key == 46) {
                span.textContent = area.value;
                fontStatis($(area).val());
            }

        });
        area.attachEvent("oncut", function() {
            span.textContent = area.value;
            fontStatis($(area).val());
        }); //处理粘贴
    }

    function fontStatis(val){
        $(".font-statis").html(val.length+'/120');
    }
    
    container.className += "active";
}



// function inputFn(obj){
//     console.log(obj.getAttribute("maxlength"));
//     console.log($(obj).text())
//     if(obj.innerHTML.length < obj.getAttribute("maxlength")){
//         $('.font-statis').text(obj.innerHTML.length+'/120');
//     }else{
//         obj.setAttribute("contenteditable",false);
//     }
// }
// (function(win){
//     function a(){
//         // 隐藏属性
//         this._abc = 11;
//         // 公开属性
//         return {
//             f1:22*this._abc,
//             f2:123
//         }
//     }
//     win.a1 = new a();
// })(window)

// console.log(a1);
