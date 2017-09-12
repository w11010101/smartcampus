var loadMore = function () {
    var self = this;
    this.scroll = function (option){
        // 下拉
        var pullDown = typeof option.pullDown == "string"?function (){
            // 传入时 refresh 字符串
            self.Refresh();
        }:option.pullDown;
        // 上拉
        var pullUp = typeof option.pullUp == "string"?function (){
            // 传入时 refresh 字符串
            self.Refresh();
        }:option.pullUp;

        refresher.init({
            id: option.id,
            pullDownAction: pullDown,
            pullUpAction: pullUp,
        });
        // option.pullDown()
    }    
    var generatedCount = 0;
    // 重置
    this.Refresh = function (){
        wrapper.refresh()
    }

}
var loadMore = new loadMore();