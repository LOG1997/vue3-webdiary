const mysql = require("mysql2/promise");

async function query(sql, data, callback) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "123456",
    database: "blog",
  });
  await connection.connect();
  await connection.query(sql, data, callback);
  await connection.end();
}

exports.query = query;
