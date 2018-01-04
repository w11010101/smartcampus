//  对比1

var obj = document.querySelector(".proportion");
var options = {
    data: [5000, 10000],
    dataAlign: "edge",            //  data对齐：edge:靠边;center:"靠中";默认center
    dataTitle: ['自动审核(50)', '人工审核(2000)'],   //  数据对应标签
    dataStyle: {                    //  数据标签样式
        color: '#a8a8a8',
        fontSize: ".12rem",
    },
    barStyle:{},                    //  进度条样式
    dataProportion: false,          //  是否显示比例
//  otherSeries: {                  //  附加信息
//      show:true,
//      type: "href",            //  list：列表；href：跳转
//      value: ["统计", "流水"], //  内容
//      href: [                  //  当type 为 href时，有value值，来添加跳转地址
//         "faceManage-echart.html", 
//         "faceManage-statistical.html"
//      ], 
//  },
}
// 
var prop = new Proportion(obj, options);

// 分类按钮 点击事件
$("body").on("click", ".radio-btn", function() {
    wrapper.refresh();
    $(".radio-btn").removeClass("active");
    $(this).addClass("active");

    $(".smart-list li").remove();
    for(var i = 0; i<10;i++){
      $(".smart-list").append(getHtml());
    }
    wrapper.refresh();
    scrollState = true;
});
var state = true;
// 对比度切换按钮 点击事件
$("body").on("click", ".sort-btn", function() {
    $(this).html(state ? '对比度低<em></em>高' : '对比度高<em></em>低');
    state = !state;
    nothing();
});

// return html 结构
function getHtml(option) {
    return '<li class=smart-list-item><a href=faceManage-examine.html><label><img src=../../content/style//white/faceManage/images/head.png></label><div class=smart-list-line-2><h3><em>李小萌</em><span>2017/12/12</span></h3><p><em>航海学院轮机专业航海学院轮机专业</em><span>对比数：80.00</span></p></div></a>';
}

function ajaxList() {
    console.log("faceManage.html");
}