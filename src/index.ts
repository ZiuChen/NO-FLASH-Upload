import isUsingOld from "@/hooks/CheckUsingOld";
import ConfigOperations from "@/hooks/Config/ConfigOperations";
import registerApp from "@/global/RegisterApp";

const atMainPage = window.location.href.indexOf("personal.do") !== -1;

ConfigOperations.initConfig();
if (!isUsingOld() && atMainPage) {
  // remove other tags
  document.querySelectorAll("head link, head script").forEach((n) => {
    n.remove();
  });
  // normalize page style
  document.body.style.margin = "0";
  // vue init
  registerApp();
}
