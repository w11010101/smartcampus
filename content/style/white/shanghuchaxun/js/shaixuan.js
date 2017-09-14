// wrapper top
function setTop() {
    var getTop = 0;
    for (var i = 0; i < $(".smart-top").length; i++) {
        e = $(".smart-top")[i];
        getTop += e.clientHeight;
    }
    $(".smart-accordion").css("top", (getTop + 45) + "px");
    $(".smart-echart").css("top", (getTop + 45 - $(".smart-query-summarize")[0].clientHeight) + "px");
    wrapper.refresh();
}
// 分析 和 统计 切换
var myScrollEchart;
$(".smart-query-statistics .toggle").on("click", function() {
    $(".smart-content").toggleClass("smart-toggle");
    $(".smart-query-statistics").toggleClass("smart-border");
    // 切换 隐藏日期选择
    $(".smart-time-box").removeClass("smart-screen-show");
    setTop();
    // 
    $(this).text($(".smart-content").hasClass("smart-toggle") ? function() {
        // echart 
        if (!myScrollEchart) {
            myScrollEchart = new iScroll('wrapper-echart', {
                vScrollbar: false
            });
            document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
            // myChart(".smart-pie-charts",option_pie);
            // myChart(".smart-line-charts",option_bar)
        }
        return "统计";
    }() : function() {
        return "分析";
    }());
});

// 向下展开筛选
var screen_list = [
    ["今日", "近一周", "近一个月", "任意时间"],
    ["201", "202", "203", "204", "205", "全部POS"],
    ["5:00~9:00", "11:30~13:30", "17:30~19:30", "全部时段"]
];
var lists = $(".smart-screen div[class^=col-xs-4]");

picker = new mui.PopPicker({
    layer: 1,
});
var state = true;
var id = "";
lists.on("click", function() {
    picker.setData(screen_list[$(this).index()]);
    $(this).toggleClass("smart-active").siblings().removeClass("smart-active");
    var that = $(this);
    if (state) {
        picker.show(function(items) {
            console.log(items);
            lists.removeClass("smart-active");
            state = true;
            that.text(items[0]);
            hideBox(items[0])
        });
        id = $(this)[0].id;
        state = false;
    } else {
        if (id == $(this)[0].id) {
            // 如果点击的是自己，就hide;
            picker.hide();
            picker.setData(screen_list[$(this).index()]);
            state = true;
        } else {
            // 如果点击的不是自己，就show;
            id = $(this)[0].id;
            state = false;
        }
    }

    // 遮罩层 和 取消按钮 绑定点击事件，取消smart-active样式
    $(".mui-backdrop,.mui-poppicker-btn-cancel").off().on("tap", function() {
        lists.removeClass("smart-active");
        state = true;
    });
})

// 隐藏筛选
function hideBox(val) {
    $(".smart-active").removeClass('smart-active');
    smart_screen_toggle("hide");
    if (val == "任意时间") {
        $(".smart-time-box").addClass("smart-screen-show");
        setTop();

    } else {
        $(".smart-time-box").removeClass("smart-screen-show");
        var date = getTime(),
            beforeDate = 0;
        // 日期范围
        switch (val) {
            case "今日":
                $(".smart-query-summarize h1,.smart-echart label").text(date.text);
                break;
            case "近一周":
                beforeDate = getTime(date.year, date.month - 1, (date.day - 7));
                $(".smart-query-summarize h1,.smart-echart label").text(beforeDate.text + " ~ " + date.text);
                break;
            case "近一个月":
                beforeDate = getTime(date.year, date.month - 1, (date.day - 30));
                $(".smart-query-summarize h1,.smart-echart label").text(beforeDate.text + " ~ " + date.text);
                break;

        }
    }
}



function smart_screen_toggle(type) {
    if (type == "hide") {
        // hide
        $(".set-popup").slideUp(200);
        $(".smart-screen-mask").fadeOut(200, function() {
            setTop();
        });
    } else {
        // show
        $(".set-popup").slideDown(200);
        $(".smart-screen-mask").fadeIn(200);
    }
}
// 详情
function accordionClick() {
    $(".smart-sub-list-item").off().on("click", function() {
        console.log(this)
        var hasSub = $(this).next();
        if (hasSub.hasClass("smart-sub-list-item-content")) {
            $(".smart-sub-list-item-content").not(hasSub).slideUp(200);
            hasSub.slideToggle(200, function() {
                wrapper.refresh();
            });
        }
    })
}

function getTime(y, m, d) {
    var time = y ? new Date(y, m, d) : new Date();
    return {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate(),
        text: time.getFullYear() + "." + (time.getMonth() + 1) + "." + time.getDate()
    }
}

