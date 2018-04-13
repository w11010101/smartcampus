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
    console.dir(this);
    var _this = $(this);

    $(this).parent().fadeOut(100,function(){
    	$(this).remove();
        if($("input[type=file]").length){
            for(var i = 0;i<filearr.length;i++){
                if(filearr[i].name == _this.prev().text()){
                    filearr.splice(i,1);
                }
            }
        }
        console.log(filearr);
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
$("body").on("click",".header-right .upload-file",function(){
	createPopupFn({
        title:"上传文件",
        type:"upload-photo",
        isHas:$(".popupBox").length?true:false,
    });
    $(".popup-box").stop().fadeOut(200).removeClass('show');
});
// 上传照片 ================================================================
$("body").on("click",".upload-photo",function(){
	createPopupFn({
        title:"上传照片",
        type:"upload-photo",
        isHas:$(".popupBox").length?true:false,
        uploadType:"multiple"
    })
    $(".popup-box").stop().fadeOut(200).removeClass('show');
});
// 上传照片 —— 上传到：***；
$("body").on("click",".collapse-container li",function(){
	$(this).addClass("active").siblings().removeClass("active");
	$(".collapse-title em").text($(this).text());
});
// 监听 input file 的change 事件 （选择文件）

var filearr = [];
var formData = null;
$("body").on("change",".file-add-btn input[type=file]",function(){

    var files = $("input[type=file]")[0].files;
    console.log(files)
    for(var i=0;i<files.length;i++){
        filearr.push(files[i]);
    }

    var filePath = $(this).val();//读取图片路径  

    var imgObjs = $(this)[0].files;//获取图片

    $.each(imgObjs,function(i,e){
        var fr = new FileReader();
        fr.readAsDataURL(e);

        var arr = filePath.split('\\');  
        var fileName = arr[arr.length - 1];
        var size = (e.size/1024).toFixed(2);
        size = (parseFloat(size)>1000)?(parseFloat(size)/1024).toFixed(2)+"MB" : size+"KB";

        var options = {
            fr:fr,
            size:size,
            el:e,
            filePath:filePath
        }

        if(filePath.indexOf("jpg") != -1 || filePath.indexOf("JPG") != -1 || filePath.indexOf("PNG") != -1 || filePath.indexOf("png") != -1) {  
            FR_onLoad(options);
        }else if(filePath.indexOf("txt") != -1 ||filePath.indexOf("ppt") != -1||filePath.indexOf("pptx") != -1||filePath.indexOf("doc") != -1||filePath.indexOf("pdf") != -1||filePath.indexOf("xls") != -1||filePath.indexOf("xlsx") != -1){
            FR_onLoad(options);
        }else if(filePath.indexOf("mp4") != -1 || filePath.indexOf("MP4") != -1||filePath.indexOf("RMVB") != -1||filePath.indexOf("rmbv") != -1||filePath.indexOf("avi") != -1||filePath.indexOf("AVI") != -1){
            var url = window.URL.createObjectURL($("input[type=file]")[0].files[0])
            console.log("视频文件");
            $(".files").prepend('<div class="file" setSize = '+ size+'>\
                <canvas id="myCanvas" width="90" height="90"></canvas>\
                <video class="file-video"><source src="'+url+'" type="video/mp4"></video>\
                <em>123</em><a class="del"></a></div>');
            var c = document.querySelector("#myCanvas");
            var v = document.querySelector(".file-video");
            var ctx = c.getContext("2d");
            v.addEventListener('canplay',function(){
                setTimeout(function(){
                    ctx.drawImage(v,0,0,90,90);
                    // 保存图片
                    var newImg = c.toDataURL("image/jpg");
                    $(v).attr("src",newImg);
                },1000);
            });

            
            
        }
    });
    function FR_onLoad(options){
        
        options.fr.onload = function() {
            if($(".files .file").length<12){
            
                $(".files").prepend('<div class="file" setSize = '+ options.size+'><img src="'+selectUploadImg(this,options.filePath)+'" alt="" /><em>'+options.el.name+'</em><a class="del"></a></div>');
            }else{
                return false;
            }
        }; 
    }
    setTimeout(function(){
        console.log("已有 = ",$(".files .file").length);
        if ($(".files .file").length>12) {
            
        }
    },1000);
    
});
// 上传图片选择
function selectUploadImg(obj,filePath){
    if(obj.result.indexOf('data:image') != -1){
        
        // 图片文件
        return obj.result;
    }else{
        // 除 图片文件 以外的 其他的文件
        var fileType = filePath.split(".")[filePath.split(".").length-1];
        switch (fileType){
            case "txt":
                return '../../content/common/img/Group 3@3x.png';
            break;
            case "doc":
                return '../../content/common/img/word@3x.png';
            break;
            case "xlsx":
                return '../../content/common/img/Group 4@3x.png';
            break;
            case "xls":
                return '../../content/common/img/Group 4@3x.png';
            break;
            case "pdf":
                return '../../content/common/img/Group@3x.png';
            break;
            case "ppt":
                return '../../content/common/img/Group 5@3x.png';
            break;
            case "pptx":
                return '../../content/common/img/Group 5@3x.png';
            break;
        }
        console.log(fileType);
    }
    console.log(obj)
}
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

$(".toggle-fade-btn").on("click",function(){
    $(".upload-container").toggleClass("toggleShow");
});

// 上传任务 开始 按钮 点击 事件 *******
$("body").on("click",".start",function(){
    console.log("start btns");
    var thisP = $(this).parents('.upload-file');
    var i = thisP.index();
    // 停止时间
    var PT = thisP.attr("pauseTime");
    // 开始时间
    var ST = thisP.attr("startTime");
    // 剩余时间
    var surplusDiff = longTime - thisP.attr("runTime");
    // 设置 当前任务的 暂停时间
    thisP.attr("startTime",new Date().getTime());
    thisP.find(".bar-track").animate({
        width:"100%",
    },surplusDiff,"linear",function(){
        console.log("done2");
        thisP.find(".paused").removeClass('paused');
        thisP.find(".close").removeClass('close');
        thisP.find(".refresh").removeClass('refresh');
        thisP.find(".upload-edit-em").eq(0).removeClass('pause cancel').addClass("done");
    });
    thisP.find(".upload-edit-em").eq(0).removeClass('pause');
    $(this).removeClass('start').addClass('paused');
});

// 上传任务 暂停 按钮 点击 事件 *******
$("body").on("click",".paused",function(){
    console.log("paused btns");
    var thisP = $(this).parents('.upload-file');
    var i = thisP.index();

    // 设置 当前任务的 暂停时间
    thisP.attr('pauseTime',new Date().getTime()).find(".bar-track").stop();
    
    // 停止时间
    var PT = thisP.attr("pauseTime");
    // 开始时间
    var ST = thisP.attr("startTime");

    // 设置 截止到现在运行了多长时间
    thisP.attr("runTime",parseInt(thisP.attr("runTime")) + (PT - ST));

    $(this).parents('.upload-file').attr('startTime');

    $(this).removeClass('paused').addClass('start');

    thisP.find(".upload-edit-em").eq(0).addClass("pause");

});

// 上传任务 重新下载 按钮 点击 事件   *******
$("body").on("click",".refresh",function(){
    console.log("refresh btns");
    $(this).removeClass('refresh').addClass('close');
    var thisP = $(this).parents('.upload-file');
    thisP.find(".upload-edit-em").eq(1).addClass('paused');
    thisP.find(".upload-edit-em").eq(0).removeClass('cancel');
    thisP.attr("startTime",new Date().getTime());
    // 停止时间
    var PT = thisP.attr("pauseTime");
    // 开始时间
    var ST = thisP.attr("startTime");
    // 剩余时间
    var surplusDiff = longTime - thisP.attr("runTime");
    thisP.find(".bar-track").animate({
        width:"100%",
    },surplusDiff,"linear",function(){
        console.log("done3");
        console.log(thisP);
        thisP.find(".paused").removeClass('paused');
        thisP.find(".close").removeClass('close');
        thisP.find(".refresh").removeClass('refresh');
        thisP.find(".upload-edit-em").eq(0).removeClass('pause cancel').addClass("done");
        
    });

});

// 上传任务 取消 按钮 点击 事件 *******
$("body").on("click",".close",function(){
    console.log("close btns");
    
    var thisP = $(this).parents('.upload-file');
    thisP.find(".upload-edit-em").eq(1).removeClass('start paused');
    
    thisP.attr("startTime",0).attr("pauseTime",longTime).attr("runTime",0);

    thisP.find(".bar-track").finish().animate({
        width:"0%",
    },0,"linear",function(){
        thisP.find(".upload-edit-em").eq(0).removeClass('pause done').addClass("cancel");
        thisP.find(".upload-edit-em").eq(2).removeClass('close').addClass('refresh');
    });
    
});

