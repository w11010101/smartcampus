// $(function(){
    // from in data.js
    console.log(data);
    
    // vue ================================
    Vue.component("dropdown-menu",{
        props:["todo","index"],
        template:`<a v-bind:href="todo.href" class="sidebar-toggle" data-toggle="dropdown" v-on:click=toggleDropdown v-bind:set-id=todo.id>
                    <i class="icon-service"></i><span>{{todo.text}}</span><i class="ico-arr-project"></i>
                </a>`,
        computed:{
            fn1:function(){
            }
        },
        methods:{
            toggleDropdown:function(){
                var $this = $(this.$el);
                navVM.toggleDropdown($this);
            }
        }
    });
    // 子集
    Vue.component("dropdown-sub-list",{
        props:["subtodo",'index'],
        template:`<li class="dropdown">
                    <dropdown-sub-menu v-bind:todo ='subtodo'></dropdown-sub-menu>
                    <ul class="dropdown-menu" >
                        <dropdown-child-list v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event'></dropdown-child-list>
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
        template:`<a v-bind:href="todo.href" class="dropdown-toggle" data-toggle="dropdown" v-on:click="subClick">
                        <i class="icon-repair"></i>{{todo.text}}<b class="ico-arr-dropdown" ></b>
                    </a>`,
        computed:{
            fn1:function(){
            },
        },
        methods:{
            subClick:function(){
                var $this = $(this.$el);
                console.log($this);
                $this.parents(".navigation").addClass("open");
            }
        }
    });
    // 子集以下
    Vue.component("dropdown-child-list",{
        props:["subtodo",'index'],
        template:`<li class="dropdown">
                    <dropdown-child-menu v-bind:todo ='subtodo'></dropdown-child-menu>
                    <ul class="dropdown-menu" >
                        <dropdown-child-list v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event'></dropdown-child-list>
                    </ul>
                </li>`,
        computed:{
            fn1:function(){
                console.log(this.subtodo);
                console.log(this.index);
            },
        },
    })
    Vue.component("dropdown-child-menu",{
        props:["todo"],
        template:`<a v-bind:href="todo.href" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false" v-on:click="subJump">
                {{todo.text}}<b class="ico-arr-plus" v-if="todo.nodes" ></b></a>`,
        computed:{
            
        },
        methods:{
            subJump:function(){
                var $this = $(this.$el);
                navVM.jumpPage($this);
            }
        }
    });
    // sec-Sidebar  product
    Vue.component("dropdown-product-menu",{
        props:["todo","index"],
        template:`<a v-bind:href="todo.href"  class="sidebar-toggle" v-bind:set-id=todo.id v-on:click="subClick">
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
        template:`<a v-bind:href="todo.href" v-bind:set-id=todo.id v-on:click="subJump(this)">{{todo.text}}</a>`,
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
        methods:{
            subClick:function(){
                var $this = $(this.$el);
                console.log($this);
                $this.parents(".navigation").addClass("open");
            }
        }
    });
    Vue.component("dropdown-product-sub-list",{
        props:["subtodo",'index'],
        template:`<li class="dropdown">
                    <dropdown-product-sub-menu v-bind:todo ='subtodo' v-bind:index="index" v-if="subtodo.nodes"></dropdown-product-sub-menu>
                    <dropdown-product-a v-bind:todo ='subtodo' v-bind:index="index"  v-else></dropdown-product-a>
                    <ul class="dropdown-menu" >
                        <dropdown-product-sub-list v-if="subtodo.nodes" v-for="sub in subtodo.nodes" v-bind:subtodo ='sub' v-bind:index ='index'></dropdown-product-sub-list>
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
                    // `this` 绑定到当前实例z
                    $("#sidebar .navigation").eq(0).addClass("active");
                })
                
            }
        },
        computed:{
        },
        methods:{
            jumpPage:function(obj){
                var setId = obj.attr("set-id");
                this.setActive(this.navData,setId);
                var id = obj.attr("href");
                console.log(setId);
                if(!id) return false;
                if(!$(id).attr("loaded")){
                    console.log("loaded");
                    $(id).load("views/container/"+(id.substr(1))+".html").attr("loaded",true);
                }
                $(id).show(0).siblings().hide(0);

                // obj.parent().addClass("active").siblings().removeClass("active");
            },
            toggleDropdown:function(obj){
                var sidebar = obj.parents("#sidesbar");
                // 当屏幕小鱼1024时，会添加classname 'collapsed';
                if(sidebar.hasClass("collapsed")){
                    console.log("you",navVM);
                    obj.parents(".navigation").addClass("active").siblings().removeClass("active");
                    navVM.activeNav = navVM.navData[parseInt(obj.attr("set-id"))]
                }else{

                }
            },
            setActive:function(arr,setId){
                for(var i=0;i<arr.length;i++){
                    if(arr[i].id == setId){
                        
                        arr["active"] = "active";
                        navVM.$set(arr[i],"active","active");
                        return false;
                    }else{
                        if(arr[i]['nodes']){
                            this.setActive(arr[i]['nodes'],setId);
                            return false;
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

// })

