var r = function(max) {
    var m = max || 10;
    return Math.floor(Math.random() * m);
};


var Echarts = function() {
    this.data = function(option) {
        let arr = [];
        var value = size = 0;
        if(option.data){
            for (let f = 0; f < option.data.length; f++) {
                value = size = option.val ? (option.val[f] / this.sum(option.val) * 100).toFixed(0) : option.size;
                arr.push({
                    name: option.data[f],
                    value: value,
                    symbolSize: size * 2,
                    category: option.data[f],
                    symbol: option.symbol ? "image://../../content/style/white/xueqizhangdan/images/" + option.symbol[f] : "circle",
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
        if(option.data) {
            for (let f of option.data) {
                arr.push({ name: f })
            }
        }
        return arr;
    };
    this.type = function(option){
        let data = this.data(option);
        let categories = this.categories(option);
        switch (option.type){
            case "line":
                return {
                    title: {
                        text: '堆叠区域图'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['周一','周二','周三','周四','周五','周六','周日']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'邮件营销',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'联盟广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'视频广告',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'直接访问',
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'搜索引擎',
                            type:'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {normal: {}},
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };
            break;
            case "graph":
                return {
                    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                            offset: 0,
                            color: '#f7f8fa'
                        },
                        {
                            offset: 1,
                            color: '#cdd0d5'
                        }
                    ]),
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        force: {
                            repulsion: option.repulsion
                        },
                        data: data,
                        draggable: true,
                        categories: categories,
                        edgeSymbol: ['circle', 'arrow'],
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                            }
                        },
                    }],
                    toolbox: {
                        feature: {
                            restore: {}
                        }
                    }
                };
            break;
            case "pie":
                return {
                    series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : '50%',
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                            {value:135, name:'视频广告'},
                            {value:1548, name:'搜索引擎'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                    ]
                };
            break;
        }
    }

    this.run = function(option) {
        // console.log("option : ", option);
        
        __default = this.type(option);

        var myChart = echarts.init(option.el);
        myChart.setOption(__default);
        // myChart.on("mousedown", function(params) {
        //     console.log("mousedown params : ", params);
        //     // document.addEventListener("mousedown",function (e) {
        //     //     e.preventDefault();
        //     // })
        //     $('.smart-content').onepage_scroll({
        //         responsiveFallback: true
        //     })
        // })
        // myChart.on("mouseup", function(params) {
        //     console.log("mouseup params : ", params);
        //     // onepageScroll();
        // })
        return myChart;
    }
    this.dispose = function() {
        myChart.dispose();
    }
}

var Echarts = new Echarts();