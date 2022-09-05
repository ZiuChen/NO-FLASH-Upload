import { ElNotification } from "element-plus";
import log from "../../hooks/useLog";
import XHR from "../../utils/XHR";
import config from "../../hooks/Config/Config";

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
      const p = new DOMParser();
      const dom = p.parseFromString(res, "text/html");
      const ver = dom?.querySelector("p")?.innerHTML;
      const items = dom?.querySelector("ul")?.innerHTML;
      return `
      <p>${ver}</p>
      ${items}`;
    });
}
