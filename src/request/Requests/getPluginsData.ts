import config from "../../hooks/Config/Config";
import XHR from "../../utils/XHR";

export default async function getPluginsData() {
  return await XHR({
    GM: true,
    anonymous: true,
    method: "GET",
    url: config.pluginsURL,
    responseType: "json",
  }).then(({ body }: any) => body);
}
