// Vue.nextTick(function(){
//     postList();
// })

var app = new Vue({
    el: '#app',
    data: {
        active: "active",
        wrapper: 'wrapper_page_',
        scroller: 'scroller_page_',
        _defualtImg: "../../content/style/white/yingyongqingdan/images/defualt.png",
        newApps: "",
        tabs: "",
        slides: {},
        tabActive: 0,
        WinH: $(document).height(),
        WinW: $(document).width()
    },
    watch: {
        // 监听
        newApps: function(val) {
            this.$nextTick(function(){
                scrollComputed('wrapper-new-apps', '#scroller-new-apps', app.newApps.length, 170);
            });
            scrollComputed('wrapper-new-apps', '#scroller-new-apps', app.newApps.length, 170);
            $("#scroller-new-apps").off("click", "li").on("click", "li", function() {
                var selectedTitle = $("h3", this).text();
                tabsSwiper.swipeTo(0, 200, true);
                var h = $(".swiper-slide-active li").height();
                var containerH = $(".swiper-container").height();
                var n = (containerH / h).toFixed(1).split(".")[0];
                console.log("n = ", n);
                $.each($(".swiper-slide-active li"), function(i, e) {
                    if ($("h1", e).text() === selectedTitle) {
                        $(".smart-list-item-sub-info").stop().slideUp(200);
                        $(".smart-list-item-sub-info", e).stop().slideDown(200);
                        
                        var liH = $(".smart-list-item").height();
                        var eventLiH = $(".smart-list-item-sub-info", e).parent().height();
                        var footH = $(".foot-tips").height();
                        var nextAllH = eventLiH+footH+$(".smart-list-item-sub-info", e).parent().nextAll().length*liH;
                        if(nextAllH < containerH){
                            console.log("小于");
                            scrollObjArr[0].scrollTo(0, scrollObjArr[0].maxScrollY, 0);
                        }else{
                            console.log("大于");
                            scrollObjArr[0].scrollTo(0, -h * i, 0);

                        }
                        setTimeout(function(){
                            scrollObjArr[0].refresh();
                        },200);
                    }
                })
            });
        },
        tabs: function(val) {
            scrollComputed('wrapper-tabs', '#scroller-tabs', app.tabs.length, app.WinW / 4);
            setTimeout(function() {
                $(".tabs a").css("width", app.WinW / 4);
                runTabSwiper();
                runWrapperPages();
            }, 100);
        },
        slides: function(val) {
            setTimeout(function() {
                $(".foot-tips").eq(app.tabActive).fadeIn(200, function() {
                    scrollObjArr[app.tabActive].refresh();
                });
                // ****************************** 列表点击事件 ******************************
                $("body").off("click", ".smart-list-item-info").on("click", ".smart-list-item-info", function() {
                    var that = $(this);
                    app.showInfo($(this).next(), function(event) {
                        var scrollY = parseInt(app.WinH - that.offset().top - event.parent().height()) - 5;
                        if (scrollY < 0) {
                            console.log("需要滚动");
                            scrollObjArr[app.tabActive].scrollTo(0, scrollObjArr[app.tabActive].y + scrollY, 500);
                        } else {
                            console.log("不需要滚动");
                        }
                    });
                });
            }, 200);
        }
    },
    computed: {
        // 计算
    },
    beforeMount:function (argument){
        // console.log('beforeMount = ',this.newApps);
    },
    // mounted:function (argument) {
        // console.log(this.$el)
        // this.$nextTick(function(){
        //     // console.log('mounted = ',this.newApps);
        //     scrollComputed('wrapper-new-apps', '#scroller-new-apps', app.newApps.length, 170);
        // });
        // postList();
    // },
    beforeUpdate:function (argument) {
        // postList();
        // scrollComputed('wrapper-new-apps', '#scroller-new-apps', app.newApps.length, 170);
        // console.log('beforeUpdate = ',this.newApps);
    },
    updated:function (argument) {
        // console.log('updated = ',this.newApps);
    },
    methods: {
        // 绑定事件的方法
        // post ajax
        postAjaxData: function(option, successCB, failCB) {
            $.ajax({
                type: "POST",
                url: option.url,
                data: option.data,
                dataType: "json",
                success: function(data) {
                    successCB(data);
                },
                error: function(err) {
                    failCB(err);
                }
            })
        },
        // tab 滑动触发加载列表
        postTabList: function(data) {
            // post slides
            this.postAjaxData({
                url: 'http://172.16.15.99:3001/',
                data: data
            }, function(data) {
                $(".smart-loading").hide(0);
                console.log("success")
            }, function(err) {
                $(".smart-loading").hide(0);
                console.log("error");
                var list = data.type == "slides" ? slides : slides1;
                if (tabsSwiperObjArr["tab" + app.tabActive]) {
                    // 加载第N页
                    console.log("加载下一页");
                } else {
                    tabsSwiperObjArr["tab" + app.tabActive] = list.data;
                }
                // 用data.js 中的数据对象；
                app.$set(app.slides, "tab" + app.tabActive, tabsSwiperObjArr["tab" + app.tabActive]);

            });
        },
        // 列表点击展开详情
        showInfo: function(obj, cb) {
            $(".smart-list-item-sub-info").stop().slideUp(200);
            obj.stop().slideToggle(200);
            var tabIndex = $("#wrapper-tabs a.active").index();
            setTimeout(function() {
                scrollObjArr[tabIndex].refresh();
                if (cb) {
                    cb(obj);
                }
            }, 200);

        }
    }
});