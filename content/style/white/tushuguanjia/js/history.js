var getDate;
var state = true;
var data = {
    "data": [
    {
        "q": "就是一个常量，scale和alpha都是要根据z轴来调整的In the example shown here, the constructor accepts a string that represent the superclass name.",
        "a": "I add a string name and port class variable and then two functions: a constructor and the server.",
        "state": true,
        "time": "2017/12/12 12:12"
    },
    {
        "q": "美呆了!95后小伙耗时3年在游戏中打造虚拟故宫 ---15年后,当“95后”苏一峻带着他们团队的“微缩紫禁城”模型来到故宫展览时,他把自己对于故宫的“.. ",
        "a": "",
        "state": false,
        "time": "2017/13/13 13:13"
    }]
}
function html(data) {
    return `<li class="smart-history-container">
              <div class="smart-history-box smart-border-bottom">
                  <div class="smart-history-content">
                      <h1>明朝那些事儿</h1>
                      <p>${data.problem}</p>
                      <div class=""><em>${data.time}</em><em>${data.time}</em></div>
                  </div>
              </div>
          </li>`;
}
// 数据格式转换
function myMap(data) {
    return $.map(data, function(e, i) {
        return {
            problem: e.q,
            replies: e.a,
            state: e.state,
            time: e.time
        }
    })
}

// scroll 事件
var scrolls = refresher.init({
    id: "wrapper",
    pullDownAction: function (){
       
        wrapper.refresh();
    },
    pullUpAction: function (){
        console.log(state)
        if (state) {
            state = false;
            console.log("加载 ... ");
            setTimeout(function() {
                getAjaxList({
                    url: "http://localhost:3000/",
                    data: {
                        type: "data_3",
                    },
                }, function(data) {
                    // success
                    var getDate = myMap(data.data);

                    for (var i = 0; i < getDate.length; i++) {
                        console.log(getDate[i])
                        $("#wrapper ul").append(html(getDate[i]));
                    }
                    wrapper.refresh();
                    state = true;
                },function(){
                    // fail
                    console.warn("%c 本地测试用；data为假数据","color:red;font-size:20px;background:url(../images/img-1.jpg)");

                    var getDate = myMap(data.data);
                    for (var i = 0; i < getDate.length; i++) {
                        console.log(getDate[i])
                        $("#wrapper ul").append(html(getDate[i]));
                    }
                    wrapper.refresh();
                    state = true;
                });

            }, 1000);
        }
    },
    preventDefault:false
});
console.warn("%c", "display:block;width:200px;height:100px;padding:100px;font-size:41px;background:url('http://www.gzplusminus.com/uploadfile/2013/1021/20131021115337927.jpg') no-repeat;background-size:100%");
function getAjaxList(option, callback, failCallBack) {
    if (option.url) {
        $.ajax({
            type: "POST",
            url: option.url,
            data: option.data,
            dataType: "json",
            success: function(data) {
                callback(data);
            },
            error: function(err) {
                failCallBack("error = " + JSON.stringify(err));
            }
        })
    } else {
        // 本地测试用；可以删除
        getDate = myMap(data.data);
        for (var i = 0; i < getDate.length; i++) {
            $("#wrapper ul").append(html(getDate[i]));
        }
    }
}
// 第一次进入页面加载；
getAjaxList({
    url: "",
    data: {
        type: "data_3",
    },
}, function(data) {
    getDate = myMap(data.data);
    for (var i = 0; i < getDate.length; i++) {
        $("#wrapper ul").append(html(getDate[i]));
    }
}, function() {
    // failCallBack
    console.log(01);
});
