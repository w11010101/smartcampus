/**
 * ==================================================================================
 * [index.html]
 * @type {Vue} app
 */

// 组件
var communicationObj = {
    props:["tels"],
    template:'<div class="mail-list-btn"><button v-on:click="calling" v-bind:tels="setTels" class="telBtn"></button>\
            <a v-bind:href="defaultTel" class="smsBtn"></a></div>',
    computed:{
        setTels:function(){
            var arr = [];
            $.each(this.tels,function(i,e) {
                arr.push(e.No);
            });
            return arr.join("|");
        },
        defaultTel:function (argument) {
            for(var i = 0;i<this.tels.length;i++){
                if(this.tels[i].IsDefault){
                    return "sms:"+this.tels[i].No;
                }
            }
        }
    },
    methods:{
        calling:function () {
            var telArr = [];
            campus.popup({
                value:this.setTels.split("|"),
                type:"select",
                cancel:true,
                scrollTime:0
            },function (argument) {
                window.location.href = "tel:"+argument.key;
            });
        }
    }
};

var editToolObj = {
    props:["infoContent"],
    template:'<div class="mail-list-btn"><a @click="jumpEdit" class="editToolBtn" :info=JSON.stringify(infoContent) ></a><button v-on:click="delFn" class="delBtn"></button></div>',
    methods:{
        delFn:function (event) {
            // 删除联系人
            $(event.target).parents(".mail-list-info").parent().remove();
        },
        jumpEdit:function (event) {
            window.location.href = "edit.html?infoObj="+encodeURI(event.target.getAttribute("info"));
        }
    }
}

