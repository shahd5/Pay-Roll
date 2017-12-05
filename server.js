var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
const sql = require("./mysqlconn");


var userid ;

var dbData=[{
    term:"RIP",
    defined:"To move a mountain"
    },{
        term:"ASAP",
        defined:"To move a ASAP"
    }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
    console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});


app.use(express.static("./public"));


app.use("/login",function(req,res){
    fs.readFile("./public/views.html","UTF-8",function(err,html){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(html);
    });
});

app.get("/viewtimesheet",function(req,res){
    res.json(dbData);
    
});

app.post("/submittimein",function(req,res){
    var a = req.body;
    console.log(a.timein);
    var timein = new Date(a.timein);
    console.log(timein.getMilliseconds()+"  "+timein.getHours()+"  "+timein.getMinutes()+"  "+timein.getSeconds());
    console.log("This is the userid:"+userid);
    sql.two(userid,timein);
    res.end(sql.three(userid,new Date()).toString());
});



app.post("/authentication",function(req,res){
    var a = req.body;
    console.log(a.userid+"  "+a.pass);
    console.log("hope");
    var x = sql.one(a.userid,a.pass).toString();
    if(x =="true"){
        userid = a.userid;
    }
    console.log("This is the userid:"+userid);
    res.end(x);
});

app.get("/submittimeincheck",function(req,res){
    res.end(sql.three(userid,new Date()).toString());
});

app.get("/lunchincheck",function(req,res){
    res.end(sql.four(userid,new Date()).toString());
});


app.listen(3000);


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
module.exports = app;

