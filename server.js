var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
const sql = require("./mysqlconn");


var userid ;
//var manager;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(function(req,res,next){
   // console.log(`${req.method} request for ${req.url} - ${JSON.stringify(req.body)}`);
    next();
});


app.use(express.static("./public"));


app.use("/login",function(req,res){
    fs.readFile("./public/views.html","UTF-8",function(err,html){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(html);
    });
});

app.post("/authentication",function(req,res){
    var a = req.body;
    var x = sql.one(a.userid,a.pass).toString();
    if(x =="true"){
        userid = a.userid;        
    }
    res.end(x);
});

app.get("/viewtimesheet",function(req,res){

    var dbData = sql.five(userid);    
    res.json(dbData);
    
});

app.post("/submittimein",function(req,res){
    var a = req.body;
    var timein = new Date(a.timein);
    sql.four(userid,timein.getHours()+":"+timein.getMinutes());
    res.end("");
});

app.post("/submitlunchin",function(req,res){
    var a = req.body;
    var timein = new Date(a.timein);
    sql.two("lunchin",userid,timein.getHours()+":"+timein.getMinutes());
    res.end("");
});

app.post("/submitlunchout",function(req,res){
    var a = req.body;
    var timein = new Date(a.timein);
    sql.two("lunchout",userid,timein.getHours()+":"+timein.getMinutes());
    res.end("");
});

app.post("/submittimeout",function(req,res){
    var a = req.body;
    var timein = new Date(a.timein);
    sql.two("timeout",userid,timein.getHours()+":"+timein.getMinutes());
    res.end("");
});





app.get("/submittimeincheck",function(req,res){
    res.end(sql.three("timein",userid,new Date()).toString());
});
//make changes for all below
app.get("/lunchincheck",function(req,res){
    res.end(sql.three("lunchin",userid,new Date()).toString());
});

app.get("/lunchoutcheck",function(req,res){
    res.end(sql.three("lunchout",userid,new Date()).toString());
});

app.get("/timeoutcheck",function(req,res){
    res.end(sql.three("timeout",userid,new Date()).toString());
});

app.listen(3000);





console.log("server running on port 3000");
module.exports = app;

