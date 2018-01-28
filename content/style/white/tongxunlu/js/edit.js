/**
 * [edit.html]
 * @type {Vue} editApp
 */
var componentTel = {
    props: ["tel"],
    // template:'<li class="smart-list-item" v-bind:type=phoneType><p>{{tel.No}}</p><a href="sms:tel.No" v-if="tel.PhoneType == 1"></a></li>',
    template: '<div class="phones">\
                <a class="delBtn" @click=subDelTelFn></a>\
                <label>{{judgeLabel}}</label>\
                <input type="text" placeholder="电话" @keyup="subInputInFn" v-model=tel.No :reType="judgeReType">\
                <a class="setDefaultNo" v-if=!tel.IsDefault @click="subSetDefault">设为默认</a></div>',
    computed: {
        judgeReType: function(event) {
            return event.tel.PhoneType == 1 ? "phone" : "fixed";
        },
        judgeLabel: function(event) {
            return event.tel.PhoneType == 1 ? "手机" : "座机";
        }
    },
    methods: {
        subInputInFn: function(event) {
            editApp.inputInFn(event);
        },
        subDelTelFn: function(event) {
            editApp.delTelFn(event);
        },
        subSetDefault: function(event) {
            editApp.setDefault(event);
        },
    }
}
var componentTelNo = {
    props: ["tel"],
    data: function() {
        return {
            label: "手机",
            judgeReType: "phone",
            PhoneType: 1
        }
    },
    template: '<div class="phones">\
                <a class="delBtn" @click=subDelTelFn></a>\
                <label>{{label}}</label>\
                <input type="text" placeholder="电话" @keyup="subInputInFn" v-model=tel.No :reType=judgeReType >\
                <a class="setDefaultNo" v-if=tel.IsDefault @click="subSetDefault">设为默认</a>\
                </div>',
    watch: {
        judgeReType: function(event) {
            console.log(this.tel);

            this.judgeReType = this.tel.PhoneType == 1 ? "phone" : "fixed";
        }
    },
    methods: {
        subInputInFn: function(event) {
            var element = event.target;
            var val = element.value;
            if (val.length == 11) {
                if (val.match(editApp.re.phone)) {
                    this.label = "手机";
                    this.judgeReType = "phone";
                    this.tel.PhoneType = 1;
                }
            } else if (val.length > 11) {
                if (val.match(editApp.re.fixed)) {
                    this.label = "座机";
                    this.judgeReType = "fixed";
                    this.tel.PhoneType = 2;
                }
            }
            editApp.inputInFn(event);
        },
        subDelTelFn: function(event) {
            editApp.delTelFn(event);
        },
        subSetDefault: function(event) {
            editApp.setDefault(event);
        },
    }
}
var editApp = new Vue({
    el: "#edit-app",
    data: {
        info: {}, // 详细信息
        isInfo: false, // 是否有详细信息（ 控制组建 componentTel 和 componentTelNo ）
        isCreatePerson: false, // 是否是新建联系人（ 控制底部按钮 ）
        pickerOrgData: [], // 下拉选择机构的集合
        currentOrgId: null, // 当前选择机构id
        pickerOffceData: {}, // 下拉选择办公室的集合
        currentOffceId: null, // 当前选择办公室id
        currentOrgName: "选择机构", // 当前选择机构名字
        currentOffceName: "办公室", // 当前选择办公室名字
        // 第二种形式
        // currentOrgText:"选择机构",
        // currentOffceText:"办公室",
        // pickerData:{},  
        pickerObjs: {}, // 下拉实例
        tipsState: false, // 提示信息状态 false：为不现实； true：为显示
        tipsText: "请先选择机构", // 提示信息状态内容
        header: "", // 选择头像
        // phoneType:"手机",   
        addPhones: [{ // 添加手机集合，默认给一组
            IsDefault: false,
            No: "",
            PhoneType: "1"
        }],
        re: { // 正则表达式
            name: /[\u4e00-\u9fa5a-zA-Z]{1,6}/, // 姓名 中文+字母，最多6个字
            job: /[\u4e00-\u9fa5a-zA-Z]{1,16}/, // 职位 中文+字母，最多16个字
            phone: /0?(13|14|15|18)[0-9]{9}/, // 手机 
            fixed: /[0-9-()（）]{7,18}/, // 座机
            email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, // 邮件
            address: /[\u4e00-\u9fa5\w]/, // 地址
            subject: /[\u4e00-\u9fa5\w]/ // 学科
        },
        mandatory: ["name", "org", "offce"], // 必填项，className,
        isMandatory: 0, // 必填项是否填写完，目前必填项是3个
        isDisabled: true, // 禁止
    },
    components: {
        'component-tel': componentTel,
        'component-telno': componentTelNo
    },
    watch: {
        // 观察机构数据
        pickerOrgData: function(argument) {
            this.pickerFn(argument, "org");
        },
        tipsState: function(argument) {
            var _this = this;
            if (this.tipsState) {
                setTimeout(function() {
                    _this.tipsState = false;
                }, 1500);
            }
        }
    },
    computed: {},
    methods: {
        // 创建picker实例
        pickerFn: function(argument, type) {
            var picker = new mui.PopPicker();
            var setData = "";
            if (type == "offce") {
                setData = this.pickerOffceData["DeptType" + this.currentOrgId];
            } else {
                setData = argument;
            }
            picker.setData(argument);
            this.pickerObjs[type] = picker;
        },
        // 显示 picker 下拉输入框选择
        pickerShow: function(event) {
            var _this = this;
            var element = event.target;
            var type = element.className;
            if (type == "offce") {
                if (!this.currentOrgId) {
                    this.tipsState = true;
                    return false;
                } else {
                    this.pickerFn(this.pickerOffceData["DeptType" + this.currentOrgId], "offce");
                }
            }
            this.pickerObjs[type].show(function(items) {
                console.log("items[0] = ", items[0]);
                element.value = items[0].text;
                if (type == "offce") {
                    // 办公室
                    _this.currentOffceId = items[0].value;
                    _this.currentOffceName = items[0].text;
                } else {
                    // 机构
                    _this.currentOrgId = items[0].value;
                    _this.currentOrgName = items[0].text;
                    // 重置办公室
                    _this.currentOffceId = "";
                    _this.currentOffceName = "办公室";

                }
            });
        },
        // 隐藏 picker
        pickerHide: function(event) {
            this.pickerObjs[event.target.className].hide();
        },
        // 添加电话
        addTelFn: function(argument) {
            var phones = document.querySelectorAll(".phones");
            console.log(phones.length);
            if (phones.length < 3) {
                this.addPhones.push({
                    IsDefault: false,
                    No: "",
                    PhoneType: "1"
                })
            } else {
                this.tipsState = true;
                this.tipsText = '最多添加3个';
            }
        },
        // 删除电话
        delTelFn: function(event) {
            console.log('删除电话 = ', event.target);
            console.log(event.target.parentElement)
            // this.addPhones
        },
        // 添加头像
        changeHead: function(event) {
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
        inputInFn: function(event) {
            var element = event.target;
            var reType = element.getAttribute("reType");
            var val = element.value;

            if (val.match(this.re[reType])) {
                // 有效
                element.value = val.match(this.re[reType])[0];
            } else {
                // 无效
                // element.value = element.value.match(this.re[reType]);
            }
        },
        // 设置默认
        setDefault: function(event) {
            var TelNos = editApp.info.TelNos;
            for (e in TelNos) {
                if (TelNos[e].No == event.target.previousElementSibling.value) {
                    editApp.info.TelNos[e].IsDefault = true
                } else {
                    editApp.info.TelNos[e].IsDefault = false;
                }
            }
            console.log('设置默认 = ',TelNos);
        },
        // 删除联系人
        delPersonFn: function(event) {
            console.log('删除联系人 = ', event.target);
        },
        // 提交按钮
        submitFn: function() {

            // console.log('提交按钮 = ' ,event.target);
            // for(var e in this.mandatory){
            //     var el = document.querySelector("."+this.mandatory[e])
            //     console.log(el.value)
            //     if(!el.value || !el.getAttribute("setId")){
            //         console.log('提交失败');
            //          console.log(el);
            //     }
            // }
        }
    }
});