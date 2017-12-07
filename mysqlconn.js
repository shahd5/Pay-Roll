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


module.exports={
  
  //autho
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
      global.manager = output.data.rows[0].role;
      return user == output.data.rows[0].ID && pass == output.data.rows[0].password;
  },
  //insert lunchin,out,timeout
  two : function(col,user,timein){
    var date = new Date();
    if(col === "timeout"){
      var sql = `UPDATE mydb.timestamp SET ${col} = '${timein}',pending='pending' WHERE ID = '${user}' AND date ='${(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear())}'`;   
      
    }else{
      var sql = `UPDATE mydb.timestamp SET ${col} = '${timein}' WHERE ID = '${user}' AND date ='${(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear())}'`;   
      
    }
    var output = sync.mysql({
      host: "127.0.0.1",
      user: "root",
      password: "123456789",
      database: "mydb"
      },
      sql
    );
  },
  //checks wether or not submited for the day
  three :  function(col,user,date){
     
      var sql = `SELECT ${col} FROM mydb.timestamp WHERE (ID = '${user}') AND (date = '${(date.getMonth()+1+"-"+date.getDate()+"-"+date.getFullYear())}')`;    
      var output = sync.mysql({
      host: "127.0.0.1",
      user: "root",
      password: "123456789",
      database: "mydb"
      },
      sql
    );
      if(output.data.rows.length===0){
        console.log(output.data.rows.length===0);
       {return output.data.rows.length===0}  
      }else{
      if(col === "timein"){
        return (output.data.rows[0].timein===null);
      }
      if(col === "lunchout"){
        return (output.data.rows[0].lunchout===null);
      }
      if(col === "timeout"){
        return (output.data.rows[0].timeout===null);
      }
      if(col === "lunchin"){
        return (output.data.rows[0].lunchin===null);
      }
    }
  },
  //submit timein
  four : function(user,timein){
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
  //view time sheet tab in html
  five : function(user){
    var sql = `SELECT date,total,pending FROM mydb.timestamp WHERE ID ='${user}'`;    
    var output = sync.mysql({
    host: "127.0.0.1",
    user: "root",
    password: "123456789",
    database: "mydb"
    },
    sql
  );
  console.log(output.data.rows);
  return output.data.rows;
  },

  six : function(){
    var sql = `SELECT ID,date,total FROM mydb.timestamp WHERE pending ='pending'`;    
    var output = sync.mysql({
    host: "127.0.0.1",
    user: "root",
    password: "123456789",
    database: "mydb"
    },
    sql
  );
  console.log(output.data.rows);
  return output.data.rows;
  },

  seven : function(ID,date){
    var sql = `UPDATE mydb.timestamp SET pending = 'approve' WHERE ID = '${ID}' AND date ='${date}'`;       
    var output = sync.mysql({
    host: "127.0.0.1",
    user: "root",
    password: "123456789",
    database: "mydb"
    },
    sql
  );
  
}
  

  
}