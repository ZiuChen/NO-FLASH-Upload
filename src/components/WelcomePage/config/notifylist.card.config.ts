import type { ICardConfig } from "@/base-ui/card/types";

export const CardConfig: ICardConfig = {
  title: "未读通知",
  propList: [
    {
      prop: "notifyName",
      label: "通知名",
      minWidth: "150",
      slotName: "notifyName",
    },
    { prop: "lessonName", label: "课程名", minWidth: "150", align: "center" },
    {
      prop: "hadRead",
      label: "阅读状态",
      align: "center",
      slotName: "hadRead",
    },
    {
      prop: "pubTime",
      label: "发布时间",
      minWidth: "180",
      align: "center",
      sortable: true,
    },
  ],
  tableHeight: "400px",
  defaultSort: {
    prop: "pubTime",
    order: "descending",
  },
};
