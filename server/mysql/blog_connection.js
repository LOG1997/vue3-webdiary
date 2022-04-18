const mysql=require('mysql2');


exports.query=(sql,data,callback)=>{
    const connection=mysql.createConnection({
        host:'localhost',
        user:'root',
        port: "3306",
        password:'123456',
        database:'blog'
    });
    connection.connect();
    connection.query(sql,data,(err,results)=>{
        if(err){
            console.log(err);
            callback(err,null);
        }else{
            callback(null,results);
        }
    })
    connection.end();
}