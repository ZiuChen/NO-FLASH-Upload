const { author, repository, version, description } = require("../package.json");

module.exports = {
  name: "免Flash文件上传",
  "name:en": "NO-FLASH-Upload",
  description: description,
  "description:en":
    "Beijing Jiaotong University curriculum platform function enhancements, information aggregation, accessories uploading, allowing you to efficient course information.",
  updateURL:
    "https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js",
  downloadURL:
    "https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js",
  version: version,
  author: author,
  source: repository.url,
  supportURL: repository.url + "/issues",
  license: "MIT",
  match: ["*://cc.bjtu.edu.cn:81/meol*"],
  namespace: "https://greasyfork.org/zh-CN/users/605474",
  require: [
    "https://fastly.jsdelivr.net/npm/@wangeditor/editor@latest/dist/index.min.js",
  ],
  icon: "https://fastly.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg",
};
