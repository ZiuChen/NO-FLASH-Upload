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
  "config-background-color": {
    value: "#f0f8ff",
    default: "#f0f8ff",
    name: "背景颜色",
    id: "config-background-color",
    type: "input",
  },
  "config-hwt-recent-range": {
    value: { min: -3, max: 15 },
    default: { min: -3, max: 15 },
    name: "近期截止显示范围",
    id: "config-hwt-recent-range",
    type: "input-number",
  },
  "config-hwt-default-sort": {
    value: "ascending",
    default: "ascending",
    name: "默认排序方式",
    id: "config-hwt-default-sort",
    type: "input",
  },
  "config-hwtlist-show": {
    value: true,
    default: true,
    name: "显示作业列表卡片",
    id: "config-hwtlist-show",
    type: "switch",
  },
  "config-notifylist-show": {
    value: true,
    default: true,
    name: "显示未读通知卡片",
    id: "config-notifylist-show",
    type: "switch",
  },
  "config-lessonlist-show": {
    value: true,
    default: true,
    name: "显示课程列表卡片",
    id: "config-lessonlist-show",
    type: "switch",
  },
  "config-informlist-show": {
    value: true,
    default: true,
    name: "显示系统通知卡片",
    id: "config-informlist-show",
    type: "switch",
  },
  "config-lessontoplist-show": {
    value: false,
    default: false,
    name: "显示访问排行卡片",
    id: "config-lessontoplist-show",
    type: "switch",
  },
  "config-userinfo-show": {
    value: false,
    default: false,
    name: "显示用户信息卡片",
    id: "config-userinfo-show",
    type: "switch",
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
