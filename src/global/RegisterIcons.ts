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
  StarFilled,
  Promotion,
  BellFilled,
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
  StarFilled,
  Promotion,
  BellFilled,
];

export function registerIcons(app: App) {
  for (const icon of Icons) {
    app.component(icon.name, icon);
  }
}
