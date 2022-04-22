const { author, repository, version, description } = require("../package.json");

module.exports = {
  name: "免Flash文件上传",
  "name:en": "NO-FLASH-Upload",
  description: description,
  "description:en":
    "Beijing Jiaotong University curriculum platform function enhancements, information aggregation, accessories uploading, allowing you to efficient course information.",
  updateURL:
    "https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js",
  downloadURL:
    "https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js",
  version: version,
  author: author,
  source: repository.url,
  supportURL: repository.url + "/issues",
  license: "MIT",
  match: ["*://cc.bjtu.edu.cn:81/meol*"],
  namespace: "https://greasyfork.org/zh-CN/users/605474",
  require: [
    "https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/index.min.js",
    "https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js",
    "https://cdn.jsdelivr.net/npm/dom-to-image@2.6.0/src/dom-to-image.min.js",
  ],
  icon: "https://cdn.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg",
};
