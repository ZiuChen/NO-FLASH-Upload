import getVersionInfo from "./GetVersionInfo";
import config from "./Config/Config";
import type { Action } from "element-plus";

async function checkUpdate() {
  await getVersionInfo().then((res) => {
    if (res.need) {
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "warning",
        message: `有新版本${res.lastest}，当前版本${res.current}。请点击此处更新`,
        duration: 0,
        onClick: () => {
          window.location.href = config.delivrUpdateUrl;
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
      return true; // need update
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
      return false; // don't need update
    }
  });
}

export default checkUpdate;
