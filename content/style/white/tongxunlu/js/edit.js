/**
 * [edit.html]
 * @type {Vue} editApp
 */
var componentTel = {
    props:["tel"],
    // template:'<li class="smart-list-item" v-bind:type=phoneType><p>{{tel.No}}</p><a href="sms:tel.No" v-if="tel.PhoneType == 1"></a></li>',
    template:'<div class="phones"><label>{{judgeLabel}}</label><input type="text" placeholder="电话" @keyup="subInputInFn" v-model=tel.No :reType="judgeReType"><button class="setDefaultNo" v-if=!tel.IsDefault>设为默认</button></div>',
    computed:{
        judgeReType:function(event){
            return event.tel.PhoneType == 1?"phone":"fixed";
        },
        judgeLabel:function(event){
            return event.tel.PhoneType == 1?"手机":"座机";
        },

        // phoneType:function (event) {
        //     // console.log(event.tel.No);
        //     // console.log(event.tel.PhoneType);
        //     return event.tel.PhoneType == 1?"mobile":"fixed"
        // }
    },
    methods:{
        subInputInFn:function(event){
            editApp.inputInFn(event);
        }
    }
}
var editApp = new Vue({
    el: "#edit-app",
    data: {
        info: {}, // 详细信息
        pickerOrgData:[],
        currentOrgId:null,
        pickerOffceData:{},
        currentOffceId:null,
        currentOrgName:"",
        // 第二种形式
        // currentOrgText:"选择机构",
        // currentOffceText:"办公室",
        pickerData:{},
        pickerObjs:{},
        tipsState:false,
        tipsText:"请先选择机构",
        header:"",
        phoneType:"手机",

        re:{    // 正则表达式
            name:/[\u4e00-\u9fa5a-zA-Z]{1,6}/,   // 中文，最多6个
            job:/[\u4e00-\u9fa5a-zA-Z]{1,16}/,
            phone:/0?(13|14|15|18)[0-9]{9}/,
            fixed:/[0-9-()（）]{7,18}/,
            email:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            jobAddress:/[\u4e00-\u9fa5\w]/,
            subject:/[\u4e00-\u9fa5\w]/
        }
    },
    components:{
        'component-tel':componentTel
    },
    watch: {
        // 观察机构数据
    	pickerOrgData:function (argument) {
    		this.pickerFn(argument,"org");
    	},
        tipsState:function (argument) {
            var _this = this;
            if(this.tipsState){
                setTimeout(function(){
                    _this.tipsState = false;
                },1500);
            }
        }
    },
    computed:{
    },
    methods: {
        // 创建picker实例
    	pickerFn:function (argument,type){
            var picker = new mui.PopPicker();
            var setData = "";
            if(type == "offce"){
                setData = this.pickerOffceData["DeptType"+this.currentOrgId];
            }else{
                setData = argument;
            }
            picker.setData(argument);
            this.pickerObjs[type] = picker;
    	},
        // 显示 picker
    	pickerShow:function (event) {
            var _this = this;
            var element = event.target;
            var type = element.className;
            if(type == "offce"){
                if(!this.currentOrgId){
                    this.tipsState = true;
                    return false;
                }else{
                    this.pickerFn(this.pickerOffceData["DeptType"+this.currentOrgId],"offce");
                }
            }
			this.pickerObjs[type].show(function(items) {
                console.log("items[0] = ", items[0]);
                element.value = items[0].text;
                element.setAttribute('setId',items[0].value); 
                _this.currentOrgId =  items[0].value;
                // 第二种形式
                // if(type == "offce"){
                //     // 办公室
                //     _this.currentOffceId =  items[0].value;
                //     _this.currentOffceText = items[0].text;
                // }else{
                //     // 机构
                //     _this.currentOrgId =  items[0].value;
                //     _this.currentOrgText = items[0].text;
                // }
            });
    	},
        // 隐藏 picker
    	pickerHide:function (event) {
    		this.pickerObjs[event.target.className].hide();
    	},
        // 添加电话
        addTelFn:function (argument) {
            var phones = document.querySelectorAll(".phones");

            if(phones<3){

            }
        },
        // 添加头像
        changeHead:function (event) {
            this.header = getObjectURL(event.target.files[0]);
            function getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) { // basic
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            }
        },
        // 输入
        inputInFn:function(event){
            console.log(1)
            var element = event.target;
            var reType = element.getAttribute("reType");

            if(element.value.match(this.re[reType])){
                element.value = element.value.match(this.re[reType])[0]
            }else{
                // element.value = element.value.match(this.re[reType]);
            }
        },
        // 删除联系人
        delPersonFn:function(){

        }
    }
});