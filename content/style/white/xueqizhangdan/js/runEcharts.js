var r = function(max) {
    var m = max || 10;
    return Math.floor(Math.random() * m);
};

var Echarts = function() {
    var sum = 0;
    var w = $("body").width();
    var repulsion = w>=375?200:100;
    var times = w>=375?3.5:2.5;
    this.data = function(option) {
        let arr = [];
        var val = size = 0;
        
        if (option.data) {
            for (let f = 0; f < option.data.length; f++) {
                val = size = option.val ? (option.val[f] / this.sum(option.val) * 100).toFixed(0) : option.size;
                sum += size*2;
                arr.push({
                    name: option.data[f],
                    value: val,
                    category: option.data[f],
                    symbolOffset :[0,0],
                    symbol:!option.headShow?"image://../../content/style/white/xueqizhangdan/images/qiu-1.svg":"image://../xueqizhangdan/png/"+option.head[f],
                    label:{
                        normal:{
                            fontSize:(()=>{
                                console.log((size*.7));
                                return (size*.7)>14?(size*.7):13;
                            })()
                        }
                    }
                })
            }
        }
        return arr;
    };
    this.sum = function(arr) {
        var s = 0;
        for (let i of arr) {
            s += i;
        }
        return s;
    };
    this.categories = function(option) {
        let arr = [];
        if (option.data) {
            for (let f of option.data) {
                arr.push({ name: f })
            }
        }
        return arr;
    };
    this.type = function(option) {
            console.log(option.data)
        switch (option.type) {
            case "line":
                return {
                    // backgroundColor:"#000",
                    // grid: {
                    //     left:"3%",
                    //     right: '4%',
                    //     containLabel: true
                    // },
                    xAxis: [{
                        // show: false,
                        type:'category',
                        boundaryGap:false,
                        data: option.name,
                        
                        
                    }],
                    yAxis: [{
                        show: false,
                        max:function(value) {
                            return value.max ;
                        }
                    }],
                    series: [{
                            name: 'line1',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                normal: {
                                    color: {
                                        type: 'linear',
                                        x: 1,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0,
                                            color: '#2DD9E3' // 0% 处的颜色
                                        }, {
                                            offset: 0.5,
                                            color: '#7CEA7E' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#E0FF00' // 100% 处的颜色
                                        }],
                                        globalCoord: false // 缺省为 false
                                    }
                                }
                            },
                            symbolSize:"10",
                            data:option.data,
                            lineStyle:{
                                normal:{
                                    color:"#15AFAF"
                                }
                            },
                            itemStyle:{
                                normal:{
                                    // opacity:0,
                                    // color:"#fff",
                                    // borderColor:"#15AFAF"
                                }
                            },
                        },
                        
                    ],
                   
                };
                break;
            case "graph":
                let data = this.data(option);
                let categories = this.categories(option);
                return {
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        force: {
                            // repulsion: option.repulsion,
                            repulsion: option.repulsion?option.repulsion:repulsion
                        },
                        data: data,
                        categories: categories,
                        symbolSize: (value, params) => {
                            if((value*3)>(sum/option.data.length)){
                                return value*times;
                            }else{
                                if(option.headSize){
                                    return 60;
                                }else{
                                    return 45;
                                }
                            }
                        },
                        // edgeSymbol: ['circle', 'arrow'],
                        label: {
                            normal: {
                                color: '#000',
                                show: option.dataShow
                            }
                        },
                        edgeLabel: {
                            normal: {
                                backgroundColor: 'rgba(0,23,11,0)'
                            }
                        }
                    }],
                };
                break;
            case "pie":
                let pieName = option.name;
                let pieValue = option.value;
                let pie1 = parseFloat((pieValue[0]/(pieValue[0]+pieValue[1])).toFixed(1))*100;
                let pie2 = 100-pie1;
                return {
                    series: [{
                        name: '学习',
                        type: 'pie',
                        radius: '40%',
                        data: [
                            { 
                                value: pieValue[0], 
                                name: pieName[0],
                                selected:true,
                                label:{
                                    normal:{
                                        lineHeight:20,
                                        formatter: [
                                            `{a|${pieName[0]}}`,
                                            `{b|${pie1+"%"}}`
                                        ].join('\n'),
                                         rich: {
                                            a: {
                                                color: '#000',
                                                lineHeight: 10,
                                                fontSize:14
                                            },
                                            b:{
                                                lineHeight: 35,
                                                fontWeight:600,
                                                align:'left',
                                                fontSize:18
                                            }
                                        }
                                    }
                                },
                                itemStyle:{
                                    normal:{
                                        color:'#000',
                                        borderWidth:2,
                                        borderColor:"#000",
                                    }
                                },
                                labelLine:{
                                    normal:{
                                        show:false
                                    }
                                }
                            },
                            { 
                                value: pieValue[1], 
                                name: pieName[1],
                                lineHeight:20,
                                label:{
                                    normal:{
                                        lineHeight:20,
                                        formatter: [
                                            `{a|${pieName[1]}}`,
                                            `{b|${pie2+"%"}}`
                                        ].join('\n'),
                                         rich: {
                                            a: {
                                                color: '#000',
                                                lineHeight: 10,
                                                fontSize:14
                                            },
                                            b:{
                                                lineHeight: 35,
                                                align:'left',
                                                fontSize:18,
                                                fontWeight:600
                                            }
                                        }
                                    }
                                },
                                labelLine:{
                                    normal:{
                                       show:true,
                                       length:10,
                                       lineStyle:{
                                          color:"#000",
                                       }
                                    }
                                },
                                itemStyle:{
                                    normal:{
                                        opacity:1,
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 0,
                                            colorStops: [{
                                                offset: 0, color: 'red' // 0% 处的颜色
                                            }, {
                                                offset: 1, color: 'blue' // 100% 处的颜色
                                            }],
                                            globalCoord: true // 缺省为 false
                                        },
                                        borderWidth:2,
                                        borderColor:"#000",
                                    }
                                },
                                labelLine:{
                                    normal:{
                                        show:false
                                    }
                                }
                            },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                    }]
                };
                break;
        }
    }

    this.run = function(option) {

        __default = this.type(option);
        var myChart = echarts.init(option.el);
        myChart.setOption(__default);
        return myChart;
    }
    this.dispose = function() {
        myChart.dispose();
    }
}

var Echarts = new Echarts();