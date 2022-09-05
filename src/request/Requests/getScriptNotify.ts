import config from "../../hooks/Config/Config";
import XHR from "../../utils/XHR";

export default async function getScriptNotify() {
  return await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.notifyURL,
    responseType: "json",
  }).then(({ body }: any) => body);
}
