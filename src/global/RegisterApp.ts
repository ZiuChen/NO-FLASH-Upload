import { createApp } from "vue";
import App from "../components/App.vue";
import router from "../route";
import { ElLoading } from "element-plus/lib/components/loading/index";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-notification.css";

const registerApp = () => {
  const app = createApp(App);
  app.directive("load", ElLoading.directive);
  app.use(router).mount("body");
};
export default registerApp;
