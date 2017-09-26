// 创建 Echarts
var myEcharts = function() {
    // 饼状图 数值
    var vals,
        names,
        that = this,
        echartsObj,
        param;
    // 创建Echarts
    this.createEcharts = function(parameter) {
        
        param = parameter;

        vals = parameter.type == "pie" ? parameter.pie.valArr : parameter.bar.valArr;
        names = parameter.type == "pie" ? parameter.pie.nameArr : parameter.bar.nameArr
        this.setConfig(parameter);
    }
    // 随机数
    this.getRandomm = function(i, max) {
        var arr = [];
        while (i > 0) {
            var num = Math.floor(Math.random() * max + 1);
            arr.push(num);
            i--;
        }
        return arr;
    }
    // 百分比值
    this.sum = function(arr) { 
        var n = 0;
        for (var i in arr) {
            n += arr[i];
        }
        return n;
    }
    // 图表 x y 轴的轴线
    this.axis = function(type) {
        return {
            axisY: {
                axisLabel: {
                    show: type,
                },
                axisLine: {
                    show: type
                },
                axisTick: {
                    show: type
                },
                splitArea: {
                    show: type
                },
                splitLine: {
                    show: type
                }
            },
            axisX: {
                axisLine: {
                    show: type,
                },
                axisTick: {
                    show: type
                },
                splitArea: {
                    show: type
                },
                splitLine: {
                    show: type
                }
            }
        }
    }
    // 配置图表
    this.setConfig = function(parameter) {
        var el = parameter.el;
        if (parameter.type == "pie") {
            // pie config
            option = this.option_pie;
            option.series[0]["data"] = function() {
                var arr = []
                for (var i in vals) {
                    arr.push({
                        value: vals[i],
                        name: names[i],
                        label: {
                            normal: {
                                formatter: function(value) {
                                    return value.data.name + '\n' + '——' + '\n' + (((value.data.value / that.sum(vals)) * 100).toFixed(0) + "%");

                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: "#fff",
                                borderWidth: parameter.borderWidth
                            }
                        }
                    });
                }
                return arr;
            }();
            option["color"] = parameter.pie.color;
            
        } else {
            // bar config
            option = this.option_bar(parameter);    

            var axis = this.axis(parameter.bar.axis);
            option.yAxis[0] = $.extend(true, option.yAxis[0], axis.axisY);
            option.yAxis[1] = $.extend(true, option.yAxis[1], axis.axisY);
            option.xAxis[0] = $.extend(true, option.xAxis[0], axis.axisX);
            option.xAxis[1] = $.extend(true, option.xAxis[1], axis.axisX);

            option.series[0]["barWidth"] = parameter.bar.barArr.length == 1?50:"";
            // // 设置当前
            // option.series[1].data[2] = $.extend(true, option.series[1].data[2], {
            //     symbol: "circle",
            //     symbolSize: "15",
            //     color: "#ee5b16",
            //     itemStyle: {
            //         normal: {
            //             // 当前颜色,
            //             color: "#ee5b16",
            //             borderColor: "rgba(255, 180, 0, 0.7)",
            //             borderWidth: "4",
            //         }
            //     }
            // }); 
        }

        this.runEchart(el, option);
    }
    // Echart - pie
    this.option_pie = {
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
            }
        }]
    }
    // Echart - bar
    this.option_bar = function(parameter) {
        return {
            title: {},
            legend: {
                bottom: "1%",
                textStyle: {
                    color: "#a8a8a8"
                },
                itemGap: 25,
                data: [{
                    name: "次数",
                    icon: "circle",
                    
                }, {
                    name: "金额",
                    icon: "bar"
                }]
            },
            xAxis: [{
                    type: 'category',
                    data: parameter.bar.barArr
                },
                {
                    type: 'category',
                    // data: ,
                },
            ],
            dataZoom: [{
                show: false,
                type: 'slider',
                filterMode: 'filter',
                start: parameter.start || 0,
                end: parameter.end || 25
            }, {
                show: false,
                type: 'inside',
                xAxisIndex: [0, 1],
                filterMode: 'filter',
                start: parameter.start || 0,
                end: parameter.end || 25
            }],
            yAxis: [{
                    type: 'value',
                    scale: true,
                    gridIndex :0,
                },
                {
                    type: 'value',
                    scale: true,
                }
            ],
            series: [{
                    name: '金额',
                    type: 'bar',
                    yAxisIndex: 1,
                    label: {
                        normal: {
                            show: true,
                            position: "top",
                            textStyle: {
                                color: "#0095d1", //文字
                                fontSize: 12
                            }
                        }
                    },
                    barCategoryGap: "50%",
                    itemStyle: {
                        normal: {
                            // color: '#71d6f5'
                            color: parameter.barColor,
                            // color: new echarts.graphic.LinearGradient(
                            //     0, 0, 0, 1, [
                            //         { offset: 0, color: '#71d6f5' },
                            //         { offset: 1, color: '#b1f1fc' }
                            //     ]
                            // )
                        }
                    },
                    data: parameter.bar.barArr_val
                },
                {
                    name: '次数',
                    type: 'line',
                    label: {
                        normal: {
                            show: true,
                            position: [0, -20],
                            textStyle: {
                                color: "#ee5b16", //文字
                                fontSize: 12
                            }
                        }
                    },
                    symbolOffset: [0, 0],
                    itemStyle: {
                        normal: {
                            color: "#f7bd42", // 圆点
                            // color: "#71d6f5", // 圆点
                            borderColor: "#f7bd42",
                            borderWidth: "3",
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: "#f7bd42" // 线
                        }
                    },
                    data: parameter.bar.lineArr_val
                },
            ]
        }
    }
    // 运行 Echart
    this.runEchart = function(el, option) {
        var obj = typeof el == "object" ? el : document.querySelector(el);
        echartsObj = echarts.init(document.querySelector(el));
        echartsObj.setOption(option);
    }
    this.clear = function (){
        echartsObj.clear();
        this.dispose();
    }
    this.dispose = function (){
        echartsObj.dispose();
    }
}

var myEcharts = new myEcharts();

