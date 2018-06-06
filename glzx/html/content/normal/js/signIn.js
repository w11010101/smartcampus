// 多选 ---------------------------------------
$(".form-group").selectCheckbox({
    ele:".checkbox-inline",
    selectType:"levelSelect",
    onclickCB:function(){
        console.log(arguments)
    }
});
// 登陆
$(".signIn-btn").on("click",function(event){

    event.preventDefault();

    $('.sigIn-box').hide(0).siblings().show(0);

});
// 允许
$(".sure-btn").on("click",function(event){

    console.log('允许')

});
// 取消
$(".cancel-btn").on("click",function(event){

    console.log('取消')

});