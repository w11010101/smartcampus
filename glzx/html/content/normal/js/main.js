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
    
    // nav 导航 ---------------------------------------
    // 非模块开发用法，若要用requirejs，请遵行该规范；尽量避免此种引用 
    // runNavVue(Vue); //废弃
    // var arr=[{text:"第一层",id:1,nodes:[{text:"第一层 1-1",id:11,nodes:[{text:"第一层 1-1-1",id:111},{text:"第一层 1-1-2",id:112},{text:"第一层 1-1-3",id:113}]},{text:"第一层 1-2",id:12,nodes:[{text:"第一层 1-2-1",id:121},{text:"第一层 1-2-2",id:122},{text:"第一层 1-2-3",id:123}]}]},{text:"第二层",id:2,nodes:[{text:"第二层 2-1",id:21,nodes:[{text:"第二层 2-1-1",id:211},{text:"第二层 2-1-2",id:212},{text:"第二层 2-1-3",id:213}]},{text:"第二层 2-2",id:22,nodes:[{text:"第二层 2-2-1",id:221},{text:"第二层 2-2-2",id:222},{text:"第二层 2-2-3",id:223}]},{text:"第二层 2-3",id:23,nodes:[{text:"第二层 2-3-1",id:231},{text:"第二层 2-3-2",id:232},{text:"第二层 2-3-3",id:233}]}]}];
    // console.log(new getBreadcrumb(arr,1));
    // var Breadcrumb = new getBreadcrumb(data,11);
    // console.log(Breadcrumb)
    Vue.use(iview);

    Vue.component("menu-parts",{
        props:["data"],
        template:`<submenu :name="JSON.stringify(data.nodes)+'|'+data.id" v-if="data.nodes && data.nodes.length" :title='data.text' >
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
            breadcrumbArr:[]
        },
        mixins:[Main],
        watch:{
            activeNavIndex:{
                handler:function(){
                    console.log("run ? ");
                    this.activeNav = '';
                    if(!this.activeNav){
                        var item = this.name[0];
                        var itemArr = item.split("|");
                        var subMenuArr = JSON.parse(itemArr[0]);
                        this.activeNav = [];    // 重置dom
                    } 
                    
                    this.$nextTick(function(){
                        this.activeNav = subMenuArr;
                    })
                },
                deep:true
            },
        },
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
                var Breadcrumb = new getBreadcrumb(data,subMenuId)
                console.log('面包屑 = ',Breadcrumb);
                _this.setBreadcrumb(Breadcrumb);
            },
            // 
            collapsedMenuShow:function(name){
                console.log('collapsedMenuShow = ',name);
                this.name = name;

                this.$nextTick(function(){
                    var openNode = $("#navApp").find(".ivu-menu-opened");
                    console.log(openNode);
                    this.activeNavIndex = openNode.index();     // 通过修改当前点击的nav的下标，再通过watch监听，改变activeNav值
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
    // h1 ---------------------------------------
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

    // 
    window.getNode = function (data,obj,Id){
       
        for(var i = 0; i < data.length; i++){
            // var arr = [data[i].text];
            if(data[i].id == Id){
                obj['nodes'] = [];
                obj['nodes'].push(data[i]);
                obj['breadcrumb'].push({
                    id:data[i].id,
                    text:data[i].text
                });
            }else{

                if(data[i].nodes && data[i].nodes.length){
                    if(!obj['breadcrumb']){
                        obj['breadcrumb'] = [];
                    }

                    obj['breadcrumb'].push({
                        id:data[i].id,
                        text:data[i].text
                    });
                    arr = getNode(data[i].nodes,obj,Id);
                    
                }
                
            }

            // console.log(arr);
        }
        return obj;
    }
    // var arr = [
    //     {
    //         text:"第一层",
    //         id:1,
    //         nodes:[
    //             {
    //                 text:"第一层 1-1",
    //                 id:11,
    //                 nodes:[
    //                     {
    //                         text:"第一层 1-1-1",
    //                         id:111,
    //                     },
    //                     {
    //                         text:"第一层 1-1-2",
    //                         id:112,
    //                     },
    //                     {
    //                         text:"第一层 1-1-3",
    //                         id:113,
    //                     }
    //                 ]
    //             },
    //             {
    //                 text:"第一层 1-2",
    //                 id:12,
    //                 nodes:[
    //                     {
    //                         text:"第一层 1-2-1",
    //                         id:121,
    //                     },
    //                     {
    //                         text:"第一层 1-2-2",
    //                         id:122,
    //                     },
    //                     {
    //                         text:"第一层 1-2-3",
    //                         id:123,
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    //     {
    //         text:"第二层",
    //         id:2,
    //         nodes:[
    //             {
    //                 text:"第二层 2-1",
    //                 id:21,
    //                 nodes:[
    //                     {
    //                         text:"第二层 2-1-1",
    //                         id:211,
    //                     },
    //                     {
    //                         text:"第二层 2-1-2",
    //                         id:212,
    //                     },
    //                     {
    //                         text:"第二层 2-1-3",
    //                         id:213,
    //                     }
    //                 ]
    //             },
    //             {
    //                 text:"第二层 2-2",
    //                 id:22,
    //                 nodes:[
    //                     {
    //                         text:"第二层 2-2-1",
    //                         id:221,
    //                     },
    //                     {
    //                         text:"第二层 2-2-2",
    //                         id:222,
    //                     },
    //                     {
    //                         text:"第二层 2-2-3",
    //                         id:223,
    //                     }
    //                 ]
    //             },
    //             {
    //                 text:"第二层 2-3",
    //                 id:23,
    //                 nodes:[
    //                     {
    //                         text:"第二层 2-3-1",
    //                         id:231,
    //                     },
    //                     {
    //                         text:"第二层 2-3-2",
    //                         id:232,
    //                     },
    //                     {
    //                         text:"第二层 2-3-3",
    //                         id:233,
    //                     }
    //                 ]
    //             }
    //         ]
    //     },
    // ]
    // 根据树形结构，来获取子节点的面包屑路径
    // function getBreadcrumb(arr,selectedID){
    //     var data = arr;
    //     var json = [];
    //     var topID = [];
    //     for(var j = 0;j<arr.length;j++){
    //         topID.push(arr[j].id);
    //     }
    //     // console.log('selectedID = ' ,selectedID,'---------------------------------------------');
    //     function getNodeParent(arr,selectedID){
            
    //         var i = 0;
    //         var l = arr.length;
    //         while (i<l){
    //             // console.log('json = ',json )
    //             if(arr[i].id === selectedID){
    //                 // 如果相同
    //                 json.unshift(arr[i].text);
    //                 if(json.indexOf(arr[i].text)<0){
    //                     json.unshift(arr[i].text);
    //                 }
    //                 // console.log('相同 = ','---------------------------------------------');
    //                 break;
    //             }else{
    //                 // console.log('不相同');
    //                 // 如果不相同
    //                 if(arr[i].nodes && arr[i].nodes.length){
    //                     var state = isParent(arr[i].nodes,selectedID);
    //                     if(state){
    //                         if(json.indexOf(arr[i].text)<0){
    //                             json.unshift(arr[i].text);
    //                         }
                            
    //                         // console.log("有",json,arr[i].text);

    //                         if(topID.indexOf(arr[i].id)<0){
    //                             // console.log('不是顶层',data);
    //                             getNodeParent(data,arr[i].id)
    //                         }
    //                         break;
    //                     }else{
    //                         // console.log("没有",arr[i].nodes,selectedID);
    //                         getNodeParent(arr[i].nodes,selectedID);
    //                     }
    //                 }
    //             }

    //             i++;
    //         }
    //         return json;
    //     }
    //     // 判断是否是父级
    //     function isParent(arr,selectedID){
            
    //         var i = 0;
    //         var state;
    //         while(i<arr.length){
    //             if(arr[i].id === selectedID){
    //                 // console.log('true ? ');
    //                 if(json.indexOf(arr[i].text)<0){
    //                     json.unshift(arr[i].text);
    //                 }
    //                 state = true;
    //                 break;
    //             }
    //             i++;
    //         }
    //         return state;
    //     }
    //     return getNodeParent(arr,selectedID);

    // }
    // console.log(getBreadcrumb(arr,232));
    // console.log(getNode(data,[],221));
});
