// 正则表达式判断对象
var re = {
    name:'[\-\u4e00-\u9fa5]{2,6}|[A-Za-z_\ ]{4,16}',
    job:'[A-Za-z0-9_\-\u4e00-\u9fa5]{2,10}',
    deptName:'[A-Za-z0-9_\-\u4e00-\u9fa5]{2,10}',
    phone:'[0-9]{11}',
    space:'[0-9A-Z]{2,4}',
    jobNum:'[0-9]{6,16}',
    email:"[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?"
}

// breadcrumb 面包屑导航 ========================================
function setBreadcrumbFn(argument,arr,obj) {
    // 标题
    if(argument.name){
        $(".firsh-title em").text(argument.name);
    }
    // 面包屑导航
    var l = arr.length;
    var li = [];
    $.each(arr,function (i,e) {
        if(argument.level){
            if(i <= argument.level){
                li.push(`<li><a href="#">${e}</a></li>`); 
            }
        }else{
            li.push(`<li><a href="#">${e}</a></li>`); 
        }
        
    });
    obj.html(li.join(""));
}
// 通讯录 部门成员列表选择 ========================================
function radioFn(argument) {
    var allRadio = $("body .radio.all");
    var radios = $("body .radio:not(.all)");
    // 全选
    $("body").on("click",'.radio.all',function(argument) {
        $(this).toggleClass("active");
        if($(this).hasClass("active")){
            radios.addClass("active");
        }else{
            radios.removeClass("active");
        }
        var activeLength = $(".radio:not(.all).active").length;
        // 操作(调整部门、批量删除)
        $(".toggle-btn").attr("disabled",activeLength?false:"disabled");
    });
    //
    $("body").on("click",'.radio:not(.all)',function(argument) {
        var radiosLength = radios.length;
        $(this).toggleClass("active");
        var activeLength = $(".radio:not(.all).active").length;
        if(activeLength == radiosLength){
            allRadio.addClass("active");
        }else{
            allRadio.removeClass("active");
        }
        // 操作(调整部门、批量删除)
        $(".toggle-btn").attr("disabled",activeLength?false:"disabled");
        
    });
}

radioFn();

// createMask fn 创建遮罩层 ========================================
function createMaskFn() {
    $("body").append('<div class="mask"></div>');
   
    return;
}

