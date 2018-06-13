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
        'getBreadcrumb':'../normal/js/getBreadcrumb',
        'test':'../normal/js/test',
        'checkbox':'../normal/js/checkbox',
    },
});
require(['jquery','bootstrapJs','vue','iview','getBreadcrumb','test','checkbox'],function($,_bootstrapJs,Vue,iview,getBreadcrumb,test,_checkbox){
    test.start('!!注意这里 :');
    // 非模块开发用法，若要用requirejs，请遵行该规范；尽量避免此种引用 
    // runNavVue(Vue); //废弃】

    // 实例 获取面包屑组件 breadcrumb
    var breadcrumb = new getBreadcrumb();
    // console.log(breadcrumb.init(data,11))
    Vue.use(iview);

    Vue.component("menu-parts",{
        props:["data"],
        template:`<submenu :name="data.id" v-if="data.nodes && data.nodes.length" :title='data.text' >
                    <template slot="title" >
                        <icon :type="data.icon" v-if="data.icon"></icon>
                        <span>{{data.text}}</span>
                    </template>
                    <menu-item v-for="item in data.nodes" :name="item['href']?item.href+'|'+item.nid+'|'+item.id:item.text+'|'+item.id+'|'+item.id" v-if="!item.nodes" >
                        <span>{{item.text}}</span>
                    </menu-item>
                    <menu-parts v-if="data.nodes && data.nodes.length" v-for="item in data.nodes" :data='item'></menu-parts>
                </submenu>
                `,
        // template:`<submenu :name="JSON.stringify(data.nodes)+'|'+data.id" v-if="data.nodes && data.nodes.length" :title='data.text' >
        //             <template slot="title" >
        //                 <icon :type="data.icon" v-if="data.icon"></icon>
        //                 <span>{{data.text}}</span>
        //             </template>
        //             <menu-item v-for="item in data.nodes" :name="item['href']?item.href+'|'+item.nid+'|'+item.text:item.text+'|'+item.id+'|'+item.text" v-if="!item.nodes" >
        //                 <span>{{item.text}}</span>
        //             </menu-item>
        //             <menu-parts v-if="data.nodes && data.nodes.length" v-for="item in data.nodes" :data='item'></menu-parts>
        //         </submenu>
        //         `,
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
            openSubMenuID:[],
            breadcrumbArr:[]
        },
        mixins:[Main],
        methods:{
            // 点击页面跳转
            jumpPage:function(name){
                console.log('jumpPage = ',name);
                var arr = name.split("|");
                var href = arr[0];
                var nid = arr[1];
                var subMenuId = arr[2];
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
                    page.load(href).attr("loaded",true);
                }

                var Breadcrumb = breadcrumb.init(data,subMenuId).breadcrumbsArr;
                console.log('面包屑 = ',Breadcrumb);
                _this.setBreadcrumb(Breadcrumb);
            },
            // 
            collapsedMenuShow:function(name){
                console.log('collapsedMenuShow = ',name);
                // this.name = name;
                var this_breadcrumb = breadcrumb.init(data,name[0]);
                var childNodes = this_breadcrumb.currentNodesChilds;
                console.log(this_breadcrumb);
                this.activeNav = [];
                this.$nextTick(function(){
                    var openNode = $("#navApp").find(".ivu-menu-opened");
                    // console.log(openNode);
                    // var current = openNode.eq(openNode.length - 1);
                    // console.log(current)
                    this.openSubMenuID = JSON.stringify(this_breadcrumb.idsArr);
                    this.activeNav = childNodes;
                    // this.activeNavIndex = name[0];     // 通过修改当前点击的nav的下标，再通过watch监听，改变activeNav值
                    this.collapsedMenuTitle = openNode.attr("title");
                });
            },

            // set 面包屑
            setBreadcrumb:function(breadcrumbArr){
                // 设置面包屑
                headerVm.breadcrumbArr = breadcrumbArr;
                return false;
                
            }

        }
    });
    // right-contianer h1 ---------------------------------------
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
