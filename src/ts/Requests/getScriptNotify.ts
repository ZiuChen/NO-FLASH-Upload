import sendRequest from "../SendRequest";
import config from "../Config/Config";

export default async function getScriptNotify() {
  return await sendRequest(config.notifyURL, undefined, {
    cache: "no-cache",
  }).then((res) => {
    res.json().then((json: JSON) => {
      console.log(json);
      return json;
    });
  });
}
