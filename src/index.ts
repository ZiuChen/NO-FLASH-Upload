import { createApp } from "vue";
import App from "./components/Main.vue";
import router from './route'

document.querySelectorAll("head link, head script").forEach((n) => {
  n.remove();
});
createApp(App)
.use(router)
.mount("body");
