$("#confirm").click(function(e) {
	$('.layer-zf').toggle();
	$('.layer-zf').animate({
		bottom: 0
	}, 300)
	e.stopPropagation();
	$(".backdrop").toggle();

});
$('.con-delete').click(function() {
	$('.layer-zf').animate({
		bottom: '-460px'
	}, 300);
	$(".backdrop").toggle();
	$('.layer-pwd').animate({
		bottom: '-460px'
	}, 300);
	setTimeout(function() {
		$('.layer-zf').css("display", "none");
		$('.layer-pwd').css("display", "none");
	}, 300)
});
$(".backdrop").click(function() {

	$('.layer-zf').animate({
		bottom: '-460px'
	}, 300)
	$(this).toggle();
	$('.layer-xyk').animate({
		bottom: '-300px'
	}, 300);
	$('.layer-pwd').animate({
		bottom: '-460px'
	}, 300);
	setTimeout(function() {
		$('.layer-zf').css("display", "none");
		$('.layer-xyk').css("display", "none");
		$('.layer-pwd').css("display", "none");
	}, 300)

});
// 更换支付方式
$(".list-back").click(function() {
	$(".backdrop").toggle();
	$('.layer-xyk').toggle();
	$('.layer-zf').animate({
		bottom: '-460px'
	}, 300);
	$('.layer-xyk').animate({
		bottom: '0px'
	}, 300);
	setTimeout(function() {
		$('.layer-zf').toggle()
	}, 300)
})
// 返回
$(".con-back").click(function() {
	$(".backdrop").toggle();
	$('.layer-zf').animate({
		bottom: '0px'
	}, 500);
	$('.layer-xyk').animate({
		bottom: '-300px'
	}, 300);
	setTimeout(function() {
		$('.layer-xyk').toggle();
		$('.layer-zf').toggle()
	}, 300)
})

//单选
$(".car-list .row").click(function(e) {
	var listdom = $(".car-list .row");
	//console.log($(this).text());
	$(".backdrop").toggle();
	$(this).addClass("active").siblings().removeClass("active");
	$("#zf_value").text($(this).text());
	$('.layer-xyk').animate({
		bottom: '-300px'
	}, 300);
	$('.layer-zf').animate({
		bottom: '0px'
	}, 500);
	setTimeout(function() {
		$('.layer-xyk').toggle();
		$('.layer-zf').toggle()
	}, 300)
})
$("#btn_jf").click(function() {
	$('.layer-zf').animate({
		bottom: '-460px'
	}, 300);
	$('.layer-pwd').animate({
		bottom: '0px'
	}, 500);
	setTimeout(function() {
		$('.layer-pwd').toggle();
		$('.layer-zf').toggle()
	}, 300)
});
$('.form_edit .num').click(function() {
	var oDiv = document.getElementById("numberval");
	var oDivHtml = oDiv.innerHTML;
	var b = oDivHtml.length
	if(b < 6 && b > -1) {
		oDiv.innerHTML += this.innerHTML;
		$(".con-number .row .col-xs-2").eq(b).text("·");
		if(b == 5 && $(numberval).text() == "666666") {
			console.log(IsPlus());
			if(IsPlus()) {
				hrefurl("zf-success.html");
			}else{
				location.href = "zf-success.html";
			}
		}else if(b == 5 && $(numberval).text() != "666666"){
			$.toast({
			    text: '您输入的密码错误 ',
			    showHideTransition: 'fade', // fade, slide or plain
			    allowToastClose: true, // Boolean value true or false
			    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
			    stack: false, 
			    position: 'bottom-center', 
			    textAlign: 'center',
			    loader: false,
			});
			$("#numberval").text("");
			$(".layer-pwd .con-number .row .col-xs-2").text("")
		}
	}
});
$('#remove').click(function() {
	var oDiv = document.getElementById("numberval");
	var oDivHtml = oDiv.innerHTML;
	var a = oDivHtml.length - 1
	oDiv.innerHTML = oDivHtml.substring(0, a);
	if(a > -1 && a < 6) {
		$(".con-number .row .col-xs-2").eq(a).text("")
	}
})