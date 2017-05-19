$(function () {
		// 选择器
		var Objs = {
				switch: $(".smart-switch div"), // 开关按钮
				tergetPage: $(".smart-content ul li[set-terget],*[set-terget]"), // 点击跳转页面事件
				checkList: $(".smart-list-check li"), // 点击单选
				sure: $(".smart-icon-sure"), // 列表选中 
				eye: $(".smart-icon-eye"), // 表单后的眼睛
			}
			// 动态设置attr
		var Attr = {
				setStatus: "set-status",
			}
			// 动态设置class
		var Class = {
				active: "smart-active"
			}
			// 开关按钮事件
		Objs.switch.on("click", function () {
				var thisP = $(this).parent();
				thisP.toggleClass(Class.active).attr(Attr.setStatus, thisP.hasClass(Class.active) ? "on" : "off");
				if (thisP.attr("set-status") == "on") {
					thisP.parent().next().slideDown(200);
				} else {
					thisP.parent().next().slideUp(200);
				}

			})
			// li点击跳转页面事件
		Objs.tergetPage.on("click", function () {
			var href = $(this).attr("set-terget");
			console.log("jump");
			if (href.indexOf(".html") > 0) {
				window.location.href = href;
			}
		});
		// li点击选择
		Objs.checkList.on("click", function () {
			console.log("check");
			Objs.sure.removeClass(Class.active);
			$(".smart-icon-sure", this).toggleClass(Class.active);
			setTimeout(function () {
				window.history.back();
			}, 200)
		});
		// 输入框显示
		Objs.eye.on("click", function () {
			var that = $(this);
			if (that.hasClass("smart-icon-eye-clear")) { //  清空
				that.prev("input").val("");
				that.removeClass("smart-icon-eye-clear");
				$(".smart-btn").removeAttr("style");
			} else {
				that.toggleClass("smart-icon-eye-hide");
				if (!that.hasClass("smart-icon-eye-hide")) { // 隐藏还是显示
					that.prev("input").attr("type", "number");
				} else {
					that.prev("input").attr("type", "password");
				}
			}
		});
		var arr = [];
		// var sum = 0;
		$(".smart-input,input[type=number],input[type=password]").on("keyup", function (e) {
				if (e.keyCode != 8) {
					// 不是删除键 
					var l = $(".smart-input").length;
					if (this.value.length != 0) {
						$(this).next().addClass("smart-icon-eye-clear");
						if ($(".smart-icon-eye-clear").length == l) { // input都填写了
							$(".smart-btn,.smart-container-sure-btn").css({
								"background-color": "#73d2fe",
								"border-color": "#73d2fe"
							});
						} else {
							$(".smart-container-sure-btn").css({
								"background-color": "#73d2fe",
								"border-color": "#73d2fe"
							});
						}
					}
				} else {
					// 删除键
					if (this.value.length == 0) {
						$(".smart-btn,.smart-container-sure-btn").removeAttr("style");
						$(this).next().removeClass("smart-icon-eye-clear");
					}
				}
			})
			// 转账支付
		$(".first-start .smart-container-sure-btn").on("click", function () {
				var val = $(".smart-account-input").val();
				if (val.length != 0) {
					if (val.length < 10) {
						tips("卡号长度不够！");
						return;
					}
					$("body").removeClass("first-start");
					$(".smart-content .smart-account em").text($(".smart-account-input").val());
				} else {
					tips("不能为空");
				}
			})
			// 功能:停止事件冒泡  
		function stopBubble(e) {
			// 如果提供了事件对象，则这是一个非IE浏览器
			if (e && e.stopPropagation) {
				// 因此它支持W3C的stopPropagation()方法 
				e.stopPropagation();
			} else {
				// 否则，我们需要使用IE的方式来取消事件冒泡
				window.event.cancelBubble = true;
			}
		}

		// 功能：阻止事件默认行为
		function stopDefault(e) {
			// 阻止默认浏览器动作(W3C)
			if (e && e.preventDefault) {
				e.preventDefault();
			} else {
				// IE中阻止函数器默认动作的方式
				window.event.returnValue = false;
			}
			return false;
		}
	})
	// 提示信息
