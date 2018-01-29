function postList() {
    var groups = data.Response.Groups;
    var capArr = [];
    // var app.persons = [];
    $.each(groups, function(i, e) {
        capArr.push(e.Cap);
        app.persons = app.persons.concat(e.Items);
    });
    app.mailList = groups;
    app.capArr = capArr;

    var depts = dept.Response.Groups;
    app.deptNativeArr = depts;
    var deptItems = [];
    var deptsObj = {};

    $.each(depts, function(i, e) {
        deptItems = deptItems.concat(e.Items);
    });
    $.each(deptItems, function(i, e) {
        deptsObj[e.Id] = [];
    });

    for (var x = 0; x < app.persons.length; x++) {
        deptsObj[app.persons[x].DeptID].push(app.persons[x]);
    }
    app.deptsObj = deptsObj;

}

// ****************************** swiper start ******************************
var changState = true;
var tabsSwiper;

function runTabSwiper() {
    // 启动swiper
    var beforeIndex = 0;
    tabsSwiper = new Swiper('.swiper-container', {
        speed: 500,
        moveStartThreshold: 50,
        onSlideChangeStart: function(event) {
            // 切换tab后触发事件
            // 设置tab切换后样式
            var index = tabsSwiper.activeIndex;
            var thisWrapper = $("[id*='wrapper_page_']").eq(index);
            $(".tabs .active").removeClass('active');
            $(".tabs a").eq(index).addClass('active');
            scrollState = true;
        }
    });
    // tabsSwiper.swipeTo(1, false);
    $(".tabs a").eq(0).addClass("active");
    // tab点击切换事件
    $(".tabs a").on('click', function(e) {
        e.preventDefault();
        $(".tabs .active").removeClass('active');
        $(this).addClass('active');
        tabsSwiper.swipeTo($(this).index(), false);
        scrollState = true;
    });
}

/**
 * ==================================================================================
 * [info.html]
 */
function loadedFn() {
    infoApp.email = "w31231231@qq.com";
    var url = window.location.href;
    var val = JSON.parse(decodeURI(url.split(window.location.origin + window.location.pathname)[1].split("=")[1]));
    infoApp.info = val;

}
/**
 * ==================================================================================
 * [edit.html]
 */
function getValFn() {
    var url = window.location.href;
    if (url.indexOf("infoObj") >= 0) {
        var val = JSON.parse(decodeURI(url.split(window.location.origin + window.location.pathname)[1].split("=")[1]));
        console.log("you = ", JSON.stringify(val));
        editApp.info = val;
        editApp.currentOrgId = val.DeptType;
        editApp.currentOrgName = selectDept(val.DeptType);
        editApp.currentOffceName = val.DeptName;
        editApp.isInfo = true;
        editApp.isCreatePerson = true;
    } else {
        console.log("mei you");
        editApp.isInfo = false;
    }
    getOrg();
    
    function getOrg() {
        var depts = dept.Response.Groups;
        var obj = {};
        for (var i = 0; i < depts.length; i++) {
            var deptName = "";
            var arr = [];
            
            for(var j = 0;j<depts[i].Items.length;j++){
                arr.push({
                    Cap:depts[i].Items[j].Cap,
                    DeptType:depts[i].Items[j].DeptType,
                    value:depts[i].Items[j].Id,
                    text:depts[i].Items[j].Name,
                    PID:depts[i].Items[j].PID,
                    Sequence:depts[i].Items[j].Sequence
                })
            }
            obj["DeptType"+depts[i].DeptType] = arr;
            deptName = selectDept(depts[i].DeptType);
            // switch(depts[i].DeptType){
            //     case 1:
            //         deptName = "综合管理";
            //     break;
            //     case 2:
            //         deptName = "教学科研";
            //     break;
            //     case 4:
            //         deptName = "支持保障";
            //     break;
            //     case 8:
            //         deptName = "学校企业";
            //     break;
            // }

            editApp.pickerOrgData.push({
                value:depts[i].DeptType,
                text:deptName
            });

            editApp.pickerOffceData = obj;
        }
        
    }
    function selectDept(val) {
        switch(val){
            case 1:
                return "综合管理";
            break;
            case 2:
                return "教学科研";
            break;
            case 4:
                return "支持保障";
            break;
            case 8:
                return "学校企业";
            break;
        }
    }
}
