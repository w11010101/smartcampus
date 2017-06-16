(function(){
	// 帐号切换展示 （可以删掉）
	// 登没登录的样式，取决于body 的sign属性值；sign = 登录 ；noSignIn = 没登陆
	$(".smart-text[type=click]").on("click",function(e){
		var b = $("body").attr("sign") == "signIn" ;
		$("body").attr("sign",b?"noSignIn":"signIn");
		$(".smart-nms-info-name").text(b?"还没有帐号，客观要申请哦~":"黄蓉格格巫");
	});
	// 表单验证
	var val = /(^[a-z])[\w-/.]{5,15}/;

	$(".smart-input").on("blur",function(e){
		var type = $(this).attr("inputType");
		var thisP = $(this).parent();
		var thisSure = thisP.find(".smart-icon-srue");
		var show = "smart-icon-show"; // input输入合格后的标识
		switch (type){
			case "asscount":
				if(val.test($(this).val())){
					tips("帐号合法");
					thisSure.addClass(show).show(0);
				}else{
					tips("帐号不合法");
					thisSure.removeClass(show).hide(0);
				}
			break;
			default:
				if($(this).val().length<6) {
					thisSure.removeClass(show).hide(0);
				}else{
					thisSure.addClass(show).show(0);
				}
			break;
		}
		// 按钮样式；根据标识数量判断 并修改确认按钮样式
		if($("."+show).length == 3){
			$(".smart-btn").addClass("smart-btn-sure");
		}else{
			$(".smart-btn").removeClass("smart-btn-sure");
		}
	});
	// 删除键
	$(".smart-input").on("keyup",function(e){
		var thisP = $(this).parent();
		var thisSure = thisP.find(".smart-icon-srue");
		var show = "smart-icon-show";
		if (e.keyCode == 8) {
			
			thisSure.removeClass(show).hide(0);
		}
	});
	$(".smart-btn").on("click",function(e){
		e.preventDefault(); 
		var fBtn = $(".smart-input[inputType=firstPWD]");
		var rBtn = $(".smart-input[inputType=refreshPWD]");
		if(fBtn == rBtn){
			tips("两次暗号 一致");
		}else{
			tips("两次暗号 不一致");
		}
	})
		
})();
function tips(val){
	$.toast({
        text: val,
        allowToastClose: false, // Boolean value true or false
        hideAfter: 3000, // false to make it sticky or number 
        position: 'bottom-center',
        textAlign: 'center',
        loader: false
    });
}