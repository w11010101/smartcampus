// $(function() {

var arr = ["美食","水费","运动","图书馆","网费","转账","其他"];
var EchartsObj = [];
EchartsObj.push(Echarts.run({
  el:document.querySelector(".smart-bubble-chart"),
  type:"graph",
  data:arr,
  val:[700,600,500,400,300,200,100],
  repulsion:150,
}));
// 单屏滚动 onepage_scroll
onepageScroll();
function onepageScroll(data){

    console.log(11)
    $('.smart-content').onepage_scroll({
        sectionContainer: '.smart-parts',
        pagination: false,
        loop: false,
        responsiveFallback:false,
        beforeMove: function() {},
        afterMove: function(i) {
            console.log(`第${i}页`)
            if (EchartsObj[i - 1]) return false;

            switch (i) {
                case 1:

                    break;
                case 2:
                    var names = ["张三", "李四", "王五", "赵六", "本人"];
                    EchartsObj.push(Echarts.run({
                        el: document.querySelector(".smart-bubble-chart-1"),
                        type:"graph",
                        data: names,
                        size: 30,
                        repulsion: 150,
                        symbol: [
                            "head-1.png",
                            "head-2.png",
                            "head-3.png",
                            "head-4.png",
                            "head-5.png",
                        ],
                    }))
                    break;
                case 3:
                    break;
                case 4:

                    break;
                case 5:
                    EchartsObj.push(Echarts.run({
                        el: document.querySelector(".smart-bubble-chart-4"),
                        type:"pie",
                        
                    }))
                    EchartsObj.push(Echarts.run({
                        el: document.querySelector(".smart-bubble-chart-5"),
                        type:"pie",
                        
                    }))
                    break;
                case 6:
                    break;   
                default:
                    break;
            }
        }
    });

}

