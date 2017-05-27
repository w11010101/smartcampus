$(function() {
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
        Objs.switch.on("click", function() {
                var thisP = $(this).parent();
                thisP.toggleClass(Class.active).attr(Attr.setStatus, thisP.hasClass(Class.active) ? "on" : "off");
                if (thisP.attr("set-status") == "on") {
                    thisP.parent().next().slideDown(200);
                } else {
                    thisP.parent().next().slideUp(200);
                }

            })
            // li点击跳转页面事件
        Objs.tergetPage.on("click", function() {
        	var href = $(this).attr("set-terget");
            if (href.indexOf(".html") > 0) {
                smartObj.jump(href);
            }
        });
        // li点击选择
        Objs.checkList.on("click", function() {
            Objs.sure.removeClass(Class.active);
            $(".smart-icon-sure", this).toggleClass(Class.active);
            setTimeout(function() {
                window.history.back();
            }, 200)
        });
        // 输入框显示
        Objs.eye.on("click", function() {
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
        $(".smart-input,input[type=number],input[type=password]").on("keyup", function(e) {
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

                        }
                        $(".smart-container-sure-btn").css({
                            "background-color": "#73d2fe",
                            "border-color": "#73d2fe"
                        }).removeClass("btn-hui");
                    }
                } else {
                    // 删除键
                    if (this.value.length == 0) {
                        $(".smart-btn,.smart-container-sure-btn").removeAttr("style");
                        $(this).next().removeClass("smart-icon-eye-clear");
                    }
                }
            })
            // 隐藏筛选
        $(".smart-screen-mask").on("click", function() {
        	$(".smart-popup,.set-popup").slideUp(200,function(){
        		$(".smart-popup,.set-popup").remove();
        	})
        	$(".smart-screen-mask").fadeOut(200);
        })
        // 转账支付

        $(".smart-container-sure-btn").on("click", function() {
            if ($("body").hasClass('first-start')) {
                // 第一次进入转账
                var val = $(".smart-account-input").val();
                if (val.length != 0) {
                    if (val.length < 6) {
                        smartObj.tips("卡号长度不够！");
                        return;
                    }
                    $("body").removeClass("first-start").addClass('old-start');
                    $(".smart-content .smart-account em").text($(".smart-account-input").val());
                } else {
                    smartObj.tips("不能为空");
                }
            } else {
                if ($(".smart-payment-box input").val().length) {
                   
                    param.money = $(".smart-payment-box input").val();
                    
                    smartObj.payInfo(param);

                    $(".smart-screen-mask").show(0);
                } else {
                    smartObj.tips("金额不能为空");
                }

            }
        });
    })
