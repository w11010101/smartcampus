$(function() {
    /**
     * [createEchart 创建图表]
     * @param  {Object} option        []
     * @param  {String} option.id     [id选择器，用来生成图表的容器]
     * @param  {String} option.data1  [数据1]
     * @param  {String} option.data2  [数据2]
     * @param  {String} option.date   [x轴日期]
     * @return {[type]}        [description]
     */
    function createEchart(options) {
        // 指定图表的配置项和数据
        var option = option = {
            grid: {
                left: -20,
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五'],
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                show: false,
                type: 'value',

            },
            barWidth: 20,
            series: [{
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: [25, 0]

                        }
                    },
                    data:  options.data1,
                    itemStyle: {
                        normal: {
                            color: "#73d2fe"
                        }
                    }
                },
                {
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: [25, 0],
                            color: "#3c3c3c"
                        }
                    },
                    data: options.data2,
                    itemStyle: {
                        normal: {
                            color: "#e0e0e0"
                        }
                    }
                }
            ]
        };
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(options.id));
        // var myChart = echarts.init(document.getElementById("auto-Echart"));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }


    createEchart({
      id:"auto-Echart",
      data1:[100,110,120,130,140],
      data2:[100,111,112,113,114],
      date:["周一","周二","周三","周四","周五"]
    });
    createEchart({
      id:"artificial-Echart",
      data1:[100,110,120,130,140],
      data2:[100,111,112,113,114],
      date:["周一","周二","周三","周四","周五"]
    });
});