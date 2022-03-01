const { version, repository, description } = require("../../../package.json");
const scriptID = "432056";
const greasyUrl = `https://greasyfork.org/zh-CN/scripts/${scriptID}`;
const githubJsonUrl = `https://raw.githubusercontent.com/ZiuChen/NO-FLASH-Upload/v2.x-Vue/package.json`;
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
  githubJsonUrl: githubJsonUrl,
  githubUrl: repository.url,
  userConfig: userConfig,
};
