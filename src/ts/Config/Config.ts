const { version, repository, description } = require("../../../package.json");
const scriptID = "432056";
const greasyUrl = `https://greasyfork.org/zh-CN/scripts/${scriptID}`;
const tencentUrl = `https://wj.qq.com/s2/9790218/23fe/`;
const githubJsonUrl = `https://raw.githubusercontent.com/ZiuChen/NO-FLASH-Upload/v2.x-Vue/package.json`;
const delivrUpdateUrl = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js`;
const delivrJsonUrl = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/package.json`;

const userConfig = {
  "back-to-old": {
    value: false,
    default: false,
    id: "back-to-old",
    type: "config",
  },
  "show-side-bar": {
    value: true,
    default: true,
    id: "show-side-bar",
    type: "config",
  },
  "hwt-list-card-size": {
    value: 24,
    default: 24,
    id: "hwt-list-card-size",
    type: "card-size",
  },
  "notify-list-card-size": {
    value: 12,
    default: 12,
    id: "notify-list-card-size",
    type: "card-size",
  },
  "lesson-list-card-size": {
    value: 12,
    default: 12,
    id: "lesson-list-card-size",
    type: "card-size",
  },
  "inform-list-card-size": {
    value: 8,
    default: 8,
    id: "inform-list-card-size",
    type: "card-size",
  },
  "user-info-card-size": {
    value: 8,
    default: 8,
    id: "user-info-card-size",
    type: "card-size",
  },
  "calender-card-size": {
    value: 8,
    default: 8,
    id: "calender-card-size",
    type: "card-size",
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
