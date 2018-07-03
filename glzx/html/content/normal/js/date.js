define(['jquery','echarts','jquery.datetimepicker'],function($,echarts,datetime){
    return function () {
         console.log(datetime)
        // 日期
        $.datetimepicker.setLocale('zh');
        $('#startDate').datetimepicker({        
            timepicker:false,
            format:'Y.m.d',
            parentID:"html",
            onShow:function( ct ){
                console.log(123)
                this.setOptions({
                    maxDate:$('#endDate').val()?$('#endDate').val():false
                })
            },
        });

        $('#endDate').datetimepicker({
            timepicker:false,
            format:'Y.m.d',
            parentID:"html",
            onShow:function( ct ){
                this.setOptions({
                    minDate:$('#startDate').val()?$('#startDate').val():false
                })
            },
        });
        // echarts =========================================
        var months = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
        var monthsData = [
            {
                text:"最大识别速度",
                borderColor:'#5b9bd5',
                data:[19211,20211,13211,13211,53211,63211,73211,53211,93211,13211,11311,12311,13211,14311,15211,63211,17311,18321,19321,44321,21211,13513,24624,73543],
                radial:['#00a5ff','#8de7ff']
            },
            {
                text:"最小识别速度",
                borderColor:'#ed7d31',
                data:[11345,48990,34566,16755,24324,58663,31234,11745,12039,42764,18932,32041,52992,10292,32386,9999,20298,78892,66211,20321,21211,23211,23211,43434],
                radial:['#00a5ff','#8de7ff']
            },
            {
                text:"平均识别速度",
                borderColor:'#62dfb3',
                data:[23451,89910,45166,61755,43124,86163,12134,67415,20139,27164,89312,20141,99192,22912,43816,99199,52198,88192,19211,26321,41211,63211,53211,13567],
                radial:['#00a5ff','#8de7ff']
            }
        ]
        var myChart = echarts.init(document.getElementById('myChartLine'));

        // 指定图表的配置项和数据
        // setData
        function lineSetData(data){
            var seriesData = [];
            for(var i = 0;i<data.length;i++){
                var evt = data[i];
                seriesData.push({
                    name:evt.text,
                    type:'line',
                    lineStyle:{
                        width:3,
                        color:evt.borderColor
                    },
                    symbolSize:4,
                    itemStyle:{
                        color:evt.borderColor
                    },
                    data:evt.data,
                    emphasis:{
                        label:{

                        }
                    },
                });
            }
            return seriesData;
        }

        var option = {
            tooltip : {
                trigger: 'axis',
                formatter:function(params){
                    var title = (parseInt(params[0].axisValue)-1) +':00 - '+(parseInt(params[0].axisValue) ==24?0:params[0].axisValue)+':00';
                    var arr = [];
                    $.each(params,function(i,e){
                        arr.push(e.marker+e.seriesName+': '+e.value+'<br>');
                    });
                    return '<div class="myTooltip"><div class="title">'+title+'</div><br><div class="myTooltipBox">'+arr.join("\n")+'</div></div>';
                },
                backgroundColor:'rgba(139,208,255,0.54)',
                padding:0,
                axisPointer: {
                    type: 'cross',
                    label: {
                        show:true,
                        backgroundColor: '#6ae6fa',
                        color:'#000',
                        shadowBlur:0,
                    }
                },
                textStyle:{
                    color:'#61666a'
                },
            },
            legend: {
                bottom:10,
                itemGap:50,
            },
            toolbox: {
                right:50,
                feature: {
                    saveAsImage: {},
                    restore:{},
                    magicType:{
                        type: ['bar'],
                    },
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : months,
                    axisLabel:{
                        color:"#000"
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#eeeeee'
                        }
                    },
                    axisTick:{
                        lineStyle:{
                            color:"#979797"
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    max:function(params){
                        return (params.max * 1.2).toFixed(0);
                    }
                }
            ],
            series:lineSetData(monthsData)
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
       
        // 重置事件
        myChart.on("restore",function(params){
            myChart.setOption(option);
        });
    }
    
});