import sendRequest from "../SendRequest";
import config from "../../ts/Config/Config";

export default async function getScriptNotify() {
  return await sendRequest(config.notifyURL, undefined, {
    cache: "no-cache",
  }).then((res) => {
    return res.json().then((json: JSON) => {
      return json;
    });
  });
}
