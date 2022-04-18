const express = require("express");
const router = express.Router();
// 测试文件
const test = require("../test");
// 正式路由
const getWeather = require("./getWeather");
const Artical = require("./Artical")

router.get("/getHomeArticl", getWeather.getWeather);
router.get("/submitArtical", Artical.submitArtical);
router.get("/getArticalList", Artical.getArticalList);

router.get("/test", test.test);
module.exports = router;    
