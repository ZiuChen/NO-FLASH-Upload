import checkUsingOld from "../hooks/CheckUsingOld";
import registerApp from "./RegisterApp";
import loadResources from "./LoadResources";
import ConfigOperations from "../hooks/Config/ConfigOperations";

const atMainPage = window.location.href.indexOf("personal.do") !== -1;
const index = () => {
  ConfigOperations.initConfig();
  if (checkUsingOld()) {
  } else {
    if (atMainPage) {
      removeTags();
      loadResources();
      registerApp();
    }
  }
};

function removeTags() {
  document.querySelectorAll("head link, head script").forEach((n) => {
    n.remove();
  });
}
export default index;
