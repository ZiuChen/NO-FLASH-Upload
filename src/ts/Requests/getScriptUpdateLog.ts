import config from "../Config/Config";
import XHR from "../XHR";
import log from "../Log";

export default async function getScriptUpdateLog() {
  return await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.updateLOG,
    headers: { Referer: config.updateLOG },
    responseType: "text/html",
  })
    .then((res: any) => {
      if (res === undefined) {
        log("getScriptUpdateLog", "数据获取异常，请重试或联系开发者", "error");
        let notify = ElNotification({
          title: "免Flash文件上传",
          type: "warning",
          message: `数据获取异常，请重试或联系开发者`,
          onClick: () => {
            notify.close();
          },
        });
      }
      return res.body;
    })
    .then((res: string) => {
      let praser = new DOMParser();
      let dom = praser.parseFromString(res, "text/html");
      return `<p>${dom.querySelector("p").innerHTML}</p>
    ${dom.querySelector("ul").innerHTML}`;
    });
}
