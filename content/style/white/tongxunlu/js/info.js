$(function(argument) {
    // body...

    /**
     * [info.html]
     * @type {Vue} infoApp
     */
    var componentTel = {
        props: ["tel"],
        template: '<li class="smart-list-item" v-bind:type=phoneType><p>{{tel.No}}</p><a href="sms:tel.No" v-if="tel.PhoneType == 1"></a></li>',
        computed: {
            phoneType: function(event) {
                // console.log(event.tel.No);
                // console.log(event.tel.PhoneType);
                return event.tel.PhoneType == 1 ? "mobile" : "fixed"
            }
        },
        methods: {

        }
    }
    var infoApp = new Vue({
        el: "#info-app",
        data: {
            info: {}, // 详细信息
            headerImg: "../../content/style/white/tongxunlu/images/default.png",
            name: "张三",
            department: "中科院下属住户委员会，街道办事处，",
            deptName: "副处长",
            email: " ",
            clipboard: ""
        },
        components: {
            'component-tel': componentTel
        },
        watch: {
            info: function(argument) {
                console.log(this.info)
            },
        },
        mounted: function() {
            
        },
        methods: {
        }
    });

    var url = window.location.href;
    var val = JSON.parse(decodeURI(url.split(window.location.origin + window.location.pathname)[1].split("=")[1]));
    infoApp.info = val;
    console.log(val)

    var btn = document.querySelector('.copyBtn');
    var clipboard = new Clipboard(btn);
    clipboard.on('success', function(e) {
        console.log(e);
    });
    clipboard.on('error', function(e) {
        console.log(e);
    });
})