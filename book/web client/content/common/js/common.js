// 推荐人 ================================================================
var referee = [{
    name: "新中信集团",
    id: 0,
    level: 1,
    children: [{
            name: "总裁办公室",
            id: 1,
            level: 2,
            type: "dept",
            children: [{
                name: "总裁办公室_部门1",
                id: 11,
                level: 3,
                type: "dept",
                children: [{
                    name: "总裁办公室_部门1_子部门1",
                    id: 111,
                    level: 4,
                    type: "dept"
                }, {
                    name: "总裁办公室_部门1_子部门2",
                    id: 112,
                    level: 4,
                    type: "dept"
                }, {
                    name: "总裁办公室_部门1_子部门3",
                    id: 112,
                    level: 4,
                    type: "dept"
                }, {
                    name: "总裁办公室_部门1_员工1",
                    id: 12235648687,
                    level: 4,
                    icon:"../../content/common/img/head-1.png"
                }]
            }, {
                name: "总裁办公室_部门2",
                id: 12,
                level: 3,
                type: "dept",
            }, {
                name: "总裁办公室_部门3",
                id: 13,
                level: 3,
                type: "dept",
            }, {
                name: "总裁办公室_部门1_员工2",
                id: 12235648687,
                level: 3,
                icon:"../../content/common/img/header.png"
            }]
        },
        {
            name: "发展研究院",
            id: 2,
            level: 2,
            type: "dept",
            children: [{
                name: "发展研究院_部门1",
                id: 21,
                level: 3,
                type: "dept",
                children: [{
                    name: "发展研究院_部门1_子部门1",
                    id: 211,
                    level: 4,
                    type: "dept",
                }, {
                    name: "发展研究院_部门1_子部门2",
                    id: 212,
                    level: 4,
                    type: "dept",
                }, {
                    name: "发展研究院_部门1_子部门3",
                    id: 212,
                    level: 4,
                    type: "dept",
                }, {
                    name: "发展研究院_部门1_员工1",
                    id: 22235648687,
                    level: 4,
                    icon:"../../content/common/img/header.png"
                }]
            }, {
                name: "发展研究院_部门2",
                id: 22,
                level: 3,
                type: "dept",
            }]
        },
        {
            name: "治理中心",
            id: 3,
            level: 2,
            type: "dept",
        },
        {
            name: "资本经营中心",
            id: 4,
            level: 2,
            type: "dept",
        },
        {
            name: "2C业务发展中心",
            id: 5,
            level: 2,
            type: "dept",
        }
    ]
}, ]

// 本地存储 ================================================================
function setlocal() {
    this.saveDate = function(key, val) {
        localStorage.setItem(key, val);
    }
    this.delDate = function(key) {
        localStorage.removeItem(key);
    }
}

window.local = new setlocal();
// 创建侧边栏 ================================================================

function createAside(option) {
    var aside;
    if (!option.isHas) {
        var container = '<aside></aside>';
        $("body").append(container);
        aside = $("aside");
    } else {
        aside = $("aside");
        aside.html("");
    }

    // 存储数据
    // local.saveDate("b123", 212312);

    var header = "<h2><label>" + option.label + "</label><button class=\"close\"></button></h2>";
    var fromHtml = getFromHtml(option.formType);
    var listHtml = getLiHtml(option.listType);

    aside.append(header);
    aside.append(fromHtml);
    aside.append(listHtml);

    switch (option.listType) {
        case "list":
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            break;
        default:
            levelEventFn();
            break;
    }
    // 关闭
    $("body").on("click", "aside .close", function(argument) {
        aside.removeClass("show");
        setTimeout(function() {
            aside.remove();
        }, 300)

    });
    // 显示
    aside.fadeIn(100, function(argument) {
        aside.addClass("show");
    });
    return aside;
}

