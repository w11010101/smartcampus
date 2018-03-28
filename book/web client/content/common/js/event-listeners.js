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
// 推荐页面的 推荐功能 ================================================================
$("body").on("click",".share-btn",function(){
	console.log(0);
	createPopupFn({
        title:"推荐给朋友",
        type:"share",
        setData:{
            name:$(this).parents("li").find("h1").text()
        },
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
// 监听 input file 的change 事件
$("body").on("change",".file-add-btn input[type=file]",function(){
    var filePath = $(this).val();//读取图片路径  

    var imgObjs = this.files;//获取图片

    $.each(imgObjs,function(i,e){
        var fr = new FileReader();
        fr.readAsDataURL(e);
        if(filePath.indexOf("jpg") != -1 || filePath.indexOf("JPG") != -1 || filePath.indexOf("PNG") != -1 || filePath.indexOf("png") != -1) {  
            var arr = filePath.split('\\');  
            var fileName = arr[arr.length - 1];
            var size = (e.size/1024).toFixed(2);
            size = (parseFloat(size)>1000)?(parseFloat(size)/1024).toFixed(2)+"MB" : size+"KB";
            fr.onload = function() {
                if($(".files .file").length<12){
                    $(".files").prepend('<div class="file" setSize = '+ size+'><img src="'+this.result+'" alt="" /><em>'+e.name+'</em><a class="del"></a></div>')
                }else{
                    return false;
                }
            };  
        }
    });
      
    
});
// 文件列表 幻灯片 ================================================================

var pgwSlideshow = null;
if($('.pgwSlideshow').pgwSlideshow) {
    pgwSlideshow = $('.pgwSlideshow').pgwSlideshow();
    $('body').on("click",".file-list li",function(){
        $(".pgwSlideshow-fixed-box").fadeIn(200);
        pgwSlideshow.reload({
            maxHeight:600
        });
        pgwSlideshow.displaySlide($(this).index()+ 1);
    });  
}

// 上传容器 展开 & 折叠 ================================================================
// var percentsObj = {};
// var percentsArr = [];
// var n = 0;
$(".toggle-fade-btn").on("click",function(){
    $(".upload-container").toggleClass("toggleShow");
})
// percentsObj["percent"+i] = setInterval(setPercent,10);
// function setPercent(){
//     console.log("zhixingle jici ")
//     if(n <= 1000){
//         $(".bar-track").css( 'background-size', (n/10) + '% 100%' );      
//     }else{
//         // clearInterval(percentsObj["percent"+i]);
//     }   
//     n++;
// }
// 上传任务 开始 按钮 点击 事件
$("body").on("click",".start",function(){
    console.log("start btns");
    var thisP = $(this).parents('.upload-file');
    var i = thisP.index();
    var timeDiff = thisP.attr("pauseTime") - thisP.attr("startTime");
    console.log("pauseTime:",thisP.attr("pauseTime"), " - " ,"startTime:",thisP.attr("startTime")," = " , timeDiff);
    thisP.find(".bar-track").animate({
        width:"100%"
    },timeDiff,function(){
        console.log("done2");
    });
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    // 设置一个中间点击的时间
    
    $(this).removeClass('start').addClass('paused');
});
// 上传任务 暂停 按钮 点击 事件
$("body").on("click",".paused",function(){
    console.log("paused btns");
    var thisP = $(this).parents('.upload-file');
    var i = thisP.index();
    thisP.attr('pauseTime',new Date().getTime()).find(".bar-track").stop();

    $(this).parents('.upload-file').attr('startTime')

    $(this).removeClass('paused').addClass('start');

});
// 上传任务 重新下载 按钮 点击 事件
$("body").on("click",".refresh",function(){
    console.log("refresh btns");
    $(this).removeClass('refresh').addClass('close');
});
// 上传任务 取消 按钮 点击 事件
$("body").on("click",".close",function(){
    console.log("close btns");
    $(this).removeClass('close').addClass('refresh');
});

