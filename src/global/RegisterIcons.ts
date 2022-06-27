import { App } from "vue";
import { ArrowUpBold, ArrowDownBold } from "@element-plus/icons-vue";

const Icons = [ArrowUpBold, ArrowDownBold];

export function registerIcons(app: App) {
  for (const icon of Icons) {
    app.component(icon.name, icon);
  }
}