// 选择form
function getFromHtml(type) {
    switch (type) {
        case "comment":
            return '<form action=""><input type="search" name="" placeholder="写下你的评论..."><button>搜索</button>';
            break;
        case "search":
            return '<form action=""><input type="text" name="" placeholder="搜索联系人"><input type="submit" name="" value="搜索"></form>';
            break;

    }
}

// 选择li
function getLiHtml(type, data) {
    switch (type) {
        case "comment":
            var html = [];
            for (var i = 0; i < 10; i++) {
                html.push('<li>\
                    <div class="list-header">\
                        <img src="../../content/common/img/header.png">\
                        <em>周红<i>回复</i>廖凡</em>\
                        <i class="laud">16</i>\
                    </div>\
                    <p class="list-word">天气一天比一天冷，穿什么更时髦讲真我们已经没那么care了。要知道，最近oversize毛衣已经成为编辑部出勤率最高的员工了。</p>\
                    <div class="comment-state">\
                        <div>刚刚·<a class="comment-state-reply-btn">回复</a></div>\
                        <form>\
                            <input type="text" name="" placeholder="回复周一围">\
                            <a class="state-laud">评论</a>\
                            <a class="state-cancel" onclick="$(this).parent().prev().removeClass("none")">取消</a>\
                        </form>\
                    </div>\
                </li>');
            }

            return html.join("");
            break;
        case "laud":
            return "";
            break;
        case "level":

            var level1 = referee[0].children;
            var html = ['<li class="all"><i selectType=false></i>全部</li>'];
            $.each(level1, function(i, e) {
                html.push('<li listType = "item" setId = ' + e.id + ' level = "' + e.level + '"><i></i><p>' + e.name + '</p></li>');

            });
            return '<div class="level-catalog"><h3 class="">' + referee[0].name + '<em></em></h3><ul class="level-parent">' + html.join('') + '</ul><p class="person-sum">共162人</p></div>';
            break;
        case "list":
            return '<ul id="treeDemo" class="ztree showIcon"></ul><p class="person-sum">共162人</p>';
            break;

    }
}

// 通讯录选择 —— 事件 ================================================================

