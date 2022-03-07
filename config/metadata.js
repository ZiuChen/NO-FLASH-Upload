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
  license: "MIT",
  match: ["*://cc.bjtu.edu.cn:81/meol*"],
  namespace: "https://greasyfork.org/zh-CN/users/605474",
  require: [
    "https://cdn.jsdelivr.net/npm/wangeditor@4.7.12/dist/wangEditor.min.js",
    "https://cdn.jsdelivr.net/npm/gbk.js@0.3.0/dist/gbk.min.js",
    "https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/js/mdui.min.js",
  ],
  connect: ["raw.githubusercontent.com", "github.com", "cdn.jsdelivr.net"],
  icon: "https://gitee.com/ziuc/utool-filebed/raw/master/20210514-231824-0795.png",
  grant: [],
};
