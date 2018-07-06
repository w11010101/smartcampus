
define(['domready','jquery','vue','breadcrumb'],function(domReady,$,Vue,breadcrumb){
    // 封装之前写好的的iview的nav导航
    function runNavVm(callback){
        var b = new breadcrumb({
            paramName:"href"
        });
        breadcrumb = b;
        //This function is called once the DOM is ready,
        //notice the value for 'domReady!' is the current
        //document.
        Vue.component("menu-parts",{
            props:["data"],
            template:`<submenu :name="data.href || data.id" v-if="data.nodes && data.nodes.length" :title='data.text' >
                        <template slot="title" >
                            <icon :type="data.icon" v-if="data.icon"></icon>
                            <span>{{data.text}}</span>
                        </template>
                        <menu-item v-for="item in data.nodes" 
                            :key="item.id"  
                            :name="item.href||item.id"
                            v-if="!item.nodes || !item.nodes.length" >
                            <span>{{item.text}}</span>
                        </menu-item>
                        <menu-parts v-if="data.nodes && data.nodes.length"  v-for="item in data.nodes" :key="'sub-'+item.id" :data='item'></menu-parts>
                    </submenu>
                    `,
        });
        var Main = {
            data () {
                return {
                    isCollapsed: false,
                    navData:null,
                }
            },
            // 生命周期
            mounted:function(){
                var d = data;
                // var d = [{"id":"oidc","code":null,"level":0,"text":"统一认证授权","nid":"oidc","icon":null,"href":null,"inDomain":true,"fType":0,"nodes":[{"id":"5ebaba3b78ddf2906e43706217137edfc6ccc5af","code":null,"level":1,"text":"权限设置","nid":"5ebaba3b78ddf2906e43706217137edfc6ccc5af","icon":"service-ico","href":"/oidc/RoleSetting4Manager/","inDomain":true,"fType":2,"nodes":[{"id":"85db867185d4691f936d468a91f1d4bc9df47403","code":null,"level":2,"text":"设置角色","nid":"85db867185d4691f936d468a91f1d4bc9df47403","icon":"service-ico","href":"/oidc/RoleSetting4Manager/Index","inDomain":true,"fType":3,"nodes":[]}]},{"id":"d425ff30c56e2a86ffd1186c264752c65cb3d07a","code":null,"level":1,"text":"授权设置","nid":"d425ff30c56e2a86ffd1186c264752c65cb3d07a","icon":"service-ico","href":"/oidc/OrgSystemSetting4Manager/","inDomain":true,"fType":2,"nodes":[{"id":"b625771ac0500b1e17a448e59a3858216d578ba1","code":null,"level":2,"text":"为机构授权系统","nid":"b625771ac0500b1e17a448e59a3858216d578ba1","icon":"service-ico","href":"/oidc/OrgSystemSetting4Manager/Index","inDomain":true,"fType":3,"nodes":[]}]},{"id":"67c1e4833d3a8a93481ccd53b89e13dcb863a009","code":null,"level":1,"text":"权限管理","nid":"67c1e4833d3a8a93481ccd53b89e13dcb863a009","icon":"service-ico","href":"/oidc/RoleSetting/","inDomain":true,"fType":2,"nodes":[{"id":"5d13fecae249da5bf956392284ff4cd94c61e46f","code":null,"level":2,"text":"管理校级角色","nid":"5d13fecae249da5bf956392284ff4cd94c61e46f","icon":"service-ico","href":"/oidc/RoleSetting/Index","inDomain":true,"fType":3,"nodes":[]}]},{"id":"65489f64af857ae8fd17084390a8bab8635a9260","code":null,"level":1,"text":"认证终端管理","nid":"65489f64af857ae8fd17084390a8bab8635a9260","icon":"service-ico","href":"/oidc/AppClientManagement/","inDomain":true,"fType":2,"nodes":[{"id":"902a70121c5f428b456f0392279b069b02e689a1","code":null,"level":2,"text":"认证终端","nid":"902a70121c5f428b456f0392279b069b02e689a1","icon":"service-ico","href":"/oidc/AppClientManagement/Index","inDomain":true,"fType":2,"nodes":[]}]}]}]
                this.navData = d;
                
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
                    console.log(this.$refs.side1)
                    if(this.isCollapsed){
                        console.log(1)
                        this.$refs.side1.$el.style.width = "60px";

                    }else{
                        console.log(2)
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
                open:[],
                name:'',
                active:'',
                openSubMenuID:[],
                breadcrumbArr:[]
            },
            mixins:[Main],
            watch:{
                // 手动更新展开的子目录
                open:function(){
                    this.$nextTick(function() {
                        this.$refs.side1.updateOpened();   
                        this.$refs.side1.updateActiveName();
                    });
                },
                // 手动更新当前选择项
                active:function(){
                    var _this = this;
                    setTimeout(function(){
                        $(_this.$el).find('.ivu-menu-item-selected').trigger('click');
                    },100);
                }
            },
            methods:{
                // 点击页面跳转
                jumpPage:function(name){
                    console.log('name = ',name);
                    var currentSubMenu = breadcrumb.init(this.navData,name);
                    var currentNode = currentSubMenu.currentNode;
                    console.log('currentSubMenu = ',currentSubMenu);
                    console.log('currentNode = ',currentNode);
                    var href = currentNode.href;
                    var nid = currentNode.nid;
                    var _this = this;
                    // 判断，如果nid对应的右侧div不存在，则创建
                    var parent = $("#right-container");
                    var page = parent.find("#" + nid);
                    console.log("nid = ", nid)
                    if (page.length == 0) {
                        parent.append("<div id='" + nid + "' action="+href+" ></div>");
                        page = parent.find("#" + nid);
                    }

                    if(!page.attr("loaded")){
                        console.log("loaded:",href);
                        page.load(href).attr("loaded",true);
                    }
                    
                    $("#"+nid).show(0).addClass("show").siblings().not('.content-h1').hide(0).removeClass("show");
                    // console.log('currentSubMenu = ',currentSubMenu)
                    var Breadcrumb = currentSubMenu.breadcrumbsArr;
                    
                    console.log('面包屑 = ',Breadcrumb);
                    _this.setBreadcrumb(Breadcrumb);
                },
                // 
                collapsedMenuShow:function(name){
                    var this_breadcrumb = breadcrumb.init(this.navData,name[0]);
                    var childNodes = this_breadcrumb.currentNodesChilds;
                    this.activeNav = [];
                    this.$nextTick(function(){
                        var openNode = $("#navApp").find(".ivu-menu-opened");
                        var arr = [];
                        var this_idsArr = breadcrumb.init(this.navData,name[name.length-1]).idsArr;
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

        // right-container h1 面包屑 ---------------------------------------
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
                    activeView.load(activeView.attr("action"),function(){
                        console.log('success')
                    });

                    // try {
                    //     if(true){
                    //         throw "Parameter is not a number!";
                    //     }
                    // }
                    // catch(e) {
                    //   console.log('123',e);
                    //   // expected output: "Parameter is not a number!"
                    // }
                }
            }
        });
        // 关于调用后的callback和返回值的问题 ---------------------------------------
        // parame 为 callback
        var parame = {
            name:"霍元甲",
            isTrue:true
        }
        callback?callback(parame):{};
        //  return 为调用对象的返回值
        return {
            address:"北京"
        }
    }
    return runNavVm;
});