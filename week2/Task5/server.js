"use strict"

const http = require("http");

http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Welcome to YouTube Music!");
}).listen(8080);

console.log("Server started at port 8080");