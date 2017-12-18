$(function(){
	// 审核通过 or 不通过 点击事件
	$("body").on("click",".contrast-img button",function(){
		var that = $(this);
		// 对比图片为空 就 return fasle
		if(!$(".contrast-img a").attr("href")) return false;

		if($(this).text() == "通过"){
			// 审核通过
			console.log('通过');
			// 认证结果 插入dom结构
			var html = getHtml({
				img:that.parent().prev().find("img").attr("src"),
				msg:"自动审核通过",
				persong:"李四",
				studentID:12541245211,
				time:"2017/12/12 12:12",
				RegistrationID:1,
				Approved:123
			});
			$(".examine-result li:first-child").before(html);
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
	// 审核不通过 信息发送
	$("body").on("click",".sendBtn",function(){
		console.log("发送");
		html = getHtml({
			img:$(".contrast-img img").attr("src"),
			msg:$(".input-box input[type=text]").val(),
			persong:"李四",
			studentID:12541245211,
			time:"2017/12/12 12:12",
			RegistrationID:1,
			Approved:false
		});

		$(".examine-result li:first-child").before(html);
		$(".smart-content").toggleClass("input-show");
	});
	/**
	 * [html description]
	 * @param  {[type]} option 								[description]
	 * @param  {String} img 									[图片地址 或者 base64]
	 * @param  {String} msg 									[审核结果 信息]
	 * @param  {String} person 								[被审核人]
	 * @param  {Num or Str} studentID 				[学号]
	 * @param  {String} time 									[时间]
	 * @param  {Num or Str} RegistrationID 		[申请ID]
	 * @param  {boolean} Approved 						[默认是true]
	 * @return {String} html     							[description]
	 */
	function getHtml(option){
		console.log(option);
		let Approved = option.Approved === undefined?true:option.Approved;
		if(Approved){
			// 替换 “使用中” 的图片
			$(".using-img a").attr("href",option.img).find("img").attr("src",option.img);
		}
		// 删除比对照片
		$(".contrast-img a").attr("href","").find("img").remove();
		// 先销毁 baguetteBox；
		baguetteBox.destroy();
		// 在运行 baguetteBox；
		baguetteBox.run('.baguetteBox');

		return `<li RegistrationID=${option.RegistrationID}>
              <div>
                <img src="${option.img}" alt="">
              </div>
              <p>${option.time}<span>${option.persong +"("+option.studentID+")" +  " " + option.msg}</span></p>
            </li>`;
	}

});