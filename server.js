var http = require("http");
var fs = require("fs");
var path = require("path");

// http.createServer(function(req,res){
//     console.log(`${req.method} request for ${req.url}`);
//     if(req.method ==="GET"){
//         if(req.url ==="/"){
//             fs.readFile("./public/view.html","UTF-8",function(err,html){
//                 res.writeHead(200,{"Content-Type":"text/html"});
//                 res.end(html);
//             });
//         }else if(req.url ==="/viewtimesheet"){
//             res.end("hello  world");
//         }else{
//             res.writeHead(404,{"Content-Type":"text/plain"});
//             res.end("404 File not found");
//         }
//     }else if(req.method ==="POST"){
//         var body = "";
//         req.on("data",function(chunk){
//             body += chunk;
//         });
//         req.on("end",function(){
//             fs.readFile("./public/index.html","UTF-8",function(err,html){
//                 res.writeHead(200,{"Content-Type":"text/html"});
//                 res.end(html);
//             });
//         });
//     }
    
// }).listen(3000);



console.log("server running on port 3000");

