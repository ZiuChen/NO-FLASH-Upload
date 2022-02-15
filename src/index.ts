import { createApp } from "vue";
import App from "./components/Main.vue";
import router from "./route";

document
  .querySelectorAll("head link, head script")
  .forEach((n: HTMLElement) => {
    n.remove();
  });

document.querySelectorAll("body").forEach((n: HTMLBodyElement) => {
  n.style.margin = "0";
  n.style.fontFamily =
    "Helvetica, Tahoma, Arial, 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei'";
  n.style.fontWeight = "lighter";
  n.style.textShadow = "0px 1px 1px #cccccc";
});

createApp(App).use(router).mount("body");
