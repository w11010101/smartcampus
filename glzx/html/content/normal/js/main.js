require.config({
    baseUrl:'../content/frame',
    paths:{
        // 依赖
        'jquery':'./jq/jquery.min',
        'bootstrapJs':'./bootstrap/js/bootstrap',
        'vue':'./vuejs/vue',
        'iview':'./iview/iview.min',
        'jquery-mousewheel':'./jquery.date/jquery-mousewheel',
        'dateTime':'./jquery.date/jquery.datetimepicker.full',
        // my js
        'getBreadcrumb':'../normal/js/getBreadcrumb',
        'test':'../normal/js/test',
        'navJs':'../normal/js/v-nav',   //引入 nav导航js
    },
});
require(['jquery','vue','iview','getBreadcrumb','test','navJs'],
    function($,Vue,iview,getBreadcrumb,test,navJs){

    test.start('!!注意这里 :');
    // 非模块开发用法，若要用requirejs，请遵行该规范；尽量避免此种引用 
    // runNavVue(Vue); //废弃】
    
    // 实例 获取面包屑组件 breadcrumb
    var breadcrumb = new getBreadcrumb();
    // console.log('breadcrumb:',breadcrumb);
    // 加载 nav 导航
    Vue.use(iview);

    $("#navApp").load('./views/nav/nav.html',function(){
        // 调用 v-nav.js 中的方法, 并传入Vue实例 和 breadcrumb实例
        // console.log(navJs)
        navJs($,Vue,breadcrumb);
    });
    // 图表 ---------------------------------------
    $("#chartBox").load('./views/container/echarts-line.html',function(){
        $(this).addClass('show').attr('action','./views/container/echarts-line.html');
    });
});
