// 切换按钮 点击事件
var state = true;
$("body").on("click",".change-btn",function(){
    $(this).text(state?"人工":"自动");
    state = !state;
});
// 搜索按钮 点击事件
$("body").on("click",".search-btn",function(){
  if($(".search-box").val()){
    console.log("search");
  }else{
    myTips("搜索内容不能为空");
  }
});

function ajaxList(){
  console.log("faceManage-statistical.html");
}
// return html 结构
function getHtml(option) {
    return '<li class="smart-list-item"><div class="name"><h3>罗杰</h3><span>201711010101</span></div><span class="time">2017/12/12</span><span class="contrast">99.00</span><span class="result">通过</span></li>';
}