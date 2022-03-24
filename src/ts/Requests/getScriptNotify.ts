import config from "../Config/Config";
import XHR from "../XHR";

export default async function getScriptNotify() {
  return await await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.notifyURL,
    responseType: "json",
  }).then((res: any) => {
    return res.body;
  });
}
