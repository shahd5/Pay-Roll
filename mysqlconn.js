var bodyParser = require("body-parser");

var mysql = require('mysql');
var sync = require('sync-sql');








var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456789",
  database: "mydb"
});

con.connect(function(err){
  if(err){
    throw err;
  }
});


var client = mysql.createConnection("127.0.0.1","root","123456789","mybd");

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = `SELECT * FROM user WHERE id = 'abcde'`;
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log(result[0].ID);
//     });
//   });

//   module.exports = function auth(user,pass){
//     con.connect(function(err) {
//       if (err) throw err;
//       console.log("Connected!");
//       var sql = `SELECT * FROM user WHERE id = '${user}','${pass}'`;
//       con.query(sql, function (err, result) {
//         if (err){
//            throw err;
//            return false;
//         }else{
//           return true;
//         }
//         console.log(result[0].ID);
//       });
//     });
//   }
module.exports={
  
  one : function(user,pass){
    
    var boo = false;
    var sql = `SELECT * FROM user WHERE id = '${user}'`;    
    var output = sync.mysql({
      host: "127.0.0.1",
      user: "root",
      password: "123456789",
      database: "mydb"
      },
      sql
    );
   
      return user == output.data.rows[0].ID && pass == output.data.rows[0].password;
  },
  two : function(user,timein){
    var date = new Date();
    
    var sql = `INSERT INTO timestamp(timein,ID,date) VALUES('${timein}','${user}','${(date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear()}')`;    
    var output = sync.mysql({
      host: "127.0.0.1",
      user: "root",
      password: "123456789",
      database: "mydb"
      },
      sql
    );
  },

  three :  function(user,date){
     
      var sql = `SELECT timein FROM mydb.timestamp WHERE (ID = '${user}') AND (date = '${(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear())}')`;    
      var output = sync.mysql({
      host: "127.0.0.1",
      user: "root",
      password: "123456789",
      database: "mydb"
      },
      sql
    );
    console.log(JSON.stringify(output.data.rows[0]) === undefined );
    console.log(JSON.stringify(output.data.row));
    
    return JSON.stringify(output.data.rows[0]) === undefined;
  },
  four : function(user,date){
    
    var sql = `SELECT lunchin FROM mydb.timestamp WHERE (ID = '${user}') AND (date = '${(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear())}')`;    
    var output = sync.mysql({
    host: "127.0.0.1",
    user: "root",
    password: "123456789",
    database: "mydb"
    },
    sql);


    return JSON.stringify(output.data.rows[0]) === undefined;
  }
  
}