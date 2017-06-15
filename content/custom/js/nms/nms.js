(function(){
	$.toast({
	    text: "点击切换来展示页面效果",
	    allowToastClose: false, // Boolean value true or false
	    hideAfter: 3000, // false to make it sticky or number 
	    position: 'bottom-center',
	    textAlign: 'center',
	    loader: false
	});
	$(".smart-text[type=click]").on("click",function(e){
		var b = $("body").attr("sign") == "signIn" ;
		$("body").attr("sign",b?"noSignIn":"signIn");
		$(".smart-nms-info-name").text(b?"还没有帐号，客观要申请哦~":"黄蓉格格巫");
		// console.log(e);
		// 帐号切换展示
		
	});
})();