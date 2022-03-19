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
  if (!CheckUsingOld()) {
    log("main", "启用新版", "info");
    if (href.indexOf("personal.do") !== -1) {
      log("main", "进入personal.do", "info");
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
    log("main", "启用旧版", "info");
    if (href.indexOf("personal.do") !== -1) {
      checkUpdate();
    }
  }
}

function removeTags() {
  document.querySelectorAll("head link, head script").forEach((n) => {
    n.remove();
  });
}
