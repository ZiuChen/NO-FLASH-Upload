import getVersionInfo from "./GetVersionInfo";
import config from "./Config"

async function checkUpdate() {
  await getVersionInfo().then((res) => {
    console.log(res);
    if (res.need) {
      ElNotification({
        title: "免Flash文件上传",
        type: "warning",
        message: `有新版本，点击此处更新`,
        duration: 0,
        onClick: () => {window.location.href = `${config.greasyUrl}/code/${config.scriptID}.user.js`;}
      });
    } else {
      // if(localStorage.getItem("config-update") !== "true") return
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `版本已是最新：${res.current}`,
        onClick: () => {notify.close();}
      });
    }
  });
}

export default checkUpdate;
