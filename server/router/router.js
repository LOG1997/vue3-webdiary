const express = require("express");
const router = express.Router();
// 测试文件
const test = require("../test");
// 正式路由
const getWeather = require("./getWeather");
const Artical = require("./Artical")
const user=require("./user")


router.get("/getHomeArticl", getWeather.getWeather);
router.post("/submitArtical", Artical.submitArtical);
router.get("/getArticalList", Artical.getArticalList);
router.get("/getArtical", Artical.getArtical);
router.post('/register',user.register)

router.get('/login',user.login)

router.get("/test", test.test);
module.exports = router;    
