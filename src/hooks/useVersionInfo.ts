import sendRequest from "@/request/SendRequest";
import log from "./useLog";
import config from "./Config/Config";

export default async function useVersionInfo() {
  return sendRequest(
    config.updateInfo,
    (obj: Document) => {
      const string = obj.querySelector("body")?.innerText as string;
      return JSON.parse(string);
    },
    {
      cache: "no-cache",
    }
  ).then(({ version }) => {
    const weightLastest = v2weight(version);
    const weightNow = v2weight(config.version);
    log(
      "versionInfo",
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
