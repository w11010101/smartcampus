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
                var _this = $(this.$el);
                console.log(_this);
                _this.parents(".navigation").addClass("open");
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
            fn1:function(){
                // console.log(this.tode);
            }
        }
    });
    // sec-Sidebar 
    Vue.component("dropdown-product-menu",{
        props:["todo","index"],
        template:`<a href="#" class="sidebar-toggle" data-toggle="#navigation1" v-bind:set-index=index>
                <i class="ico-arr-down-black"></i>{{todo.text}}</a>`,
        computed:{
            fn1:function(){
                // console.log(this.tode);
            }
        },
        methods:{
            // toggleDropdown:function(){
            //     var $this = $(this.$el);
            //     var sidebar = $this.parents("#sidebar");
            //     // 当屏幕小鱼1024时，会添加classname 'collapsed';
            //     if(sidebar.hasClass("collapsed")){
            //         console.log("you",vmNav);
            //         vmNav.activeNav = vmNav.navData[parseInt($this.attr("set-index"))];
            //     }
            // }
        }
    });

    
    // vue 实例
    var vmNav = new Vue({
        el:"#vm-nav",
        data:{
            navData:"",
            activeNav:''
        },
        watch:{
            navData:function(event){
                console.log(event);
                console.log(vmNav);
                vmNav.activeNav = event[0];
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
