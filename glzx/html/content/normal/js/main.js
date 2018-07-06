require.config({
    baseUrl:'../content/frame',
    paths:{
        // 依赖
        'require':'./requireJs/require',
        'jquery':'./jq/jquery.min',
        'bootstrap':'./bootstrap/js/bootstrap',
        'vue':'./vuejs/vue',
        'iview':'./iview/iview.min',
        'jquery-mousewheel':'./jquery.date/jquery-mousewheel',
        'jquery.datetimepicker':'./jquery.date/jquery.datetimepicker.full',
        'echarts':'./echarts/echarts.min',
        'domready':'./domready/domReady',
        'jquery.bootstrap-duallistbox':'./bootstrap-duallistbox/jquery.bootstrap-duallistbox',
        // 'domready':'https://cdn.bootcss.com/require-domReady/2.0.1/domReady'
        // my js
        'breadcrumb':'../normal/js/getBreadcrumb.min',
        'test':'../normal/js/test',
        'v-nav':'../normal/js/v-nav',   //引入 nav导航js
    },
    map:{
        "*":{
            "css":"./requireJs/css.min"
        }
    },
    shim:{
        'bootstrap':{
            deps:['css!../frame/bootstrap/css/bootstrap.min','jquery'],
            exports:"bootstrap"
        },
        'v-nav':{
            deps:['css!../frame/iview/iview.css','css!../normal/css/nav-style.css']
        },
        'jquery.datetimepicker':{
            deps:['css!./jquery.date/jquery.datetimepicker.min','jquery'],
            // exports:"jquery.datetimepicker"
        },
        'jquery.bootstrap-duallistbox':{
            deps:['jquery','css!./bootstrap-duallistbox/bootstrap-duallistbox']
        }
    }
});
require(['jquery','vue','bootstrap','iview','breadcrumb','v-nav'],
    function($,Vue,bootstrap,iview,breadcrumb,nav){
   
    // 实例 获取面包屑组件 breadcrumb
    // 可以通过option进行面包屑配置；支持2个参数，
    var option = {
        // nodesName:"nodes",   // 默认子节点的集合为nodes
        paramName:'href'   // 默认根据id属性来查找
    }
    console.log('main ：' ,$("#div1"));
    // console.log('breadcrumb:',breadcrumb);
    // 加载 nav 导航
    Vue.use(iview);
    console.log(iview)
    $("#navApp").load('./views/nav/nav.html',function(){
        // 调用 v-nav.js 中的方法, 并传入Vue实例 和 breadcrumb实例
        var newNav = nav(function(event){
            console.log(event);
        });
        console.log(newNav);
    });
    // 图表 ---------------------------------------
    $("#chartBox").load('./views/container/echarts-line.html',function(){
        $(this).addClass('show').attr('action','./views/container/echarts-line.html');
    });

    // 
    var openList = document.querySelector('.openList');
    var activeItem = document.querySelector('.activeItem');
    var activeItem = document.querySelector('.activeItem');

    var _breadcrumb = new breadcrumb({
        paramName:"href"
    });
    var targetNode = _breadcrumb.init(data,'views/container/container-1.html')
    // console.log(targetNode);
    //  展开菜单
    openList.addEventListener("click",function(){
        navVm.open = [1,11];
    });
    // 选中摸个页面
    // activeItem.addEventListener("click",function(){
    //     // console.log(targetNode)
    //     // console.log('views/container/container-1.html')
    //     navVm.active = 'views/container/container-1.html';

    // });    
});


