/**
 *
 * 用户注册和登录
 */
const mysql = require("../mysql/async_blog_pool");
const bcrypt = require("bcrypt");
const { access } = require("../utils/log");

const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);

  console.log(username, password);
  let sqlCreate =
    "create table  if not exists blog_user(\
    user_id int not null auto_increment primary key,\
    username varchar(20) not null,\
    password varchar(100) not null,\
    create_time datetime not null,\
    update_time datetime not null,\
    UNIQUE KEY(username))\
    ";
  let sqlInsert =
    "insert into blog_user(username,password,create_time,update_time) values(?,?,?,?)\
    on duplicate key update password=?,update_time=?";

  await mysql.query(sqlCreate, "", (createerr, createresult) => {
    if (createerr) {
      console.log(createerr);
    } else {
      access(`表blog_user创建成功,,时间为:${new Date()}`);
      createresult.info = "创建数据表成功";
      console.log(createresult);
    }
  });
  await mysql
    .query(sqlInsert, [
      username,
      password,
      new Date(),
      new Date(),
      password,
      new Date(),
    ])
    .then((result) => {
      result.info = "提交成功";
      access(`用户:${username},注册成功,,时间为:${new Date()}`);
      console.log("提交成功", result);
      return res.json({ result: result });
    });
};

exports.login = async (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let user_id = req.query.user_id;
  console.log("reqquery:", req.query.username);

  let sqlSelect = `select user_id,username,password from blog_user where user_id=? or username=?`;
  mysql.query(sqlSelect, [user_id, username]).then((result) => {
    if (result.length > 0) {
      let user = result[0];
      let isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        access(`用户:${username},登录成功,,时间为:${new Date()}`);
        const rule = { id: result[0].user_id, username: result[0].username };
        jwt.sign(rule, "secret", { expiresIn: 36000 }, (err, token) => {
          if (err) {
            console.log("获取token失败了，出现错误：", err);
            throw err;
          }
          return res.json({
            success: true,
            token: token,
            code:200,
            msg: "登录成功",
          });
        });
        // return res.json({result:{user_id:user.user_id,username:user.username},msg:"登录成功"})
      } else {
        return res.json({
          result: { user_id: 0, username: "" },
          msg: "密码错误",
        });
      }
    } else {
      return res.json({
        result: { user_id: 0, username: "" },
        msg: "用户不存在",
      });
    }
  });
};

exports.verify = async (req, res) => {
    let token = req.headers.authorization;
    console.log("token:", req.headers.authorization);
    if (token) {
        jwt.verify(token, "secret", (err, decode) => {
        if (err) {
            console.log("token验证失败，出现错误：", err);
            throw err;
        }
        console.log("token验证成功，解码后的数据为：", decode);
        return res.json({
            success: true,
            msg: "验证成功",
            data: decode,
            code:200,
        });
        });
    } else {
        return res.json({
        success: false,
        msg: "token不存在",
        });
    }
    };