function levelEventFn() {
    var allBtn = $("body .level-catalog li.all i");
    var allLi = $("body .level-catalog li.all");
    var selectAllBtn = $("body .level-catalog li i");
    var selectLiAllBtn = $("body .level-catalog li:not(.all) p");
    var levelContainer = $("body .level-catalog");

    // 全选
    var queryAll = ".level-catalog li.all";
    $("body").off("click", queryAll).on("click", queryAll, function(argument) {
        var state = allBtn.attr("selectType");

        if (typeof allBtn.attr("selectType") === 'string') {
            state = JSON.parse(allBtn.attr("selectType"));
        }
        if (state) {
            selectAllBtn.removeClass("active");
            allBtn.attr("selectType", false);
        } else {
            allBtn.attr("selectType", true);
            selectAllBtn.addClass("active");
        }
    });

    // 单选 (除了全选按钮)
    var queryNotAll = ".level-catalog li:not(.all) i";
    $("body").off("click", queryNotAll).on("click", queryNotAll, function(argument) {
        $(this).toggleClass("active");
        var allLength = selectAllBtn.not(allBtn).length;
        if (allLength === selectAllBtn.not(allBtn).parent().find(".active").length) {
            allBtn.addClass("active").attr("selectType", true);
        } else {
            allBtn.removeClass("active").attr("selectType", false);
        }
    });

    // 创建2+层级列表
    var levelIndex = 1;
    var levelOldIndex;
    var levelList = [];
    var queryLevel = ".level-catalog li:not(.all)[listType='item'] p";
    $("body").off("click", queryLevel).on("click", queryLevel, function() {

        var ul = '<ul class="level-sub-' + levelIndex + '"></ul>';
        levelContainer.append(ul);
        // lis 假列表
        var lis = [];

        var activeArr = getActiveLevelList(referee, $(this).parent().attr("level"), $(this).parent().attr("setId"));
        if (activeArr) {
            $.each(activeArr, function(i, e) {
                var img = e.icon?'<img src="'+e.icon+'" alt="" />':"";
                console.log(e)
                lis.push('<li listType = "' + (e.type == "dept" ? 'item' : '') + '" setId = ' + e.id + ' level = "' + e.level + '" ><i></i>'+img+'<p>' + e.name + '</p></li>')
            });
        } else {
            lis.push('<div class="nothing">暂无成员</div>')
        }
        $(".level-sub-" + levelIndex).append(lis.join(''));
        levelList.push({
            levelIndex: 0,
            levelName: $(this).text(),
            subtitle: "副标题副标题" + levelIndex
        });

        setTimeout(function() {
            if (levelIndex <= 1) {
                $('.level-parent').addClass("hide");
            } else {
                $(".level-sub-" + levelOldIndex).addClass("hide");
            }
            $(".level-sub-" + levelIndex).addClass("show");
            levelOldIndex = levelIndex;
            levelIndex++;

        }, 100);
        // 修改标题

        $('.level-catalog h3').html(levelList[levelIndex - 1].levelName + ' <em>' + levelList[levelIndex - 1].subtitle + '</em>').addClass("back");
    });
    // 返回上一级
    // 
    $("body").on("click", "h3.back", function(argument) {
        levelIndex--;
        levelOldIndex--;
        if (levelOldIndex == 0) {
            $("h3.back").removeClass("back").text("新中信集团");
            $(".level-parent").removeClass("hide");
        } else {
            $(".level-sub-" + levelOldIndex).removeClass("hide");

        }
        $(".level-sub-" + levelIndex).remove();
        levelList.splice(levelList.length - 1);
        var last = levelList.length - 1;
        if (last >= 0) {
            $('.level-catalog h3').html(levelList[last].levelName + ' <em>' + levelList[last].subtitle + '</em>');
        }

    });
}
// 获取对应的层级 的子集列表
function getActiveLevelList(levelObj, level, id) {
    if (!levelObj) return false;
    var l = levelObj.length;
    var active;
    if (!l) return false;
    for (var i = 0; i < l; i++) {
        var e = levelObj[i];
        if (e.level == level && e.id == id) {
            return e['children'] ? e.children : null;
        } else {
            if (e["children"]) {
                active = getActiveLevelList(e.children, level, id);
                return active;
            } else {
                // 没找到
                return null;
            }
        }
    }
}
// 创建弹出层 ================================================================
function createPopupFn(option) {
    var alertObj;
    if (!$(".mask").length) {
        $("body").append('<div class="mask"></div>');
    }
    if (!option.isHas) {
        var container = '<div class="popupBox"></div>';
        $("body").append(container);
        popupBox = $(".popupBox");
    } else {
        popupBox = $(".popupBox");
        popupBox.html("");
    }
    popupBox.addClass('popup-' + option.type);
    popupBox.append("<h2><label>" + option.title + "</label><button onclick=$('.popupBox,.mask').remove(0);></button></h2>");

    popupBox.append(getMainHtml(option));
    if (option.type == "share") {
        var areas = document.getElementById('textarea');
        makeExpandingArea(areas);
    }
    $('.popupBox,.mask').show(0);
}

