/**
 * [options description]
 * @type {Object} cancelSelected boolean [是否可以取消]
 */
var options = {
    cancelSelected: true, 
}
// 评论的点赞 事件 (绑定时间要放在 加载后)
$(".laudBtn,.essay-collect-btn").off().on("click", clickLaudFn);
function clickLaudFn(event) {
    if (options.cancelSelected) {
        $(this).toggleClass("selected");
    } else {
        $(this).addClass("selected");
    }
};

// 滑动事件 *********************************
/**
 * [loadedScroll 启动reply.html 的上下拉滑动]
 * @return {[type]}null [description]
 */
var myScroll;
function loadedScroll() {
    var scrollState = true;
    myScroll = refresher.init({
        id: "replyWrapper",
        pullDownAction: function() {
            // 下拉
            myScroll.refresh();
        },
        pullUpAction: function() {
            // 上拉
            setTimeout(function() {
                if (scrollState) {
                    myScroll.refresh();
                }
            }, 5000);
        },
        onBeforeScrollStart: beforeScrollStart
        // preventDefault:false
    });
}
// 滑动事件 end *********************************
// 全部评论
// 回复 
var ua = navigator.userAgent;
var ios = ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var inputContainer = $(".input-container");
var input = inputContainer.find(".inputarea");
var form = inputContainer.find("form");

$("body").off().on("touchstart",".replyBtn,.essay-comment-btn", function() {
  inputShow();
});
// 发送按钮

$(".sendBtn").on("touchstart",function(){
  if ($.trim(input.val())) {
    $(".comment-list").append(html({
      person:"张三",
      content:input.val()
    }));
  }else{
    alert("回复内容不能为空！");
  }
  // 隐藏输入框
  inputHide();
});
// 隐藏输入框
function inputHide(s){
  var state = s==="undefined"?true:s;
  inputContainer.hide(0,function(){
    input.val("")[0].blur();
  });

  if(state){
    // 重新渲染iscroll
    myScroll.refresh();
    // 滚动到底部
    myScroll.scrollTo(0,myScroll.maxScrollY);
  }
}

// 显示输入框
function inputShow(){
  setTimeout(function(){
    inputContainer.show(0,function(){
      $(this).addClass("show");
      input.val("")[0].focus();
    });
  },1000);
}
// 窗口大小改变时
window.onresize=function() {
  myScroll.refresh();
  myScroll.scrollTo(0,myScroll.maxScrollY);
};
/**
 * [html 回复内容的dom]
 * @param  {[Object]} options [是一个{}] 
 * @param  {[param]} options.preson [回复人]
 * @param  {[param]} options.header [回复头像]
 * @param  {[param]} options.content [回复内容] 
 * @return {[type]}  html [返回一个回复容器li]
 */
 

function html(options){
  return '<li><div class="comment-box"><h3><img src="../content/images/head-3.png" alt=""><em>'+options.person+'</em>\
                <i class="comment-laud-btn laudBtn icon-laud">16</i></h3>\
              <p>'+options.content+'</p><div><em>刚刚·<a class="replyBtn">回复</a></em></div></div></li>';
} 

// iscroll 组件滑动前的事件回调
function beforeScrollStart(e) {
  // console.log(e);
  var target = e.target;
  while (target.nodeType != 1 )
      target = target.parentNode;
  if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'&& target.tagName != 'A') {
      e.preventDefault();
  }
  // 点击a链接中图片跳转问题
  var startTime = e.timeStamp;
  var endTime;
  if (target.parentNode.tagName == "A") {
    function touchendFn(e){
      var touchTime = e.timeStamp - startTime; 
      if(touchTime < 300 && myScroll.isReady() && !$(".input-container").hasClass("show")){
        $(target.parentNode)[0].click();
      } else if($(".input-container").hasClass("show")){
        // inputHide(false);
      }
      target.removeEventListener("touchend",touchendFn);
    }
    target.addEventListener("touchend",touchendFn);
  }
  if(target.className != "replyBtn"){
    inputHide(false);
  } 
}

