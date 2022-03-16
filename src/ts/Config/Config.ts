const { version, repository, description } = require("../../../package.json");
const greasyURL = `https://greasyfork.org/zh-CN/scripts/432056`;
const feedBackURL = `https://wj.qq.com/s2/9790218/23fe/`;
const updateURL = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js`;
const updateInfo = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/package.json`;
const updateLOG = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/update_log.md`;

const userConfig = {
  "config-back-to-old": {
    value: false,
    default: false,
    name: "回到旧版",
    id: "config-back-to-old",
    type: "switch",
  },
  "config-show-side-bar": {
    value: true,
    default: true,
    name: "显示/隐藏侧栏",
    id: "config-show-side-bar",
    type: "switch",
  },
  "config-recent-range": {
    value: { min: -3, max: 15 },
    default: { min: -3, max: 15 },
    name: "近期截止显示范围",
    id: "config-recent-range",
    type: "input-number",
  },
};

export default {
  version: version,
  description: description,
  greasyURL: greasyURL,
  feedBackURL: feedBackURL,
  updateURL: updateURL,
  updateInfo: updateInfo,
  updateLOG: updateLOG,
  githubUrl: repository.url,
  userConfig: userConfig,
};
