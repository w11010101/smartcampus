$(function(){
	//
	
})
// 校园卡对象
var campus = function(){
	var html = [];
	var that = this;
	
	// 弹窗层
	this.popup = function(arr,callback){
		html.push('<div class="camput-popup smart-popup"><ul>');
		for(var i in arr){
            html.push('<li>'+arr[i]+'</li>');
        }
        html.push('</ul></div><div class="smart-screen-mask"></div>');
		if ($(".smart-popup").length == 0) {
            $("body").append(html.join(" "));
        }
        
 		that.togglePopup("show");

        $(".smart-popup li").on("click",function(){
            $(this).addClass('smart-active').siblings().removeClass('smart-active');
            that.togglePopup("hide");
            callback($(this));
        })
	};
	// 隐藏弹窗层
	this.togglePopup = function(type){
		if(type == "hide"){
			$(".smart-popup").slideUp(200,function(){
				$(this).remove();
			});
        	$(".smart-screen-mask").fadeOut(200,function(){
        		$(this).remove();
        	});
        	html = [];
		}else{
			$(".smart-popup").slideDown(200);
        	$(".smart-screen-mask").fadeIn(200).off().on("click",function(){
				campus.togglePopup("hide");
			});
		}
	};
	
	

}
var campus = new campus();