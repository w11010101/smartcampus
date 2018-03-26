// 收藏页面的 添加按钮 ================================================================
$("body").on("click",".header-right > div > a",function () {
	var thisP = $(this).parent();
	if(thisP.find(".popup-box")){
		thisP.siblings().find(".popup-box").stop().fadeOut(200).removeClass('show');

		thisP.find(".popup-box").stop().fadeIn(200).addClass('show');
	}
});

// 推荐页面的 搜索按钮 ================================================================
var input = $(".header-search-btn input");
var searchBtn = $(".header-search-btn button");
input.on("input", function() {
    if (this.value.length > 0) {
        searchBtn.addClass("active").attr("disabled", false);
    } else {
        searchBtn.removeClass("active").attr("disabled", true);
    }
});
// 推荐页面的 搜索按钮 点击事件
searchBtn.on("click", function(argument) {
    input.val("");
    searchBtn.removeClass("active").attr("disabled", true);
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

$("body").on("click",".header-maillist-btn", function() {
    createAside({
        label: "新中新集团",
        formType: "search",
        listType: "list",
        isHas:$("aside").length?true:false
    });
}); 
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
    $(this).parent().fadeOut(100,function(){
    	$(this).remove()
    });
});
// 隐藏popup ================================================================
$("body").on("click", function(event) {
    var eventP = $(event.target).parent();
    if(eventP.hasClass('header-message-btn') || eventP.hasClass('header-add-btn') || $(event.target).parents('.popup-box').hasClass('show')){
    	console.log(123)
    }else{

        $(".popup-box").stop().fadeOut(200).removeClass('show');
    }

});
// 分类选择 ================================================================
// 
var classArr = [{ title: "汽车", num: 2 }, { title: "新闻", num: 10 }, { title: "视频", num: 17 }, { title: "互联网", num: 8 }, { title: "人工智能", num: 5 }, { title: "消费升级", num: 7 }, { title: "娱乐", num: 30 }, { title: "体育", num: 15 }];

var tips = $('.tips');
var tipsUl = $(".tips ul");
var tipsMask = $(".tips-mask");

var selectBtn = $(".select-type button");
selectBtn.on("click", function() {
    tips.show(0);
    tipsMask.show(0);
    if ($("li", tipsUl).length <= 1) {
        for (var i = 0; i < classArr.length; i++) {
            tipsUl.append('<li>' + classArr[i].title + '(' + classArr[i].num + ')</li>');
        }
    }
});
// 推荐页面的 推荐功能
$("body").on("click",".share-btn",function(){
	console.log(0);
	createPopupFn({
        title:"推荐给朋友",
        type:"share",
        isHas:$(".popupBox").length?true:false
    })
    $(".popup-box").stop().fadeOut(200).removeClass('show');
});
// 上传文件 ================================================================
$("body").on("click",".upload-file",function(){
	// createAside({
 //        label: "上传找",
 //        formType: "search",
 //        listType: "level",
 //        isHas:$("aside").length?true:false
 //    });
});
// 上传照片 ================================================================
$("body").on("click",".upload-photo",function(){
	console.log(0);
	createPopupFn({
        title:"上传照片",
        type:"upload-photo",
        isHas:$(".popupBox").length?true:false
    })
    $(".popup-box").stop().fadeOut(200).removeClass('show');
});
// 上传照片 —— 上传到：***；
$("body").on("click",".collapse-container li",function(){

	$(this).addClass("active").siblings().removeClass("active");
	$(".collapse-title em").text($(this).text());
});

// 
$('.pgwSlideshow').pgwSlideshow();