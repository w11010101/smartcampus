$(function(){
    // var vmRightContainer = new Vue({
    //     el:".right-page-content",
    //     data:{

    //     }
    // })
    // 复制
    var clipboard= new ClipboardJS('.copy');
    clipboard.on('success', function(e) {
        console.log(e.text)
        if(e.value){

        }
        e.clearSelection();
    });
    // 返回当前板块
    $.each($(".demo-express-code-box"),function(i,e){
        if($(e).height()>$("#right-container").height()){
            $(e).append("<a class='btn goTop btn-default' href = '#"+$(e).prev().attr("id")+"' role='button'>返回当前板块</a>");
        }
    })
    // echarts
    // 基于准备好的dom，初始化echarts实例
    // // runEcharts();
    // function runEcharts(){
    //     var myChart = echarts.init(document.getElementById('myChart'));

    //     // 指定图表的配置项和数据
    //     var option = {
    //         title: {
    //             text: '堆叠区域图'
    //         },
    //         tooltip : {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'cross',
    //                 label: {
    //                     backgroundColor: '#6a7985'
    //                 }
    //             }
    //         },
    //         legend: {
    //             bottom:10,
    //             itemGap:20,
    //             data:[
    //                 {
    //                     name:'数据1',
    //                     icon:"rect"
    //                 },
    //                 {
    //                     name:'数据2',
    //                     icon:"rect"
    //                 },
    //                 {
    //                     name:'数据3',
    //                     icon:"rect"
    //                 },
    //                 {
    //                     name:'数据4',
    //                     icon:"rect"
    //                 },
    //                 {
    //                     name:'数据5',
    //                     icon:"rect"
    //                 }]
    //         },
    //         toolbox: {
    //             right:50,
    //             feature: {
    //                 saveAsImage: {},
    //                 restore:{},
    //                 magicType:{
    //                     type: ['line', 'bar'],
    //                 },
    //             }
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '10%',
    //             containLabel: true
    //         },
    //         xAxis : [
    //             {
    //                 type : 'category',
    //                 boundaryGap : false,
    //                 data : ['周一','周二','周三','周四','周五','周六','周日']
    //             }
    //         ],
    //         yAxis : [
    //             {
    //                 type : 'value'
    //             }
    //         ],
    //         series : [
    //             {
    //                 name:'数据1',
    //                 type:'line',
    //                 stack: '总量',
    //                 areaStyle: {
    //                     color: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         x2: 0,
    //                         y2: 1,
    //                         colorStops: [{
    //                             offset: 0, color: '#02a6ff' // 0% 处的颜色
    //                         }, {
    //                             offset: 1, color: '#8ce6ff' // 100% 处的颜色
    //                         }],
    //                         globalCoord: false // 缺省为 false
    //                     }
    //                 },
    //                 lineStyle:{
    //                     color:"#0098eb"
    //                 },
    //                 symbolSize:10,
    //                 itemStyle:{
    //                     color:"#0098eb"
    //                 },
    //                 data:[120, 132, 101, 134, 90, 230, 210]
    //             },
    //             {
    //                 name:'数据2',
    //                 type:'line',
    //                 stack: '总量',
    //                 areaStyle: {
    //                     color: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         x2: 0,
    //                         y2: 1,
    //                         colorStops: [{
    //                             offset: 0, color: '#a9f9f8' // 0% 处的颜色
    //                         }, {
    //                             offset: 1, color: '#5cf0f0' // 100% 处的颜色
    //                         }],
    //                         globalCoord: false // 缺省为 false
    //                     }
    //                 },
    //                 lineStyle:{
    //                     color:"#57c7c8"
    //                 },
    //                 symbolSize:10,
    //                 itemStyle:{
    //                     color:"#57c7c8"
    //                 },
    //                 data:[220, 182, 191, 234, 290, 330, 310]
    //             },
    //             {
    //                 name:'数据3',
    //                 type:'line',
    //                 stack: '总量',
    //                 areaStyle: {
    //                     color: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         x2: 0,
    //                         y2: 1,
    //                         colorStops: [{
    //                             offset: 0, color: '#ffe47d ' // 0% 处的颜色
    //                         }, {
    //                             offset: 1, color: '#ffe88a' // 100% 处的颜色
    //                         }],
    //                         globalCoord: false // 缺省为 false
    //                     }
    //                 },
    //                 lineStyle:{
    //                     color:"#deae06"
    //                 },
    //                 symbolSize:10,
    //                 itemStyle:{
    //                     color:"#deae06"
    //                 },
    //                 data:[150, 232, 201, 154, 190, 330, 410]
    //             },
    //             {
    //                 name:'数据4',
    //                 type:'line',
    //                 stack: '总量',
    //                 areaStyle: {
    //                     color: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         x2: 0,
    //                         y2: 1,
    //                         colorStops: [{
    //                             offset: 0, color: '#feb89f' // 0% 处的颜色
    //                         }, {
    //                             offset: 1, color: '#ffb99f' // 100% 处的颜色
    //                         }],
    //                         globalCoord: false // 缺省为 false
    //                     }
    //                 },
    //                 lineStyle:{
    //                     color:"#e78352"
    //                 },
    //                 symbolSize:10,
    //                 itemStyle:{
    //                     color:"#e78352"
    //                 },
    //                 data:[320, 332, 301, 334, 390, 330, 320]
    //             },
    //             {
    //                 name:'数据5',
    //                 type:'line',
    //                 stack: '总量',
    //                 label: {
    //                     normal: {
    //                         show: true,
    //                         position: 'top'
    //                     }
    //                 },
    //                 areaStyle: {
    //                     color: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         x2: 0,
    //                         y2: 1,
    //                         colorStops: [{
    //                             offset: 0, color: '#e837aa' // 0% 处的颜色
    //                         }, {
    //                             offset: 1, color: '#ffb1e5' // 100% 处的颜色
    //                         }],
    //                         globalCoord: false // 缺省为 false
    //                     }
    //                 },
    //                 lineStyle:{
    //                     color:"#d02597"
    //                 },
    //                 symbolSize:10,
    //                 itemStyle:{
    //                     color:"#d02597"
    //                 },
    //                 data:[820, 932, 901, 934, 1290, 1330, 1320]
    //             }
    //         ]
    //     };
    //     // 使用刚指定的配置项和数据显示图表。
    //     myChart.setOption(option);
    //     // 更改图标类型事件
    //     myChart.on("magictypechanged",function(params){
    //         var newSeies = [];
    //         for(var i = 0;i<5;i++){
    //             newSeies.push({
    //                     stack: null,
    //                     areaStyle: null,
    //                 });
    //         }
    //         myChart.setOption({
    //             series:newSeies
    //         });
    //     });
    //     // 重置事件
    //     myChart.on("restore",function(params){
    //         myChart.setOption(option);
    //     });
    // }
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
// // runPaging();
// function runPaging(){
//     var pagingVM = new Vue({
//         el: '#paging-app',
//         data: {
//             current_page: 1, //当前页
//             pages: 50, //总页数
//             changePage:'',//跳转页
//             nowIndex:0
//         },
//         computed:{
//             show:function(){
//                 return this.pages && this.pages !=1
//             },
//             pstart: function() {
//                 return this.current_page == 1;
//             },
//             pend: function() {
//                 return this.current_page == this.pages;
//             },
//             efont: function() {
//                 if (this.pages <= 7) return false;
//                 return this.current_page > 5
//             },
//             ebehind: function() {
//                 if (this.pages <= 7) return false;
//                 var nowAy = this.indexs;
//                 return nowAy[nowAy.length - 1] != this.pages;
//             },
//             indexs: function() {

//                 var left = 1,
//                 right = this.pages,
//                 ar = [];
//                 if (this.pages >= 7) {
//                     if (this.current_page > 5 && this.current_page < this.pages - 4) {
//                         left = Number(this.current_page) - 3;
//                         right = Number(this.current_page) + 3;
//                     } else {
//                         if (this.current_page <= 5) {
//                             left = 1;
//                             right = 7;
//                         } else {
//                             right = this.pages;

//                             left = this.pages - 6;
//                         }
//                     }
//                 }
//                while (left <= right) {
//                    ar.push(left);
//                    left++;
//                }
//                 return ar;
//             },
//         },
//         methods: {
//             jumpPage: function(id) {
//                 this.current_page = id;
//                 if(this.current_page>this.pages){
//                     console.log("cuowu");
//                 }
//             },
//         },
//     });
// }
// 表格 多选
// function table_checkbox_change(){
//     $("#table").on("click",".table-checkbox",function(){
//         var table = $("#table");
//         $(this).toggleClass("active");

//         if($("tbody .table-checkbox").length == $("tbody .table-checkbox.active").length){
//             $("thead .table-checkbox").addClass("active");
//         }else{
//             $("thead .table-checkbox").removeClass("active");
//         }
//     });

//     $("#table").on("click","thead .table-checkbox",function(){
//         var table = $("#table");
//         $(this).toggleClass("active");
//         if($(this).hasClass("active")){
//             $("tbody .table-checkbox").addClass("active");
//         }else{
//             $("tbody .table-checkbox").removeClass("active");
//         }
        
//     });
// }
// table_checkbox_change();

// 表单 单选和多选

// form_checkbox_change();
// function form_checkbox_change(){
//     // 多选
//     $("form").on("click",".form-checkbox",function(){
//         $(this).toggleClass("active");
//     });
//     // 单选
//     $("form").on("click",".form-radio",function(){
//         $(this).addClass("active").parent().siblings().find(".form-radio").removeClass("active");
//     });
// }
// // 上传按钮
// $(".file-upload").on("click","button",uploadBtnFn);
// function uploadBtnFn(){
//     $(this).prev().find("input[type=file]").trigger("click");
// }