import { createApp } from "vue";
import Main from "./components/Main.vue";
// import Notify from "./components/Notify.vue";
import router from "./route";
import checkUpdate from "./ts/CheckUpdate";
import initConfig from "./ts/Config/InitConfig";
import mainStyle from "./style/MainStyle";
import loadCSS from "./ts/LoadCSS";
import readConfig from "./ts/Config/ReadConfig";
import log from "./ts/Log";

initConfig();
main();

function main() {
  const href = window.location.href;
  if (readConfig().userConfig["backToOld"].value === false) {
    if (href.indexOf("main.jsp") !== -1) {
      init();
      loadCSS(mainStyle);
      createApp(Main).use(router).mount("body");
    } else if (href.indexOf("course_meswrap.jsp") !== -1) {
      // notify detail
      // init();
      // createApp(Notify).mount("body");
    }
  } else {
    if (href.indexOf("main.jsp") !== -1) {
      checkUpdate();
    }
    log("back to old.");
  }
}

function init() {
  document
    .querySelectorAll("head link, head script")
    .forEach((n: HTMLElement) => {
      n.remove();
    });
}
