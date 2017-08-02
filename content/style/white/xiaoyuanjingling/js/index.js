// queries 
console.log(queries);
$('.smart-search-box input').autocomplete({
    lookup: queries,
    appendTo: '#suggestions-container',
    width:"100%",
    minChars:2
});
// 监听input keyup
$('.smart-search-box input').on("keyup",function(){
   this.value?$(this).next().text("取消"):$(this).next().text("搜索")
});
// 监听input blur
$('.smart-search-box input').on("blur",function(){
   this.value?$(this).next().text("搜索"):$(this).next().text("取消")
});