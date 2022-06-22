import getScriptNotify from "./getScriptNotify";
import ConfigOperations from "../../ts/Config/ConfigOperations";

export default async function getLastestScriptNotify(manually: boolean) {
  return await getScriptNotify().then((notifies) => {
    // 取最大通知id若未阅读则弹窗提示阅读
    notifies.sort((a: any, b: any) => {
      return b.id - a.id;
    });
    if (
      notifies[0].id >
        ConfigOperations.readUserConfig()["data-last-read-notify"].value ||
      manually // 手动触发显示
    ) {
      // 还未阅读此通知，显示通知
      ElMessageBox.alert(notifies[0].content, notifies[0].title, {
        confirmButtonText: "OK",
        callback: (action: any) => {
          ConfigOperations.setUserConfig(
            "data-last-read-notify",
            notifies[0].id
          );
        },
      });
    } else {
      // 此通知已阅读且并非手动触发
      // nothing to do
    }
  });
}
