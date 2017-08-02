// // queries 
// console.log(queries);
// var queriesArr;
// function arr(){
//    setTimeout(function(){
//       queriesArr = queries;
//    },2000);
//    console.log(queriesArr);
//    return queriesArr;
// }


// $('.smart-search-box input').autocomplete({
//    // lookup:arr(),
//    lookup:queries,
//    // source:queries,

//    appendTo: '#suggestions-container',
//    width: "100%",
//    minChars: 2,
//    lookupFilter:function (suggestion, originalQuery, queryLowerCase){
//       console.log(suggestion);
//       console.log(originalQuery);
//       console.log(queryLowerCase);
//    }
// });


// $('.smart-search-box input').autocomplete({
//    serviceUrl: '/autocomplete/countries',
//    onSelect: function (suggestion) {
//       alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
//    }
// });
// queries

$('.smart-search-box input').autocomplete({
   source:queries,
   minLength:2,
   change:function (event,ui){
      console.log(event);
      console.log(ui);
   },
   search:function (a,b){
      // console.log(a);
      // console.log(b);
   }
});




// // 监听input keyup
// $('.smart-search-box input').on("keyup", function() {
//     this.value ? $(this).next().text("取消") : $(this).next().text("搜索")
// });
// // 监听input blur
// $('.smart-search-box input').on("blur", function() {
//     this.value ? $(this).next().text("搜索") : $(this).next().text("取消")
// });