function getMainHtml(option) {
    switch (option.type) {
        case "share":
            return '<div class="list-title">\
                    <h1>' + option.setData.name + '</h1>\
                    <img src="../../content/collection/img/inset.png" alt="">\
                </div>\
                <div class="expandingArea " id="textarea">\
                    <pre><span class="textarea-span"></span><br></pre>\
                    <textarea class="textarea" placeholder="推荐理由..." maxlength="120"></textarea>\
                </div>\
                <p class="font-statis">0/120</p>\
                <h3>选择推荐人</h3>\
                <ul>\
                    <li><img src="../../content/common/img/header.png"><a class="del"></a></li>\
                    <li><img src="../../content/common/img/head-1.png"><a class="del"></a></li>\
                    <li><img src="../../content/common/img/head-3.png"><a class="del"></a></li>\
                    <li class="add"></li>\
                </ul>\
                <div class="send popup-btns">\
                    <label><a></a>公开次推送</label>\
                    <button class="sendBtn">发送</button>\
                </div>';
            break;
        case "upload-photo":
            // 加载列表
            var classArr = [{ title: "汽车", num: 2 }, { title: "新闻1", num: 10 }, { title: "视频2", num: 17 }, { title: "互联网", num: 8 }, { title: "人工智能", num: 5 }, { title: "消费升级", num: 7 }, { title: "娱乐", num: 30 }, { title: "体育", num: 15 }, { title: "汽车", num: 2 }, { title: "新闻1", num: 10 }, { title: "视频2", num: 17 }, { title: "互联网", num: 8 }, { title: "人工智能", num: 5 }, { title: "消费升级", num: 7 }, { title: "娱乐", num: 30 }, { title: "体育", num: 15 }];
            var lis = '';
            for (var i = 0; i < classArr.length; i++) {
                lis += '<li>' + classArr[i].title + '(' + classArr[i].num + ')</li>';
            }
            var inputFile = option.uploadType == "multiple" ? '<input type="file" name="file" multiple accept="image/gif, image/jpeg, image/png, image/jpg" />' : '<input type="file" name="file" accept="video/*,text/plain, application/pdf, application/vnd.ms-works , application/vnd.ms-powerpoint ,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.presentationml.presentation"/>';
            // 本地没有提交接口，暂时删除form（可无视）
            // <form id="myForm" enctype="multipart/form-data" method="post" >
            return '\
                    <div class="files">\
                        <div class="file-add-btn ' + (option.uploadType == "multiple" ? "" : "file-text") + '">' + inputFile + '</div>\
                    </div>\
                    <div class="collapse-box">\
                        <h3 class="collapse-title">上传到：<em>互联网</em><button class="collapse-btn" onclick="toggleFadeCollapse(this)"></button></h3>\
                        <div class="collapse-container">\
                            <ul>\
                                <li class="active">全部分类(94)</li>' + lis + '\
                            </ul>\
                        </div>\
                    </div>\
                    <div class="send popup-btns">\
                        <button class="upload-btn" onclick="uploadFn(this);">上传</button>\
                        <button class="upload-cancel" onclick=$(".popupBox,.mask").remove();>取消</button>\
                    </div></form>';
                    // 
            break;
    }
}
// 类型 展开 和 收起 事件
function toggleFadeCollapse(obj) {
    $(obj).toggleClass("active").parent().next(".collapse-container").stop().slideToggle(200);
}
// uploadFn 上传 按钮点击事件 ================================================================
var percentsObj = {};
var n = 0;
var longTime = 10000;

