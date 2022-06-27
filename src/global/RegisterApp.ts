import { createApp } from "vue";
import App from "../components/App.vue";
import router from "../route";
import { ElLoading } from "element-plus/lib/components/loading/index";
import "element-plus/theme-chalk/base.css";
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-notification.css";
import {
  ElAside,
  ElBadge,
  ElButton,
  ElButtonGroup,
  ElCard,
  ElCol,
  ElContainer,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElHeader,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
  ElUpload,
} from "element-plus";
import { ArrowUpBold, ArrowDownBold } from "@element-plus/icons-vue";

const components = [
  ElAside,
  ElBadge,
  ElButton,
  ElButtonGroup,
  ElCard,
  ElCol,
  ElContainer,
  ElDescriptions,
  ElDescriptionsItem,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElHeader,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElOption,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTableColumn,
  ElTag,
  ElUpload,
];
const Icons = [ArrowUpBold, ArrowDownBold];

const registerApp = () => {
  const app = createApp(App);
  for (const icon of Icons) {
    app.component(icon.name, icon);
  }
  for (const c of components) {
    const name = transferCamel(c.name);
    require(`element-plus/theme-chalk/${name}.css`);
    app.component(name, c);
  }
  app.directive("load", ElLoading.directive);
  app.use(router).mount("body");
};
export default registerApp;

function transferCamel(camel: string): string {
  return camel
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .slice(1);
}
