import sendRequest from "../request/SendRequest";
import log from "./Log";
import config from "./Config/Config";

async function getVersionInfo() {
  return sendRequest(
    config.updateInfo,
    (obj: Document) => {
      return JSON.parse(obj.querySelector("body").innerText);
    },
    {
      cache: "no-cache",
    }
  ).then(({ version }) => {
    const weightLastest = v2weight(version);
    const weightNow = v2weight(config.version);
    log(
      "getVersionInfo",
      `当前版本: ${config.version}, 最新版本: ${version}`,
      "info"
    );
    return {
      need: weightLastest > weightNow,
      current: config.version,
      lastest: version,
    };
  });
}

function v2weight(v: string) {
  let weight = 0;
  v.split(".")
    .reverse()
    .forEach((value, index) => {
      weight += (index + 1) * Math.pow(100, index + 1) * parseInt(value);
    });
  return weight;
}

export default getVersionInfo;
