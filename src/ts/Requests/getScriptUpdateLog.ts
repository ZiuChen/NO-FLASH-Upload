import sendRequest from "../SendRequest";
import config from "../Config/Config";

export default async function getScriptUpdateLog() {
  return await sendRequest(config.updateLOG, undefined, {
    cache: "no-cache",
  }).then((res) => {
    return res.text().then((res: string) => {
      let praser = new DOMParser();
      let dom = praser.parseFromString(res, "text/html");
      return `<p>${dom.querySelectorAll("p")[0].innerHTML}</p>
      ${dom.querySelectorAll("ul")[0].innerHTML}<p>${
        dom.querySelectorAll("p")[1].innerHTML
      }</p>
      ${dom.querySelectorAll("ul")[1].innerHTML}`;
    });
  });
}
