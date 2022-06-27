type IFormType = "input" | "select" | "switch";

export interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  placeholder?: string;
  // 针对select
  options?: any[];
  // 针对特殊的属性
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IFormConfig {
  formItems: IFormItem[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: any;
  labelPosition?: string;
}
