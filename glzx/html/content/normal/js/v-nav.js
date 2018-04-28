$(function(){
    // from in data.js
    console.log(data);
    
    // vue ================================
    Vue.component("dropdown-menu",{
        props:["todo","index"],
        template:`<a href="#" class="sidebar-toggle" data-toggle="dropdown" v-on:click=toggleDropdown v-bind:set-index=index>
                    <i class="icon-service"></i><span>{{todo.text}}</span><i class="ico-arr-project"></i>
                </a>`,
        computed:{
            fn1:function(){
                // console.log(this.tode);
            }
        },
        methods:{
            toggleDropdown:function(){
                var $this = $(this.$el);
                var sidebar = $this.parents("#sidebar");
                // 当屏幕小鱼1024时，会添加classname 'collapsed';
                if(sidebar.hasClass("collapsed")){
                    console.log("you",vmNav);
                    $this.parents(".navigation").addClass("active").siblings().removeClass("active");
                    vmNav.activeNav = vmNav.navData[parseInt($this.attr("set-index"))];
                }
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
        template:`<a href="#" class="dropdown-toggle" data-toggle="dropdown" v-on:click="subClick">
                        <i class="icon-repair"></i>{{todo.text}}<b class="ico-arr-dropdown" ></b>
                    </a>`,
        computed:{
            fn1:function(){
                // console.log(this.tode);
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
        template:`<a href="#" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false">
                {{todo.text}}<b class="ico-arr-plus" v-if="todo.nodes" ></b></a>`,
        computed:{
        }
    });
    // sec-Sidebar  product
    Vue.component("dropdown-product-menu",{
        props:["todo","index"],
        template:`<a href="#" class="sidebar-toggle" v-bind:set-index=index v-on:click="subClick">
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
        template:`<a href="#" v-bind:set-index=index>{{todo.text}}</a>`,
        computed:{
        },
        methods:{
        }
    });
    Vue.component("dropdown-product-sub-menu",{
        props:["todo"],
        template:`<a href="#" data-toggle="dropdown" class="dropdown-toggle">{{todo.text}}<b class="ico-arr-plus-black"></b></a>`,
        computed:{
            fn1:function(){
                // console.log(this.tode);
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
    // <a href="#" data-toggle="dropdown" class="dropdown-toggle">树形子标题三 <b class="ico-arr-plus-black"></b></a>
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
    var vmNav = new Vue({
        el:"#vm-nav",
        data:{
            navData:"",
            activeNav:''
        },
        watch:{
            navData:function(event){
                console.log(vmNav);
                vmNav.activeNav = event[0];
                this.$nextTick(function () {
                    // DOM 现在更新了
                    // `this` 绑定到当前实例
                    $("#sidebar .navigation").eq(0).addClass("active");
                })
                
            }
        },
        computed:{
        },
        methods:{
        }
    });

    function postData(){
        vmNav.navData = data;
    }   
    postData();

})

