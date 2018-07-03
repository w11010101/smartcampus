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
        // my js
        'breadcrumb':'../normal/js/getBreadcrumb',
        'test':'../normal/js/test',
        'v-nav':'../normal/js/v-nav',   //引入 nav导航js
    },
    map:{
        "*":{
            "mycss":"./requireJs/css.min"
        }
    },
    shim:{
        'bootstrap':{
            deps:['jquery'],
            exports:"bootstrap"
        },
        'v-nav':{
            deps:['mycss!../frame/iview/iview.css','mycss!../normal/css/nav-style.css']
        }
    }
});
require(['jquery','vue','bootstrap','iview','breadcrumb','v-nav'],
    function($,Vue,bootstrap,iview,breadcrumb,nav){
   
    // 实例 获取面包屑组件 breadcrumb
    // 可以通过option进行面包屑配置；支持2个参数，
    var option = {
        nodesName:"nodes",   // 默认子节点的集合为nodes
        paramName:'id'   // 默认根据id属性来查找
    }
    
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
});


