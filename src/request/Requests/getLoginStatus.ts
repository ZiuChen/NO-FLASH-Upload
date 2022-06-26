import { ElNotification } from "element-plus";
import getUserInfo from "./getUserInfo";

export default async function getLoginStatus() {
  return await getUserInfo().then((res) => {
    if (res === undefined) {
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "warning",
        duration: 0,
        message: `获取用户信息失败，请检查登录状态是否过期`,
        onClick: () => {
          notify.close();
          location.href = `http://cc.bjtu.edu.cn:81/meol/index.do`;
        },
      });
      return false;
    } else {
      return true;
    }
  });
}