// 选择时间
function selectTime(obj) {
    mui.init();
    var type = $(obj).attr("set-time"),
        startP = $(".smart-time-box p[set-time=start]"),
        endP = $(".smart-time-box p[set-time=end]"),
        date = getTime(),

        options = {
            type: "date",
            beginDate: type == "start" ? new Date(date.year, date.month - 1, date.day) : function() {
                var start = startP.text();
                var startArr = start.split("-");
                return new Date(startArr[0], startArr[1] - 1, startArr[2]);
            }(), //设置开始日期 
            endDate: type == "start" ? new Date(date.year + 10, date.month, date.day) : "", //设置结束日期 
        };

    var picker = new mui.DtPicker(options);
    picker.show(function(rs) {

        obj.innerText = rs.text;
        if (type == "end") {
            $(".smart-query-summarize h1").text(startP.text() + " ~ " + endP.text());
        }

        picker.dispose();
    });
}
// 加载中
function loading() {
    return '<!-- 加载中 --><div class="smart-loading"><div class="smart-waiting"></div></div>';
}
// 随机数
function getRandomm(i, max) {
    var arr = [];
    while (i > 0) {
        var num = Math.floor(Math.random() * max + 1);
        arr.push(num);
        i--;
    }
    return arr;
}
// Echart
var valArr = [300, 200, 300, 400];
var sum = function() {
    var n = 0;
    for (var i in valArr) {
        n += valArr[i];
    }
    return n;
}
// Echart - pie
var option_pie = {
    title: {
        text: '收入占比',
        textStyle: {
            color: "#3c3c3c",
            fontSize: 14,
            fontWeight: "normal",
            // position:[10,10]
        },
    },
    color: ['#00e897', '#42c3ef', '#0096d2', '#fdab06'],
    itemStyle: {
        normal: {
            borderColor: "#fff",
            borderWidth: 5
        }
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        radius: ['25%', '60%'],
        avoidLabelOverlap: true,
        labelLine: {
            normal: {
                show: true,
                length: 10,
                length2: 10
            }
        },
        data: [{
            value: valArr[0],
            name: "val1",
            label: {
                normal: {
                    formatter: function(value) {
                        return value.data.value + '\n' + '——' + '\n' + (((valArr[0] / sum()) * 100).toFixed(0) + "%");
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: "#fff",
                    borderWidth: 5
                }
            }
        }, {
            value: valArr[1],
            name: 'val2',
            label: {
                normal: {
                    formatter: function(value) {
                        return value.data.value + '\n' + '——' + '\n' + (((valArr[1] / sum()) * 100).toFixed(0) + "%");
                    },
                }
            },
            itemStyle: {
                normal: {
                    borderColor: "#fff",
                    borderWidth: 5
                }
            }
        }, {
            value: valArr[2],
            name: 'val3',
            label: {
                normal: {
                    formatter: function(value) {
                        return value.data.value + '\n' + '——' + '\n' + (((valArr[2] / sum()) * 100).toFixed(0) + "%");
                    },
                }
            },
            itemStyle: {
                normal: {
                    borderColor: "#fff",
                    borderWidth: 5
                }
            }
        }, {
            value: valArr[3],
            name: 'val4',
            label: {
                normal: {
                    formatter: function(value) {
                        return value.data.value + '\n' + '——' + '\n' + (((valArr[3] / sum()) * 100).toFixed(0) + "%");
                    },
                }
            },
            itemStyle: {
                normal: {
                    borderColor: "#fff",
                    borderWidth: 5
                }
            }
        }]
    }]
}

function myChart(el, option) {
    // console.log(el)
    var obj = typeof el == "object" ? el : document.querySelector(el);
    var myChart_pie = echarts.init(document.querySelector(el));

    myChart_pie.setOption(option);
}
// Echart - bar & line
var axisY = {
    axisLabel: {
        show: false,
    },
    axisLine: {
        show: false
    },
    axisTick: {
        show: false
    },
    splitArea: {
        show: false
    },
    splitLine: {
        show: false
    }
}
var axisX = {
    axisLine: {
        show: false,
    },
    axisTick: {
        show: false
    },
    splitArea: {
        show: false
    },
    splitLine: {
        show: false
    }
}
var barArr = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220];
var lineArr = getRandomm(20, 100);
var barArr_val = getRandomm(20, 10000);
var lineArr_val = getRandomm(20, 1000);

option_bar = {
    title: {},

    xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: barArr
        }
    ],
    dataZoom: [{
        show:false,
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'empty',
        start: 0,
        end: 20
    }, {
        show:false,
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'empty',
        start: 20,
        end: 50
    }],
    yAxis: [{
            type: 'value',
            scale: true,
        },
        {
            type: 'value',
            scale: true,
        }
    ],
    series: [{
        name: '折线图',
        type: 'line',
        label: {
            normal: {
                show: true,
                position: [-6, -24],
                textStyle: {
                    color: "#ee5b16", //文字
                    fontSize: 12
                }
            }
        },
        itemStyle: {
            normal: {
                show: true,
                borderWidth: 3,
                color: "#f8be41" // 圆点
            }
        },
        lineStyle: {
            normal: {
                color: "#f7bd42" // 线
            }
        },
        data: barArr_val
    }, {
        name: '柱形图',
        type: 'bar',
        yAxisIndex: 1,
        label: {
            normal: {
                show: true,
                position: [0, -24],
                textStyle: {
                    color: "#0095d1", //文字
                    fontSize: 12
                }
            }
        },
        barCategoryGap:"50%",
        itemStyle: {
            normal: {
                color: '#71d6f5'
                // color: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1, [
                //         { offset: 0, color: '#71d6f5' },
                //         { offset: 1, color: '#b1f1fc' }
                //     ]
                // )
            }
        },
        data: lineArr_val
    }]
};
// Uncaught TypeError: Failed to execute 'createLinearGradient' on 'CanvasRenderingContext2D': The provided double value is non-finite
// option_bar.series[1].data[0].itemStyle = {
//     normal: {
//         color: "#ee5b16" // 当前颜色
//     }
// }
// console.log(option_bar.series[1])
option_bar.yAxis[0] = $.extend(true, option_bar.yAxis[0], axisY);
option_bar.yAxis[1] = $.extend(true, option_bar.yAxis[1], axisY);
option_bar.xAxis[0] = $.extend(true, option_bar.xAxis[0], axisX);
option_bar.xAxis[1] = $.extend(true, option_bar.xAxis[1], axisX);
// console.log(option_bar);

myChart(".smart-pie-charts", option_pie);
myChart(".smart-line-charts", option_bar);