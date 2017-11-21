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

                }
                    
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