// 给按钮 添加 绑定事件 ========================================
// 1.编辑部门
$("body").on("click",".edit-btn",function(){
    createPopupFn({
        title:$(this).text(),       // 标题
        type:"aside",       // 侧边栏                  
        popupContentType:"edit-dept",     // 内容主体 类型
        data:{
            thisVal:$(this).prev().text(),

        },
        flootBtn:["确认","删除","取消"],
        callbackFn:{
            saveFn:function(){
                console.log(arguments);
            },
            cancelFn:function () {
                console.log(arguments);
            },
            delFn:function () {
                console.log(arguments);
            }
        }
    });
});
// 2.批量导入/导出 按钮
$("body").on("click",".import-btn",function(){
    createPopupFn({
        title:'批量导入',       // 标题
        type:"alert",       // 类似alert  
        popupContentType:"import", // 内容主体 类型：import 导入
        close:true,
        data:{
            breadcrumb:true,        // 是否显示面包屑
            breadcrumbData:['通讯录','通讯录导入'],     // 面包屑路径
            breadcrumbEl:'.breadcrumb'     // 面包屑容器对象
        }
    });
});
// 3.批量删除
$("body").on("click",".batch-del-btn",function(){
    var rowObj = $(".table-container .row:not(:first-child) .active").parents(".row");
    console.log(rowObj.remove());
});
// 4.添加成员
$("body").on("click",".add-btn",function(){
    createPopupFn({
        title:'添加成员',
        type:"aside",               
        popupContentType:"aside-add", // import 导入
        callbackFn:{
            saveFn:function(){
                console.log(arguments);
            },
            cancelFn:function () {
                console.log(arguments);
            },
            delFn:function () {
                console.log(arguments);
            }
        }
    });
});
// create popup fn 创建弹出框 ========================================
function createPopupFn(option) {
    if(!option) alert("没有参数，无法创建！");
    var data = option.data||{};

    // 添加容器
    if($("."+option.type+"-container").length) {
        $("."+option.type+"-container").remove();
    }
    $("body").append(containerHtml(option));
    var container = $("."+option.type+"-container");
    setTimeout(()=>{
        container.addClass("show");
    },10);

    container.addClass(option.type+"-"+option.popupContentType);
    // 添加面包屑容器
    if(data.breadcrumb) {
        container.append('<ol class="breadcrumb"></ol>');
        // 添加面包屑导航
        setBreadcrumbFn({},data.breadcrumbData,container.find(data.breadcrumbEl));
    } 
    // 添加主体内容
    container.append(mainHtml(option));
    // 添加按钮
    var flootArr = [];
    if (option.flootBtn) {
        for(var i = 0;i< option.flootBtn.length;i++){
            var e = option.flootBtn[i];
            flootArr.push('<button type="'+(e=="确认"||e=="保存"?"submit":"")+'" class="'+(e =="确认"||e=="保存"?"save-btn active":(e=="删除"?"del-btn":(e=="取消"?"cancel-btn":"")))+'">'+e+'</button>');
        }
    }else{
        flootArr = ['<button type="submit" class="save-btn active">保存</button>','<button class="cancel-btn">取消</button>'];
    }
    container.append('<div class="floot-btns">'+flootArr.join("")+'</div>');
    // 保存 按钮 事件
    $('body .save-btn').on('click',function (event) {
        if(!option.callbackFn) return false;
        var obj = {};
        var urlPar = '';

        $.each($(".aside-main input"),function (i,e) {
            
            var key = e.getAttribute("name");
            // 是否只有必选项才判断正则
            /*var must = $(e).parents(".aside-row").find("label");
            if (must.hasClass("must")) {
                // console.log(must);
                if(!e.value.match(re[key])){
                    obj[key] = e.value.match(re[key]);
                    urlPar+=key+'='+e.value.match(re[key])+'&';
                    $(e).addClass("input-error");
                }else{
                    obj[key] = e.value;
                    urlPar+=key+'='+ e.value+"&";
                }
            }else{
                obj[key] = e.value;
                urlPar+=key+'='+ e.value+"&";
            }*/
            if(!e.value.match(re[key])){
                obj[key] = e.value.match(re[key]);
                urlPar+=key+'='+e.value.match(re[key])+'&';
                if (key == "deptName" || key == "space") {
                    $(e).parents(".dropdown").addClass("input-error");
                }else{
                    $(e).addClass("input-error");
                }
            }else{
                obj[key] = e.value;
                urlPar+=key+'='+ e.value+"&";
            }
        });

        obj["urlPar"] = urlPar;
        option.callbackFn.saveFn(obj);
    });
    // 监听 input 的value change 事件 lodash  
    $("body").on("input",".aside-main input",_.debounce(function () {
        console.log(this)
    },1000));

    // 取消 按钮 事件
    $('body .cancel-btn').on('click',function (event) {
        if(!option.callbackFn) return false;
        option.callbackFn.cancelFn('cancelCallBackFn',option);
    });
    // 删除 按钮 事件
    $('body .del-btn').on('click',function (event) {
        if(!option.callbackFn) return false;
        option.callbackFn.delFn('delCallBackFn',option);
    });
    // 关闭 (包括：遮罩层、关闭按钮、保存按钮、取消按钮)；
    $("body .mask,body .close-btn,body .cancel-btn").on("click",function (argument) {
        $(".mask").remove();
        $("."+option.type+"-container").removeClass("show");
        setTimeout(()=>{
            $("."+option.type+"-container").remove();
        },300);
    });
    

}
// 容器分类 Html
function containerHtml(option){
    switch (option.type){
        case "alert":
            // 添加遮罩层
            createMaskFn();
            return '<div class="alert alert-container"><h2>'+option.title+'<em class='+(option.close?"close-btn":"")+'></em></h2></div>'
        break;
        case "aside":
            return '<aside class="aside-container"><h2>'+option.title+'</h2></aside>';
        break;
    }
}

