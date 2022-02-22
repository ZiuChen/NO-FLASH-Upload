import sendRequest from "./SendRequest";
import log from "./Log";
import Config from "./Config";

async function CheckUpdate() {
  log(`script loaded: ${Config.version}`);
  let content = sendRequest(Config.GreasyUrl, (obj: Document) => {
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
    Config.version
      .split(".")
      .reverse()
      .forEach((value: string, index: number) => {
        weightNow += ((index + 1) * Math.pow(10, index+1)) * parseInt(value);
      });
    if (weightLastest < weightNow) {
      log("need update");
      return {need: true, current: Config.version, lastest: res};
    } else {
      log("version Checked");
      return {need: false, current: Config.version, lastest: res};
    }
  });
  return content
}

export default CheckUpdate;
