import { createApp } from "vue";
import Main from "./components/Main.vue";
import router from "./route";
import checkUpdate from "./ts/CheckUpdate";
import ConfigOperations from "./ts/Config/ConfigOperations";
import mainStyle from "./style/MainStyle";
import LoadResource from "./ts/LoadResource";
import log from "./ts/Log";
import CheckUsingOld from "./ts/CheckUsingOld";

ConfigOperations.initConfig();
main();

function main() {
  const href = window.location.href;
  if (ConfigOperations.readUserConfig()["config-back-to-old"].value === false) {
    log("vue version enabled");
    if (href.indexOf("personal.do") !== -1) {
      log("enter page personal.do");
      checkUpdate();
      removeTags();
      LoadResource.loadLINK(
        `https://cdn.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css`
      );
      LoadResource.loadLINK(
        "https://cdn.jsdelivr.net/npm/@wangeditor/editor@latest/dist/css/style.css"
      );
      LoadResource.loadCSS(mainStyle);
      createApp(Main).use(router).mount("body");
    }
  } else {
    log("script version enabled");
    if (href.indexOf("personal.do") !== -1) {
      checkUpdate();
      CheckUsingOld();
    }
  }
}

function removeTags() {
  log("tags removed");
  document.querySelectorAll("head link, head script").forEach((n) => {
    n.remove();
  });
}
