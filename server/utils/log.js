const fs = require('fs')
const path = require('path')
let date=new Date();
let year=date.getFullYear();
let month=date.getMonth()+1;
let day=date.getDate();
let logname=`${year}-${month}-${day}.log`
// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

function createWriteStream(fileName) {
  const fullWriteFilePath = path.resolve(__dirname, '../', 'log', fileName)
  console.log(fullWriteFilePath)

  // 创建这个
  const writeStream = fs.createWriteStream(fullWriteFilePath, {
    flags: 'a' //  打开文件进行追加。 如果文件不存在，则创建该文件。
  })
  return writeStream
}

function access(log) {
  const accessWriteStream = createWriteStream(`${logname}`)
  writeLog(accessWriteStream, log)
}
// x向外暴露access方法
module.exports = {
  access
}