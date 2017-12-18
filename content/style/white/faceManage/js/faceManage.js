$(function() {
    //  对比1
    var obj = document.querySelector(".proportion");
    var options = {
        data: [5000, 10000],
        dataAlign: "edge",
        dataTitle: [`自动审核(50)`, '人工审核(2000)'], // 数据对应标签
        // dataTitle:[`1阿斯顿发生`,'a发阿斯蒂发'],  // 数据对应标签
        dataStyle: {
            color: '#a8a8a8',
            fontSize: ".12rem",
        },
        dataProportion: false,
        otherSeries: {
            type: "href",
            value: ["统计", "流水"],
            href: ["faceManage-echart.html", "faceManage-statistical.html"],
        },
    }
    var prop = new Proportion(obj, options);
    
    // 分类按钮 点击事件
    $("body").on("click",".radio-btn",function(){
      $(".radio-btn").removeClass("active");
      $(this).addClass("active");

      console.log(this);
    })
    // 对比对按钮 点击事件
    $("body").on("click",".sort-btn",function(){
      $(this).toggleClass("active");
    })
});

function ajaxList(){
  alert(1);
}