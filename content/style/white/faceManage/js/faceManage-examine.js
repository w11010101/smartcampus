$(function(){
	// 审核通过 or 不通过 点击事件
	$("body").on("click",".contrast-img button",function(){
		var that = $(this);
		if($(this).text() == "审核通过"){
			// 审核通过
			console.log('审核通过');
			// 认证结果 插入dom结构
			$(".examine-result li:first-child").before(html({
				img:that.parent().prev().find("img").attr("src"),
				msg:"自动审核通过",
				persong:"李四(12541245211)"
			}));
			that.parent().prev().find("a").attr("href","").find("img").hide(0);
			baguetteBox.destroy();
			baguetteBox.run('.baguetteBox');
		}else{
			// 不通过
			console.log('不通过');
			$(".smart-content").toggleClass("input-show");
			$(".input-box").focus();
		}
	});
	// 遮罩层 点击事件
	$("body").on("click",".smart-screen-mask",function(){
		console.log("遮罩层");
		$(".smart-content").toggleClass("input-show");
	});
	/**
	 * [html description]
	 * @param  {[type]} option [description]
	 * @param  {String} img 	[图片地址 或者 base64]
	 * @param  {String} msg 	[审核结果 信息]
	 * @param  {String} person 	[被审核人]
	 * @return {String} html     [description]
	 */
	function html(option){
		console.log(option);
		return `<li>
              <div>
                <img src="${option.img}" alt="">
              </div>
              <p>2017/10/14 12:12<span>${option.persong + " " + option.msg}</span></p>
            </li>`;
	}

});