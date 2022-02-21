import { createApp } from "vue";
import Main from "./components/Main.vue";
// import Notify from "./components/Notify.vue";
import router from "./route";

const href = window.location.href;

if (href.indexOf("main.jsp") !== -1) {
  init();
  createApp(Main).use(router).mount("body");
} else if (href.indexOf("course_meswrap.jsp") !== -1) {
  // init();
  // createApp(Notify).mount("body");
}

function init() {
  document
    .querySelectorAll("head link, head script")
    .forEach((n: HTMLElement) => {
      n.remove();
    });
  document.querySelectorAll("body").forEach((n: HTMLBodyElement) => {
    n.style.margin = "0";
    n.style.overflowX = "hidden";
    n.style.overflowY = "hidden";
    n.style.fontFamily =
      "Helvetica, Tahoma, Arial, 'Heiti SC', 'Microsoft YaHei', 'WenQuanYi Micro Hei'";
    n.style.fontWeight = "lighter";
    n.style.textShadow = "0px 1px 1px #cccccc";
  });
}
