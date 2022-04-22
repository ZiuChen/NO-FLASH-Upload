import sendRequest from "../SendRequest";
import config from "../Config/Config";

export default async function getPluginsData() {
  return await sendRequest(config.pluginsURL, undefined, {
    cache: "no-cache",
  }).then((res) => {
    return res.json().then((json: JSON) => {
      return json;
    });
  });
}
