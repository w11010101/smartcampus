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
            // $(event.target).parents(".mail-list-info").parent().remove();
            console.log(123);
            var option = {
                type: "alert",
                boxStyle: {
                    "width": "60%",
                    "margin-left":"-30%",
                    "min-height":'150px'
                },
                title: {
                    val: "您确定要删除吗？",
                },
                content: {
                },
                btns: {
                    cancel: true,
                    sureVal: "确定",
                    cancelVal:"取消",
                    order:true
                }
            }
            campus.popup(option, function(data) {
                console.log('删除 = ', data);
                campus.togglePopup("hide","alert");
                $(event.target).parents(".mail-list-info").parent().remove();
            });
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
        isShow:false,   // 完成按钮的显示
        ifEditBtn:true,
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
        sorTableObjs:{
            deptSorTableObj:{},

        }

    },
    components:{    // 组件
        'communication-box':communicationObj,
        'edit-box':editToolObj,
    },
    watch: {  // 观察 
        // 部门原生数组
        deptNativeArr:function(){
            var _this = this;
            console.log('手风琴监听事件')
            setTimeout(function (argument) {
                // 手风琴监听事件
                console.log($('.panel-group >div').eq(app.deptNativeIndex))
                $('.panel-group').on('show.bs.collapse', function(e) {
                    console.log("展开");
                    console.log(e.target);
                    $("#accordion .smart-active").removeClass("active");
                    $(e.target).prev().addClass("smart-active");
                    // 手动隐藏其他展开项
                    $(e.target).parent().siblings().find("div.panel-collapse").collapse('hide');
                    // 当前为编辑模式时，运行
                    if(_this.editStart){
                        console.log('当前为编辑模式');
                        // 传true或者其他真值：为禁止拖动
                        _this.disabledSortable(_this.sorTableObjs.deptSorTableObj["dept"+_this.deptNativeIndex],true);
                        var _currentList = e.target.querySelector(".smart-sub-list");
                        if(_this.sorTableObjs.currentListObjs){
                            // 如果已存在就注销，下面重新创建；
                            _this.sorTableObjs.currentListObjs.destroy();
                        }
                        // 重新创建
                        _this.runSortable({
                            el:_currentList,
                            key:"currentListObjs",
                            draggable:".smart-sub-list-item"
                        });
                    }else{
                        console.log('当前为完成');
                    }
                });
                $('.panel-group').on('hidden.bs.collapse', function(e) {
                    console.log("收起");
                    $(e.target).prev().toggleClass("smart-active");
                    console.log(e.target);
                    // 当前为编辑模式时，运行
                    if(_this.editStart){
                        console.log('当前为编辑模式');
                        if($("div[aria-expanded=true]").length){
                            // 收起时还有其他的展开
                            // 不传或者穿false；为恢复拖动 
                            _this.disabledSortable(_this.sorTableObjs.currentListObjs);
                            _this.disabledSortable(_this.sorTableObjs.deptSorTableObj["dept"+_this.deptNativeIndex],true);
                        }else{
                            // 收起时没有其他的展开
                            // 不传或者穿false；为恢复拖动
                            _this.disabledSortable(_this.sorTableObjs.currentListObjs,true);
                            if(!_this.sorTableObjs.deptSorTableObj["dept"+_this.deptNativeIndex]){
                                var accordionAll = document.querySelectorAll("#accordion > div");
                                $.each(accordionAll,function(i,e){
                                    app.runSortable({
                                        el:e,
                                        key:"deptSorTableObj",
                                        draggable:".panel-default",
                                        index:i
                                    })
                                }) 
                            }else{
                                _this.disabledSortable(_this.sorTableObjs.deptSorTableObj["dept"+_this.deptNativeIndex]);
                            }
                            
                        };
                    }else{
                        console.log('当前为完成');
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
    // 页面渲染完执行
    mounted:function(){
        this.$nextTick(function(argument) {
            console.log(this);
            runTabSwiper();
            $('.mail-list').sliderNav({
                arrows:false,
                height:$(".swiper-container").height() - 54
            });
        })
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
                this.isShow = true;
                console.log("编辑");
                // 编辑
                this.editStart = true;
                $(event.target).addClass("active").siblings().removeClass("active");
                
                if(currentCollapse.length){
                    // 启动拖拽 (当前部门中 列表拖动)；
                    var _current = currentCollapse[0].querySelector(".smart-sub-list");
                    this.runSortable({
                        el:_current,
                        key:"currentListObjs",
                        draggable:".smart-sub-list-item"
                    });
                }else{
                    // 将全部的创建拖动实例
                    var accordionAll = document.querySelectorAll("#accordion > div");
                    $.each(accordionAll,function(i,e){
                        app.runSortable({
                            el:e,
                            key:"deptSorTableObj",
                            draggable:".panel-default",
                            index:i
                        })
                    }) 
                }

            }else if($(event.target).text() === "完成"){
                this.isShow = false;
                console.log("完成");
                // 完成
                $(event.target).siblings().removeClass("active");
                if(this.editStart){
                    this.editStart = false;

                    $("#accordion .active").removeClass("active");
                    
                    // this.disabledSortable(this.sorTableObjs.deptSorTableObj["dept"+this.deptNativeIndex],true);
                    // this.disabledSortable(this.sorTableObjs.currentListObjs,true);
                    // 点击完成，哪个拖动启动就 禁止掉哪个；
                    
                    if(currentCollapse.length){
                        this.disabledSortable(this.sorTableObjs.currentListObjs,true);
                    }else{
                        this.disabledSortable(this.sorTableObjs.deptSorTableObj["dept"+this.deptNativeIndex],true);
                    }
                }
            }else{
                // // 取消``
                // console.log('取消');
                // this.isShow = false;
                // $(event.target).siblings().removeClass("active");
                // if(this.editStart){
                //     this.editStart = false;
                //     $("#accordion .active").removeClass("active");
                //     this.disabledSortable(this.sorTableObjs.deptSorTableObj,true);
                //     this.disabledSortable(this.sorTableObjs.currentListObjs,true);
                // }
            }
            // 在这里判断，然后在下面判断禁止掉一个，后续点击手风琴就不需要判断重新生成实例了
            // if(currentCollapse.length){
            //     this.disabledSortable(this.sorTableObjs.deptSorTableObj["dept"+this.deptNativeIndex],true);
            // }else{
            //     if(this.sorTableObjs.currentListObjs){
            //         this.disabledSortable(this.sorTableObjs.currentListObjs,true);
            //     }
            // }
        },  
        // 更改机构
        changeDept:function(event) {
            $(event.target).addClass("active").siblings().removeClass("active");
            this.deptNativeIndex = $(event.target).index();
            $('.panel-group .panel-collapse').collapse('hide');

            if($("div[aria-expanded=true]").length){
                // 收起时还有其他的展开
                // 不传或者穿false；为恢复拖动
                this.disabledSortable(this.sorTableObjs.currentListObjs);
                this.disabledSortable(this.sorTableObjs.deptSorTableObj["dept"+this.deptNativeIndex],true);
            }else{
                // 收起时没有其他的展开
                // 不传或者穿false；为恢复拖动
                this.disabledSortable(this.sorTableObjs.currentListObjs,true);
                this.disabledSortable(this.sorTableObjs.deptSorTableObj["dept"+this.deptNativeIndex]);
            };
        },
        // 重命名
        renameFn:function(event){
            var element = event.target;
            var elementPrev = element.previousElementSibling;
            var editInput = elementPrev.querySelector(".editInput");
            editInput.setAttribute("readonly",false);
            // 输入框
            var validTextOptions = {
                minLength: 1,
                maxLength: 50,
                showTipIndex: 40,
                allow: escape('[^\\w?!,.，。~]')
            }
            var userAgent = navigator.userAgent; 
            if(userAgent.indexOf('Android')>=0) {
                //   android
                console.log("focus");
                editInput.focus();
                editInput.setAttribute("autofocus",'autofocus');
            }else if(userAgent.indexOf('iPhone')>=0) {
                // ios
                console.log("prompt");
                var setPrompt = prompt(JSON.stringify(validTextOptions),'请输入部门名称');
                if(setPrompt){
                    // 等同于发送按钮
                    
                }else{
                    // 等同于点击遮罩层
                    
                }
            }

            console.dir(elementPrev.querySelector(".editInput"));
            console.log('重命名 = ', event.target);
        },
        // 创建拖拽列表实例
        runSortable:function(option){
            
            var SortableObj = Sortable.create(option.el,{
                draggable: option.draggable||"",   // 定义哪些列表单元可以进行拖放
                forceFallback:true,
                fallbackClass:"fallbackClass",
                // delay:200,    // 长按时间
                // 拖拽元素被选中的回调函数
                onChoose:function(event) {
                    // console.log("sortable onChoose");
                },
                // 拖拽元素拖动开始的回调函数
                onStart:function(event){
                    // 判断滑动的列表高度，如果超出就可以滚动，反之禁止滚动
                    var lis = $("li",event.target).length;
                    var liH = $("li",event.target).height();
                    var maxH = parseInt($(event.target).css("max-height"));
                    this.options.scroll = (liH*lis)<=maxH?false:true;
                },
                // 排序发生变化后的回调函数
                onUpdate:function (event){
                    // console.log("sortable onUpdate");
                },
                // 拖放结束后的回调函数
                onEnd:function(event) {
                    // console.log("sortable onEnd");
                }
            });
            if(option.key == 'deptSorTableObj'){
                app.$set(this.sorTableObjs.deptSorTableObj,"dept"+option.index,SortableObj);
            }else{
                app.$set(this.sorTableObjs,option.key,SortableObj);
            }
        },
        // 拖动功能的 禁止和启动
        // 不传或者穿false；为恢复拖动
        // 传true或者其他真值：为禁止拖动
        disabledSortable:function(obj,start){
            if(obj) obj.options.disabled = start?true:false;
        },
        // 销毁拖动
        destroy:function (obj) {
            obj.destroy();
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
        },
    }
});

