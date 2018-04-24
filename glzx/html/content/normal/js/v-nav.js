$(function(){
    // navData
    var navData = [
    	{
    		level:0,
    		text:'示例管理',
    		id:1,
    		nodes:[
    			{
    				level:1,
    				text:"示例-2层",
    				id:11,
    				nodes:[
    					{
    						level:1,
    						text:"示例-3层1",
    						id:12,
                            nodes:[
                                {
                                    level:1,
                                    text:"示例-4层1",
                                    id:12,
                                    nodes:[
                                        {
                                            level:1,
                                            text:"示例-5层1",
                                            id:12,
                                        },
                                        {
                                            level:1,
                                            text:"示例-5层2",
                                            id:12,
                                        },
                                    ]
                                },
                                {
                                    level:1,
                                    text:"示例-4层2",
                                    id:12,
                                },
                            ]
    					},
                        {
                            level:1,
                            text:"示例-3层2",
                            id:12,
                            nodes:[
                                {
                                    level:1,
                                    text:"示例-4层1",
                                    id:12,
                                    nodes:[
                                        {
                                            level:1,
                                            text:"示例-5层1",
                                            id:12,
                                        },
                                        {
                                            level:1,
                                            text:"示例-5层2",
                                            id:12,
                                        },
                                    ]
                                },
                                {
                                    level:1,
                                    text:"示例-4层2",
                                    id:12,
                                },
                            ]
                        },
                        {
                            level:1,
                            text:"示例-3层3",
                            id:12,
                        },

    				]
    			},
    			{
    				level:1,
    				text:"示例-sub2",
    				id:12,
                    nodes:[
                        {
                            level:1,
                            text:"示例-sub2-sub",
                            id:12,
                        },
                        {
                            level:1,
                            text:"示例-sub2-sub",
                            id:12,
                        },
                        {
                            level:1,
                            text:"示例-sub2-sub",
                            id:12,
                        },

                    ]
    			},
                {
                    level:1,
                    text:"示例-sub3",
                    id:12,
                    nodes:[
                        {
                            level:1,
                            text:"示例-sub3-sub",
                            id:12,
                        },
                        {
                            level:1,
                            text:"示例-sub3-sub",
                            id:12,
                        },
                        {
                            level:1,
                            text:"示例-sub3-sub",
                            id:12,
                        },

                    ]
                },
    		]
    	},
        {
            level:0,
            text:'运维管理',
            id:2,
            nodes:[
                {
                    level:1,
                    text:"运维管理-sub1",
                    id:21,
                    nodes:[
                        {
                            level:1,
                            text:"运维管理-sub2-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub2-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub2-sub",
                            id:22,
                        },
                        
                    ]
                },
                {
                    level:1,
                    text:"运维管理-sub2",
                    id:22,
                    nodes:[
                        {
                            level:1,
                            text:"运维管理-sub2-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub2-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub2-sub",
                            id:22,
                        },
                        
                    ]
                },
                {
                    level:1,
                    text:"运维管理-sub3",
                    id:22,
                    nodes:[
                        {
                            level:1,
                            text:"运维管理-sub3-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub3-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub3-sub",
                            id:22,
                        },
                        
                    ]
                },
                {
                    level:1,
                    text:"运维管理-sub4",
                    id:22,
                    nodes:[
                        {
                            level:1,
                            text:"运维管理-sub4-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub4-sub",
                            id:22,
                        },
                        {
                            level:1,
                            text:"运维管理-sub4-sub",
                            id:22,
                        },
                        
                    ]
                },
            ]
        },
        {
            level:0,
            text:'智慧食堂',
            id:3,
            nodes:[
                {
                    level:1,
                    text:"智慧食堂-sub1",
                    id:31,
                    nodes:[
                        {
                            level:1,
                            text:"智慧食堂-sub2-sub",
                            id:32,
                        },
                        {
                            level:1,
                            text:"智慧食堂-sub2-sub",
                            id:32,
                        },
                        {
                            level:1,
                            text:"智慧食堂-sub2-sub",
                            id:32,
                        },
                        
                    ]
                },
                {
                    level:1,
                    text:"智慧食堂-sub2",
                    id:32,
                },
            ]
        },
        {
            level:0,
            text:'APP管理',
            id:4,
            nodes:[
                {
                    level:1,
                    text:"APP管理-sub1",
                    id:41,
                    nodes:[
                        {
                            level:1,
                            text:"APP管理-sub2-sub",
                            id:42,
                        },
                        {
                            level:1,
                            text:"APP管理-sub2-sub",
                            id:42,
                        },
                        {
                            level:1,
                            text:"APP管理-sub2-sub",
                            id:42,
                        },
                        
                    ]
                },
                {
                    level:1,
                    text:"APP管理-sub2",
                    id:42,
                },
            ]
        },
    ]
    // console.log(navData)
    
    // vue ================================
    Vue.component("dropdown-menu",{
        props:["todo"],
        template:`<a href="#" class="sidebar-toggle" data-toggle="dropdown" v-on:click=toggleDropdown>
                    <i class="icon-service"></i><span>{{todo.text}}</span><i class="ico-arr-project"></i>
                </a>`,
        computed:{
            fn1:function(){
                // console.log(this.tode);
            }
        },
        methods:{
            toggleDropdown:function(){
                var _this = this.$el;
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
                        <i class="icon-repair"></i>{{todo.text}}<b class="ico-arr-dropdown"></b>
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
                {{todo.text}}<b class="ico-arr-plus"></b></a>`,
        computed:{
            fn1:function(){
                // console.log(this.tode);
            }
        }
    });

   
    
    // vue 实例
    var vmNav = new Vue({
        el:"#vm-nav",
        data:{
            navData:""
        },
        watch:{
            navData:function(){
                // console.log(this)
                // 创建 导航
            }
        },
        computed:{
        },
        methods:{
        }
    });

    function postData(){
        vmNav.navData = navData
    }   
    postData();

})
