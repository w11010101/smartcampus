// 正则表达式判断对象
var re = {
    name:/^[\-\u4e00-\u9fa5]{2,10}$|^[A-Za-z_\ ]{4,16}$/,
    job:/[\-\u4e00-\u9fa5A-Za-z0-9_]{2,10}/,
    deptName:/[A-Za-z0-9_\-\u4e00-\u9fa5]{2,10}/,
    phone:/[0-9]{11}/,
    space:/[0-9A-Z]{2,4}/,
    jobNum:/^[0-9]{6,16}$/,
    email:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
}

// breadcrumb 面包屑导航 ========================================
function setBreadcrumbFn(argument,treeObj,obj) {
    // 标题
    if(argument.name){
        $(".firsh-title em").text(argument.name);
    }
    // 面包屑导航
    var l = treeObj.length;
    var li = [];
    // console.log(treeObj)
    $.each(treeObj,function (i,e) {
        var index = i.substr(5);

        if(argument.level == 0){
            li.push(`<li set-level = ""><a href="#">${treeObj["level"]}</a></li>`); 
            return false;
        }else{
            if(index < argument.level){
                li.push(`<li set-level = "${argument.level}"><a href="#">${e}</a></li>`); 
            }
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
    if(!$(".mask").length){
        $("body").append('<div class="mask"></div>');
    }else{
        $("body").append('<div class="masks"></div>');
    }
    return;
}
// 防暴力点击 ========================================

$("body").on("click",".my-popup button",function(event){
    $(this).off("click");

});
// create popup fn 创建弹出框 ========================================
function createPopupFn(option) {
    if(!option) alert("没有参数，无法创建！");
    var data = option.data||{};

    // 添加容器
    if($("."+option.type+"-container").length) {
        // $("."+option.type+"-container").remove();
    }
    $("body").append(containerHtml(option));
    var container = $("."+option.type+"-"+option.popupContentType);
    setTimeout(()=>{
        container.addClass("show");
    },10);

    // 添加面包屑容器
    if(data.breadcrumb) {
        container.append('<ol class="breadcrumb"></ol>');
        // 添加面包屑导航
        setBreadcrumbFn({level:2},data.breadcrumbData,container.find(data.breadcrumbEl));
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
    }    if(!container.find(".floot-btns").length){
        container.append('<div class="floot-btns">'+flootArr.join("")+'</div>');
    }
    // 保存 按钮 事件
    
    container.find('.save-btn').on('click',function (event) {

        if(!option.callbackFn.saveFn) return false;
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
        obj["removeContainer"] = removeContainer;
        option.callbackFn.saveFn(obj,event);
    });
    // 监听 input 的value change 事件 lodash  
    $("body").on("input",".aside-main input",_.debounce(function () {
        if(this.value.match(re[$(this).attr("name")])){
            $(this).removeClass("input-error");
        }else{
            $(this).addClass("input-error");
        }
    },1000));

    // 取消 按钮 事件
    container.find('.cancel-btn').on('click',function (event) {
        if(!option.callbackFn.cancelFn) return false;
        var obj={};
        obj["removeContainer"] = removeContainer;
        option.callbackFn.cancelFn(obj,this);
    });
    // 删除 按钮 事件
    container.find('.del-btn').on('click',function (event) {
        if(!option.callbackFn.delFn) return false;
        var obj={};
        obj["removeContainer"] = removeContainer;
        option.callbackFn.delFn(obj,this);
    });
    // 关闭 (包括：遮罩层、关闭按钮、保存按钮、取消按钮)；
    container.find('.close-btn').on("click",function (argument) {
        if(!option.callbackFn.closeFn) {
            removeContainer($(this),true);
            return false;
        }
        var obj={};
        obj["removeContainer"] = removeContainer;
        option.callbackFn.closeFn(obj,this);
    });
    function removeContainer(obj,deltype){
        
        if(deltype){
            $(".mask,.masks").remove();
        }else{
            if($(".my-popup").length<=1){
                $(".mask,.masks").remove();
            }else{
                $(".masks").remove();
            }
        }
        
        var events = deltype?$(".my-popup"):$(obj).parents(".my-popup");

        events.removeClass("show");
        setTimeout(()=>{
            events.remove();
        },300);
    }

}
// 容器分类 Html
function containerHtml(option){
    switch (option.type){
        case "alert":
            // 添加遮罩层
            createMaskFn();
            return '<div class="my-popup alert alert-container alert-'+option.popupContentType+'"><h2>'+option.title+'<em class='+(option.close?"close-btn":"")+'></em></h2></div>'
        break;
        case "aside":
            return '<aside class="my-popup aside-container aside-'+option.popupContentType+'"><h2>'+option.title+'</h2></aside>';
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
                    <div class="file-btn"><span class="file-select-btn">选择文件上传</span><em class="route">未选择任何文件</em><input type="file" multiple/></div>
                </div>
                <div class="track-bar">
                    <div class="scroll-bar"></div>
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
                        <input type="text" placeholder = "" name ="deptName" />
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
