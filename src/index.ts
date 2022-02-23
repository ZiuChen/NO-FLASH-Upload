import { createApp } from "vue";
import Main from "./components/Main.vue";
// import Notify from "./components/Notify.vue";
import router from "./route";
import checkUpdate from "./function/CheckUpdate";
import mainStyle from "./style/MainStyle";
import loadCSS from "./function/LoadCSS";

const href = window.location.href;

if (href.indexOf("main.jsp") !== -1) {
  init();
  loadCSS(mainStyle);
  createApp(Main).use(router).mount("body");
  checkUpdate();
} else if (href.indexOf("course_meswrap.jsp") !== -1) {
  // notify detail
  // init();
  // createApp(Notify).mount("body");
}

function init() {
  document
    .querySelectorAll("head link, head script")
    .forEach((n: HTMLElement) => {
      n.remove();
    });
}
