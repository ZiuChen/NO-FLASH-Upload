import { createApp } from "vue";
import Main from "./components/Main.vue";
import router from "./route";
import checkUpdate from "./ts/CheckUpdate";
import ConfigOperations from "./ts/Config/ConfigOperations";
import mainStyle from "./style/MainStyle";
import loadCSS from "./ts/LoadCSS";
import log from "./ts/Log";
import CheckUsingOld from "./ts/CheckUsingOld";

ConfigOperations.initConfig();
main();

function main() {
  const href = window.location.href;
  if (ConfigOperations.readUserConfig()["back-to-old"].value === false) {
    log("vue version enabled");
    if (href.indexOf("main.jsp") !== -1) {
      checkUpdate();
      init();
      loadCSS(mainStyle);
      createApp(Main).use(router).mount("body");
    } else if (href.indexOf("course_meswrap.jsp") !== -1) {
      // notify detail
      // init();
      // createApp(Notify).mount("body");
    }
  } else {
    log("script version enabled");
    if (href.indexOf("main.jsp") !== -1) {
      checkUpdate();
      CheckUsingOld();
    }
  }
}

function init() {
  document
    .querySelectorAll("head link, head script")
    .forEach((n: HTMLElement) => {
      n.remove();
    });
}
