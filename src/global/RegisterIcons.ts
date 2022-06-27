import { App } from "vue";
import {
  ArrowUpBold,
  ArrowDownBold,
  Refresh,
  Platform,
  Menu,
  Open,
  MoreFilled,
  CircleCloseFilled,
  ZoomIn,
  ZoomOut,
} from "@element-plus/icons-vue";

const Icons = [
  ArrowUpBold,
  ArrowDownBold,
  Refresh,
  Platform,
  Menu,
  Open,
  MoreFilled,
  CircleCloseFilled,
  ZoomIn,
  ZoomOut,
];

export function registerIcons(app: App) {
  for (const icon of Icons) {
    app.component(icon.name, icon);
  }
}
