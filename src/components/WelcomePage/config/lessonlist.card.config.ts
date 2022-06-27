import type { ICardConfig } from "@/base-ui/card/types";

export const CardConfig: ICardConfig = {
  title: "课程列表",
  propList: [
    {
      prop: "number",
      label: "课程号",
      minWidth: "100",
      align: "center",
    },
    {
      prop: "name",
      label: "课程名",
      minWidth: "150",
      align: "center",
      slotName: "name",
    },
    {
      prop: "teacher",
      label: "教师",
      minWidth: "100",
      align: "center",
    },
    {
      prop: "academy",
      label: "学院",
      minWidth: "150",
      align: "center",
    },
    {
      label: "操作",
      minWidth: "100",
      align: "center",
      slotName: "handler",
    },
  ],
  tableHeight: "400px",
};
