import { createApp } from "vue";
import Main from "./components/Main.vue";
import WriteHwt from "./components/WriteHwt.vue";
import router from "./route";
import checkUpdate from "./ts/CheckUpdate";
import ConfigOperations from "./ts/Config/ConfigOperations";
import mainStyle from "./style/MainStyle";
import wangEditor from "./style/WangEditor";
import LoadResource from "./ts/LoadResource";
import log from "./ts/Log";
import CheckUsingOld from "./ts/CheckUsingOld";

ConfigOperations.initConfig();
main();

function main() {
  const href = window.location.href;
  if (ConfigOperations.readUserConfig()["back-to-old"].value === false) {
    log("vue version enabled");
    if (href.indexOf("main.jsp") !== -1) {
      log("enter page main.jsp");
      checkUpdate();
      removeTags();
      LoadResource.loadCSS(mainStyle);
      createApp(Main).use(router).mount("body");
    } else if (href.indexOf("write.jsp") !== -1) {
      log("enter page write.jsp");
      removeTags();
      LoadResource.loadCSS(mainStyle);
      LoadResource.loadCSS(wangEditor);
      console.log(document.querySelectorAll("body"));
      createApp(WriteHwt).mount("body");
    }
  } else {
    log("script version enabled");
    if (href.indexOf("main.jsp") !== -1) {
      checkUpdate();
      CheckUsingOld();
    }
  }
}

function removeTags() {
  log("tags removed");
  document
    .querySelectorAll("head link, head script")
    .forEach((n: HTMLElement) => {
      n.remove();
    });
}

function hide() {
  document;
}
