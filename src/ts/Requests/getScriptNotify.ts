import config from "../Config/Config";
import XHR from "../XHR";
import log from "../Log";

export default async function getScriptNotify() {
  return await await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.notifyURL,
    headers: { Referer: config.notifyURL },
    responseType: "json",
  }).then((res: any) => {
    if (res === undefined) {
      log("getVersionInfo", "数据获取异常，请重试或联系开发者", "error");
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
  });
}
