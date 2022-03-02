import sendRequest from "./SendRequest";
import log from "./Log";
import config from "./Config/Config";

async function getVersionInfo() {
  log(`current userscript version: ${config.version}`);
  let content = sendRequest(
    config.delivrJsonUrl,
    (obj: Document) => {
      return JSON.parse(obj.querySelector("body").innerText).version;
    },
    {
      cache: "no-cache",
    }
  ).then((res) => {
    let weightLastest = 0;
    let weightNow = 0;
    res
      .split(".")
      .reverse()
      .forEach((value: string, index: number) => {
        weightLastest +=
          (index + 1) * Math.pow(10, index + 1) * parseInt(value);
      });
    config.version
      .split(".")
      .reverse()
      .forEach((value: string, index: number) => {
        weightNow += (index + 1) * Math.pow(10, index + 1) * parseInt(value);
      });
    if (weightLastest > weightNow) {
      return { need: true, current: config.version, lastest: res };
    } else {
      return { need: false, current: config.version, lastest: res };
    }
  });
  return content;
}

export default getVersionInfo;
