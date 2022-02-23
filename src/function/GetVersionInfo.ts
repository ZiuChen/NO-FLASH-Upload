import sendRequest from "./SendRequest";
import log from "./Log";
import config from "./Config";

async function getVersionInfo() {
  log(`script loaded: ${config.version}`);
  let content = sendRequest(config.greasyUrl, (obj: Document) => {
    return obj.querySelectorAll(".script-show-version>span")[1].textContent;
  }).then((res) => {
    let weightLastest = 0;
    let weightNow = 0;
    res
      .split(".")
      .reverse()
      .forEach((value: string, index: number) => {
        weightLastest += ((index + 1) * Math.pow(10, index+1)) * parseInt(value);
      });
    config.version
      .split(".")
      .reverse()
      .forEach((value: string, index: number) => {
        weightNow += ((index + 1) * Math.pow(10, index+1)) * parseInt(value);
      });
    if (weightLastest > weightNow) {
      log("need update");
      return {need: true, current: config.version, lastest: res};
    } else {
      log("version Checked");
      return {need: false, current: config.version, lastest: res};
    }
  });
  return content
}

export default getVersionInfo;
