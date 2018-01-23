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
    props:["edit"],
    template:'<div class="mail-list-btn"><a href="#n" class="editToolBtn"></a><button v-on:click="delFn" class="delBtn"></button></div>',
    methods:{
        delFn:function (event) {
            // 删除联系人
            $(event.target).parents(".mail-list-info").parent().remove();
        }
    }
}
// var deptItemsObj = {
//     props:["deptItem",'defaultImg'],
//     template:'<li class="smart-sub-list-item" v-for="sub in deptItem">{{sub}}</li>',
//     // template:'<li class="smart-sub-list-item" v-for="item in deptItem">\
//     //         <img v-bind:src="defaultImg" class="mail-list-img">\
//     //         <div class="mail-list-info">\
//     //             <div class="mail-list-name">\
//     //                 <h2>李四</h2>\
//     //                 <p>办公室</p>\
//     //             </div>\
//     //             <em class="smart-list-end-icon">\
//     //                 <img src="../../content/style/white/tongxunlu/images/sortable.png" alt="">\
//     //             </em>\
//     //         </div>\
//     //     </li>',
//     methods:{
//         // delFn:function (event) {
//         //     // 删除联系人
//         //     $(event.target).parents(".mail-list-info").parent().remove();
//         // }
//     }    
// }
// vuejs 实例app
var app = new Vue({
    el: '#app',
    data: {
        mailList:{},        // 联系人对象，渲染选项卡第1页
        capArr:[],          // 
        deptNative:[{Items:[]}],      // 部门原生对象
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
    },
    components:{
        'communication-box':communicationObj,
        'edit-box':editToolObj,
        // 'dept-items':deptItemsObj
    },
    watch: {
        // 观察
        mailList:function(val){
            setTimeout(function(){
                runTabSwiper();
                $('.mail-list').sliderNav({
                    arrows:false,
                    height:$(".swiper-container").height()
                });
            },200);
        },
        capArr:function(){

        },
        deptNative:function(){
            console.log("deptNative");
            setTimeout(function (argument) {
                // 手风琴监听事件
                $('.panel-group').on('show.bs.collapse', function(e) {
                    $("#accordion .smart-active").removeClass("active");
                    $(e.target).prev().addClass("smart-active");
                });

                $('.panel-group').on('hide.bs.collapse', function(e) {
                    $(e.target).prev().toggleClass("smart-active");
                });
            },200)
        },
        deptsObj:function(){
            console.log("deptsObj");
        }
    },
    computed: {
        // 计算
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
    methods: {
        // 方法
        changeEditStartFn:function(event){
            if($(event.target).text() === "编辑"){
                this.editStart = true;
                $(event.target).addClass("active").siblings().removeClass("active");
            }else{
                this.editStart = false;
                $(event.target).siblings().removeClass("active");
            }
        },
        changeDept:function(event) {
            $(event.target).addClass("active").siblings().removeClass("active");
            console.log("changeDept = ", event.target);
        }
    }
});
