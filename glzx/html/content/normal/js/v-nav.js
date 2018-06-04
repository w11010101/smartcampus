function runNavVue(Vue){

    // from in data.js
    console.log(data);
    
    // vue ================================
    Vue.component("dropdown-menu",{
        props:["todo","index"],
        template:`<a href="#" v-bind:action="todo.href" v-bind:nid="todo.nid" class="sidebar-toggle" data-toggle="dropdown" v-on:click=subToggleDropdown v-bind:setid="todo.id">
                    <i class="icon-service"></i><span>{{todo.text}}</span><i class="ico-arr-project"></i>
                </a>`,
        computed:{
            fn1:function(){
            }
        },
        methods:{
            subToggleDropdown:function(){
                var $this = $(this.$el);
                navVM.toggleDropdown($this);
            }
        }
    });
    // 子集
    Vue.component("dropdown-sub-list",{
        props:["subtodo",'index'],
        // "dropdown"+(subtodo.active?"active":"")
        template:`<li v-bind:class="{active:subtodo.active}" >
                    <dropdown-sub-menu v-bind:todo ='subtodo'></dropdown-sub-menu>
                    <ul class="dropdown-menu" v-if="subtodo.nodes&&subtodo.nodes.length">
                        <dropdown-child-list class="dropdown" v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event'></dropdown-child-list>
                    </ul>
                </li>`,
        computed:{
            fn1:function(){
                console.log(this.subtodo);
                console.log(this.index);
            },
        },
    })
    Vue.component("dropdown-sub-menu",{
        props:["todo"],
        template:`<a href="#" v-bind:action="todo.href" v-bind:nid="todo.nid" class="dropdown-toggle" v-bind:setid="todo.id" data-toggle="dropdown" v-on:click="subClick">
                        <i class="icon-repair" ></i>{{todo.text}}<b class="ico-arr-dropdown" v-if="todo['nodes']&&todo['nodes'].length"></b>
                    </a>`,
        computed:{
            fn1:function(){
            },
        },
        methods:{
            subClick:function(){
                var $this = $(this.$el);
                console.log("点击")
                if($this.next(".dropdown-menu").find("li").length){
                    $this.parents(".navigation").addClass("open");
                }else{
                    navVM.jumpPage($this);
                }
                
            }
        }
    });
    // 子集以下
    Vue.component("dropdown-child-list",{
        props:["subtodo",'index'],
        template:`<li v-bind:class="{active:subtodo.active}">
                    <dropdown-child-menu v-bind:todo ='subtodo' v-if="subtodo.nodes"></dropdown-child-menu>
                    <dropdown-child-a v-bind:todo ='subtodo' v-else></dropdown-child-a>
                    <ul class="dropdown-menu" v-if="subtodo.nodes&&subtodo.nodes.length">
                        <dropdown-child-list class="dropdown" v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event'></dropdown-child-list>
                    </ul>
                </li>`,
        computed:{
            fn1:function(){
                console.log(this.subtodo);
                console.log(this.index);
            },
        },
    })
    Vue.component("dropdown-child-a",{
        props:["todo"],
        template:`<a href="#" v-bind:action="todo.href" v-bind:nid="todo.nid" data-toggle="dropdown" v-bind:setid="todo.id" abc class="dropdown-toggle" aria-expanded="false" v-on:click="subJump">
                {{todo.text}}</a>`,
        computed:{
            
        },
        methods:{
            subJump:function(){
                var $this = $(this.$el);
                navVM.jumpPage($this);
            }
        }
    });
    Vue.component("dropdown-child-menu",{
        props:["todo"],
        template:`<a href='#' data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false" >
                {{todo.text}}<b class="ico-arr-plus" ></b></a>`,
        computed:{
            
        },
    });
    // sec-Sidebar  product
    Vue.component("dropdown-product-menu",{
        props:["todo","index"],
        template:`<a href="#" v-bind:action="todo.href" v-bind:nid="todo.nid"  class="sidebar-toggle" v-bind:setid="todo.id" v-on:click="subClick">
                <i class="ico-arr-down-black" ></i>{{todo.text}}</a>`,
        computed:{
            
        },
        methods:{
            subClick:function(){
                var $this = $(this.$el);
                $this.parents(".navigation").siblings().addClass("menu-hide").find(".menu").slideUp(200);
                $this.next(".menu").slideToggle(200).parents(".navigation").toggleClass("menu-hide");
            }
        }
    });
    Vue.component("dropdown-product-a",{
        props:["todo","index"],
        template:`<a href="#" v-bind:action="todo.href" v-bind:nid="todo.nid" v-bind:setid="todo.id" v-on:click="subJump(this)">{{todo.text}}</a>`,
        methods:{
            subJump:function(){
                var $this = $(this.$el);
                navVM.jumpPage($this);
            }
        }
    });
    Vue.component("dropdown-product-sub-menu",{
        props:["todo"],
        template:`<a data-toggle="dropdown" class="dropdown-toggle" v-on:click="subClick(this)">{{todo.text}}<b class="ico-arr-plus-black"></b></a>`,
        computed:{
            fn1:function(){
            },
        },
    });
    Vue.component("dropdown-product-sub-list",{
        props:["subtodo",'index'],
        template:`<li v-bind:class="{'active':subtodo.active}">
                    <dropdown-product-sub-menu v-bind:todo ='subtodo' v-bind:index="index" v-if="subtodo.nodes"></dropdown-product-sub-menu>
                    <dropdown-product-a v-bind:todo ='subtodo' v-bind:index="index"  v-else></dropdown-product-a>
                    <ul class="dropdown-menu" v-if="subtodo.nodes&&subtodo.nodes.length">
                        <dropdown-product-sub-list class="dropdown" v-if="subtodo.nodes" v-for="sub in subtodo.nodes" v-bind:subtodo ='sub' v-bind:index ='index'></dropdown-product-sub-list>
                    </ul>
                </li>`,
        computed:{
            fn1:function(){
                console.log(this.subtodo);
                console.log(this.index);
            },
        },
    })
    // vue 实例
    var navVM = new Vue({
        el:"#vm-nav",
        data:{
            navData:"",
            activeNav:'',
            current_nav:""
        },
        watch:{
            navData:function(event){
                console.log(navVM);
                navVM.activeNav = event[0];
                this.$nextTick(function () {
                    // DOM 现在更新了
                    // `this` 绑定到当前实例
                    $("#sidebar .navigation").eq(0).addClass("open");
                })
            }
        },
        computed:{
        },
        methods:{
            jumpPage:function(node){
                var setId = node.attr("setid");
                var nid = node.attr("nid");
                this.setActive(this.navData,setId);
                var href = node.attr("action");
                if(!href) return false;
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
                page.show(0).siblings().hide(0);
            },
            toggleDropdown:function(node){
                var sidebar = node.parents("#sidebar");
                // 当屏幕小鱼1024时，会添加classname 'collapsed';
                if(sidebar.hasClass("collapsed")){
                    navVM.activeNav = navVM.navData[node.parent().index() - 1];
                }else{

                }
            },
            setActive:function(arr,setId){

                for(var i=0;i<arr.length;i++){
                    navVM.$set(arr[i],"active",null);
                    if(arr[i].id == setId){

                        console.log("这里 ",arr[i])
                        navVM.$set(arr[i],"active",true);
                        
                        this.$nextTick(function(){
                            // $(".product-nav .dropdown.active").parents(".navigation").removeClass('menu-hide').siblings().addClass("menu-hide");
                        });
                    }else{
                        
                        if(arr[i]['nodes']){
                            this.setActive(arr[i]['nodes'],setId);
                            // return false;
                        }
                    }
                }
            }
        }
    });

    function postData(){
        navVM.navData = data;
    }   
    postData();

}

