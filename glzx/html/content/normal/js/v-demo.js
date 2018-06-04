$(function(){
    // var vmRightContainer = new Vue({
    //     el:".right-page-content",
    //     data:{

    //     }
    // })
    // 复制
    var clipboard= new ClipboardJS('.copy');
    clipboard.on('success', function(e) {
        console.log(e.text)
        if(e.value){

        }
        e.clearSelection();
    });
    // 返回当前板块
    $.each($(".demo-express-code-box"),function(i,e){
        if($(e).height()>$("#right-container").height()){
            $(e).append("<a class='btn goTop btn-default' href = '#"+$(e).prev().attr("id")+"' role='button'>返回当前板块</a>");
        }
    })

});


// base64
function getBase64(url,cb){
    var myImg = new Image();
    myImg.src = url;
    myImg.onload = function(){
        var myCanvas = document.createElement("canvas"),
        width = 15,
        height = 15;
        myCanvas.width = width;
        myCanvas.height = height;
        myCanvas.getContext("2d").drawImage(myImg,0,0,width,width);
        var ext = myImg.src.substring(myImg.src.lastIndexOf(".")+1).toLowerCase(); 
        var dataURL = myCanvas.toDataURL("image/"+ext);
        cb?cb(dataURL):null;
    }
}
