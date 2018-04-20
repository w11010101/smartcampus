var http = require("http");
var fs = require("fs");
var url = require("url");
var express = require("express");
var app = express();

// 创建服务器

console.log(__dirname)
app.use(express.static(__dirname));
// app.use(express.static("content"));
app.use(express.static("js"));
app.use(express.static("css"));

app.get("/index",function(request,response){
    response.sendFile(__dirname+"/views/index.html");
});

var server = app.listen("8081",function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});