function tips(val) {
	$.toast({
		text: val,
		allowToastClose: false, // Boolean value true or false
		hideAfter: 3000, // false to make it sticky or number 
		position: 'bottom-center',
		textAlign: 'center',
		loader: false
	});
}
// 加载图表
function load_charts_bar() {
	var objs = document.querySelectorAll(".smart-accordion-bar");
	for (var i in objs) {
		if (typeof objs[i] == "object") {
			smart_charts_bar(objs[i]);
		}
	}
}
// smart_charts_bar 横向柱形图表
function smart_charts_bar(obj) {
	var income, pay, myChart;
	// var myChart = echarts.init(document.querySelector('.smart-accordion-bar'));
	myChart = echarts.init(obj);

	income = $(obj).attr("income");
	pay = $(obj).attr("pay");

	// 指定图表的配置项和数据
	option = {
		xAxis: {
			show: false,
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			splitArea: {
				show: false
			},
		},
		yAxis: {
			type: 'category',
			axisLine: {
				show: false,

			},
			splitLine: {
				show: false
			},
			data: []
		},
		barGap: "0",
		series: [{
			name: '',
			type: 'bar',
			data: [income],
			label: {
				normal: {
					show: "true",
					position: "insideLeft",
					formatter: function (value) {
						return "收￥" + value.data
					},
					offset: [5, 8],
					textStyle: {
						color: (income / pay) > 0.2 ? "#fff" : "#a5a5a5",
						fontSize: "10"
					}
				}
			},
			itemStyle: {
				normal: {
					color: "#01e699",
					borderWidth: 100,
					borderType: "solid"
				}
			}

		}, {
			name: '2012年',
			type: 'bar',
			data: [pay],
			label: {
				normal: {
					show: true,
					position: "insideLeft",
					formatter: function (value) {
						return "支￥" + value.data
					},
					offset: [5, -12],
					textStyle: {
						// color:"#01e699",
						color: (income / pay) > 2 ? "#a5a5a5" : "#fff",
						fontSize: "10"
					}
				}
			},
			itemStyle: {
				normal: {
					color: "#ee5b17"
				}
			}
		}, ]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}


//
//
// function payMethod(){
// 	var html = [];
// 	var payMet = ["校园卡","电子账户","中国银行","支付宝"];
// 	var payMetImg = ["../../content/custom/img/wallet-2.png","../../content/custom/img/wallet-1.png","../../content/custom/img/BOC.png","../../content/custom/img/zfb.png"];
// 	html.push('<div class="layer-xyk"><div class="con-header"><i class="con-back"></i><h1>更换付款方式</h1></div><div class="car-list">')

// 	for(var i = 0; i<payMet.length;i++){
// 		html.push('<div class="row has-feedback"><div class="col-xs-2"><img src="'+payMetImg[i]+'"></div><div class="col-xs-10">'+payMet[i]+'</div><span name="flag" class="glyphicon glyphicon-ok form-control-feedback"></span></div>')
// 	}
// 	html.push('</div></div><div class="backdrop" style="display: none;"></div>');
// 	console.log(html);
// 	$("body").append(html.join(" "));


// }


function smart_charts_pie(obj, parameter) {

	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(obj);
	// 指定图表的配置项和数据
	option = {
		title: {
			text: "￥2500.00",
			subtext: "总资产",
			x: 'center',
			y: 'middle',
			textStyle: {
				fontSize: "14",
				color: "#3c3c3c"
			},
			subtextStyle: {
				fontSize: "12",
				color: "#3c3c3c"
			}
		},
		color: ['#45d6c5', '#41c6f3', '#ff5408', '#fdab07'],
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['35%', '50%'],
			avoidLabelOverlap: false,
			labelLine: {
				normal: {
					length: 5,
					lenght2: 5,
					smooth: true
				}
			},
			data: [{
				value: 140,
				name: '电子账户', // 当name值相同，加空格区分（颜色）
			}, {
				value: 140,
				name: '校园卡' // 当name值相同，加空格区分（颜色）
			}, {
				value: 120,
				name: '补助账户'
			}, {
				value: 50,
				name: '上网余额'
			}]
		}]
	}
	console.log(option)
		// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
