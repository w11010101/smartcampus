// 校园卡对象
var campus = function(){
	var html = [];
	var that = this;
	var obj = {}
	// 弹窗层
	this.popup = function(arr,callback){
		html.push('<div class="camput-popup smart-popup"><ul>');
		for(var i in arr){
			var val = typeof arr[i] == "string"?arr[i]:arr[i].name;
			var key = typeof arr[i] == "string"?arr[i]:arr[i].key;
            html.push('<li key="'+key+'">'+val+'</li>');
        }
        html.push('</ul></div><div class="smart-screen-mask"></div>');
		if ($(".smart-popup").length == 0) {
            $("body").append(html.join(" "));
        }
 		that.togglePopup("show");
        $(".smart-popup li").on("click",function(){
            $(this).addClass('smart-active').siblings().removeClass('smart-active');
            that.togglePopup("hide");
            obj = {
            	key:$(this).attr("key"),
            	name:$(this).text()
            }
            callback(obj);
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