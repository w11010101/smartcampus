require.config({
    baseUrl:'../content/frame',
    paths:{
        'jquery':'./jquery/jquery.min',
        'bootstrap':'./bootstrap/js/bootstrap',
        'vue':'./vuejs/vue',
        'jquery-mousewheel':'./jquery.date/jquery-mousewheel',
        'dateTime':'./jquery.date/jquery.datetimepicker.full',
        'test':'../normal/js/test',
        'checkbox':'../normal/js/checkbox'
    }
});
require(['jquery','bootstrap','vue','test','checkbox'],function($,_b,Vue,test,_c){
    console.log(test);
    test.start('!!注意这里 :')
    
    // nav 导航 ---------------------------------------
    // 非模块开发用法，若要用requirejs，请遵行该规范；尽量避免此种引用 
    runNavVue(Vue);
    // 依赖jquery，如果$报错，说明jquery 引用失败
    // 卡片 ---------------------------------------
    $(".item-card").on("click",function(event){
        console.log('卡片');
        if($(event.target).hasClass("edit")){
            $(".tools",this).addClass("show");
        }else{
            $(".tools",this).removeClass("show");
        }
    });
    // 分页 ---------------------------------------
    var pagingVM = new Vue({
        el: '#paging-app',
        data: {
            current_page: 1, //当前页
            pages: 20, //总页数
            changePage:'',//跳转页
            nowIndex:0,
            centerLength:4
        },
        computed:{
            show:function(){
                return this.pages && this.pages !=1
            },
            pstart: function() {
                return this.current_page == 1;
            },
            pend: function() {
                return this.current_page == this.pages;
            },
            efont: function() {
                if (this.pages <= 7) return false;
                return this.current_page > 5
            },
            ebehind: function() {
                if (this.pages <= 7) return false;
                var nowAy = this.indexs;
                return nowAy[nowAy.length - 1] != this.pages;
            },
            indexs: function() {
                var left = 1,
                right = this.pages,
                ar = [];
                if (this.pages >= 7) {
                    if (this.current_page > 5 && this.current_page < this.pages - 4) {
                        var CL = this.centerLength;
                        if(CL%2 == 0){
                            CL = this.centerLength + 1;
                        }
                        left = Number(this.current_page) - (CL-1)/2;
                        right = Number(this.current_page) + (CL-1)/2;
                    } else {
                        if (this.current_page <= 5) {
                            left = 1;
                            right = 5;
                        } else {
                            right = this.pages;

                            left = this.pages - 6;
                        }
                    }
                }
               while (left <= right) {
                   ar.push(left);
                   left++;
               }
                return ar;
            },
        },
        methods: {
            jumpPage: function(id) {
                this.current_page = id;
            },
        },
    });
    // 多选 ---------------------------------------
    $(".form-group").selectCheckbox({
        ele:".checkbox-inline",
        selectType:"onSelect",
        onclickCB:function(){
            console.log(arguments)
        }
    });
    // 单选 ---------------------------------------
    $(".form-group").selectCheckbox({
        ele:".radio-inline",
        selectType:"onRadioSelect"
    });
});