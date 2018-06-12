require.config({
    baseUrl:'../content/frame',
    paths:{
        // 
        'jquery':'./jquery/jquery.min',
        'bootstrapJs':'./bootstrap/js/bootstrap',
        'vue':'./vuejs/vue',
        'iview':'./iview/iview.min',
        'jquery-mousewheel':'./jquery.date/jquery-mousewheel',
        'dateTime':'./jquery.date/jquery.datetimepicker.full',

        // my js
        'test':'../normal/js/test',
        'checkbox':'../normal/js/checkbox',
    },
});
require(['jquery','bootstrapJs','vue','iview','test','checkbox'],function($,_bootstrapJs,Vue,iview,test,_checkbox){

    test.start('!!注意这里 :');
    
    // nav 导航 ---------------------------------------
    // 非模块开发用法，若要用requirejs，请遵行该规范；尽量避免此种引用 
    // runNavVue(Vue); //废弃
    
    Vue.use(iview);

    Vue.component("menu-parts",{
        props:["data"],
        template:`<submenu :name="JSON.stringify(data.nodes)+'|'+data.id" v-if="data.nodes && data.nodes.length" :title='data.text' >
                    <template slot="title" >
                        <icon :type="data.icon" v-if="data.icon"></icon>
                        <span>{{data.text}}</span>
                    </template>
                    <menu-item v-for="item in data.nodes" :name="item['href']?item.href+'|'+item.nid+'|'+item.text:item.text+'|'+item.id+'|'+item.text" v-if="!item.nodes" >
                        <span>{{item.text}}</span>
                    </menu-item>
                    <menu-parts v-if="data.nodes && data.nodes.length" v-for="item in data.nodes" :data='item'></menu-parts>
                </submenu>
                `,
    });
    var Main = {
        data () {
            return {
                isCollapsed: false,
                navData:data
            }
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            rotateIcon: function () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            
        },
        methods: {
            collapsedSider: function() {
                this.$refs.side1.toggleCollapse();
                if(this.$refs.side1.$el){
                    this.$refs.side1.$el.style.width = "60px";

                }else{
                    this.$refs.side1.$el.style.width = "230px";
                }
            }
        }
    }

    window.navVm = new Vue({
        el:'#navApp',
        data:{
            activeNav:'',
            collapsedMenuTitle:'',
            activeNavIndex:'',
            name:'',
            breadcrumbArr:[]
        },
        mixins:[Main],
        watch:{
            activeNavIndex:function(){
                console.log("run ? ");
                this.activeNav = '';
                if(!this.activeNav){
                    var item = this.name[0];
                    var itemArr = item.split("|");
                    var subMenuArr = JSON.parse(itemArr[0]);
                    this.activeNav = subMenuArr;
                }
            }
        },
        methods:{
            // 点击页面跳转
            jumpPage:function(name){
                var arr = name.split("|");
                var href = arr[0];
                var nid = arr[1];
                var title = arr[2];
                var _this = this;
                // 判断，如果nid对应的右侧div不存在，则创建
                var parent = $("#right-container");
                var page = parent.find("#" + nid);

                if (page.length == 0) {
                    parent.append("<div id='" + nid + "' ></div>");
                    page = parent.find("#" + nid);
                }

                if(!page.attr("loaded")){
                    console.log("loaded");
                    page.load(href,function(){
                        // // 设置面包屑
                        _this.setBreadcrumb(title);
                        
                    }).attr("loaded",true);
                }
                // page.show(0).siblings().hide(0);
            },
            // 
            collapsedMenuShow:function(name){
                // console.log(name)
                this.name = name;

                this.$nextTick(function(){
                    var openNode = $(this.$refs.side1.$el).find(".ivu-menu-opened");
                    // var side1_opened = $(this.$refs.side1.$el).find(".ivu-menu-opened");

                    // var openNode = !this.isCollapsed?$(this.$refs.side1.$el).find(".ivu-menu-opened"):$(this.$refs.side2.$el);
                    // console.log(openNode)
                    this.activeNavIndex = openNode.index();     // 通过修改当前点击的nav的下标，再通过watch监听，改变activeNav值
                    
                    // this.collapsedMenuTitle = side1_opened.attr('title');
                    
                    this.getBreadcrumbArr(openNode);
                });
            },
            // get 面包屑
            getBreadcrumbArr:function(nodes){
                var _this = this;
                var arr = [];
                for(var i = 0;i<nodes.length;i++){
                    var item = nodes[i]
                    arr.push(item.getAttribute('title'));
                }
                _this.breadcrumbArr = arr;
            },
            // set 面包屑
            setBreadcrumb:function(title){
                // 追加面包屑
                var _this = this;
                if(this.breadcrumbArr[this.breadcrumbArr.length-1].match(/active/)){
                    this.breadcrumbArr.splice(this.breadcrumbArr.length-1);
                }
                this.breadcrumbArr.push(title+'|active');
                headerVm.breadcrumbArr = this.breadcrumbArr;
                return false;
                // 设置面包屑
            }

        }
    });
    // h1 ---------------------------------------
    window.headerVm = new Vue({
        el:"#h1-app",
        data:{
            breadcrumbArr:''
        },
        watch:{
            breadcrumbArr:function(){

            }
        }
    })
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