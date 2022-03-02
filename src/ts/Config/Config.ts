const { version, repository, description } = require("../../../package.json");
const scriptID = "432056";
const greasyUrl = `https://greasyfork.org/zh-CN/scripts/${scriptID}`;
const githubJsonUrl = `https://raw.githubusercontent.com/ZiuChen/NO-FLASH-Upload/v2.x-Vue/package.json`;
const delivrUpdateUrl = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/publish/index.prod.user.js`;
const delivrJsonUrl = `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/package.json`;

const userConfig = {
  "back-to-old": {
    value: false,
    default: false,
    id: "back-to-old",
  },
  "show-side-bar": {
    value: true,
    default: true,
    id: "show-side-bar",
  },
};

export default {
  version: version,
  description: description,
  scriptID: scriptID,
  greasyUrl: greasyUrl,
  delivrUpdateUrl: delivrUpdateUrl,
  delivrJsonUrl: delivrJsonUrl,
  githubJsonUrl: githubJsonUrl,
  githubUrl: repository.url,
  userConfig: userConfig,
};
