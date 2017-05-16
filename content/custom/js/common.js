// 开关按钮事件
$(".smart-switch div").on("click", function () {
	var thisP = $(this).parent();
	thisP.toggleClass("smart-active").attr("set-status", thisP.hasClass("smart-active") ? "on" : "off");
	if(thisP.attr("set-status")=="on"){
		thisP.parent().next().slideDown(200);
	}else{
		thisP.parent().next().slideUp(200);
	}
	
})

$(function () {
	// li点击跳转页面事件
	$(".smart-content ul li[set-terget]").on("click", function () {
		console.log("jump");
		var href = $(this).attr("set-terget");
		if (href.indexOf(".html") > 0) {
			window.location.href = href;
		}
	});
	// li点击选择
	$(".smart-list-check li").on("click", function () {
		console.log("check");
		$(".smart-icon-sure").removeClass("smart-active");
		$(".smart-icon-sure", this).toggleClass("smart-active");
		setTimeout(function () {
			window.history.back();
			// window.location.href = "set-quota.html?money=" + $(this)[0].innerText;
		}, 200)
	});
	// 输入框显示
	$(".smart-icon-eye").on("click",function(){
		var that = $(this);
		if(that.hasClass("smart-icon-eye-clear")){ //  清空
			that.prev("input").val("");
			that.removeClass("smart-icon-eye-clear");
		}else{
			that.toggleClass("smart-icon-eye-hide");
			if(!that.hasClass("smart-icon-eye-hide")){ // 隐藏还是显示
				that.prev("input").attr("type","number");
			}else{
				that.prev("input").attr("type","password");
			}
		}
	});
	$(".smart-input").on("blur",function(){
		if($(this).val() != ""){
			$(this).next().addClass("smart-icon-eye-clear");
		}
		$(".smart-input").each(function(i,e){
			console.log(e)
		})
	})

})
// 获取money，以及分型的地址  
// function GetRequest() {
// 	var url = location.search;
// 	console.log(url)
// 	var theRequest = new Object();
// 	if (url.indexOf("?") != -1) {
// 		var str = url.substr(1);
// 		//alert(str);  
// 		var strs = new Array();
// 		strs = str.split('&');
// 		var money = strs[0].substring(6);
// 		fxurl = (strs[1].substring(4)).trim();
// 		//alert(fxurl);  
// 		var view = money + "元";
// 		$("#jieguo1m").html(view);
// 	}
// }
// GetRequest();
