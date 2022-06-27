import { App } from "vue";
import { ArrowUpBold, ArrowDownBold, Refresh } from "@element-plus/icons-vue";

const Icons = [ArrowUpBold, ArrowDownBold, Refresh];

export function registerIcons(app: App) {
  for (const icon of Icons) {
    app.component(icon.name, icon);
  }
}
