// 左侧导航展示
var widthLess1024 = function() {
    if ($(window).width() < 1024) {
        $("#sidebar, #navbar").addClass("collapsed");
        $("#navigation").find(".dropdown.open").removeClass("open");
        $("#navigation").find(".dropdown-menu.animated").removeClass("animated");
        if ($("#sidebar").hasClass("closed")) {
            $("#content").animate({
                left: "0px"
            },
            150)
        } else {
            $("#content").animate({
               
            },
            150)
        }
    } else {
        $("#sidebar, #navbar").removeClass("collapsed");
        if ($("#sidebar").hasClass("collapsed")) {
            $("#content").animate({
                
            },
            150)
        } else {
            $("#content").animate({
                
            },
            150)
        }
    }
};
// 手风琴点击事件
$(function() {
    $(".quick-actions .dropdown").on("show.bs.dropdown", function(d) {
        console.log(7)
        console.log("quick-actions .dropdown")
        $(this).find(".dropdown-menu").addClass("animated fadeInDown");
        $(this).find("#user-inbox").addClass("animated bounceIn")
    });
    $("#navigation .dropdown").on("show.bs.dropdown",  function(d) {
        console.log(8)
        $(this).find(".dropdown-menu").addClass("animated fadeInLeft")
    });
    $("#sidebar .sidebar-toggle").on("click", function() {
        console.log(1)
        var d = $(this).data("toggle");
        $(d).toggleClass("collapsed")
    });

    $("#sec-sidebar .sidebar-toggle").on("click", function() {
        console.log(2)
        var d = $(this).data("toggle");
        $(d).toggleClass("collapsed")
    });

    //美化滚动条
     $("#sidebar").niceScroll({
        cursorcolor: "#000000",
        zindex: 999999,
        bouncescroll: true,
        cursoropacitymax: 0.3,
        cursorborder: "",
        cursorborderradius: 10,
        cursorwidth: "6px",
        railalign: "right",
        railoffset: {
            top: 50,
            right:0
        },
        railpadding: {
            top: 0,
            right: 2,
            left: 2,
            bottom: 0
        }
     });
     $("#content,#right-container").niceScroll({
        cursorcolor: "#4c4c4c",
        zindex: 999999,
        bouncescroll: true,
        cursoropacitymax: 0.3,
        cursorborder: "",
        cursorborderradius: 10,
        cursorwidth: "6px",
        background: "rgba(0,0,0,.1)",
        //autohidemode: false,
        railoffset: {
            top: 5,
            left: 0
        },
        railpadding: {
            top: 0,
            right: 2,
            left: 2,
            bottom: 0
        }
     });
     $(".table-scrollable").niceScroll({
        cursorcolor: "#4c4c4c",
        zindex: 999999,
        bouncescroll: true,
        cursoropacitymax: 0.3,
        cursorborder: "",
        cursorborderradius: 10,
        cursorwidth: "6px",
        background: "rgba(0,0,0,.1)",
        //autohidemode: false,
        railoffset: {
            top: 5,
            left: 0
        },
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        }
     });
     
    $("#navigation .dropdown.open").data("closable", false);
    $("#navigation .dropdown").on({
        "shown.bs.dropdown": function() {
            console.log(4)
            $(this).data("closable", false);
            $("#sidebar").getNiceScroll().resize()
        },
        click: function(d) {
            console.log(5)
            $(this).data("closable", true);
            if (!$(this).hasClass("open")) {
                $("li.dropdown.open").removeClass("open")
            }
            if ($("#sidebar").hasClass("collapsed")) {
                d.stopPropagation()
            }
            $("#sidebar").getNiceScroll().resize()
        },
        "hide.bs.dropdown": function() {
            console.log(6)
            return $(this).data("closable");
            $("#sidebar").getNiceScroll().resize()
        }
    });
    
    $(".sidebar-collapse a").on("click",function() {
        console.log(3)
        $("#sidebar, #navbar").toggleClass("collapsed");
        $("#navigation").find(".dropdown.open").removeClass("open");
        $("#navigation").find(".dropdown-menu.animated").removeClass("animated");
        $("#sidebar > li.collapsed").removeClass("collapsed");
        if ($("#sidebar").hasClass("collapsed")) {
            if ($(window).width() < 1024) {
                $("#content").animate({
                    left: "0px"
                },
                150)
            } else {
                $("#content").animate({
        
                },
                150)
            }
        } else {
            if ($(window).width() < 1024) {
                $("#content").animate({
                    left: "0"
                },
                150)
            } else {
                $("#content").animate({
                   
                },
                150)
            }
        }
    });

    //添加
    $(".sidebar-collapse.sec-sidebar-collapse a").on("click", function() {
        $("#sidebar,#sec-sidebar, #navbar").toggleClass("collapsed closed");
        $(".navigation").find(".dropdown.open").removeClass("open");
        $(".navigation").find(".dropdown-menu.animated").removeClass("animated");
        $("#sec-sidebar > li.collapsed").removeClass("collapsed");
        if ($("#sec-sidebar").hasClass("collapsed closed")) {
            if ($(window).width() < 1024) {
                $("#content").animate({
                    left: "0px"
                },
                150)
            } else {
                $("#content").animate({
                },
                150)
            }
        } else {
            if ($(window).width() < 1024) {
                $("#content").animate({
                    left: "0"
                },
                150)
            } else {
                $("#content").animate({
                },
                150)
            }
        }
    });
    //二级sidebar

    widthLess1024();
    $(window).resize(function() {
        widthLess1024();
    });
    // 更换皮肤
    $("#color-schemes li a").click(function() {
        var d = $(this).attr("class");
        var e = $("body").attr("class").split(" ").pop();
        $("body").removeClass(e).addClass(d)
    });
});