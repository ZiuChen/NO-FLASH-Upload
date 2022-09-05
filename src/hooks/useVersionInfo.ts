import log from "./useLog";
import config from "./Config/Config";
import XHR from "../utils/XHR";

export default async function useVersionInfo() {
  return await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.updateInfo,
    headers: { Referer: config.updateInfo },
    responseType: "json",
  })
    .then((res: any) => {
      if (res === undefined) {
        log("getVersionInfo", "数据获取异常，请重试或联系开发者", "error");
      }
      return res.body.version;
    })
    .then((version) => {
      const weightLastest = v2weight(version);
      const weightNow = v2weight(config.version);
      log("getVersionInfo", `最新版本: ${version}`, "info");
      log("getVersionInfo", `脚本当前版本: ${config.version}`, "info");
      if (weightLastest > weightNow) {
        return { need: true, current: config.version, lastest: version };
      } else {
        return { need: false, current: config.version, lastest: version };
      }
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
