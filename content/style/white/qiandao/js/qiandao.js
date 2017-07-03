// 上课签到
$(".smart-sign .smart-btn").on("click", function () {
	$("body").addClass("smart-signedIn");
	$(".smart-flag").text("正在上课");
	campus.tips("签到成功");
});
// 签到管理
$(".smart-sign-adm .row div").on("click", function () {
	$(this).addClass("active").siblings().removeClass("active");
});
// 随机选择
function select(obj) {
	var option = {
		type: $(obj).attr("popupType"),
		value: [10, 20, 30, 40, 50],
		cancel: true,
	};
	campus.popup(option, function (data) {
		console.log(data);
		window.location.href = "signAbs.html";
	});
}
// 签到 和 旷课的btn
$(".smart-sub-list-item button").on("click",function(){
 	$(this).addClass("active").siblings().removeClass("active");
})
// 手风琴
$('.panel-group').on('show.bs.collapse', function (e) {
	$(e.target).prev().toggleClass("active");
});

$('.panel-group').on('hide.bs.collapse', function (e) {
	$(e.target).prev().toggleClass("active");
});
// 弹窗 
$(".smart-alert button").on("click", function () {
	$(".smart-alert,.smart-screen-mask").fadeOut(200);
})
// 签到统计
$(".smart-list-item").on("click",function(){
	var href = $(this).attr("set-terget");
	console.log(href);
	if(href && ~href.indexOf(".html")){
		window.location.href = href;
	}
})