function postList(){
    var groups = data.Response.Groups;
    var capArr = [];
    var persons = [];
    $.each(groups,function(i,e) {
        capArr.push(e.Cap);
        persons = persons.concat(e.Items);
    });
    app.mailList = groups;
    app.capArr = capArr;

    var depts = dept.Response.Groups;
    app.deptNative = depts;
    var deptItems = [];
    var deptsObj = {};
    $.each(depts,function(i,e) {
        deptItems = deptItems.concat(e.Items);
    });
    $.each(deptItems,function(i,e) {
        deptsObj[e.Id] = [];
    });
    for(var x = 0; x < persons.length;x++){
        deptsObj[persons[x].DeptID].push(persons[x]);
    }
    app.deptsObj = deptsObj;
    console.log(depts);

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
    tabsSwiper.swipeTo(1, false);
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
