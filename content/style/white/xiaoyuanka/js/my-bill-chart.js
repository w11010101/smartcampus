// 初始化

var getDate = new Date();
var getY = getDate.getFullYear();
var getM = getDate.getMonth() + 1;
var time = getY + "." + (getM < 10 ? "0" + getM : getM);
var param = {
    title: "月收入",
    active: "circle",
    color: "#02e699",
    value: getRandomm(5, 10000),
    month: [getM - 2 + "月", getM - 1 + "月", getM + "月", getM + 1 + "月", getM + 2 + "月"]
}
smart_line_chart(param);
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

$(".smart-gear h1").text(time);
// 标题日期切换
$(".smart-gear img").on("click", function() {
    if ($(this).hasClass("smart-gear-left")) {
        // left 前一个
        getM--;
        if (getM == 0) {
            getM = 12;
            getY--;
        }
    } else {
        // right 后一个
        ++getM;
        if (getM == 13) {
            getM = 1;
            getY++;
        }
    }
    time = getY + "." + (getM < 10 ? "0" + getM : getM);
    $(".smart-gear h1").text(time);

    param.month = getOtherDate(getM);
    param.value = getRandomm(5, param.title == "月收入" ? 10000 : 1000);
    smart_line_chart(param);
})

function getOtherDate(getM) {
    switch (getM) {
        case 1:
            return ["11月", "12月", "1月", "2月", "3月"];
            break;
        case 2:
            return ["12月", "1月", "2月", "3月", "4月"];
            break;
        case 11:
            return ["9月", "10月", "11月", "12月", "1月"];
            break;
        case 12:
            return ["10月", "11月", "12月", "1月", "2月"];
            break;
        default:
            return [getM - 2 + "月", getM - 1 + "月", getM + "月", getM + 1 + "月", getM + 2 + "月"];
            break;
    }
}
// line 切换
$(".smart-line-chart-switch").on("click", function() {
    param = {
        title: param.title == "月收入" ? "月支出" : "月收入",
        active: "circle",
        color: param.title == "月收入" ? "#4ac4ed" : "#02e699",
        value: getRandomm(5, param.title == "月收入" ? 1000 : 10000),
        month: getOtherDate(getM)
    }
    smart_line_chart(param);
})
console.log(param)
// line
function smart_line_chart(param) {
    var myChart_line = echarts.init(document.querySelector(".smart-line-chart"));
    var option_line = {
        title: {
            text: param.title,
            textStyle: {
                color: "#3c3c3c",
                fontSize: 14,
                fontWeight: "normal",
            },
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        xAxis: {
            type: 'category',
            data: param.month,
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
        },
        yAxis: {
            type: 'value',
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
        },
        series: [{
            type: 'line',
            label: {
                normal: {
                    show: true,
                    position: [-6, -24],
                    textStyle: {
                        color: param.color, //文字
                        fontSize: 12
                    }
                }
            },
            symbol: "emptyCircle",
            symbolSize: 8,
            symbolRotate: 10,
            itemStyle: {
                normal: {
                    show: true,
                    borderWidth: 3,
                    color: "#f8be41" // 圆点
                }
            },
            lineStyle: {
                normal: {
                    color: param.color // 线
                }
            },
            data: [{
                name: param.value[0],
                value: param.value[0],
            }, {
                name: param.value[1],
                value: param.value[1]
            }, {
                name: param.value[2],
                value: param.value[2]
            }, {
                name: param.value[3],
                value: param.value[3]
            }, {
                name: param.value[4],
                value: param.value[4]
            }],

        }]
    };

    option_line.series[0].data[2].symbol = "circle";
    option_line.series[0].data[2].symbolSize = "14";
    option_line.series[0].data[2].itemStyle = {
        normal: {
            color: "#ee5b16" // 当前颜色
        }
    }
    myChart_line.setOption(option_line);
}
// bar
var myChart_bar = echarts.init(document.querySelector(".smart-bar-chart"));
var option_bar = {
    title: {
        text: '收入支出',
        textStyle: {
            color: "#3c3c3c",
            fontSize: 14,
            fontWeight: "normal",
            // position:[10,10]
        },
    },
    color: ['#02e699', '#4ac4ed'],
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
            value: 200,
            name: '收入',
            label: {
                normal: {
                    formatter: function(value) {
                        return value.data.value + '\n' + '——' + '\n' + '收入';
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
            value: 500,
            name: '支出',
            label: {
                normal: {
                    formatter: function(value) {
                        return value.data.value + '\n' + '——' + '\n' + '支出';
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
myChart_bar.setOption(option_bar);