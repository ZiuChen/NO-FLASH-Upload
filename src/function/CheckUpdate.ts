import getVersionInfo from "./GetVersionInfo";

async function checkUpdate() {
  await getVersionInfo().then((res) => {
    console.log(res);
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
        message: `版本已是最新：${res.current}`,
      });
    }
  });
}

export default checkUpdate;
