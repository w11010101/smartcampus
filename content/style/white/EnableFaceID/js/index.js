$(function() {
    var cameraBtn = document.querySelector(".cameraBtn"); // 照片按钮
    var albumBtn = document.querySelector(".albumBtn"); // 相册按钮
    var selected = $(".selected");      // 选择照片容器
    var upload = $(".upload"); // 上传容器
    var img = $(".upload-box img"); // 上传img
    var tips = $(".tips"); // 上传提示语
    var uploadBtns = $(".upload-btns"); // 上传按钮容器
    var base64; // 全局base64 变量
    var photo = {
        "Sno": "08000xxc",
        "Approved": true,
        "FaceID": "08000xxc",
        "PhotoUrl": '',
        // "PhotoUrl": '../../content/style/white/EnableFaceID/images/photo.jpg',
    }
    // 判断 photo.PhotoUrl如果不为空就显示上传部分，否则显示选择部分
    if (photo.PhotoUrl) {
        // 上传部分显示
        upload.fadeIn(200, function() {
            img.attr("src", photo.PhotoUrl);
            tips.addClass("tipShow").html(`您当前使用的照片，<a>在本机启用</a>`);
            uploadBtns.addClass("change");
            upload.addClass('show');
        });
    }else{
        selected.fadeIn(200);
        uploadBtns.removeClass("change");
    }
    console.warn("%c 提示：正式使用时要注释 jsInterface()方法，并打开下面的if语句","color:red;font-size:20px;");
    console.warn("%c 提示：修改10行 photo 对象的 PhotoUrl 值","color:red;font-size:20px;");
    // 调用相机
    cameraBtn.addEventListener("click", function() {
        jsInterface('../../content/style/white/EnableFaceID/images/photo.jpg');
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            window.location.href = 'ios://faceopencamera?type:3&data:"1"&sign:""';
        } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
            let jsJson = "{'type':'OPENCAMERA','data':{},'sign':''}";
            window.AndroidWebView.appInterface(jsJson);
        } else { //pc
            console.log("pc");
        };

    });
    // 调用相册
    albumBtn.addEventListener("click", function() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            window.location.href = 'ios://faceopenalbum?type:3&data:"1"&sign:""';
        } else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
            let jsJson = '{ "type": "GETPHOTO", "data": "1", "sign": "" }';
            window.AndroidWebView.appInterface(jsJson);
        } else { //pc
            console.log("pc");
        };
    })
    // 回调
    function jsInterface(natieJson) {
        natieJson = natieJson.replace("[", '').replace("]", '').replace("\n", '');
        var a = new Array();
        a = natieJson.split(",");
        base64 = a[0];
        if (!base64) {
            myTips("jsInterface base64  ：" + base64);
            return false;
        }
        // 上传部分显示
        selected.fadeOut(200);
        upload.fadeIn(200, function() {
            img.attr("src", 'data:image/jpeg;base64,'+base64)
            upload.addClass('show');
        });
    }
    // 上传部分的按钮 点击事件       **********************************************
    // 上传内 “取消” 按钮 点击事件
    $("body").on("click", ".upload-btns-canel", function() {
        console.log("canel");
        canelFn();
    });
    // 上传内 “使用照片” 按钮 点击事件
    $("body").on("click", ".upload-btns-sure", function() {
        //  照片 上传，要重置页面内容 和 动画;
        upload.addClass('upload-transition');
        tips.addClass("tipShow").html("正在上传中...");
        uploadBtns.fadeOut(200);
        // 调用ajax上传接口；
        if (!base64) {
            myTips("upload base64 ：" + base64);
            return false;
        }
        // ajax 请求      ***********************************
        ajaxRequest({
            url:'/dlmu/EnableFaceID/Submit',
            data:{
                "Sno": "",
                "Name": "",
                "Dept": "",
                "IdentityType": 1,
                "PhotoUrl": "",
                "PhotoBase64": base64
            }
        },function(data){
            // success callBack
            if (!data) {
                myTips("ajax success data ：" + data);
                return false;
            }
            var getData = data.data || data;
            if (getData.ErrCode == 0) {
                setTimeout(()=>{
                    tips.addClass("tipShow").html("您的人脸照片已提交，正在审核，请您耐心等待.");
                    uploadBtns.fadeOut(200);
                    upload.addClass("upload-transition-paused");
                }, 2000);
            } else {
                myTips("ajax ErrMsg ：" + getData.ErrMsg);
                setTimeout(()=>{
                    tips.html("上传失败，请尝试更改照片");
                    uploadBtns.fadeIn(200).addClass("change");
                    upload.addClass("upload-transition-paused");
                }, 2000);
            }
        },function(){
            // error callBack
            setTimeout(()=>{
                tips.text("error 上传请求失败");
                upload.addClass("upload-transition-paused");
                uploadBtns.fadeIn(200).addClass("change");
            }, 2000);
        });
        // ajax 请求 END  ***********************************
    });
    // 更换照片 点击事件
    $("body").on("click", ".upload-btns-change", function() {
        console.log("change");
        canelFn();
    });
    // 在本机启用 点击事件
    $("body").on("click", ".tips a", function() {
        uploadBtns.fadeOut(200).addClass("change");
        // ajax 请求      ***********************************
        ajaxRequest({
            url:"/dlmu/EnableFaceID/Enable",
            data:{
                "Sno": "08000xxc",
                "Enabled": true
            }
        },function(data){
            // success callBack
            setTimeout(()=>{
                uploadBtns.fadeIn(200);
            },2000);
            
        },function(){
            // error callBack
            setTimeout(()=>{
                myTips("本机启用失败！");
                uploadBtns.fadeIn(200);
            },2000);
        });
        // ajax 请求 END  ***********************************
    });
    // 上传部分的按钮点击事件 END   **********************************************
    //  照片 取消上传，或者更换操作，要重置页面内容；
    function canelFn() {
        img.attr("src", "");
        upload.removeClass("upload-transition upload-transition-paused show").fadeOut(200);
        uploadBtns.removeClass("change");
        tips.removeClass("tipShow");
        selected.fadeIn(200);
    }
    /**
     * [myTips 提示语]
     * @param  {String} val     [要提示的文字]
     * @return {[type]} null    [description]
     */
    function myTips(val) {
        $.toast({
            text: val,
            allowToastClose: false, // Boolean value true or false
            hideAfter: 3000, // false to make it sticky or number 
            position: 'bottom-center',
            textAlign: 'center',
            loader: false
        });
    }
})

/**
 * [ajaxRequest ajax Post 请求封装方法]
 * @param       {Object}   option           [description]
 * @attribute   {String}   option.url       [ajax 请求地址]
 * @attribute   {Object}   option.data      [ajax 传参 data]
 * @param       {Function} callback         [成功的回调]
 * @param       {[type]}   failCallBack     [失败的回调]
 * @return      {Object}   data             [返回成功 或者失败的对象data]
 */
function ajaxRequest(option,callback,failCallBack){
    if(option.url){
        $.ajax({
            type: "POST",
            url: option.url,
            data: option.data,
            dataType: "json",

            success: function(data) {
                callback(data);
            },
            error: function(err) {
                failCallBack("error = " + JSON.stringify(err));
            }
        })
    }
}


