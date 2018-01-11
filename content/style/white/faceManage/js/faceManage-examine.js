$(function(){
	/**
	 * [validTextOptions description]
	 * @属性      {类型}   属性名 [默认值] 说明
	 * @property  {Number} minLength      限制最少输入的字数
	 * @property  {Number} maxLength      限制最多输入的字数
	 * @property  {Number} showTipIndex   提示还剩多少字可输入的位置，应小于maxLengt，此示例表示“在输入40字后提示还可输入10个字”
	 * @property  {String} forbidden      允许输入的字符的正则表达式
	 * @example {String} forbidden /\w|\?|\!|\.|\,\。\~/ 允许输入字母数字下划线和[,.!。a-zA-Z0-9]
	 */
	var validTextOptions = {
	  minLength: 1,
	  maxLength: 50,
	  showTipIndex: 40,
	  allow: escape('[^\\w?!,.，。~]')
	}
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
			var userAgent = navigator.userAgent; 
			if(userAgent.indexOf('Android')>0){
				// android
				$(".smart-content").toggleClass("input-show");
				$(".input-box input").focus();
			}else if(userAgent.indexOf('iPhone')>0){
				// ios
				var setPrompt = prompt(JSON.stringify(validTextOptions),'请简要说明不通过的原因（不超过50个字）');
				if(setPrompt){
					// 等同于发送按钮
					
				}else{
					// 等同于点击遮罩层
					
				}
			}
		}
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
		var Approved = option.Approved === undefined?true:option.Approved;
		if(Approved){
			// 替换 “使用中” 的图片
			$(".using-img a").attr("href",option.img).find("img").attr("src",option.img);
		}
		// 删除比对照片
		$(".contrast-img a").attr("href","").find("img").remove();
		// 删除按钮
		$(".contrast-img .contrast-img-btns").remove();

		// 先销毁 baguetteBox；
		baguetteBox.destroy();
		// 在运行 baguetteBox；
		baguetteBox.run('.baguetteBox');

		return '<li RegistrationID='+option.RegistrationID+'><div><img src="'+option.img+'" alt=""></div><p>'+option.time+'<span>'+option.persong +"("+option.studentID+")" +  " " + option.msg+'</span></p></li>';
	}

});