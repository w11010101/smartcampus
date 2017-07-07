(function() {
	// 帐号切换展示 （可以删掉）
	// 登没登录的样式，取决于body 的sign属性值；sign = 登录 ；noSignIn = 没登陆
	$(".smart-text[type=click]").on("click", function(e) {
		var b = $("body").attr("sign") == "signIn";
		$("body").attr("sign", b ? "noSignIn" : "signIn");

		if(b) {
			$(".smart-nms-info-name").text("还没有帐号，客观要申请哦~").append('<a href="anhao.html">申请</a>');
		} else {
			$(".smart-nms-info-name").text("黄蓉格格巫");
		}
	});
	// 表单验证

	$(".smart-input").on("blur", function(e) {
		var type = $(this).attr("inputType");
		var thisP = $(this).parent();
		var thisSure = thisP.find(".smart-icon-srue");
		var show = "smart-icon-show"; // input输入合格后的标识
		switch(type) {
			case "firstPWD":
				if($(this).val().length < 6) {
					thisSure.removeClass(show).hide(0);
				} else {
					thisSure.addClass(show).show(0);
				}
				break;
			case "refreshPWD":
				var fPW = $(".smart-input[inputType=firstPWD]").val();
				var rPW = $(".smart-input[inputType=refreshPWD]").val();
				if($(this).val().length == 6) {
					if(fPW == rPW) {
						tips("两次暗号 一致");
						$(".smart-btn").addClass("smart-btn-sure");
						// 按钮样式
						thisSure.addClass(show).show(0);
					} else {
						tips("两次暗号 不一致");
					}
				}
				break;
			default:

				break;
		}

	});
	// 删除键
	$(".smart-input").on("keyup", function(e) {
		var thisP = $(this).parent();
		var thisSure = thisP.find(".smart-icon-srue");
		var show = "smart-icon-show";
		if(e.keyCode == 8) {
			thisSure.removeClass(show).hide(0);
			$(".smart-btn").removeClass("smart-btn-sure");
		} else {
			var type = $(this).attr("inputType");
			if(type != "asscount") {
				var pass = /^[0-9]*$/;
				if(pass.test($(this).val())) {
					$(this).attr("password", $(this).val());
				} else {
					$(this).val($(this).attr("password"));
				}
			}
		}

	});
	$(".smart-btn").on("click", function(e) {
		e.preventDefault();
		var pw = $("input[type=password]");
		for(var i = 0; i < 2; i++) {
			if($(pw[i]).val().length == 0) {
				tips((i==0?"暗号":"确认暗号")+"不能为空~");
				break;
			}else if($(pw[i]).val().length < 6){
				tips((i==0?"暗号":"确认暗号")+"位数不足~");
				break;
			}
		}
		// 两次密码一致
		if($(this).hasClass("smart-btn-sure")){
			changePassword();
		}
	});
})();
// 修改暗号
function changePassword(){
	tips("两次密码一致");
}

function tips(val) {
	$.toast({
		text: val,
		allowToastClose: false, // Boolean value true or false
		hideAfter: 3000, // false to make it sticky or number 
		position: 'bottom-center',
		textAlign: 'center',
		loader: false
	});
}