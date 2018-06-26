define(function(){
    // 封装之前写好的的iview的nav导航
    function runNavVm($,Vue,breadcrumb){
        Vue.component("menu-parts",{
            props:["data"],
            template:`<submenu :name="data.id" v-if="data.nodes && data.nodes.length" :title='data.text' >
                        <template slot="title" >
                            <icon :type="data.icon" v-if="data.icon"></icon>
                            <span>{{data.text}}</span>
                        </template>
                        <menu-item v-for="item in data.nodes" :key="item.id" :name="item['href']?item.href+'|'+item.nid+'|'+item.id:item.text+'|'+item.id+'|'+item.id" v-if="!item.nodes" >
                            <span>{{item.text}}</span>
                        </menu-item>
                        <menu-parts v-if="data.nodes && data.nodes.length" v-for="item in data.nodes" :key="'sub-'+item.id" :data='item'></menu-parts>
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
            mounted:function(){
                console.log('mounted : this.navData = ' , this.navData);
                console.log('mounted : this.el = ' , this.$el);
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
                    var arr = name.split("|");
                    var href = arr[0];
                    var nid = arr[1];
                    var subMenuId = arr[2];
                    var _this = this;
                    // 判断，如果nid对应的右侧div不存在，则创建
                    var parent = $("#right-container");
                    var page = parent.find("#" + nid);

                    if (page.length == 0) {
                        parent.append("<div id='" + nid + "' action="+href+" ></div>");
                        page = parent.find("#" + nid);
                    }

                    if(!page.attr("loaded")){
                        console.log("loaded:",href);
                        page.load(href).attr("loaded",true);
                    }

                    $("#"+nid).show(0).addClass("show").siblings().not('.content-h1').hide(0).removeClass("show");

                    var Breadcrumb = breadcrumb.init(data,subMenuId).breadcrumbsArr;
                    console.log('面包屑 = ',Breadcrumb);
                    _this.setBreadcrumb(Breadcrumb);
                },
                // 
                collapsedMenuShow:function(name){
                    var this_breadcrumb = breadcrumb.init(data,name[0]);
                    var childNodes = this_breadcrumb.currentNodesChilds;
                    this.activeNav = [];
                    this.$nextTick(function(){
                        var openNode = $("#navApp").find(".ivu-menu-opened");
                        var arr = [];
                        var this_idsArr = breadcrumb.init(data,name[name.length-1]).idsArr;
                        for(var i = 0;i<this_idsArr.length;i++){
                            arr.push(this_idsArr[i]);
                        }
                        this.openSubMenuID = arr;
                        this.activeNav = childNodes;
                        if(openNode.attr("title")){
                            this.collapsedMenuTitle = openNode.attr("title");
                        }
                        
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

        // right-container h1 面包屑---------------------------------------
        var headerVm = new Vue({
            el:"#h1-app",
            data:{
                breadcrumbArr:''
            },
            watch:{
                breadcrumbArr:function(){

                }
            },
            methods:{
                refreshFn:function(){
                    var activeView = $("#right-container .show");
                    console.log(activeView)
                    activeView.load(activeView.attr("action"),function(){
                        console.log('success')
                    })
                }
            }
        })
    }
    return runNavVm;
})