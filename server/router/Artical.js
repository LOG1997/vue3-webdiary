/**
 * todo:文章id前后端是否重复，避免重复提交。
 */


const mysql = require("../mysql/async_blog_pool");
// 提交数据
exports.submitArtical = async (req, res) => {
  // console.log(req)
  let user_id = req.body.user_id;
  let id =req.body.id;
  let title = req.body.title;
  let content = req.body.content;
  let create_time = req.body.create_time ||new Date();
  let update_time = req.body.update_time  ||new Date();;
  let label = req.body.label
  let imgUrl = req.body.imgUrl || "https://picsum.photos/200/200";
  // 判断id格式
  if(id&&isNaN(parseInt(id))){
    console.log(id.length)
    console.log("id:",typeof id,id)
    return res.json({msg:"id格式错误"});
  }
  let sqldata = [
    user_id,
    id,
    title,
    content,
    create_time,
    update_time,
    label,
    imgUrl,
    title,
    content,
    update_time,
    label,
    imgUrl
  ];
  let sqlInsert =
  "insert into artical(user_id,id,title,content,create_time,update_time,label,imgUrl) values(?,?,?,?,?,?,?,?)\
  on duplicate key update title=?,content=?,update_time=?,label=?,imgUrl=?";

  // 创建存储文章的表
  let sqlCreateTable = `create table if not exists artical(\
        user_id varchar(36) not null,\
        id int UNSIGNED not null primary key AUTO_INCREMENT,\
        title varchar(255) not null,\
        content text not null,\
        create_time datetime,\
        update_time datetime,\
        label varchar(255),\
        imgUrl varchar(255),\
        is_done boolean default false,\
        index(user_id),\
        index(title),\
        index(label)\
    )`;
  await mysql.query(sqlCreateTable, "", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      results.info = "创建成功";
      console.log(results);
    }
  });
  await mysql.query(sqlInsert, sqldata).then((result) => {
    result.info="提交成功";
    console.log("提交成功",result)
    return res.json({ result: result });
    // return res.json({ msg:"id格式错误" });
  });
};
// 获取所有文章
exports.getArticalList = async (req, res) => {
  let url=req.url;
  let host=req.headers.host
  console.log("url:",host,url)
  let user_id = req.query.user_id;
  console.log("userid:", user_id);
  let sql = `select * from artical where user_id=?`;
  let sqlcount = `select count(*) as count from artical where user_id=?`;
  let articalList = await mysql.query(sql, user_id).then((result) => {
    return result;
  });

  let articalCount = await mysql.query(sqlcount, user_id).then((result) => {
    return result;
  });
  return res.json({ articalList, articalCount });
};
// 获取指定文章
exports.getArtical = async (req, res) => {
  let id = req.query.id;
  // let user_id=req.query.user_id;
  console.log("id:", id);
  let sql = `select * from artical where id=?`;
  let artical = await mysql.query(sql, id).then((result) => {
    return result;
  });
  return res.json({ artical });
}