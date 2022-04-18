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
exports.query =  (sql, data, callback) => {
   pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      connection.query(sql, data, (err, results) => {
        if (err) {
          console.log(err);
          // callback(err,null);
        } else {
          callback(null, results);
        }
      });
      connection.release();
    }
  });
};
