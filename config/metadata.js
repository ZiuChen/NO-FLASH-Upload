const { author, repository, version, description } = require("../package.json");

module.exports = {
  name: "免Flash文件上传",
  "name:en": "NO-FLASH-Upload",
  description: description,
  "description:en":
    "Beijing Jiaotong University curriculum platform function enhancements, information aggregation, accessories uploading, allowing you to efficient course information.",
  updateURL:
    "https://service-n4tqsll5-1304937021.sh.apigw.tencentcs.com/release/v1/index.prod.user.js",
  downloadURL:
    "https://service-n4tqsll5-1304937021.sh.apigw.tencentcs.com/release/v1/index.prod.user.js",
  version: version,
  author: author,
  source: repository.url,
  supportURL: repository.url + "/issues",
  license: "MIT",
  match: ["*://cc.bjtu.edu.cn:81/meol*"],
  namespace: "https://greasyfork.org/zh-CN/users/605474",
  require: [
    "https://gitee.com/ZiuChen/NO-FLASH-Upload/raw/master/libs/wangeditor.min.js",
  ],
  icon: "https://gcore.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg",
  connect: ["gitee.com"],
  grant: ["GM_xmlhttpRequest"],
};
