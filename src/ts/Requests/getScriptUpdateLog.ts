import config from "../Config/Config";
import XHR from "../XHR";

export default async function getScriptUpdateLog() {
  return await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.updateLOG,
    responseType: "text/html",
  })
    .then((res: any) => {
      return res.body;
    })
    .then((res: string) => {
      let praser = new DOMParser();
      let dom = praser.parseFromString(res, "text/html");
      return `<p>${dom.querySelector("p").innerHTML}</p>
    ${dom.querySelector("ul").innerHTML}`;
    });
}
