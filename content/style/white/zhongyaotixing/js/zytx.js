/*
 * 点击提示层消失
 */
$(".remind-back").click(function(){
	$(this).css("display","none");
})
//计算日历的html高度  calendar-bar
console.log($(".calendar-bar").height())
$(".roll-scroll").css("margin-top",$(".calendar-bar").height())
$("html,body").animate({scrollTop:$("#qy_name").offset().top},1000);//1000是ms,也可以用slow代替 