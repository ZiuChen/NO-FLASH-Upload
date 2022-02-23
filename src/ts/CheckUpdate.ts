import getVersionInfo from "./GetVersionInfo";
import config from "./Config/Config";
import type { Action } from "element-plus";

async function checkUpdate() {
  await getVersionInfo().then((res) => {
    console.log(res);
    if (res.need) {
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "warning",
        message: `有新版本${res.lastest}，点击此处更新`,
        duration: 0,
        onClick: () => {
          window.location.href = `${config.greasyUrl}/code/${config.scriptID}.user.js`;
          notify.close();
          ElMessageBox.alert(
            `请在弹出的网页中更新脚本，更新后点击“ OK ”重新加载此页面`,
            "提示",
            {
              confirmButtonText: "OK",
              callback: (action: Action) => {
                if (action === "confirm") {
                  window.location.reload();
                } else {
                  return false;
                }
              },
            }
          );
        },
      });
    } else {
      // if(localStorage.getItem("config-update") !== "true") return
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `版本已是最新：${res.current}`,
        onClick: () => {
          notify.close();
        },
      });
    }
  });
}

export default checkUpdate;
