// function runNavVue(Vue){

    // from in data.js
    console.log(data);
    
    // vue ================================
    Vue.component("dropdown-menu",{
        props:["todo","index","isNodes"],
        template:`<a href="#" v-bind:action="todo.href" v-bind:nid="todo.nid" v-bind:nodess = 'typeof isNodes'v-bind:class="isNodes?'dropdown-toggle':'sidebar-toggle'" data-toggle="dropdown" v-on:click=subToggleDropdown v-bind:setid="todo.id">
                    <i class="icon-service" v-if="isNodes"></i>
                    <i class="icon-repair" v-else></i>
                    <span>{{todo.text}}</span>
                    <i class="ico-arr-project" v-if="isNodes"></i>
                    <b class="ico-arr-dropdown" v-else-if="!isNodes && todo['nodes']&&todo['nodes'].length"></b>
                </a>`,
        methods:{
            subToggleDropdown:function(){
                
                var $this = $(this.$el);
                if($this.hasClass("sidebar-toggle")){
                    console.log("点击0",$this);
                    navVM.toggleDropdown($this);
                }else{
                    console.log("点击")
                    if($this.next(".dropdown-menu").find("li").length){
                        $this.parents(".navigation").addClass("open");
                    }else{
                        navVM.jumpPage($this);
                    }
                }
                

                
            }
        }
    });
    // 子集
    // <dropdown-sub-menu v-bind:todo ='subtodo'></dropdown-sub-menu>
    // <dropdown-child-list class="dropdown" v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event'></dropdown-child-list>
    // <dropdown-sub-list class="dropdown" v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event'></dropdown-sub-list>
    Vue.component("dropdown-sub-list",{
        props:["subtodo",'index','isNodes'],
        template:`<li v-bind:class="subtodo.active?'active':''"  >
                    <dropdown-menu v-bind:todo ='subtodo' v-bind:index="index" v-bind:isNodes='isNodes' v-if="!isNodes"></dropdown-menu>
                    <dropdown-child-a v-bind:todo ='subtodo' v-bind:type="subtodo.nodes?'menu':'href'" v-else></dropdown-child-a>
                    <ul class="dropdown-menu" v-if="subtodo.nodes&&subtodo.nodes.length">
                        <dropdown-sub-list class="dropdown" v-if="subtodo.nodes" v-for="event in subtodo.nodes" v-bind:subtodo ='event' v-bind:isNodes="event.nodes?true:false"></dropdown-sub-list>
                    </ul>
                </li>`,
        computed:{
        },
    });
    // 子集以下
    Vue.component("dropdown-child-a",{
        props:["todo",'type'],
        template:`<a href="#" v-bind:action="type=='href'?todo.href:''" v-bind:nid="todo.nid" data-toggle="dropdown" v-bind:setid="todo.id" class="dropdown-toggle" aria-expanded="false" v-on:click="subJump">                    
                    {{todo.text}}
                    <b class="ico-arr-plus" v-if="type=='menu'"></b>
                </a>`,
        computed:{
            
        },
        methods:{
            subJump:function(){
                var $this = $(this.$el);
                if($this.attr("action")){
                    navVM.jumpPage($this);
                }
                
            }
        }
    });
    // sec-Sidebar  product ================================================
    Vue.component("dropdown-product-a",{
        props:["todo","index",'level'],
        template:`<a href="#" 
                v-bind:action="todo.href" 
                v-bind:nid="todo.nid"  
                v-bind:data-toggle="(level >= 2 && todo.nodes)?'dropdown':''" 
                v-bind:class="(level >= 2 && todo.nodes)?'dropdown-toggle':'sidebar-toggle'" 
                v-bind:setid="todo.id" 
                v-on:click="subClick">
                    <i class="ico-arr-down-black" v-if='level < 2 && todo.nodes'></i>
                    {{todo.text}}
                    <b class="ico-arr-plus-black" v-if='level >= 2 && todo.nodes'></b>
                </a>
                `,
        computed:{
            
        },
        methods:{
            subClick:function(){
                var $this = $(this.$el);
                if(!$this.attr("action") || $this.hasClass('dropdown-toggle')){
                    $this.parents(".navigation").siblings().addClass("menu-hide").find(".menu").slideUp(200);
                    $this.next(".menu").slideToggle(200).parents(".navigation").toggleClass("menu-hide");
                }else {
                    navVM.jumpPage($this);
                }
                
            }
        }
    });

    // Vue.component("dropdown-product-sub-menu",{
    //     props:["todo"],
    //     template:`<a
    //             data-toggle="dropdown" 
    //             class="dropdown-toggle" 
    //             v-on:click="subClick(this)">
    //                 {{todo.text}}
    //                 <b class="ico-arr-plus-black"></b>
    //             </a>`,
    //     computed:{
    //     },
    //     methods:{
    //         subClick:function(){
    //             var $this = $(this.$el);
    //             $this.parents(".navigation").siblings().addClass("menu-hide").find(".menu").slideUp(200);
    //             $this.next(".menu").slideToggle(200).parents(".navigation").toggleClass("menu-hide");
    //         }
    //     }
    // });
    //<dropdown-product-sub-menu v-bind:todo ='subtodo' v-bind:setid="subtodo.id" v-if="subtodo.nodes"></dropdown-product-sub-menu>
    Vue.component("dropdown-product-sub-list",{
        props:["subtodo",'index'],
        template:`<li v-bind:class="{'dropdown':true,active:subtodo.active}">
                    
                    <dropdown-product-a v-bind:todo ='subtodo' v-bind:setid="subtodo.id" v-bind:level=3></dropdown-product-a>
                    <ul class="dropdown-menu" v-if="subtodo.nodes&&subtodo.nodes.length">
                        <dropdown-product-sub-list class="dropdown" v-if="subtodo.nodes" v-for="sub in subtodo.nodes" v-bind:subtodo ='sub' v-bind:index ='index'></dropdown-product-sub-list>
                    </ul>
                </li>`,
        computed:{
        },
    })
    // vue 实例
    var navVM = new Vue({
        el:"#vm-nav",
        data:{
            navData:"",
            activeNav:'',
            current_nav:"",
            message:"message"
        },
        // watch:{
        //     // navData:function(event){
        //     //     console.log(event);
        //     //     navVM.activeNav = event[0];
        //     // }
        // // },
        // // mounted:function(){
        // //     // this.$nextTick(function(){

        //         // var activeId = this.activeNav.id;
        //         // console.log(this.activeNav)
        //         // this.setActive(this.navData,activeId);
        // //     // });
           
        // },
        // beforeCreate: function() {
        //   console.group('------beforeCreate创建前状态------');
        //   console.log("%c%s", "color:red" , "el     : " + this.$el); //undefined
        //   console.log("%c%s", "color:red","data   : " + this.$data); //undefined 
        //   console.log("%c%s", "color:red","message: " + this.message) 
        //   console.log("%c%s", "color:red","navData: " + this.navData)
        // },
        created: function() {
          console.group('------created创建完毕状态------');
          console.log("%c%s", "color:red","el     : " + this.$el); //undefined
          console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化 
          console.log("%c%s", "color:red","message: " + this.message); //已被初始化
          this.navData = data;
          this.activeNav = this.navData[0];
          console.log("%c%s", "color:red","navData: " + this.navData)
         
          
        },
        beforeMount: function() {
          console.group('------beforeMount挂载前状态------');
          console.log("%c%s", "color:red","el     : " + (this.$el)); //已被初始化
          console.log(this.$el);
          console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化  
          console.log("%c%s", "color:red","message: " + this.message); //已被初始化  
          console.log("%c%s", "color:red","navData: " + this.navData)
           var activeId = this.activeNav.id;
            console.log(this.activeNav)
            this.setActive(this.navData,activeId);
        },
        // mounted: function() {
        //   console.group('------mounted 挂载结束状态------');
        //   console.log("%c%s", "color:red","el     : " + this.$el); //已被初始化
        //   console.log(this.$el);    
        //   console.log("%c%s", "color:red","data   : " + this.$data); //已被初始化
        //   console.log("%c%s", "color:red","message: " + this.message); //已被初始化 
        //   console.log("%c%s", "color:red","navData: " + this.navData)
        // },
        // beforeUpdate: function () {
        //   console.group('beforeUpdate 更新前状态===============》');
        //   console.log("%c%s", "color:red","el     : " + this.$el);
        //   console.log(this.$el);   
        //   console.log("%c%s", "color:red","data   : " + this.$data); 
        //   console.log("%c%s", "color:red","message: " + this.message); 
        //   console.log("%c%s", "color:red","navData: " + this.navData)
        // },
        // updated: function () {
        //   console.group('updated 更新完成状态===============》');
        //   console.log("%c%s", "color:red","el     : " + this.$el);
        //   console.log(this.$el); 
        //   console.log("%c%s", "color:red","data   : " + this.$data); 
        //   console.log("%c%s", "color:red","message: " + this.message); 
        //   console.log("%c%s", "color:red","navData: " + this.navData)
        // },
        // beforeDestroy: function () {
        //   console.group('beforeDestroy 销毁前状态===============》');
        //   console.log("%c%s", "color:red","el     : " + this.$el);
        //   console.log(this.$el);    
        //   console.log("%c%s", "color:red","data   : " + this.$data); 
        //   console.log("%c%s", "color:red","message: " + this.message); 
        //   console.log("%c%s", "color:red","navData: " + this.navData)
        // },
        // destroyed: function () {
        //   console.group('destroyed 销毁完成状态===============》');
        //   console.log("%c%s", "color:red","el     : " + this.$el);
        //   console.log(this.$el);  
        //   console.log("%c%s", "color:red","data   : " + this.$data); 
        //   console.log("%c%s", "color:red","message: " + this.message)
        //   console.log("%c%s", "color:red","navData: " + this.navData)
        // },
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
                arr = arr?arr:this.navData;
                // console.log(event);
                // // setId = setId?setId:$event
                for(var i=0;i<arr.length;i++){

                    this.$set(arr[i],"active",null);

                    if(arr[i].id === setId){
                        console.log("这里 ",arr[i]);
                        this.$set(arr[i],"active",true);

                    }else{
                        if(arr[i]['nodes']){
                            this.setActive(arr[i]['nodes'],setId);
                        }
                    }
                }
            }
        }
    });

    function postData(){
        // navVM.navData = data;
    }   
    postData();

// }

