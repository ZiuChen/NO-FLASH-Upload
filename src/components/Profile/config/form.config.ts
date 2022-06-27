import { IFormConfig } from "@/base-ui/form/types";
import Config from "@/hooks/Config/Config";

const FormConfig: IFormConfig = {
  formItems: [
    {
      field: "config-back-to-old",
      type: "switch",
      label: "回到旧版",
    },
  ],
  labelPosition: "top",
  colLayout: {
    xl: 6,
    lg: 6,
    md: 6,
    sm: 8,
    xs: 8,
  },
  itemStyle: {
    "text-align": "center",
  },
};

FormConfig.formItems.length = 0;
for (const [key, item] of Object.entries(Config.userConfig)) {
  if (key === "data-last-read-notify") continue;
  FormConfig.formItems.push({
    field: key,
    type: item.type as any,
    label: item.name,
  });
}

export { FormConfig };
