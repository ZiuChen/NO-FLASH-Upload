import { createApp } from "vue";
import App from "../components/App.vue";
import router from "../route";
import { registerIcons } from "./RegisterIcons";
import { ElLoading } from "element-plus";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-notification.css";
import "element-plus/theme-chalk/el-message-box.css";

const registerApp = () => {
  const app = createApp(App);
  app.directive("load", ElLoading.directive);
  app.use(registerIcons).use(router).mount("body");
};
export default registerApp;
