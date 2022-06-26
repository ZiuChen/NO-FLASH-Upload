import type { ICardConfig } from "@/base-ui/card/types";

export const CardConfig: ICardConfig = {
  title: "插件列表",
  propList: [
    { prop: "name", label: "插件名", minWidth: "100" },
    { prop: "description", label: "描述", minWidth: "200" },
    { prop: "author", label: "作者", minWidth: "100", align: "center" },
    {
      prop: "version",
      label: "版本",
      minWidth: "80",
      align: "center",
      slotName: "version",
    },
    {
      prop: "status",
      label: "可用性",
      minWidth: "80",
      align: "center",
      slotName: "status",
    },
    {
      label: "操作",
      minWidth: "80",
      align: "center",
      slotName: "handler",
    },
  ],
};
