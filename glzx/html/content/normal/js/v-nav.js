$(function(){
    // navData
    var navData = [
    	{
    		level:0,
    		name:'示例管理',
    		id:1,
    		children:[
    			{
    				level:1,
    				name:"示例管理-sub1",
    				id:11,
    				children:[
    					{
    						level:1,
    						name:"示例管理-sub2-sub",
    						id:12,
    					},
                        {
                            level:1,
                            name:"示例管理-sub2-sub",
                            id:12,
                        },
                        {
                            level:1,
                            name:"示例管理-sub2-sub",
                            id:12,
                        },

    				]
    			},
    			{
    				level:1,
    				name:"示例管理-sub2",
    				id:12,
    			},
    		]
    	},
        {
            level:0,
            name:'运维管理',
            id:2,
            children:[
                {
                    level:1,
                    name:"运维管理-sub1",
                    id:21,
                    children:[
                        {
                            level:1,
                            name:"运维管理-sub2-sub",
                            id:22,
                        },
                        {
                            level:1,
                            name:"运维管理-sub2-sub",
                            id:22,
                        },
                        {
                            level:1,
                            name:"运维管理-sub2-sub",
                            id:22,
                        },
                        
                    ]
                },
                {
                    level:1,
                    name:"运维管理-sub2",
                    id:22,
                },
            ]
        },
        {
            level:0,
            name:'智慧食堂',
            id:3,
            children:[
                {
                    level:1,
                    name:"智慧食堂-sub1",
                    id:31,
                    children:[
                        {
                            level:1,
                            name:"智慧食堂-sub2-sub",
                            id:32,
                        },
                        {
                            level:1,
                            name:"智慧食堂-sub2-sub",
                            id:32,
                        },
                        {
                            level:1,
                            name:"智慧食堂-sub2-sub",
                            id:32,
                        },
                        
                    ]
                },
                {
                    level:1,
                    name:"智慧食堂-sub2",
                    id:32,
                },
            ]
        },
        {
            level:0,
            name:'APP管理',
            id:4,
            children:[
                {
                    level:1,
                    name:"APP管理-sub1",
                    id:41,
                    children:[
                        {
                            level:1,
                            name:"APP管理-sub2-sub",
                            id:42,
                        },
                        {
                            level:1,
                            name:"APP管理-sub2-sub",
                            id:42,
                        },
                        {
                            level:1,
                            name:"APP管理-sub2-sub",
                            id:42,
                        },
                        
                    ]
                },
                {
                    level:1,
                    name:"APP管理-sub2",
                    id:42,
                },
            ]
        },
    ]
    console.log(navData)
    // vue ================================
    Vue.component("dropdown-title",{
        props:["todo"],
        template:`<a href="#" class="sidebar-toggle" data-toggle="dropdown" v-bind=fn1>
                    <i class="icon-service"></i><span>{{todo.name}}</span><i class="ico-arr-project"></i>

                </a>
                `,
                // <dropdown-title v-if="tode.children" v-for="event in tode.children" v-bind:tode ='event'></dropdown-title>
        computed:{
            fn1:function(){
                // console.log(this.tode);
            }
        }
    });
    Vue.component("dropdown-menu",{
        props:["menu"],
        template:`
            <ul class="menu">
                <li class="">
                    <a href="#">
                        <i class="icon-notice"></i>
                        "树形标题一"
                        <span class="badge badge-red"></span>
                    </a>
                </li>
                <li class="dropdown">
                    <!-- <dropdown-title v-bind:todo ='e'></dropdown-title>-->

                </li>
            </ul>
        `
    });
    Vue.component("dropdown-list",{
        props:["subtodo",'index'],
        template:`<li class="">
                    <a href="#">
                        <i v-bind:class=icon></i>{{subtodo.name}}
                        <span class="badge badge-red">1</span>
                    </a>

                    <ul class="dropdown-menu" v-if="subtodo.children">
                        <li>
                            <a href="#">
                                {{subtodo.name}}
                            </a>
                        </li>
                        <li class="dropdown open">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                树形标题子集二<b class="ico-arr-plus"></b>
                            </a>

                            <dropdown-title v-bind:todo ='subtodo'></dropdown-title>

                            <ul class="dropdown-menu">
                                <dropdown-list v-if="subtodo.children" v-for="sub in subtodo.children" v-bind:subtodo ='sub' v-bind:index ='index'></dropdown-list>
                            </ul>
                        </li>
                    </ul>
                </li>`,
                // <dropdown-title v-if="tode.children" v-for="event in tode.children" v-bind:tode ='event'></dropdown-title>
        computed:{
            fn1:function(){
                console.log(this.subtodo);
                console.log(this.index);
            },
            icon:function(argument) {
                switch (this.index){
                    case 0:
                        return 'icon-notice'
                    break;
                    case 1:
                        return 'icon-repair'
                    break;
                    case 2:
                        return 'icon-school'
                    break;
                    case 3:
                        return 'icon-user'
                    break;
                }
            }
        },

    })
    // vue 实例
    var vmNav = new Vue({
        el:"#vm-nav",
        data:{
            navData:navData
        }
    })
})