var param = {};
function payChange(){
	smartObj.pay_change();
    $(".smart-screen-mask").show(0);
    // 加载图表
}
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
                    formatter: function(value) {
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
                    formatter: function(value) {
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
        // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
// 支付

var smartObj = {
	// 跳转页面
	jump:function(href){
		window.location.href = href	
	},
    // 更改支付方式
    pay_change: function() {
        smartObj.boxToggle( $(".smart-popup"),"hide");
        var html = [];
        // <i class="con-delete back-delete smart-pay-close"></i>
        html.push('<div class="layer-xyk smart-popup"><div class="con-header"><h1>更换付款方式</h1></div><div class="car-list">');
        var payArr = ["校园卡", "电子账户", "中国银行", "支付宝"];
        var payImgArr = ["../../../content/custom/img/wallet-2.png", "../../../content/custom/img/wallet-1.png", "../../../content/custom/img/BOC.png", "../../../content/custom/img/zfb.png"];
        for (var i in payArr) {
            html.push('<div class="row has-feedback"><div class="col-xs-2"><img src="' + payImgArr[i] + '"></div><div class="col-xs-10">' + payArr[i] + '</div><span name="flag" class="glyphicon glyphicon-ok form-control-feedback"></span></div>');
        }
        html.push('</div></div>');
        if ($("body").find(".layer-xyk").length == 0) {
            $("body").append(html.join(""));
        }
        $(".layer-xyk").slideDown(200);
        $(".car-list .row").on("click",function(e) {
			var listdom = $(".car-list .row");
			$(this).addClass("active").siblings().removeClass("active");
			smartObj.boxToggle($(this).parents(".smart-popup"),"hide");

            $(".smart-change label,.con-btn-cartyp span").text($(this).find(".col-xs-10").text());
            $(".smart-screen-mask").fadeOut(200);
		})
        // 添加默认选中
        // $(".has-feedback").eq(0).addClass('active');
        smartObj.boxClose();
    },
    // 键盘
    keyboard: function(callback) {
        var html = [];
        html.push('<div class="smart-keyboard smart-popup"><div class="smart-keyboard-head"><a class="smart-pay-close"></a><h1>请输入支付密码</h1></div><ul class="smart-password-box">');
        var x = i = 0;
        while (i < 6) {
            html.push('<li></li>'); //●
            i++;
        }
        // <div class="smart-other-pay"><span>手势支付</span><span>指纹支付</span></div>
        html.push('</ul><ol class="smart-keyboard-nums">');
        while (x < 12) {
            x++;
            html.push('<li>' + (x == 10 ? "." : (x == 11 ? 0 : (x == 12 ? '<img src="../../../content/custom/img/delet-number.png" alt="">' : x))) + '</li>'); //●
        }
        html.push('</ol></div>');
        
        if ($("body").find(".smart-keyboard").length == 0) {
            $("body").append(html.join(""));
        }
        $(".smart-keyboard").slideDown(200);
        // 键盘点击事件
        var val = []; // 密码
        $(".smart-keyboard-nums li").on("click", function() {
            if ($(this).index() != 11 && $(this).index() != 9) {
                if (val.length < 6) {
                    $(this).addClass('smart-active');
                    val.push($(this).text());
                    $(".smart-password-box li").eq(val.length - 1).text("●");
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
                    $(".smart-password-box li").eq(val.length - 1).text(" ");
                    val.splice(val.length - 1);

                }
            }
        })
        smartObj.boxClose();
    },
    payInfo: function(param) {
        var val = $(".smart-change label,.con-btn-cartyp span").text();
        var html = '<div class="layer-zf smart-popup"><div class="con-header"><i class="con-delete back-delete smart-pay-close"></i><h1>确认付款</h1>\
                    </div><div class="con-number"><i>￥</i><span>' + param.money + '</span></div><div class="con-type">\
                    <form class="form-horizontal" role="form"><div class="form-group"><label class="col-sm-4 col-xs-4 control-label">缴费名称</label>\
                    <div class="col-sm-8 col-xs-8"><p class="form-control-static">支付通用模板</p></div>\
                    </div><div class="form-group"><label class="col-sm-4 col-xs-4 control-label">支付方式</label>\
                    <div class="col-sm-8 col-xs-8"><p id="zf_value" class="form-control-static" onclick="payChange()">'+(val == ""?"更换支付方式":val)+'</p>\
                    </div></div><div class="con-button"><input id="btn_jf" type="button" type="button" class="button log-btn con-btn" value="立即缴费" />\
                    </div></form></div></div>';

		if ($("body").find(".layer-zf").length == 0) {
            $("body").append(html);
        }
        $(".layer-zf").slideDown(200);
        $("#btn_jf").off().on("click", function() {
        	smartObj.boxToggle($(this).parents(".smart-popup"),"hide");
            smartObj.keyboard(function(data) {
                if (data.password == "000000") {
                    smartObj.tips("密码正确~！");
                    smartObj.jump("zf-success.html");
                } else {
                    smartObj.tips("密码错误~！");
                }
            });
        })
        smartObj.boxClose();
    },
    accountChange:function(arr){
        var html = [];
        html.push('<div class="smart-account-change smart-popup"><ul>');

        for(var i in arr){
            html.push('<li>'+arr[i]+'</li>');
        }
        html.push('</ul></div>');

        if ($("body").find(".smart-account-change").length == 0) {
            $("body").append(html.join(" "));
        }
        $(".smart-account-change").slideDown(200);
        $(".smart-screen-mask").fadeIn(200);
        $(".smart-account-change li").on("click",function(){
            $(this).addClass('smart-active').siblings().removeClass('smart-active');
            $(".set-change").text($(this).text());
            smartObj.boxToggle($(this).parents(".smart-popup"),"hide");
            $(".smart-screen-mask").fadeOut(200);
        })
    },
    boxClose: function() {
        $(".smart-pay-close").on("click", function() {
        	$(this).parents(".smart-popup").remove();
        	$(".smart-screen-mask").fadeOut(200);
        })
    },
    boxToggle: function(obj,type) {
        if (type == "hide") {
            // hide
            obj.slideUp(200);
        } else {
            // show
            obj.slideDown(200);
        }
    },
    // 功能:停止事件冒泡  
    stopBubble: function(e) {
        // 如果提供了事件对象，则这是一个非IE浏览器
        if (e && e.stopPropagation) {
            // 因此它支持W3C的stopPropagation()方法 
            e.stopPropagation();
        } else {
            // 否则，我们需要使用IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
    },

    // 功能：阻止事件默认行为
    stopDefault: function(e) {
        // 阻止默认浏览器动作(W3C)
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            // IE中阻止函数器默认动作的方式
            window.event.returnValue = false;
        }
        return false;
    },
    // 提示信息
    tips: function(val) {
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
