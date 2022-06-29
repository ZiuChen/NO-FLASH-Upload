import type { ITableConfig } from "@/base-ui/table/types";
import { TableConfig as preTableConfig } from "@/components/WelcomePage/config/lessonlist.table.config";

export const TableConfig: ITableConfig = {
  ...preTableConfig,
  showDragHandler: false,
};
