// 校园卡对象
var campus = function(){
	var that = this;
	// console.log(option);
	/*
	var option = {
		value:[1,2,3,4,5,6],	// 数组
		title:"标题",			// string
		type:"类型",			// 弹窗类型 keyboard,info,change,select 
		flow:true or false		// 业务流程回转 布尔值
		cancel:true or false	// 是否添加取消按钮 布尔值
	}
	*/

	// 弹窗入口
	this.popup = function(option,callback){
		var dom = this.getHtml(option,function(e){
			callback(e); 
		});
		campus.togglePopup("show");
	};
	// 切换显示或隐藏弹窗层
	this.togglePopup = function(type){
		$(".popup-box").stop().slideToggle(200);
		if(type == "hide"){
			$(".popup-mask").stop().fadeOut(200,function(){
				$(this).remove();
				$(".popup-box").remove();
			});
        	html = [];
		}else{
			$(".popup-mask").stop().fadeIn(200,function(){
				$(this).on("click",function(){
					campus.togglePopup("hide");
				});
			});
		}
	};
	
	// 获取html结构
	this.getHtml = function(option,callback){
		// 遮罩层
		var mask = $(".popup-mask").length<=0?'<div class="popup-mask"></div>':"";
		switch (option.type){
			case "keyboard":
				// 键盘
				$("body").append(this.keyboard(option)+mask);
				this.keyboardEvent(function(e){
					callback(e);
				});
			break;
			case "info":
				// 支付信息
				$("body").append(this.info(option)+mask);
				this.infoEvent(function(e){
					callback(e);
				},option.flow) // 默认更改支付方式会继续调用change
			break;
			case "change":
				// 更换支付方式
				$("body").append(this.change(option)+mask);
				// 和选择一样
				this.selectsEvent(function(e){
					callback(e);
				},option.flow); // 默认更改支付方式会继续调用info

			break;
			case "select":
				// 选择列表
				$("body").append(this.selects(option)+mask);
				this.selectsEvent(function(e){
					callback(e);
				})
			break;
			case "alert":
				// 选择列表
				$("body").append(this.alert(option)+mask);
				// this.selectsEvent(function(e){
				// 	callback(e);
				// })
			break;
		}
		var cancel = this.cancel(option);
		$(".popup-box").append(cancel);
		this.boxClose();
	}
	// 键盘html结构
	this.keyboard=function(option) {
        var html = [];
        option.title = "请输入密码";
        var title = this.title(option);
        html.push('<div class="popup-keyboard popup-box">'+title+'<div class="popup-content"><ul class="popup-password-box">');
        var x = i = 0;
        while (i < 6) {
            html.push('<li></li>'); //●
            i++;
        }
        html.push('</ul><ol class="popup-keyboard-nums">');
        while (x < 12) {
            x++;
            html.push('<li>' + (x == 10 ? "." : (x == 11 ? 0 : (x == 12 ? '' : x))) + '</li>'); //●
        }
        html.push('</ol></div></div>');
        
        return html.join("");
    }
    // 键盘点击事件
    this.keyboardEvent = function(callback){
    	var val = [];
		$(".popup-keyboard-nums li").on("click", function() {
            if ($(this).index() != 11 && $(this).index() != 9) {
                if (val.length < 6) {
                    $(this).addClass('popup-active').siblings().removeClass("popup-active");
                    val.push($(this).text());
                    $(".popup-password-box li").eq(val.length - 1).text("●");
                }
                if (val.length == 6) {
                    var data = {
                        password: val.join("")
                    }
                    callback(data);
                }
            } else {
                // 删除键
                if ($(this).index() != 9) {
                    $(".popup-password-box li").eq(val.length - 1).text(" ");
                    val.splice(val.length - 1);
                }
            }
        })
    };
    // 选择html结构
    this.selects = function(option){
    	var html = [];
    	var title = this.title(option);
		html.push('<div class="popup-select popup-box">'+title+'<div class="popup-content"><ul>');
		var arr = option.value;
		for(var i in arr){
			console.log(arr[i]);
			var val = typeof arr[i] == "object"?arr[i].name:arr[i];
			var key = typeof arr[i] == "object"?arr[i].key:arr[i];
			
			// var val = typeof arr[i] == "string"?arr[i]:typeof arr[i] == "number"?arr[i]:arr[i].name;
			// var key = typeof arr[i] == "string"?arr[i]:arr[i].key;
            html.push('<li key="'+key+'" >'+val+'</li>');
        }
        html.push('</ul></div></div>');
        return html.join("");
	};
	// 选择点击事件
	this.selectsEvent = function(callback,flow){
		$(".popup-select li,.popup-change li").on("click",function(){
			var obj = this;
            $(this).addClass('popup-active').siblings().removeClass('popup-active');
            setTimeout(function(){
				that.togglePopup("hide");
				var data = {
	            	key:$(obj).attr("key"),
	            	name:$(obj).text()
	            }
	            if(flow){
	            	campus.popup({
	            		type:"info",
	            		title:"确认支付",
	            		payType:data.name,
	            		money:"123123"
	            	}, function(data) {
	            		callback(data);
				    });
				    $(".popup-change").remove();
	            }else{
					console.log(flow);
	            }
	            callback(data);
            },200);            
        })
	}
	// 更改支付方式 change
	this.change = function(option){
		// 判断对应图标
		var imgArr = [];
		var img = "";
		var html = [];
		var arr = option.value;
		for(var i in arr){
			switch (arr[i]){
				case "校园卡":
					img = "../../../content/custom/img/card.png";
				break;
				case "电子账户":
					img = "../../../content/custom/img/wallet-2.png";
				break;
				case "中国银行":
					img = "../../../content/custom/img/BOC.png";
				break;
				case "支付宝":
					img = "../../../content/custom/img/zfb.png";
				break;
			}
			imgArr.push(img);
		}

		var title = this.title(option);

		html.push('<div class="popup-change popup-box">'+title+'<div class="popup-content"><ul>');
		for(var i in arr){
			html.push('<li pay-type="'+option.payType+'"><img src="'+imgArr[i]+'" alt="">'+arr[i]+'</li>');
		}
		html.push('</ul></div></div>');
        return html.join("");
	};
	// 支付信息
	this.info = function(option){
		var html = [];
		var title = this.title(option);
		html.push('<div class="popup-info popup-box">'+title);
		html.push('<div class="popup-content"><div class="popup-info-pay">'+(option.money||0)+'</div><ul>');
		html.push('<li><label>缴费名称</label><em>'+(option.payName||'支付通用模版')+'</em></li><li><label>支付方式</label><em class="popup-info-changeBtn" popupType="change" popupFlow="true" >'+(option.payType||'电子账户')+'</em></li>');
		html.push('</ul><button popupType="keyboard">立即缴费</button></div></div>');
        return html.join("");
	}
	// 信息事件
	this.infoEvent = function(callback){
		// 更换支付方式
		$(".popup-info-changeBtn").on("click",function(){

			change(this); // 调用更换支付方式
			$(".popup-info").remove();
		})
		// 立即缴费
		$(".popup-info button").on("click",function(){
			var data = {
				money:$(".popup-info-pay").text(),
				payName:$(".popup-info li").eq(0).find("em").text(),
				payNameId:"",
				payType:$(".popup-info li").eq(1).find("em").text(),
				payTypeId:"",
			}
			callback(data);
			keyboard(this);
			$(".popup-info").remove();
		})
	}
	// alert
    this.alert = function(){
    	var html = [];
    	html.push('<div class="popup-info popup-box">');
    }
    // 关闭
    this.boxClose = function() {
        $(".smart-pay-close,.popup-cancel").on("click", function() {
        	$(this).parents(".popup-box").remove();
        	$(".popup-mask").fadeOut(200);
        })
    }
    // 添加标题
    this.title = function(option){
    	if(!option["title"]) return " ";
    	if(option["title"].trim().length){
    		// $(".popup-box").addClass("popup-box-head");
			return '<div class="popup-head"><a class="smart-pay-close"></a><h1>'+option.title+'</h1></div>';
		}else{
			return;
		}
    }
    // 添加取消按钮
    this.cancel = function(option){
    	if(!option["cancel"]) return;
    	console.log(option);
    	$(".popup-box").addClass("popup-box-cancel");
    	return '<button class="popup-cancel">取消</button>';
    }
    // 
    this.tips = function(val){
    	if($(".jq-toast-wrap").length <= 0){
	    	$.toast({
	            text: val,
	            allowToastClose: false, // Boolean value true or false
	            hideAfter: 3000, // false to make it sticky or number 
	            position: 'bottom-center',
	            textAlign: 'center',
	            loader: false
	        });
        }
    }

}
var campus = new campus();

