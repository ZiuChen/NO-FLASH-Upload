import { loadCSS } from "@/utils/LoadResource";
import isUsingOld from "@/hooks/CheckUsingOld";
import ConfigOperations from "@/hooks/Config/ConfigOperations";
import registerApp from "@/global/RegisterApp";

const css = [
  "https://fastly.jsdelivr.net/npm/@wangeditor/editor@latest/dist/css/style.css",
];

const atMainPage = window.location.href.indexOf("personal.do") !== -1;

ConfigOperations.initConfig();
if (!isUsingOld() && atMainPage) {
  // remove other tags
  document.querySelectorAll("head link, head script").forEach((n) => {
    n.remove();
  });
  // normalize page style
  document.body.style.margin = "0";
  // insert lib style
  css.map((style) => loadCSS(style));
  // vue init
  registerApp();
}
