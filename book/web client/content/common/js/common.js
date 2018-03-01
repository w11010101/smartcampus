(function(){
    // 添加收藏 ================================================================
    // 
    var input = $(".header-search-btn input");
    var collcetionBtn  = $(".header-search-btn button");
    var list = $(".list");
    input.on("input",function(){
        if(this.value.length > 0){
            collcetionBtn.addClass("active").attr("disabled",false);
        }else{
            collcetionBtn.removeClass("active").attr("disabled",true);
        }
    });
    // 加号按钮的点击事件
    collcetionBtn.on("click",function (argument) {
        console.log("添加收藏！！！");
        list.prepend(collcetionHtml());
        input.val("");
        collcetionBtn.removeClass("active").attr("disabled",true);
    });
    // 要插入的列表dom结构
    function collcetionHtml (data){
        return '<li><a href="article.html">\
        <div class="list-title">\
            <h1>腾讯金融学院成立，致力成为培养互联网与金融11111111111</h1>\
            <img src="../../content/shoucang/img/inset.png" alt="">\
        </div><div class="list-source">\
            <img src="../../content/common/img/Bitmap@2x.png" alt="">\
            <p>微信</p>\
            <em>刚刚</em>\
            <i>互联网</i>\
            <div class="tool">\
                <button class="collection-btn"></button>\
                <button class="share-btn"></button>\
            </div></div></a></li>';
    }
    // 分类选择 ================================================================
    // 
    var classArr=[{title:"汽车",num:2},{title:"新闻",num:10},{title:"视频",num:17},{title:"互联网",num:8},{title:"人工智能",num:5},{title:"消费升级",num:7},{title:"娱乐",num:30},{title:"体育",num:15}];
    var selectBtn = $(".select-type button"); 
    var tips = $('.tips');
    var tipsUl = $(".tips ul");
    var tipsMask = $(".tips-mask");
    selectBtn.on("click",function(){
        tips.show(0);
        if($("li",tipsUl).length <= 1){
            for (var i = 0; i < classArr.length;i++) {
                tipsUl.append('<li>'+classArr[i].title+'('+classArr[i].num+')</li>');
            }
        }
    });
    // 类型选择
    $("body").on("click",".tips-content li",function function_name(argument) {
        tipsMask.hide(0);
        tips.hide(0);
        selectBtn.text($(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    });
    // 通知提示 ================================================================
    // 
    var prop = $(".prop");
    $(".header-message-btn").on("click",function(){
        prop.show(0);
    });
    // 隐藏 prop
    $("body").on("click",function(event){
        if($(event.target).parents(".prop").length <= 0 && $(event.target).parents(".header-message-btn").length <=0){
            prop.hide(0);
        }
    });
})();