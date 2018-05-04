$(function(){
    // var vmRightContainer = new Vue({
    //     el:".right-page-content",
    //     data:{

    //     }
    // })
    // 复制
    var clipboard= new ClipboardJS('.copy');
    clipboard.on('success', function(e) {
        console.log(e)
        if(e.value){

        }
        e.clearSelection();
    });
    // 返回当前板块
    
    $.each($(".demo-express-code-box"),function(i,e){
        console.log($("#right-container").height())
        if($(e).height()>$("#right-container").height()){
            $(e).append("<a class='btn btn-default' href = '#"+$(e).prev().attr("id")+"' role='button'>返回当前板块</a>");
        }

    })
    // 日期
    $.datetimepicker.setLocale('zh');
    console.dir($('#startDate').datetimepicker)
    $('#startDate').datetimepicker({        
        timepicker:false,
        format:'Y.m.d',
        onShow:function( ct ){
            console.log($(this).attr("style"))
            // $(this).attr("top",$(this).top())
            this.setOptions({
                maxDate:$('#endDate').val()?$('#endDate').val():false
            })
        },
    });

    $('#endDate').datetimepicker({
        timepicker:false,
        format:'Y.m.d',
        onShow:function( ct ){
            this.setOptions({
                minDate:$('#startDate').val()?$('#startDate').val():false
            })
        },
    });

    // 下拉选项
    
    $(".form-line .dropdown-menu").on("click","li a",function(event){
        var dropdown = $(this).parents(".form-line").find('[data-toggle=dropdown]');
        dropdown.text($(this).text()).parent().removeClass("open");
    });
    // // echarts
    // // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('myChart'));

    // // 指定图表的配置项和数据
    // var option = {
    //     title: {
    //         text: '堆叠区域图'
    //     },
    //     tooltip : {
    //         trigger: 'axis',
    //         axisPointer: {
    //             type: 'cross',
    //             label: {
    //                 backgroundColor: '#6a7985'
    //             }
    //         }
    //     },
    //     legend: {
    //         bottom:10,
    //         itemGap:20,
    //         data:[
    //             {
    //                 name:'数据1',
    //                 icon:"rect"
    //             },
    //             {
    //                 name:'数据2',
    //                 icon:"rect"
    //             },
    //             {
    //                 name:'数据3',
    //                 icon:"rect"
    //             },
    //             {
    //                 name:'数据4',
    //                 icon:"rect"
    //             },
    //             {
    //                 name:'数据5',
    //                 icon:"rect"
    //             }]
    //     },
    //     toolbox: {
    //         right:50,
    //         feature: {
    //             saveAsImage: {},
    //             restore:{},
    //             magicType:{
    //                 type: ['line', 'bar'],
    //             },
    //         }
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '10%',
    //         containLabel: true
    //     },
    //     xAxis : [
    //         {
    //             type : 'category',
    //             boundaryGap : false,
    //             data : ['周一','周二','周三','周四','周五','周六','周日']
    //         }
    //     ],
    //     yAxis : [
    //         {
    //             type : 'value'
    //         }
    //     ],
    //     series : [
    //         {
    //             name:'数据1',
    //             type:'line',
    //             stack: '总量',
    //             areaStyle: {
    //                 color: {
    //                     type: 'linear',
    //                     x: 0,
    //                     y: 0,
    //                     x2: 0,
    //                     y2: 1,
    //                     colorStops: [{
    //                         offset: 0, color: '#02a6ff' // 0% 处的颜色
    //                     }, {
    //                         offset: 1, color: '#8ce6ff' // 100% 处的颜色
    //                     }],
    //                     globalCoord: false // 缺省为 false
    //                 }
    //             },
    //             lineStyle:{
    //                 color:"#0098eb"
    //             },
    //             symbolSize:10,
    //             itemStyle:{
    //                 color:"#0098eb"
    //             },
    //             data:[120, 132, 101, 134, 90, 230, 210]
    //         },
    //         {
    //             name:'数据2',
    //             type:'line',
    //             stack: '总量',
    //             areaStyle: {
    //                 color: {
    //                     type: 'linear',
    //                     x: 0,
    //                     y: 0,
    //                     x2: 0,
    //                     y2: 1,
    //                     colorStops: [{
    //                         offset: 0, color: '#a9f9f8' // 0% 处的颜色
    //                     }, {
    //                         offset: 1, color: '#5cf0f0' // 100% 处的颜色
    //                     }],
    //                     globalCoord: false // 缺省为 false
    //                 }
    //             },
    //             lineStyle:{
    //                 color:"#57c7c8"
    //             },
    //             symbolSize:10,
    //             itemStyle:{
    //                 color:"#57c7c8"
    //             },
    //             data:[220, 182, 191, 234, 290, 330, 310]
    //         },
    //         {
    //             name:'数据3',
    //             type:'line',
    //             stack: '总量',
    //             areaStyle: {
    //                 color: {
    //                     type: 'linear',
    //                     x: 0,
    //                     y: 0,
    //                     x2: 0,
    //                     y2: 1,
    //                     colorStops: [{
    //                         offset: 0, color: '#ffe47d ' // 0% 处的颜色
    //                     }, {
    //                         offset: 1, color: '#ffe88a' // 100% 处的颜色
    //                     }],
    //                     globalCoord: false // 缺省为 false
    //                 }
    //             },
    //             lineStyle:{
    //                 color:"#deae06"
    //             },
    //             symbolSize:10,
    //             itemStyle:{
    //                 color:"#deae06"
    //             },
    //             data:[150, 232, 201, 154, 190, 330, 410]
    //         },
    //         {
    //             name:'数据4',
    //             type:'line',
    //             stack: '总量',
    //             areaStyle: {
    //                 color: {
    //                     type: 'linear',
    //                     x: 0,
    //                     y: 0,
    //                     x2: 0,
    //                     y2: 1,
    //                     colorStops: [{
    //                         offset: 0, color: '#feb89f' // 0% 处的颜色
    //                     }, {
    //                         offset: 1, color: '#ffb99f' // 100% 处的颜色
    //                     }],
    //                     globalCoord: false // 缺省为 false
    //                 }
    //             },
    //             lineStyle:{
    //                 color:"#e78352"
    //             },
    //             symbolSize:10,
    //             itemStyle:{
    //                 color:"#e78352"
    //             },
    //             data:[320, 332, 301, 334, 390, 330, 320]
    //         },
    //         {
    //             name:'数据5',
    //             type:'line',
    //             stack: '总量',
    //             label: {
    //                 normal: {
    //                     show: true,
    //                     position: 'top'
    //                 }
    //             },
    //             areaStyle: {
    //                 color: {
    //                     type: 'linear',
    //                     x: 0,
    //                     y: 0,
    //                     x2: 0,
    //                     y2: 1,
    //                     colorStops: [{
    //                         offset: 0, color: '#e837aa' // 0% 处的颜色
    //                     }, {
    //                         offset: 1, color: '#ffb1e5' // 100% 处的颜色
    //                     }],
    //                     globalCoord: false // 缺省为 false
    //                 }
    //             },
    //             lineStyle:{
    //                 color:"#d02597"
    //             },
    //             symbolSize:10,
    //             itemStyle:{
    //                 color:"#d02597"
    //             },
    //             data:[820, 932, 901, 934, 1290, 1330, 1320]
    //         }
    //     ]
    // };
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(option);
    // // 更改图标类型事件
    // myChart.on("magictypechanged",function(params){
    //     var newSeies = [];
    //     for(var i = 0;i<5;i++){
    //         newSeies.push({
    //                 stack: null,
    //                 areaStyle: null,
    //             });
    //     }
    //     myChart.setOption({
    //         series:newSeies
    //     });
    // });
    // // 重置事件
    // myChart.on("restore",function(params){
    //     myChart.setOption(option);
    // });
})


// base64
function getBase64(url,cb){
    var myImg = new Image();
    myImg.src = url;
    myImg.onload = function(){
        var myCanvas = document.createElement("canvas"),
            width = 15,
            height = 15;
        myCanvas.width = width;
        myCanvas.height = height;
        myCanvas.getContext("2d").drawImage(myImg,0,0,width,width);
        var ext = myImg.src.substring(myImg.src.lastIndexOf(".")+1).toLowerCase(); 
        var dataURL = myCanvas.toDataURL("image/"+ext);
        cb?cb(dataURL):null;
    }
}
