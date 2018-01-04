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
        var option = {
            grid: {
                left: -30,
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: options.date,
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
                max: function(value) {
                    return value.max;
                }
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
        return myChart;
    }

    // 第一次加载页面，调用创建图表
    var chart1 = createEchart({
      id:"auto-Echart",
      data1:[200,110],
      data2:[100,111],
      date:getDate({type:"before",class:"month",length:2})
    });

    var chart2 = createEchart({
      id:"artificial-Echart",
      data1:[100,110,120,130,140],
      data2:[100,111,112,113,114],
      date:getDate({type:"before",class:"year",length:5})
    });

    /**
     * [getDate 获取时间]
     * @param  {[type]} param     [description]
     * @param  {String} type      [before,after 前 后插入]
     * @param  {String} class     [year,month]
     * @param  {Number} length    [数组长度,默认4]
     * @return {Array}  Array     [description]
     */
    function getDate(param){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var arr = [param.class== "month"?"本月":"本年"];
        var i = param.length-1;
        var num = param.class== "month"?month+1:year;
        var unit = param.class== "month"?"月":"年";
        while (i > 0){
            if(param.type == "before"){
                if(unit == "月" && num == 1){
                    num = 12;
                }else{
                    num--;
                }
                arr.push(num + unit);
            }else if(param.type == "after"){
                if(unit == "月" && num == 12){
                    num = 1;
                }else{
                    num++;
                }
                arr.unshift(num + unit);
            }
            i--;
        }
        return arr;
    }

    // 按年，按月 ：按钮点击事件 
    $("body").on("click",".smart-proportion-btns button",function(){
        var config = {
            type:"before",
        }
        if($(this).text() == "按年"){
            console.log('按年');
            config.class = "year";
        }else{
            console.log('按月');
            config.class = "month";
        }

        // 先清除组件，再重新创建
        chart1.clear();
        chart1 = createEchart({
            id:"auto-Echart",
            data1:[10,110,120,130,140],
            data2:[100,111,112,113,114],
            date:getDate(config)
        });
        // 先清除组件，再重新创建
        chart2.clear();
        chart2 = createEchart({
            id:"artificial-Echart",
            data1:[1,110,120,130,140],
            data2:[100,111,112,113,114],
            date:getDate(config)
        });
    });

});