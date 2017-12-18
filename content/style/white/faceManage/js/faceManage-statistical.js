// 切换按钮 点击事件
var state = true;
$("body").on("click",".change-btn",function(){
    $(this).text(state?"人工":"自动");
    state = !state;
});
// 搜索按钮 点击事件
$("body").on("click",".search-btn",function(){
    console.log("search")
});

function ajaxList(){
  alert(0);
}
