import ConfigOperations from "./Config/ConfigOperations";

function checkUsingOld() {
  if (ConfigOperations.readUserConfig()["config-back-to-old"].value) {
    // using old version
    ElMessage({
      type: "warning",
      message: "正在使用旧版",
    });
    if (location.href.indexOf("personal.do") !== -1) {
      // only show notification in personal.do page
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "warning",
        message: `正在使用旧版，点此回到新版界面`,
        onClick: () => {
          ConfigOperations.setUserConfig("config-back-to-old", false);
          window.location.reload();
          notify.close();
        },
      });
    }
    return true;
  } else {
    return false;
  }
}

export default checkUsingOld;
