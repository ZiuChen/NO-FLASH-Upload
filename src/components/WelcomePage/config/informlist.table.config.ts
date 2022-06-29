import type { ITableConfig } from "@/base-ui/table/types";

export const TableConfig: ITableConfig = {
  title: "系统通知",
  propList: [
    {
      prop: "notifyName",
      label: "通知",
      minWidth: "250",
      slotName: "notifyName",
    },
    { prop: "pubTime", label: "发布时间", minWidth: "200", align: "right" },
  ],
  tableHeight: "400px",
  showDragHandler: true,
};
