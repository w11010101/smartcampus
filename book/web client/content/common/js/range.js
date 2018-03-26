$.fn.RangeSlider = function(cfg){
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min).attr('max', max).attr('step', step);

    $input.on("input", function(e){
        $input.attr('value', this.value);
        $input.css( 'background-size', this.value + '% 100%' );
        if ($.isFunction(callback)) {
            callback(this);
        }
    });
};
// video ================================================================
var myVideo = document.querySelector('video'); 
myVideo.controls = false;
var videoTool = $(".video-tool");
var playBtn = $('.playPause');
function playPause(){ 
    if (myVideo.paused){
        myVideo.play(); 
        playBtn.addClass("toggle");
        setTimeout(function(){
            // videoTool.fadeOut(200);
        },1000);
    }
    else {
        myVideo.pause(); 
        playBtn.removeClass("toggle");
    }
} 
function getVidDur(){ 
  alert(myVideo.duration);
} 
$("video").on("mouseenter",function(){
    videoTool.fadeIn(200);
});
videoTool.on("mouseleave",function(){
    // videoTool.fadeOut(200);
});
$("video").on("click",function(){
    videoTool.fadeIn(200);
    setTimeout(function(){
        if(!myVideo.paused){
            // videoTool.fadeOut(200);
        }
    },3000);
})
// 设置结束时间
myVideo.addEventListener("canplay",function(){
    var endTime = new Date(myVideo.duration*1000);
    var m = endTime.getMinutes();
    var s = endTime.getSeconds();
    m = m < 10? "0" + m:m;
    s = s < 10? "0" + s:s;
    $(".endTime").text(m+":"+s);
});
// 监听播放
var playtime = "";

myVideo.addEventListener("playing",function(){
    playtime = setInterval(function(){
        var currentTime = ((myVideo.currentTime/myVideo.duration)*100).toFixed(2);
        $('input[type=range]').val(currentTime).css( 'background-size', $('input[type=range]').val() + '% 100%' ) ; 
        var startTime = new Date(myVideo.currentTime*1000);
        var m = startTime.getMinutes();
        var s = startTime.getSeconds();
        m = m < 10? "0" + m:m;
        s = s < 10? "0" + s:s;
        $(".startTime").text(m+":"+s);
    },100);
});
// 暂停
myVideo.addEventListener("pause",function(){
    console.log('pause');
    clearInterval(playtime);
});

// 进度条
$('input[type=range]').RangeSlider({ min:0,   max: 100,  step: 0.01,  callback: changeFn});

function changeFn(obj){
    var currentTime = (myVideo.duration*(parseFloat(obj.value)/100)).toFixed(2);
    myVideo.currentTime = currentTime;
}
// 全屏
var isFull = false;
function fullScreen(){
    if(!isFull){
        launchFullScreen($("video")[0]);
    }else{
        exitFullscreen();
    }
    isFull = !isFull;
}
// 开启全屏
function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}
// 退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}