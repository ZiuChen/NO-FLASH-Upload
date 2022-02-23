const { version } = require("../../../package.json");
const scriptID = "432056";
const greasyUrl = `https://greasyfork.org/zh-CN/scripts/${scriptID}`;
const userConfig = {
  "back-to-old": {
    value: false,
    default: false,
    id: "back-to-old",
  },
};

export default {
  version: version,
  scriptID: scriptID,
  greasyUrl: greasyUrl,
  userConfig: userConfig,
};