function uploadFn(obj) {
    
    console.log("uploadFn 这里");
    
    // 判断 要上传的图片个数
    if ($(".file").length >= 1) {
        $(".upload-container").removeClass("toggleShow");
        $.each($(".file"), function(i, e) {
            var obj = {
                name: $("em", e).text(),
                src: $("img,.file-video", e).attr("src"),
                size: $(e).attr("setSize"),
            }
            $(".upload-file-list").append(getUploadListHtml(obj));
            
        });
        fileUpLoading();
        // 先隐藏，onloaded(); 后再删除；
        $(".popupBox,.mask").hide(0);
    } else {
        console.log("长度为<1");
    }
}
// 设置 进度条 显示效果 
// var num = 0;
// var startTime = 0;
// var pauseTime = 0;
// var runTime = 0;
function uploadStart(length,percent) {
    console.log("length = " , length);
    var files = $(".upload-file-list .upload-file");
    console.log(files.length)
    // 防止之前 添加的任务 反复运行
    if (files.length > 1 && files.length - length>0){
        files = files.eq(files.length - length - 1).nextAll();
    }

    // console.log(percent)
    console.log(files.length)
    
    for (var i = 0; i < files.length; i++) {
        files.eq(i).find(".bar-track").css('background-size', percent+'% 100%');
        // files.find(".bar-track").css('background-size', percent+'% 100%');
    }
}
// 获取上传列表的html结构
function getUploadListHtml(options) {
    return (function() {
        var html = '<div class="upload-file">\
            <div class="upload-img">\
                <img src="' + options.src + '" alt="">\
            </div>\
            <div>\
                <div class="upload-info">\
                    <p>' + options.name + '</p>\
                    <em class="file-size">' + options.size + '</em>\
                    <div class="bar-range">\
                        <div class="bar-track"></div>\
                    </div>\
                </div>\
                <div class="upload-edit">\
                    <em class="upload-edit-em "></em>\
                    <em class="upload-edit-em "></em>\
                    <em class="upload-edit-em "></em>\
                </div>\
            </div>\
        </div>';
        return html;
    })()
}
// xhr 请求集合
var xhrObj = [];
function fileUpLoading(){
    var input = document.querySelector("input[type=file]");
    var files = $(".upload-file-list .upload-file");
    // 下载列表（files） 中 当前的任务的下标
    // var i = files.length-1+index;
    // console.log("第",i,"下标的任务开始");
    if (input && input.value == "") {
        alert("没有文件");
    }else {
        // 创建FormData
        var fd = new FormData();
        for(var f of filearr){
            fd.append('file',f);
        }

        // ===================================
        // 创建xhr
        var xhr = new XMLHttpRequest();
        xhrObj.push({xhr:xhr,setloaded:""});
        xhr.open("POST", "http://172.16.24.248:3000/", true);
        // 监听上传状态
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                console.log(arguments);
                filearr = [];
            }
        }
        // 进度条部分
        xhr.upload.onprogress = function (evt) {
            // console.log(evt);
            var loaded = evt.loaded;
            var total = evt.total;
            var percent = (loaded/total*100).toFixed(1);
            // console.log(percent);
            if (evt.lengthComputable) {
                uploadStart($(".file").length,percent);
                filearr = [];
            }
        }
        xhr.upload.onloadstart = function (evt) {
            console.log('onloadstart',evt);
            
        }
        // 终止
        xhr.upload.onabort = function (evt) {
            console.log('onabort',evt);
            
        }
        // var thisFile = $('.upload-file').eq(i);
        // console.log(thisFile)
        // 加载进度停止后被触发
        xhr.upload.onloadend = function (evt) {
            console.log('onloadend',evt);
            $(".popupBox,.mask").remove(0);
            // thisFile.find(".paused").removeClass('paused');
            // thisFile.find(".close").removeClass('close');
            // thisFile.find(".refresh").removeClass('refresh');
            // thisFile.find(".upload-edit-em").eq(0).removeClass('pause cancel').addClass("done");
        }
        // 发送ajax请求
        xhr.send(fd);
        
        // ===================================
    }
}

// 输入框自动调整高度 ================================================================
function makeExpandingArea(container) {
    if (!container) return false;
    var area = container.querySelector('.textarea');
    var span = container.querySelector('.textarea-span');
    if (area.addEventListener) {
        area.addEventListener('input', function() {
            span.textContent = area.value;
            fontStatis($(area).val());
        }, false);
        span.textContent = area.value;
    } else if (area.attachEvent) {
        area.attachEvent('onpropertychange', function() {
            var html = area.value.replace(/\n/g, '<br/>');
            span.innerText = html;
            fontStatis($(area).val());
        });
        var html = area.value.replace(/\n/g, '<br/>');
        span.innerText = html;

    }

    function fontStatis(val) {
        $(".font-statis").html(val.length + '/120');
    }

    container.className += "active";
}

function stateTips(value,state){
    if($("body .state-tips").length <= 0){
        console.log(1)
        $("body").append('<div class="state-tips"><div class="tips-icon '+(state?"success":"fail")+'"><img src="../../content/common/img/success.png" alt="" /><p>'+value+'</p></div></div>');
        console.log($(".state-tips"))
    }
    
}

stateTips("上传成功",true);