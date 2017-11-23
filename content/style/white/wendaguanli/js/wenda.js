// 向下展开筛选
function a(){

}
var screen_list = [
    ["未回复", "已回复", "全部"],
    ["校园精灵", "意见反馈"],
];
var lists = $(".smart-screen div[class^=col-xs]");
var picker;
var state = true;
var id = "";
// 条件筛选点击事件
lists.off().on("click", onClick);

function onClick() {
    var index = $(this).index();
    if(!picker){
        picker = new mui.PopPicker({
            layer: 1,
        });
    }
    picker.setData(screen_list[index]);
    $(this).toggleClass("smart-active").siblings().removeClass("smart-active");
    var that = $(this);
    if (state) {
        pickerShow(that, index);
        id = $(this)[0].id;
        state = false;
    } else {
        if (id == $(this)[0].id) {
            // 如果点击的是自己，就hide;
            picker.hide();
            picker.setData(screen_list[index]);
            state = true;
        } else {
            // 如果点击的不是自己，就show;
            pickerShow(that, index);
            id = $(this)[0].id;
            state = false;
        }
    }
    // 遮罩层 和 取消按钮 绑定点击事件，取消smart-active样式
    $(".mui-backdrop,.mui-poppicker-btn-cancel").off().on("tap", function() {
        lists.removeClass("smart-active");
        state = true;
    });
}
// picker组件显示
function pickerShow(obj, index) {
    picker.show(function(items) {
        lists.removeClass("smart-active");
        state = true;
        obj.text(items[0]);
        if (items[0] == "校园精灵") {
            $(".smart-probe").addClass("smart-active");
            scrollPorbe();

        }
    });
}
// 横向滚动
function scrollPorbe() {
    function runMyScroll(obj) {
        var myScroll;
        myScroll = new IScroll(obj, {
            scrollX: true,
            scrollY: false,
            mouseWheel: true,
            preventDefault: false
        });
        $(obj).parent()[0].addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, {
            passive: false
        });
    }

    // 计算 提问分类 的width；
    var classifyLength = $(".smart-probe li").length;
    var classifyWidth = $(".smart-probe li")[0].offsetWidth;
    $("#scroller-probe").css("width", (classifyLength * classifyWidth+ 16*(classifyLength-1)) + "px");
    runMyScroll('#wrapper-probe');
}


// 图标
// option = {

//     xAxis: {
//         show:false,
//     },
//     yAxis: {
//         data: ['李白','杜甫','白居易','王安石','辛弃疾','李商隐']
//     },
//     series: [
//         {
//             name: '2012年',
//             type: 'bar',
//             barMaxWidth:20,
//             // barMinHeight:50,
//             data: [19111, 23438, 31000, 121594, 134141, 681807]
//         }
//     ]
// };
// app.title = '世界人口总量 - 条形图';

option = {
    title: {
        text: '管理员回复排行榜',
        textStyle:{
            fontWeight:"normal",
            fontSize:"15"
        },
        padding:[20,0,0,20]
    },
    grid: {
        left: '12%',
        right: '15%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        show:false,
    },
    yAxis: {
        type: 'category',
        axisLine:{
            show:false,
        },
        axisTick:{
            show:false,
        },
        nameTextStyle:{
            color:"red"
        },

        data: [{
            value:'李白 (2011001)',
            // textStyle:{
            //     aligin:"left"
            // }
        },'杜甫 (2011001)','白居易 (2011001)','王安石 (2011001)','辛弃疾 (2011001)','李商隐 (2011001)'],
        axisLabel:{
            align:"right"
        }
    },
    series: [
        {
            name: '2012年',
            type: 'bar',
            barMaxWidth:12,
            itemStyle:{
                normal:{
                    color:"#0096d2",
                    // color:'red'
                    // barBorderRadius:5
                },
            },
            label:{
                normal:{
                    show:true,
                    position:"right",
                }
            },
            data: [19325, 23438, 31000, 121594, 134141, 281807]
        }
    ]
};


