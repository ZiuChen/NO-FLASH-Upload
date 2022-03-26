import sendRequest from "../SendRequest";
import config from "../Config/Config";

export default async function getScriptUpdateLog() {
  return await sendRequest(config.updateLOG, undefined, {
    cache: "no-cache",
  }).then((res) => {
    return res.text().then((res: string) => {
      let praser = new DOMParser();
      let dom = praser.parseFromString(res, "text/html");
      return `<p>${dom.querySelector("p").innerHTML}</p>
      ${dom.querySelector("ul").innerHTML}`;
    });
  });
}
