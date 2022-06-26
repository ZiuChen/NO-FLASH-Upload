import type { ICardConfig } from "@/base-ui/card/types";

export const CardConfig: ICardConfig = {
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
};
