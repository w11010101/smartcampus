
var screen_list = [
    ["全部部门", "后勤部门", "体育馆", "图书馆", "商户部门"],
    ["全部商户", "海源一餐厅1楼1-16窗口", "海源一餐厅1楼2-11窗口海源一餐厅1楼2", "海源一餐厅1楼3-10窗口窗口海源一餐厅1楼2窗口海源一餐厅1楼2","海源一餐厅1楼1-10窗口"],
    ["今日统计", "近一周", "近一个月", "任意时间"],
];



$(".toggle-proportion").on("click",function (){
    var t = $(this).text();
    $(this).text(t == "收入占比"?"支出占比":"收入占比");
    $(this).prev().text(t);
    // 图表
    
    // var EchartConfig = t == "收入占比"?new incomConfig():new payConfig();
    console.log(pageName);
    var EchartConfig = new get_config({
            pageName:pageName,
            type:$("#picker2").text() == "全部商户"?"all":"certain"
        });
    console.log(EchartConfig)
    // myEcharts.createEcharts(EchartConfig.bar);
    myEcharts.createEcharts(EchartConfig.pie);
})
// function payConfig(){ 
//     // 支出
//     config_pie.pie.valArr = [10000,15000];
//     config_pie.pie.nameArr = ["pos刷卡", "扫一扫"];
//     config_pie.pie.color = ['#00e897', '#42c3ef'];
//     this.pie = config_pie;
// }
// function incomConfig(){
//     // 收入
//     config_pie.pie.valArr  = [15632,13213,78455,14132,31561,35645];
//     config_pie.pie.nameArr = ["老家肉饼","黄焖鸡米饭","山西刀削面","盖饭盖饭盖饭盖饭","云南过桥米线","麻辣香锅"];
//     config_pie.pie.color = ['#00e897', '#42c3ef', '#0096d2', '#fdab06',"#71d6f5","#ee5b16"] 

//     // this.bar = config_bar;
//     this.pie = config_pie;
// }