// 内容主体 分类 Html
function mainHtml(option){
    var data = option.data;
    switch (option.popupContentType){
        
        case "import":
            return `
            <div class="main">
                <div class="import-main">
                    <h3>温馨提示:</h3>
                    <p>1.如果需要修改员工信息类别，请<a href="#n">点击此处</a>进行设置，并重新下载模板填写。</p>
                    <p>2.导入会覆盖原有员工信息，如需更新已存在的员工，请先导出通讯录，在导出表格里进行修改。</p>
                </div>
                <div class="step">
                    <label>第一步</label>
                    <span>下载员工通讯录模板，批量填写员工信息</span>
                    <button class="download">下载</button>
                </div>
                <div class="step">
                    <label>第二步</label>
                    <span>上传填写好的员工信息表</span>
                    <div class="file-btn"><span class="file-select-btn">选择文件上传</span><em class="route">未选择任何文件</em><input type="file"/></div>
                </div>
            </div>`;
        break;
        case "batchDel":
            return "";
        break;
        case "edit-dept":
            return `
                <div class='aside-main'>
                    <div class="aside-row">
                        <label class='must'>部门名称</label>
                        <input type="text" placeholder = "${data.thisVal}" name ="deptName" />
                    </div>
                    <div class="aside-row">
                        <label>上级部门</label>
                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <input type="text" readonly = "true" value='新中新集团' />
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">东北大区--事业部1</a></li>
                                <li><a href="#">华北地区--事业部2</a></li>
                                <li><a href="#">华南大区--事业部3</a></li>
                                <!--<li class="divider"></li>-->
                                <li><a href="#">西南大区--事业部4</a></li>
                                <li><a href="#">总部基地--事业部5</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        break;
        case "aside-add":
            return `
                <div class='aside-main'>
                    <div class="aside-row">
                        <label class='must'>姓名</label>
                        <input type="text" placeholder = "" name ="name" />
                    </div>
                    <div class="aside-row">
                        <label class=''>职位</label>
                        <input type="text" placeholder = "" name ="job" />
                    </div>
                    <div class="aside-row">
                        <label class='must'>所属部门</label>
                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <input type="text" readonly = "true" name ="deptName"/>
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">2M业务创新发展中心</a></li>
                                <li><a href="#">2c业务发展中心</a></li>
                                <li><a href="#">东北大区--事业部</a></li>
                                <li><a href="#">华北地区--事业部</a></li>
                                <li><a href="#">华南大区--事业部</a></li>
                                <!--<li class="divider"></li>-->
                                <li><a href="#">西南大区--事业部</a></li>
                                <li><a href="#">总部基地--事业部</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="aside-row">
                        <label class='must'>手机号</label>
                        <input type="tel" placeholder = "" name ="phone" />
                    </div>
                    <div class="aside-row">
                        <label>存储空间</label>
                        <div class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" class='must'>
                                <input type="text" readonly = "true" name ="space"/>
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">500M</a></li>
                                <li><a href="#">1G</a></li>
                                <li><a href="#">2G</a></li>
                                <li><a href="#">5G</a></li>
                                <li><a href="#">10G</a></li>
                                <li><a href="#">20G</a></li>
                                <li><a href="#">50G</a></li>
                                <li><a href="#">1T</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="aside-row">
                        <label class='must'>工号</label>
                        <input type="text" placeholder = "" name ="jobNum" />
                    </div>
                    <div class="aside-row">
                        <label class=''>邮箱</label>
                        <input type="email" placeholder = "" name ="email" />
                    </div>
                </div>
            `
        break;

    }
}
// 上传 按钮 事件
$("body").on("change",".file-btn input[type=file]",function (argument) {
    var f= this.files[0]||this.files.item(0);
    var url = window.URL.createObjectURL(f);
    $(".route").text(this.value.split("\\")[this.value.split("\\").length-1]);
});
// 下拉菜单 监听事件
$('body').on('show.bs.dropdown','.dropdown', function () {
    // console.log(arguments)
})
// 下拉菜单 的 选择事件
$('body').on('click','.dropdown-menu li', function (event) {
    $(this).parents('.dropdown').find("a input[readonly]").val($(this).text());
})

