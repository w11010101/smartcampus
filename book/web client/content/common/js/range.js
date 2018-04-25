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
    // videoTool.fadeIn(200);
});
videoTool.on("mouseleave",function(){
    if(!myVideo.paused){
        videoTool.stop().fadeOut(200);   
    }
    
});
$("video").on("click",function(){
    videoTool.stop().fadeIn(200);
    setTimeout(function(){
        if(!myVideo.paused){
            // videoTool.stop().fadeOut(200);
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
        var currentTime = ((myVideo.currentTime/myVideo.duration)*100).toFixed();
        $('input[type=range]').val(currentTime).css( 'background-size', $('input[type=range]').val() + '% 100%' ); 
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
// ESC 退出全屏
document.onkeydown = function(){
    screenChangeEvent();
}
function browserVersion() {
    var userAgent = navigator.userAgent,     
        rMsie = /(msie\s|trident.*rv:)([\w.]+)/,     
        rFirefox = /(firefox)\/([\w.]+)/,     
        rOpera = /(opera).+version\/([\w.]+)/,     
        rChrome = /(chrome)\/([\w.]+)/,     
        rSafari = /version\/([\w.]+).*(safari)/;    
    var browser;    
    var version;    
    var ua = userAgent.toLowerCase();    
    function uaMatch(ua){    
        var match = rMsie.exec(ua);    
        if(match != null){    
            return { browser : "IE", version : match[2] || "0" };    
        }    
        var match = rFirefox.exec(ua);    
            if (match != null) {    
            return { browser : match[1] || "", version : match[2] || "0" };    
        }    
        var match = rOpera.exec(ua);    
            if (match != null) {    
            return { browser : match[1] || "", version : match[2] || "0" };    
        }    
        var match = rChrome.exec(ua);    
            if (match != null) {    
            return { browser : match[1] || "", version : match[2] || "0" };    
        }    
        var match = rSafari.exec(ua);    
            if (match != null) {    
            return { browser : match[2] || "", version : match[1] || "0" };    
        }    
        if (match != null) {    
            return { browser : "", version : "0" };    
        }    
    }    
    var browserMatch = uaMatch(userAgent.toLowerCase());
    if (browserMatch.browser){
        browser = browserMatch.browser;
        version = browserMatch.version;
    }
    return browser + version
}
screenChangeEvent();
function screenChangeEvent(element) {
    var _this = this;
    var browserV = browserVersion();
    if(browserV.indexOf('IE11') >= 0) {
        document.onkeydown = function (e) {
            var keyNum = window.event ? e.keyCode : e.which
            if (keyNum === 27 && _this.isFull) {
                // ie退出全屏   这里针对的是IE11
                exitFullscreen($(".video")[0]);
            }
        }
    } else if (browserV.indexOf('IE10') >= 0 || browserV.indexOf('IE9') >= 0) {
        document.onkeydown = function (e) {
            var keyNum = window.event ? e.keyCode : e.which
            if (keyNum === 27 && _this.isFull) {
                // ie退出全屏   这里针对的是IE10  9
                // _this.exitFullscreenIE11L()
            }
        }
    } else {
        var eventList = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'msfullscreenchange']
        for(var i = 0; i < eventList.length; i++) {
            document.addEventListener(eventList[i], function () {
                // 全屏显示的网页元素
                var fullscreenElement  = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement

                // 判断网页是否处于全屏状态下
                var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msIsFullScreen

                if (fullscreenElement) {
                    console.log('全屏',)
                    // _this.launchFullScreenStyle(_this.opt.ele);
                    fullScreenStyle($(".video")[0]);
                } else {
                    console.log('不是全屏')
                    exitFullscreen($(".video")[0]);
                }
            })
        }
    }
}
// 全屏
var isFull = false;
function fullScreen(){
    if(!isFull){
        launchFullScreen($(".video")[0]);
    }else{
        exitFullscreen($(".video")[0]);
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
    fullScreenStyle(element);
}
function fullScreenStyle(element){
    $(element).css({
        width:"100%",
        height:"100%",
    });
    $(".full-screen").addClass("flex-screen");
}
// 退出全屏
function exitFullscreen(element) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    refreshFullScreenStyle(element);
}
function refreshFullScreenStyle(element){
    $(element).css({
        width:"600px",
        height:"340px",
    });
    $(".full-screen").removeClass("flex-screen");
}