(function(win) {
    // 本地存储 ================================================================
    function setlocal() {
        this.saveDate = function(key, val) {
            localStorage.setItem(key, val);
        }
        this.delDate = function(key) {
            localStorage.removeItem(key);
        }

    }
    win.local = new setlocal();
    // 收藏页面的 添加按钮 ================================================================
    var add = $(".header-right > div");
    add.on("click",function () {
        if($(".popup-box",this)){
            $(this).siblings().find(".popup-box").fadeOut(200).removeClass('show');
            $(".popup-box",this).fadeIn(200).addClass('show');
        }
    });

    // 推荐页面的 搜索按钮 ================================================================

    var content = $(".content");
    var input = $(".header-search-btn input");
    var searchBtn = $(".header-search-btn button");
    var list = $(".list");
    input.on("input", function() {
        if (this.value.length > 0) {
            searchBtn.addClass("active").attr("disabled", false);
        } else {
            searchBtn.removeClass("active").attr("disabled", true);
        }
    });
    // 推荐页面的 搜索按钮 点击事件
    searchBtn.on("click", function(argument) {
        console.log("添加收藏！！！");
        // list.prepend(collcetionHtml());
        input.val("");
        searchBtn.removeClass("active").attr("disabled", true);
    });
    // 要插入的列表dom结构
    // function collcetionHtml(data) {
    //     return '<li><a href="article.html">\
    //     <div class="list-title">\
    //         <h1>腾讯金融学院成立，致力成为培养互联网与金融11111111111</h1>\
    //         <img src="../../content/collection/img/inset.png" alt="">\
    //     </div><div class="list-source">\
    //         <img src="../../content/common/img/Bitmap@2x.png" alt="">\
    //         <p>微信</p>\
    //         <em>刚刚</em>\
    //         <i>互联网</i>\
    //         <div class="tool">\
    //             <button class="collection-btn"></button>\
    //             <button class="share-btn"></button>\
    //         </div></div></a></li>';
    // }
    // 分类选择 ================================================================
    // 
    var classArr = [{ title: "汽车", num: 2 }, { title: "新闻", num: 10 }, { title: "视频", num: 17 }, { title: "互联网", num: 8 }, { title: "人工智能", num: 5 }, { title: "消费升级", num: 7 }, { title: "娱乐", num: 30 }, { title: "体育", num: 15 }];
    var selectBtn = $(".select-type button");
    var tips = $('.tips');
    var tipsUl = $(".tips ul");
    var tipsMask = $(".tips-mask");
    selectBtn.on("click", function() {
        tips.show(0);
        tipsMask.show(0);
        if ($("li", tipsUl).length <= 1) {
            for (var i = 0; i < classArr.length; i++) {
                tipsUl.append('<li>' + classArr[i].title + '(' + classArr[i].num + ')</li>');
            }
        }
    });
    // 类型选择 ================================================================
    $("body").on("click", ".tips-content li", function function_name(argument) {
        tipsMask.hide(0);
        tips.hide(0);
        selectBtn.text($(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    });



    // 侧边栏评论 ================================================================
    $("body").on("click", ".comment-state-reply-btn", function(argument) {
        $(this).parent().addClass("none");

    });
    // 通讯录列表 ================================================================

    $(".header-maillist-btn").on("click", function() {
        createAside({
            label: "新中新集团",
            formType: "search",
            listType: "list",
            isHas:$("aside").length?true:false
        });
    });
    // 通知提示框 ================================================================

    $(".header-message-btn").on("click", function() {
        // createProp();
    });

    // function createProp() {
    //     var container = `<div class="prop">
    //                 <div class="prop-content">
    //                     <ul class="list">
    //                     </ul>
    //                     <!--  -->
    //                     <a href="share-notice.html" class="inform">查看全部通知</a>
    //                 </div>
    //             </div>`;
    //     var li = `<li>
    //             <a href="#n">
    //                 <div class="list-header">
    //                     <img src="../../content/common/img/header.png">
    //                     <em>周红</em>
    //                     <p>推荐给战略文章集等推荐给战略文章集等</p>
    //                     <i>刚刚</i>
    //                 </div>
    //                 <p class="list-word">天气一天比一天冷，穿什么更时髦讲真我们已经没那么care了。要知道，最近oversize毛衣已经成为编辑部出勤率最高的员工了。</p>
    //             </a>
    //         </li>`;

    //     if (!$(".prop").length) {
    //         content.append(container);
    //         var prop = $(".prop");
    //         prop.show(0).css("z-index", 1001);
    //         var ul = $(".prop .list");
    //         ul.append(li);
    //     }

        
    // }
    
    
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
    // 测试
    

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
    // popupBox ================================================================
    // 添加推荐人
    $("body").on("click",".popupBox .add",function(){
        createAside({
            label: "选择推荐人",
            formType: "search",
            listType: "level",
            isHas:$("aside").length?true:false
        });
    });
    // 删除联系人
    $("body").on("click",".popupBox .del",function(){
        console.log("del= " ,this);
        $(this).parent().fadeOut(100);
    });

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
})(window);

// 输入框自动调整高度
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

var areas = document.getElementById('textarea');
makeExpandingArea(areas);
// 隐藏 prop 、popup
$("body").on("click", function(event) {
    console.log($(".prop,.popup-box"));
    var eventP = $(event.target).parent();
    if(eventP.hasClass('header-message-btn') || eventP.hasClass('header-add-btn') || $(event.target).parents('.popup-box').hasClass('show')){

    }else{
        $(".prop,.popup-box").fadeOut(200).removeClass('show');
    }
    // if ($(event.target).parents(".prop").length <= 0 && $(event.target).parents(".header-message-btn").length <= 0) {
        
    // }
});
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

// console.log(a1)