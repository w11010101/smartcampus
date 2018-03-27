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
    var parcent = '';
    var state = false;
    createPopupFn({
        title:'批量导入',       // 标题
        type:"alert",       // 类似alert  
        popupContentType:"import", // 内容主体 类型：import 导入
        close:true,
        data:{
            breadcrumb:true,        // 是否显示面包屑
            breadcrumbData:{level0:'通讯录',level1:'通讯录导入'},     // 面包屑路径
            breadcrumbEl:'.breadcrumb'     // 面包屑容器对象
        },
        callbackFn:{
            saveFn:function(){
                var fileList = $("input[type=file]")[0].files;
                
                if (fileList) {
                    state = true;
                    parcent = setInterval(setParcent,10);
                }
                console.log(fileList);
                console.log(arguments);
            },
            cancelFn:function () {
                if(state){
                    clearInterval(parcent);
                    createPopupFn({
                        title:'您确认要取消？',       // 标题
                        type:"alert",       // 类似alert  
                        popupContentType:"batchDel", // 内容主体 类型：import 导入
                        close:true,
                        callbackFn:{
                            saveFn:function(){
                                state = false;
                                clearInterval(parcent);
                                arguments[0].removeContainer(arguments[1],"all");
                                console.log(arguments);
                            },
                            cancelFn:function () {
                                state = true;
                                console.log(arguments);
                                console.log(this)
                                arguments[0].removeContainer(arguments[1]);
                                parcent = setInterval(setParcent,10);
                                console.log("cancel？？");
                            }
                        }
                    }); 
                }else{
                    arguments[0].removeContainer(arguments[1]);
                }
                
                console.log(21345678);
            }
        }
    });
    var n = 0;
    function setParcent(){
        
        if(n <= 100){
            $(".scroll-bar").css( 'background-size', n + '% 100%' ); 
            
        }else{
            clearInterval(parcent);
            createPopupFn({
                title:'上传成功',       // 标题
                type:"alert",       // 类似alert  
                popupContentType:"batchDel", // 内容主体 类型：import 导入
                close:true,
                flootBtn:["确认"],
                callbackFn:{
                    saveFn:function(){
                        state = false;
                        console.log(arguments);
                        arguments[0].removeContainer(arguments[1],true);
                    },
                    cancelFn:function () {
                        state = true;
                        console.log(arguments);
                    }
                }
            }); 
        }
        n++;
    }
});
// 3.批量删除
$("body").on("click",".batch-del-btn",function(){
    var rowObj = $(".table-container .row:not(:first-child) .active").parents(".row");
    console.log(rowObj.remove());
    createPopupFn({
        title:'批量删除',       // 标题
        type:"alert",       // 类似alert  
        popupContentType:"batchDel", // 内容主体 类型：import 导入
        close:true,
        callbackFn:{
            saveFn:function(){
                console.log("del");
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
// 4.添加成员
$("body").on("click",".add-btn",function(){
    createPopupFn({
        title:'添加成员',
        type:"aside",               
        popupContentType:"aside-add", // import 导入
        callbackFn:{
            saveFn:function(){
                console.log(arguments);
                var lis = '<div class="row">\
                        <div class="col-xs-2"><span class="radio"></span>'+arguments[0].name+'</div>\
                        <div class="col-xs-2">'+arguments[0].job+'</div>\
                        <div class="col-xs-2">'+arguments[0].jobNum+'</div>\
                        <div class="col-xs-2 phone" phone-num="1">'+arguments[0].phone+'</div>\
                        <div class="col-xs-4">'+arguments[0].email+'</div>\
                    </div>';
                $(".table-container").append(lis);
                arguments[0].removeContainer();
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
// 上传 按钮 事件
$("body").on("change",".file-btn input[type=file]",function (argument) {
    var files = this.files||this.files.item();
    console.log("files = ",files);

    // var url = window.URL.createObjectURL(f);
    $(".route").text(this.value.split("\\")[this.value.split("\\").length-1]+" ...");
    
});
// 下拉菜单 监听事件
$('body').on('show.bs.dropdown','.dropdown', function () {
    // console.log(arguments)
})
// 下拉菜单 的 选择事件
$('body').on('click','.dropdown-menu li', function (event) {
    $(this).parents('.dropdown').removeClass("input-error").find("a input[readonly]").val($(this).text());
})


// 添加子部门
$('body').on('click','.add-subDept-btn', function (event) {
    createPopupFn({
        title:$(this).text(),       // 标题
        type:"aside",       // 侧边栏                  
        popupContentType:"edit-dept",     // 内容主体 类型
        data:{
            parentDept:$(this).prev().text(),
        },
        flootBtn:["确认","取消"],
        callbackFn:{
            saveFn:function(){
                if(arguments[0].deptName){
                    $(".subDept-list").append('<li>'+arguments[0].deptName+'(0人)</li>')
                    arguments[0].removeContainer();
                    console.log(zNodes)
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo"); 
                    zTree.reAsyncChildNodes(null, "refresh");
                }
            },
            cancelFn:function () {
                console.log(arguments);
            },
            delFn:function () {
                console.log(arguments);
            }
        }
    });
})

// 面包屑 的 点击事件
$("body").on("click",".breadcrumb li:not(:last-child)",function(){

    var text = $(this).text();
    // console.log('"level"+($(this).index() - 1) = ',"level"+($(this).index() - 1));
    treeObj["level"+($(this).index() - 1)] = text;

    $(".firsh-title em").text(text);

    setBreadcrumbFn({level:$(this).index() - 1},treeObj,$('.container-box .breadcrumb'));

    var zTree = $.fn.zTree.getZTreeObj("treeDemo");

    var nodes = zTree.transformToArray(zTree.getNodes());
    // console.log(nodes)
    if (nodes.length>0) {
        $.each(nodes,function(i,e){
            if(e.name == text){
                zTree.selectNode(nodes[i]);
            }
        })
    }
    expandNode();
})