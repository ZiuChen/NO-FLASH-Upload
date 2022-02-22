import getVersionInfo from "./GetVersionInfo";
import Config from "./Config";

async function checkUpdate() {
  await getVersionInfo().then((res) => {
    if (res.need) {
      ElNotification({
        title: "免Flash文件上传",
        type: "warning",
        message: `有新版本，点击此处更新`,
        duration: 0,
      });
    } else {
      // if(localStorage.getItem("config-update") !== "true") return
      ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `版本已是最新：${Config.version}`,
      });
    }
  });
}

function callBack() {
  location.href = `${Config.GreasyUrl}/code/${Config.ScriptID}.user.js`;
}

export default checkUpdate;
