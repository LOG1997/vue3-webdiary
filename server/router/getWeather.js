var https = require("https");
const zlib = require("zlib");
const async = require("async");
const { get } = require("http");
// 解压函数
async function getGzipped(url, callback) {
  // buffer to store the streamed decompression
  var buffer = [];
  // 请求数据
  https
    .get(url, function (res) {
      // pipe the response into the gunzip to decompress
      var gunzip = zlib.createGunzip();
      res.pipe(gunzip);
      // concat the chunks
      gunzip
        .on("data", function (data) {
          // decompression chunk ready, add it to the buffer
          buffer.push(data.toString());
        })
        .on("end", function () {
          // response and decompression complete, join the buffer and return
          callback(null, buffer.join(""));
        })
        .on("error", function (e) {
          callback(e);
        });
    })
    .on("error", function (e) {
      callback(e);
    });
}
// const { response } = require("express");
exports.getWeather = (req, res) => {
  let location = req.query.location || "100.069153,22.546534";
  console.log("location", location);
  let weatherApiKey = "52629a39796d4916855a846cf99bf244";
  let cityurl = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=${weatherApiKey}`;
  let weatherurl = `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${weatherApiKey}`;
  let weatherhistoryurl = `https://devapi.qweather.com/v7/weather/3d?location=${location}&key=${weatherApiKey}`;

  /**
   * async模块使用series同步执行函数
   */
  function getweather(callback) {
    console.log("getweather");
    getGzipped(weatherurl, function (err, data) {

      callback(null, JSON.parse(data).now);
    });
  }
  function getcity(callback) {
    console.log("getcity");
    getGzipped(cityurl, function (err, data) {

      callback(null, JSON.parse(data).location);
    });
  }
  function getHistoryWeather(callback) {
    console.log("getHistoryWeather");
    getGzipped(weatherhistoryurl, function (err, data) {
      // console.log("history",)
      callback(null, JSON.parse(data).daily);
    });
  }
  async.series([getweather, getcity,getHistoryWeather], function (error, result) {
    console.log("result", result);
    return res.json({"data":result,msg:"成功"});
  });
  /**
   * 使用async---await执行同步函数
   */
  // async function ht() {
  //   await getGzipped(
  //     weatherurl,
  //     await function (err, data) {
  //       getdata[0] = JSON.parse(data);
  //       console.log("getweather");
  //     }
  //   );
  //   await getGzipped(
  //     cityurl,
  //     await function (err, data) {
  //       getdata[1] = JSON.parse(data);
  //       console.log("caitdata");
  //     }
  //   );
  //   console.log("getdata", getdata);
  //   return res.json({ data: getdata, msg: "成功" });
  // }
  // ht();
};
