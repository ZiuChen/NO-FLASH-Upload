const { version, repository, description } = require("../../../package.json");
const giteeURL = `https://gitee.com/ziuc/NO-FLASH-Upload`;
const supportURL = `https://support.qq.com/products/395800`;
const donateURL = `https://gitee.com/ZiuChen/NO-FLASH-Upload/raw/master/doc/img/Buy%20me%20a%20coffee.png`;
const qGroupURL = `https://qm.qq.com/cgi-bin/qm/qr?k=9qfHKTaQuWqYN1ys1yiQPdJ4iIlHwgL5&jump_from=webapi`;
const updateURL = `https://service-n4tqsll5-1304937021.sh.apigw.tencentcs.com/release/v1/index.prod.user.js`;
const updateInfo = `https://gitee.com/ZiuChen/NO-FLASH-Upload/raw/master/package.json`;
const updateLOG = `https://gitee.com/ZiuChen/NO-FLASH-Upload/raw/master/doc/update_log.md`;
const notifyURL = `https://gitee.com/ZiuChen/NO-FLASH-Upload/raw/master/src/notify.json`;

const userConfig = {
  "data-last-read-notify": {
    value: 0,
    default: 0,
    name: "最近阅读的通知",
    id: "data-last-read-notify",
    type: "input",
  },
  "config-back-to-old": {
    value: false,
    default: false,
    name: "回到旧版",
    id: "config-back-to-old",
    type: "switch",
  },
  "config-console-log-show": {
    value: true,
    default: true,
    name: "控制台日志输出",
    id: "config-console-log-show",
    type: "switch",
  },
  "config-post-interval": {
    value: true,
    default: true,
    name: "定期发送请求以保持登录状态",
    id: "config-post-interval",
    type: "switch",
  },
  "config-hide-update-notify": {
    value: false,
    default: false,
    name: "隐藏检查更新提示",
    id: "config-hide-update-notify",
    type: "switch",
  },
  "config-hwt-submit-drag": {
    value: true,
    default: true,
    name: "拖拽上传附件功能",
    id: "config-hwt-submit-drag",
    type: "switch",
  },
  "config-hwt-default-expand": {
    value: false,
    default: false,
    name: "自动扩展作业卡片宽度",
    id: "config-hwt-default-expand",
    type: "switch",
  },
};

export default {
  version: version,
  githubURL: repository.url,
  giteeURL: giteeURL,
  supportURL: supportURL,
  donateURL: donateURL,
  qGroupURL: qGroupURL,
  description: description,
  updateURL: updateURL,
  updateInfo: updateInfo,
  updateLOG: updateLOG,
  notifyURL: notifyURL,
  userConfig: userConfig,
};