// vuejs 实例app
var app = new Vue({
    el: '#app',
    data: {
        mailList:{},        // 联系人对象，渲染选项卡第1页
        searchMailList:{},  // 搜索联系人，
        searchKey:"",       // 搜索关键字
        persons:[],         // 所有联系人
        capArr:[],          // 
        deptNativeArr:[{Items:[]}],      // 部门原生对象
        deptNativeIndex:0,  // 当前部门的下标
        deptsObj:{},        // 部门对象，渲染选项卡第2页
        editStart:false,    // 编辑状态，false为不编辑，true为正在编辑
        deptNames:[         // 部门名称
            {
                id:1,
                name:"综合管理"
            },
            {
                id:2,
                name:"教学科研"
            },
            {
                id:4,
                name:"支持保障"
            },
            {
                id:8,
                name:"学校企业"
            }
        ],
        defaultImg:"../../content/style/white/tongxunlu/images/default.png",// 默认联系人头像
        sorTableObjs:{}
    },
    components:{    // 组件
        'communication-box':communicationObj,
        'edit-box':editToolObj,
    },
    watch: {  // 观察 
        // 选项卡1 联系人列表  
        mailList:function(val){

            setTimeout(function(){
                runTabSwiper();
                // 删除一组字母导航
                
                $(".slider-nav").remove();
                $('.mail-list').sliderNav({
                    arrows:false,
                    height:$(".swiper-container").height() - 94
                });
            },200);
        },
        // 字母集合
        capArr:function(){
        },
        // 
        deptNativeArr:function(){
            var _this = this;
            setTimeout(function (argument) {
                // 设置高度
                _this.setTop();
                // 手风琴监听事件
                $('.panel-group').on('show.bs.collapse', function(e) {
                    console.log("展开");
                    
                    $("#accordion .smart-active").removeClass("active");
                    $(e.target).prev().addClass("smart-active");

                    // 当前为编辑模式时，运行
                    if(_this.editStart){
                        console.log(1);
                        // 传true或者其他真值：为禁止拖动
                        _this.disabledSortable(_this.sorTableObjs.deptSorTableObj,true);
                        var _currentList = e.target.querySelector(".smart-sub-list");
                        if(_this.sorTableObjs.currentListObjs){
                            // 如果已存在就注销，下面重新创建；
                            _this.sorTableObjs.currentListObjs.destroy();
                        }
                        // 重新创建
                        _this.runSortable(_currentList,"currentListObjs",".smart-sub-list-item");
                    }else{
                        console.log(0);
                    }
                });
                $('.panel-group').on('hide.bs.collapse', function(e) {
                    console.log("收起");
                    $(e.target).prev().toggleClass("smart-active");

                    // 当前为编辑模式时，运行
                    if(_this.editStart){
                        console.log(1);
                        // 不传或者穿false；为恢复拖动
                        _this.disabledSortable(_this.sorTableObjs.deptSorTableObj);
                        var _currentList = e.target.querySelector(".smart-sub-list");
                        _this.disabledSortable(_this.sorTableObjs.currentListObjs,true);
                    }else{
                        console.log(0);
                    }
                });
            },200);
        },
        deptsObj:function(){
            console.log("deptsObj");
        },
        sorTableObjs:function(val){
            console.log(val);
        }
    },
    computed: { // 计算
        setActive:function(argument) {
            for(var i = 0; i<this.deptNames.length;i++){
                console.log(this.deptNames[i].id)
                if(this.deptNames[i].id == 1){
                    return {
                        active:this.deptNames[i].id == 1
                    }
                }
            } 
        }
    },
    methods: {  // 方法        
        // 编辑 和 完成按钮
        changeEditStartFn:function(event){
            var currentCollapse = $(".panel-collapse[aria-expanded='true']");
            if($(event.target).text() === "编辑"){
                console.log("编辑");
                // 编辑
                this.editStart = true;
                $(event.target).addClass("active").siblings().removeClass("active");
                // 点击编辑,把部门和成员的都显示出来；然后在下面判断禁止掉一个
                // 启动拖拽 (部门拖动)；
                var el = document.querySelector("#accordion");
                this.runSortable(el,"deptSorTableObj",".panel-default");
                // 启动拖拽 (当前部门中 列表拖动)；
                var _current = currentCollapse.length?currentCollapse[0].querySelector(".smart-sub-list"):document.querySelector("#accordion");
                this.runSortable(_current,"currentListObjs",".smart-sub-list-item");

            }else{
                console.log("完成");
                // 完成
                $(event.target).siblings().removeClass("active");
                if(this.editStart){
                    this.editStart = false;
                    var currentCollapse = $(".panel-collapse[aria-expanded='true']");
                    // this.destroy(this.sorTableObjs.currentListObjs);
                    // this.destroy(this.sorTableObjs.deptSorTableObj);
                    $("#accordion .active").removeClass("active");
                    
                    this.disabledSortable(this.sorTableObjs.deptSorTableObj,true);
                    this.disabledSortable(this.sorTableObjs.currentListObjs,true);
                }
            }
            // 在这里判断，然后在下面判断禁止掉一个，后续点击手风琴就不需要判断重新生成实例了
            if(currentCollapse.length){
                this.disabledSortable(this.sorTableObjs.deptSorTableObj,true);
            }else{
                this.disabledSortable(this.sorTableObjs.currentListObjs,true);
            }
            setTimeout(function (argument) {
                // 设置高度
                app.setTop();
            },200);
        },  

        changeDept:function(event) {
            $(event.target).addClass("active").siblings().removeClass("active");
            console.log("changeDept = ", event.target);
        },
        // 创建拖拽列表实例
        runSortable:function(objs,key,draggable){
            var SortableObj = Sortable.create(objs,{
                draggable: draggable||"",   // 定义哪些列表单元可以进行拖放
                forceFallback:true,
                fallbackClass:"fallbackClass",
                // delay:200,    // 长按时间
                // 拖拽元素被选中的回调函数
                onChoose:function(event) {
                    // $(event.item).addClass("active");
                    console.log("sortable onChoose");
                },
                // 拖拽元素拖动开始的回调函数
                onStart:function(event){
                    console.log("sortable onStart");
                },
                // 排序发生变化后的回调函数
                onUpdate:function (event){
                    console.log("sortable onUpdate");
                },
                // 拖放结束后的回调函数
                onEnd:function(event) {
                    console.log("sortable onEnd");
                    // $(event.item).removeClass("active");
                }
            });
            app.$set(this.sorTableObjs,key,SortableObj);
            // this.sorTableObjs[key] = SortableObj;
        },
        // 拖动功能的 禁止和启动
        // 不传或者穿false；为恢复拖动
        // 传true或者其他真值：为禁止拖动
        disabledSortable:function(obj,start){
            console.log(0)
            obj.options.disabled = start?true:false;
        },
        // 销毁拖动
        destroy:function (obj) {
            obj.destroy();
        },
        // 设置选项卡2的列表top值
        setTop:function(){
            // 设置高度
            var top = 0;
            $.each($('.panel-group').prevAll(),function(i,e){
                top += e.clientHeight;
            });
            $('.panel-group').css("top",top+"px");
        },
        // 搜索
        searchFn:_.debounce(
            function() {
                if (true) {
                    var key = this.searchKey;
                    var resultArr = {};
                    var resultCapArr = [];
                    var _arr = [];

                    $.each(app.persons,function(i,e){
                        if(e.Name.indexOf(key)>=0){
                            
                            if($.inArray(e.Cap,resultCapArr)<0){
                                _arr = [];
                                resultCapArr.push(e.Cap);
                            }

                            if(e.Cap == resultCapArr[resultCapArr.length-1]){
                                _arr.push(e);
                            }
                            resultArr[resultCapArr.length-1] = {};
                            resultArr[resultCapArr.length-1]["Cap"] = e.Cap;
                            resultArr[resultCapArr.length-1]["Items"] = _arr;
                            resultArr[resultCapArr.length-1]["ItemsCount"] = resultArr[resultCapArr.length-1]["Items"].length;

                        }
                    });
                    
                    app.capArr = resultCapArr;
                    app.mailList = resultArr;
                }
            },1000
        ),
        jump:function (argument) {
            window.location.href = "info.html?infoObj="+encodeURI(JSON.stringify(argument));
        }
    }
});

