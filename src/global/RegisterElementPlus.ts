import { App } from "vue";
import "element-plus/theme-chalk/base.css";
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

export function registerElementPlus(app: App) {
  for (const c of components) {
    const name = transferCamel(c.name);
    require(`element-plus/theme-chalk/${name}.css`);
    app.component(name, c);
  }
}

function transferCamel(camel: string): string {
  return camel
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .slice(1);
}
