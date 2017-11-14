var r = function(max) {
    var m = max || 10;
    return Math.floor(Math.random() * m);
};


var Echarts = function(){
    this.data = function(option) {
        let arr = [];
        var value = size = 0;
        
        for (let f = 0 ;f < option.data.length;f++) {
            value = size = option.val?(option.val[f]/this.sum(option.val) *100).toFixed(0):option.size;
            arr.push({
                name:option.data[f],
                value:value,
                symbolSize: size*1.5,
                category:option.data[f],
                symbol:option.symbol?"image://../../content/style/white/xueqizhangdan/images/" +option.symbol[f]:"circle",
                draggable:"true",
            })
        }
        return arr;
    };
    this.sum = function(arr){
        var s = 0;
        for(let i of arr){
            s += i;
        }
        return s;
    };
    this.categories = function(option){
        let arr = [];
        for( let f of option.data){
            arr.push({name:f})
        }
        return arr;
    };
    
    this.run = function(option){
        // console.log("option : ", option);
        let data = this.data(option);
        let categories = this.categories(option);
        __default = {
            backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                offset: 0,
                color: '#f7f8fa'
            },
            {
                offset: 1,
                color: '#cdd0d5'
            }]),

            series: [{
                type: 'graph',
                layout:'force',
                force: {
                    repulsion:option.repulsion
                },
                data: data,
                roam:true,
                categories:categories,
                focusNodeAdjacency: false,
                nodeScaleRatio: 0,
                symbol: 'circle',
                edgeSymbol: ['circle', 'arrow'],
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                    }
                },
            }],
            toolbox:{
                feature:{
                    restore:{}
                }
            }
        };

        var myChart = echarts.init(option.el);
        myChart.setOption(__default);
    }
}

var Echarts = new Echarts();