import LoadResource from "../hooks/LoadResource";
import mainStyle from "../style/MainStyle";

const links = [
  "https://fastly.jsdelivr.net/npm/mdui@1.0.2/dist/css/mdui.min.css",
  "https://fastly.jsdelivr.net/npm/@wangeditor/editor@latest/dist/css/style.css",
];

const loadResources = () => {
  for (const link of links) {
    LoadResource.loadLINK(link);
  }
  LoadResource.loadCSS(mainStyle);
};

export default loadResources;
