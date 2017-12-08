var getDate;
var state = true;
function html(data) {
  return `<li class="smart-QA-container">
              <div class="smart-QA-box smart-border-bottom">
                  <div class="smart-Q">
                      <p>${data.problem}</p>
                      <div class="clearfix"><em state="${data.state?'replies':' '}">${data.state?'已回复':'等待回复'}</em><em>${data.time}</em></div>
                  </div>
                  ${data.state?(function(){
                    return `<div class="smart-A">
                              <p>${data.replies}</p>
                          </div>`
                  })():''}
                  
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
            time:e.time
        }
    })
}

// scroll 事件
var option = {
    id: "wrapper",
    pullDown: function() {
        wrapper.refresh();
    },
    pullUp: function() {
        console.log(state)
        if(state){
          state = false;
          console.log("加载 ... ");
          setTimeout(function() { 
              getAjaxList({
                url:"http://localhost:3000/",
                data: {
                  type:"data_3",
                },
              },function(data){
                
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
    }
}

loadMore.scroll(option);


function getAjaxList(option,callback,failCallBack){
  if(option.url){
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
  }else{
    // 本地测试用；可以删除
     var data = {
      data: [{
          q: "就是一个常量，scale和alpha都是要根据z轴来调整的In the example shown here, the constructor accepts a string that represent the superclass name.",
          a: "I add a string name and port class variable and then two functions: a constructor and the server.",
          state: true,
          time:"2017/12/12 12:12"
      },
      {
        q: "jsDelivr CDN 的 https://cdn.jsdelivr.net/npm/vue 默认文件就是运行时 + 编译器的 UMD 构建 (vue.js)。 ",
        a: "",
        state: false,
        time:"2017/13/13 13:13"
      }
      ]
    }
    getDate = myMap(data.data);
    for (var i = 0; i < getDate.length; i++) {
        $("#wrapper ul").append(html(getDate[i]));
    }
  }
}
// 第一次进入页面加载；
getAjaxList({
  url:"",
  data: {
    type:"data_3",
  },
},function(data){
  getDate = myMap(data.data);
  for (var i = 0; i < getDate.length; i++) {
      $("#wrapper ul").append(html(getDate[i]));
  }
},function(){
  // failCallBack
  console.log(01);
})