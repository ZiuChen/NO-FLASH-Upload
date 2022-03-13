const { version, repository, description } = require("../../../package.json");
const scriptID = "432056";
const greasyUrl = `https://greasyfork.org/zh-CN/scripts/${scriptID}`;
const tencentUrl = `https://wj.qq.com/s2/9790218/23fe/`;
const githubJsonUrl = `https://raw.githubusercontent.com/ZiuChen/NO-FLASH-Upload/v2.x-Vue/package.json`;
const delivrUpdateUrl = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js`;
const delivrJsonUrl = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/package.json`;

const userConfig = {
  "config-back-to-old": {
    value: false,
    default: false,
    name: "回到旧版",
    type: "switch",
  },
  "config-show-side-bar": {
    value: true,
    default: true,
    name: "显示/隐藏侧栏",
    type: "switch",
  },
  "config-recent-range": {
    value: [15, -3],
    default: [15, -3],
    name: "近期截止范围",
    type: "input-number",
  },
};

export default {
  version: version,
  description: description,
  scriptID: scriptID,
  greasyUrl: greasyUrl,
  tencentUrl: tencentUrl,
  delivrUpdateUrl: delivrUpdateUrl,
  delivrJsonUrl: delivrJsonUrl,
  githubJsonUrl: githubJsonUrl,
  githubUrl: repository.url,
  userConfig: userConfig,
};
