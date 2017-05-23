// 校园卡对象
var campus = function(){
	var html = [];
	// var this = this;
	var obj = {};
	// 弹窗层
	// this.popup = function(arr,callback){
	// 	html.push('<div class="camput-popup popup-box"><ul>');
	// 	for(var i in arr){
 //            html.push('<li>'+arr[i]+'</li>');
 //        }
 //        html.push('</ul></div><div class="smart-screen-mask"></div>');
	// 	if ($(".popup-box").length == 0) {
 //            $("body").append(html.join(" "));
 //        }
        
 // 		this.togglePopup("show");

 //        $(".popup-box li").on("click",function(){
 //            $(this).addClass('popup-active').siblings().removeClass('popup-active');
 //            this.togglePopup("hide");
 //            callback($(this));
 //        })
	// };
	// 隐藏弹窗层
	this.togglePopup = function(type){
		if(type == "hide"){
			$(".popup-box").slideUp(200,function(){
				$(this).remove();
			});
        	$(".popup-mask").fadeOut(200,function(){
        		$(this).remove();
        	});
        	html = [];
		}else{
			$(".popup-box").slideDown(200);
        	$(".popup-mask").fadeIn(200).off().on("click",function(){
				campus.togglePopup("hide");
			});
		}
	};
	this.popup_1 = function(option,callback){
		var dom = this.getHtml(option.type,function(e){
			callback(e);
		});
		dom += '<div class="popup-mask"></div>';
		$("body").append(dom);
		this.togglePopup("show");
	};
	this.getHtml = function(type,callback){
		switch (type){
			case "keyboard":
				// 键盘
				$("body").append(this.keyboard());
				this.keyboardEvent(function(e){
					callback(e);
				});
			break;
			case "info":
				// 支付信息
			break;
			case "change":
				// 更换支付方式
			break;
			case "select":
				// 单选列表
			break;
		}
		this.boxClose();
	}
	this.keyboard=function() {
        var html = [];
        html.push('<div class="popup-keyboard popup-box"><div class="popup-keyboard-head"><a class="smart-pay-close"></a><h1>请输入支付密码</h1></div><ul class="popup-password-box">');
        var x = i = 0;
        while (i < 6) {
            html.push('<li></li>'); //●
            i++;
        }
        html.push('</ul><ol class="popup-keyboard-nums">');
        while (x < 12) {
            x++;
            html.push('<li>' + (x == 10 ? "." : (x == 11 ? 0 : (x == 12 ? '<img src="../../../content/custom/img/delet-number.png" alt="">' : x))) + '</li>'); //●
        }
        html.push('</ol></div>');
        
        return html.join("");
    }
    this.keyboardEvent = function(callback){
    	var val = [];
		$(".popup-keyboard-nums li").on("click", function() {
            if ($(this).index() != 11 && $(this).index() != 9) {
                if (val.length < 6) {
                    $(this).addClass('popup-active');
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
    }
    this.boxClose = function() {
        $(".smart-pay-close").on("click", function() {
        	$(this).parents(".popup-box").remove();
        	$(".popup-mask").fadeOut(200);
        })
    }
    this.tips = function(val){
    	// if($(".jq-toast-wrap").length == 0){
	    	$.toast({
	            text: val,
	            allowToastClose: false, // Boolean value true or false
	            hideAfter: 3000, // false to make it sticky or number 
	            position: 'bottom-center',
	            textAlign: 'center',
	            loader: false
	        });
        // }
    }
}
var campus = new campus();