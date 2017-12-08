// 校园卡对象 
var campus = function () {
	var that = this;
	// console.log(option);
	/*
	var option = {
		value:[1,2,3,4,5,6],	// 数组
		title:"标题",			// string
		type:"类型",			// 弹窗类型 keyboard,info,change,select 
		flow:true or false		// 业务流程回转 布尔值
		cancel:true or false	// 是否添加取消按钮 布尔值
		boxStyle:object			// popup-box的自定义样式，按照css的格式写就可以
		imgStype:object			// popup-box下h1(标题)的自定义样式，按照css的格式写就可以

	}
	*/
	var events = {
		box:"popup-box",
		mask:"popup-mask"
	}
	// 弹窗入口
	this.popup = function (option, callback) {
		var that = this;
		setTimeout(function(){
			// 快速点击导致多次弹出 popup-box
			var boxObj = $("."+events.box);

			if(!boxObj.length){
				// 
				var dom = that.getHtml(option, function (e) {
					callback(e);
				});
				campus.togglePopup("show", option.type);
			}else{
				if(option.type != "select") return false;
				var arr = option.value;
				boxObj.find("li").remove();
				for (var i in arr) {
					var val = typeof arr[i] == "object" ? arr[i].name : arr[i];
					var key = typeof arr[i] == "object" ? arr[i].key : arr[i];
					boxObj.find("ul").append('<li key="' + key + '" >' + val + '</li>');
				}
			}
		},500)
	};
	// 切换显示或隐藏弹窗层
	this.togglePopup = function (type, showType) {
		var box = $(".popup-box");
		var mask = $(".popup-mask");
		if (showType == "alert") {
			box.stop().fadeToggle(200);
		} else {
			box.stop().slideToggle(200);
		}
		if (type == "hide") {
			mask.stop().fadeOut(200, function () {
				$(this).remove();
				box.remove();
			});
			html = [];
		} else {
			mask.stop().fadeIn(200, function () {
				$(this).on("click", function () {
					campus.togglePopup("hide", showType);
				});
			});
		}
	};

	// 获取html结构
	this.getHtml = function (option, callback) {
		// 遮罩层
		var mask = $(".popup-mask").length <= 0 ? '<div class="popup-mask"></div>' : "";
		$("body").append('<div class="popup-box"></div>'+mask);
		var box = $(".popup-box").addClass("popup-"+option.type);
		switch (option.type) {
		case "keyboard":
			// 键盘
			
			box.append(this.keyboard(option));
			this.keyboardEvent(function (e) {
				callback(e);
			});
			break;
		case "info":
			// 支付信息
			box.append(this.info(option));
			this.infoEvent(function (e) {
					callback(e);
				}, option.flow) // 默认更改支付方式会继续调用change
			break;
		case "change":
			// 更换支付方式
			box.append(this.change(option));
			// 和选择一样
			this.selectsEvent(function (e) {
				callback(e);
			}, option.flow); // 默认更改支付方式会继续调用info

			break;
		case "select":
			// 选择列表
			box.append(this.selects(option));
			$(".popup-content .smart-loading").remove();
			var arr = option.value;
			for (var i in arr) {
				var val = typeof arr[i] == "object" ? arr[i].name : arr[i];
				var key = typeof arr[i] == "object" ? arr[i].key : arr[i];
				$(".popup-content ul").append('<li key="' + key + '" >' + val + '</li>');
			}
			this.selectsEvent(function (e) {
				callback(e);
			})
			break;
		case "alert":
			// 选择列表
			box.append(this.alert(option));
			// 配置css
			var boxStyle = option.boxStyle;
			if (boxStyle) $(".popup-alert").css(boxStyle);
			var img = option.title["img"];
			if (img) $(".popup-alert img").css(option.title.imgStyle);
			var content = option.content.contentStyle;
			if (content) $(".popup-alert p,.popup-alert h2").css(content);
			this.alertEvent(function(e){
				callback(e);
			});
			break;
		case "selectBtns":
			// 选择列表
			box.append(this.selectBtns(option));

			this.selectBtnsEvent(function (e) {
				callback(e);
			})
			break;
		}
		
		// 添加取消按钮
		var cancel = this.cancel(option);
		$(".popup-box").append(cancel);
		this.boxClose();
	};
	// 键盘html结构
	this.keyboard = function (option) {
		var html = [];
		option.title = "请输入密码";
		var title = this.title(option);
		html.push(title + '<div class="popup-content"><ul class="popup-password-box">');
		var x = i = 0;
		while (i < 6) {
			html.push('<li><em><em></li>'); //●
			i++;
		}
		html.push('</ul><ol class="popup-keyboard-nums">');
		while (x < 12) {
			x++;
			html.push('<li><button>' + (x == 10 ? "." : (x == 11 ? 0 : (x == 12 ? '' : x))) + '</button></li>'); 
		}
		html.push('</ol></div>');

		return html.join("");
	};
	// 键盘点击事件
	this.keyboardEvent = function (callback) {
		var val = [];
		$(".popup-keyboard-nums li").on("click", function () {
			var numBtn = $(".popup-keyboard-nums li:not(:last-child) button");
			if (val.length == 6) {
				numBtn.attr("disabled", true);
			}
			if ($(this).index() != 11 && $(this).index() != 9) {
				if (val.length < 6) {
					$(this).addClass('popup-active').siblings().removeClass("popup-active");
					val.push($(this).text());
					$(".popup-password-box li em").eq(val.length - 1).text("●");
				}
				if (val.length == 6) {
					var data = {
						password: val.join("")
					}
					callback(data);
					numBtn.attr("disabled", true);
				}
			} else {
				// 删除键
				if ($(this).index() != 9) {
					$(".popup-password-box li em").eq(val.length - 1).text(" ");
					numBtn.attr("disabled", false);
					val.splice(val.length - 1);
				}
			}
		});
	};
	// 选择html结构
	this.selects = function (option) {
		var html = [];
		var title = this.title(option);
		html.push(title + '<div class="popup-content"><ul>');
		html.push('<div class="smart-loading"><div class="smart-waiting"></div></div>');
		// var arr = option.value;
		// for (var i in arr) {
		// 	var val = typeof arr[i] == "object" ? arr[i].name : arr[i];
		// 	var key = typeof arr[i] == "object" ? arr[i].key : arr[i];
		// 	html.push('<li key="' + key + '" >' + val + '</li>');
		// }
		html.push('</ul></div>');
		return html.join("");
	};
	// 选择点击事件
	this.selectsEvent = function (callback, flow) {
		$(".popup-select li,.popup-change li").on("click", function () {
			var obj = this;
			$(this).addClass('popup-active').siblings().removeClass('popup-active');
			setTimeout(function () {
				that.togglePopup("hide");
				var data = {
					key: $(obj).attr("key"),
					name: $(obj).text()
				}
				if (flow) {
					campus.popup({
						type: "info",
						title: "确认支付",
						payType: data.name,
						money: "123123"
					}, function (data) {
						callback(data);
					});
					$(".popup-change").remove();
				} else {
					console.log(flow);
				}
				callback(data);
			}, 200);
		});
	};
	// 更改支付方式 change
	this.change = function (option) {
		// 判断对应图标
		var imgArr = [];
		var img = "";
		var html = [];
		var arr = option.value;
		for (var i in arr) {
			switch (arr[i]) {
			case "校园卡":
				img = "../../../content/style/common/images/wallet-1.png";
				break;
			case "电子账户":
				img = "../../../content/style/common/images/wallet-2.png";
				break;
			case "中国银行":
				img = "../../../content/style/common/images/BOC.png";
				break;
			case "支付宝":
				img = "../../../content/style/common/images/zfb.png";
				break;
			}
			imgArr.push(img);
		}

		var title = this.title(option);

		html.push(title + '<div class="popup-content"><ul>');
		for (var i in arr) {
			html.push('<li pay-type="' + option.payType + '"><img src="' + imgArr[i] + '" alt="">' + arr[i] + '</li>');
		}
		html.push('</ul></div>');
		return html.join("");
	};
	// 支付信息
	this.info = function (option) {
		var html = [];
		var title = this.title(option);
		html.push(title+'<div class="popup-content"><div class="popup-info-pay">' + (option.money || 0) + '</div><ul>');
		html.push('<li><label>缴费名称</label><em>' + (option.payName || '支付通用模版') + '</em></li><li><label>支付方式</label><em class="popup-info-changeBtn" popupType="change" popupFlow="true" >' + (option.payType || '电子账户') + '</em></li>');
		html.push('</ul><button popupType="keyboard">立即缴费</button></div>');
		return html.join("");
	};
	this.selectBtns = function(option){
		var html = [];
		html.push('<ul>');
		console.log(option);
		for(let f of option.value){
			console.log()
			html.push(`<li><button class="${f.text == option.data.val?'active':''}" setid ="${f.id}">${f.text}</button></li>`);
		}
    html.push('<ul>');
    return html.join("");
	}
	this.selectBtnsEvent = function(callback){
		$(".popup-selectBtns button").not(".active").on("click",function(){
			that.togglePopup("hide");
			callback({
				val:$(this).text(),
				id:$(this).attr("setid")
			});
		})
	}
	// 信息事件
	this.infoEvent = function (callback) {
		// 更换支付方式
		$(".popup-info-changeBtn").on("click", function () {

			change(this); // 调用更换支付方式
			$(".popup-info").remove();
		});
		// 立即缴费
		$(".popup-info button").on("click", function () {
			var data = {
				money: $(".popup-info-pay").text(),
				payName: $(".popup-info li").eq(0).find("em").text(),
				payNameId: "",
				payType: $(".popup-info li").eq(1).find("em").text(),
				payTypeId: "",
			}
			callback(data);
			keyboard(this);
			$(".popup-info").remove();
		});
	};
	// alert
	this.alert = function (option) {
		var html = [];
		var img = option.title["img"];
		var h1_val = img?(img.trim()?'<img src="' + img + '" alt="" style="">':option.title.val):option.title.val;
		html.push('<h1>' + h1_val + '</h1>');
		html.push('<h2>' + (option.content.title ||"") + '</h2>');
		html.push('<p>' + (option.content.val || "") + '</p>');
		var btns = option.btns;
		html.push('<div class="popup-alert-btn ' + ((btns.cancel||btns.cancelVal) ? "popup-alert-btns" : "") + '">');
		if(btns.order){
			html.push('<button class="popup-alert-sure">' + btns.sureVal + '</button><button class="popup-alert-cancel">' + btns.cancelVal + '</button>');
		}else{
			html.push('<button class="popup-alert-cancel">' + btns.cancelVal + '</button><button class="popup-alert-sure">' + btns.sureVal + '</button>');
		}
		
		html.push('</div>');
		return html.join("");
	}
	this.alertEvent = function (callback) {
		var data = new Object;
		$(".popup-alert-btn button").on("click",function(){
			data["type"] = $(this).hasClass("popup-alert-sure")?"sureBtn":"cancel";
			data["btn"] = $(this);
			data["box"] = $(this).parents(".popup-box");
			callback(data);
		});
		
	};

	// 滚动弹窗 
	// 集成mui.min.sj 和 mui.picker.js等先关js 和 css；
	
	
	// 关闭
	this.boxClose = function () {
		$(".smart-pay-close,.popup-cancel").on("click", function () {
			$(this).parents(".popup-box").remove();
			$(".popup-mask").fadeOut(200);
		})
	};
	// 添加标题
	this.title = function (option) {
		if (!option["title"]) return " ";
		if (option["title"].trim().length) {
			return '<div class="popup-head smart-border"><a class="smart-pay-close"></a><h1>' + option.title + '</h1></div>';
		} else {
			return;
		}
	};
	// 添加取消按钮
	this.cancel = function (option) {
		if (!option["cancel"]) return;
		$(".popup-box").addClass("popup-box-cancel");
		return '<button class="popup-cancel">取消</button>';
	};
	// 
	this.tips = function (val) {
		if ($(".jq-toast-wrap").length <= 0) {
			$.toast({
				text: val,
				allowToastClose: false, // Boolean value true or false
				hideAfter: 3000, // false to make it sticky or number 
				position: 'bottom-center',
				textAlign: 'center',
				loader: false
			});
		}
		// 当.jq-toast-wrap消失后删除掉，便可再次弹出提示；
		setTimeout(function(){
			$(".jq-toast-wrap").remove();
		},5000);
	};
}
var campus = new campus();
