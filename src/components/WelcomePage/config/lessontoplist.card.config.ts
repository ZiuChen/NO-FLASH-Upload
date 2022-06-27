import type { ICardConfig } from "@/base-ui/card/types";

export const CardConfig: ICardConfig = {
  title: "访问排行",
  propList: [
    {
      prop: "id",
      label: "课程ID",
      minWidth: "80",
      align: "center",
    },
    {
      prop: "course",
      label: "课程名",
      minWidth: "120",
      align: "center",
    },
    {
      prop: "teacher",
      label: "教师",
      minWidth: "80",
      align: "center",
    },
    {
      prop: "visit",
      label: "访问数",
      minWidth: "80",
      align: "center",
      slotName: "visit",
    },
  ],
  tableHeight: "400px",
};
