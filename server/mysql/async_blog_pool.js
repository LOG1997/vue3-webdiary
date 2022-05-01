const mysql = require("mysql2");
// 连接mysql的参数
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "123456",
  database: "blog",
});
// 暴露一个query参数
exports.query =  (sql, data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, data, (error, results) => {
          if (error) {
            console.log(error);
            reject(error)
          } else {
            // console.log("pool:", results);
            resolve(results);
          }
        });
        connection.release();
      }
    });

  })
   
};
