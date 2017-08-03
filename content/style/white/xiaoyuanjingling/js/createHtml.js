var createChatHtml = {
    // className
    containerLeft: "smart-xyjl-chat-left",
    containerRight: "smart-xyjl-chat-right",
    iconLeft: "smart-xyjl-chat-left-icon",
    iconRight: "smart-xyjl-chat-right-icon",
    headerName: "smart-xyjl-chat-header",
    // 图片地址
    header: "../../content/style/white/xiaoyuanjingling/images/head.png",
    map: "../../content/style/white/xiaoyuanjingling/images/map.png",
    // 创建 chat 容器
    createContainer: function(data) {
        // type = left or right ;
        var type = data.peopleType;
        var show = type == "left" ? true : false;
        var containerName = type == "left" ? this.containerLeft : this.containerRight;
        var icon = type == "left" ? this.iconLeft : this.iconRight;

        var html = '<div class="' + containerName + '">' + this.createHeader(show);
        html += '<div class="smart-xyjl-chat-box"><em class="' + icon + '"></em>';
        html += '<div class="smart-xyjl-chat-content"><p>' + data.content + '</p>';
        html += this.similarQuries(data);
        html += this.createQAContinue(data);
        html += '</div></div>';
        html += this.createQAEnd(data) + '</div>';
        // return html;
        $(".smart-xyjl-chat-container").append(html);
        setTimeout(function (){
            $(".smart-xyjl-chat-container>div:last-child").addClass("smart-xyjl-chat-show");
        },500)
        
        // return 
    },
    // 创建头像
    createHeader: function(show) {
        var html = '<div class="' + this.headerName + '"><img src="' + this.header + '"></div>';
        return show ? html : "";
    },
    // 类似问题（循环显示）
    similarQuries: function(data) {
        var QuriesArr = data.similarQuries;
        if (!QuriesArr) return false;
        var html = '<h1 class="smart-xyjl-chat-similarQuries">【 类似问题 】</h1>';
        var that = this;
        for (var i in QuriesArr) {
            console.log(QuriesArr[i]);
            html += that.createQA(QuriesArr[i]);
            html += that.createMap(QuriesArr[i]);
        }
        return html;
    },
    // 创建电话
    createTel: function(quriesData) {
        var html = '<a href="tel:' + quriesData.tel + '" atype="tel">' + quriesData.tel + '</a>';
        return quriesData.tel ? html : "";
    },
    // 创建地图
    createMap: function(quriesData) {
        if (!quriesData.map) return false;
        var html = '<img src="' + this.map + '" class="other-app" onclick="createChatHtml.showMap(' + quriesData.mapX + "," + quriesData.mapY + ');">';
        return html;
    },
    // 创建问答dom
    createQA: function(quriesData) {
        var html = `<div class="smart-xyjl-chat-QA">
                    <p class="smart-xyjl-chat-Q">` + quriesData.QContent + `</p>
                    <p class="smart-xyjl-chat-A">` + quriesData.AContent;
        // 添加电话
        html += this.createTel(quriesData) + '</p></div>';
        return html;
    },
    // 创建继续问题
    createQAContinue: function(data) {
        var html = '<div class="smart-xyjl-chat-continue"><button onclick="createChatHtml.waitBtn(this)">等待回复</button><button onclick="createChatHtml.continueBtn()">继续提问</button></div>';
        return data.QAContinue ? html : "";
    },
    // 创建问题结束
    createQAEnd: function(data) {
        var html = '<div class="smart-xyjl-chat-end"><button onclick="createChatHtml.chatEnd()">不聊了~</button><button onclick="createChatHtml.continueBtn()">继续提问</button></div>';
        return data.QAEnd ? html : "";
    },
    // 不聊了
    chatEnd: function() {
        window.location.href = "index.html";
    },
    // 等待回复 按钮 事件
    waitBtn: function(obj) {
        createChatHtml.createContainer(data3);
        $(obj).attr("disabled", true);
        setTimeout(function(){
            createChatHtml.createContainer(data4);
        },2000);
    },
    // 继续提问 按钮 事件
    continueBtn: function() {
        window.location.href = "search.html";
    },
    // 点击地图事件
    showMap: function(x, y) {
        $("body").append('<div id="smart-map"></div>');
        window.location.href = "bmap.html?x=" + x + "&y=" + y;
    }
}