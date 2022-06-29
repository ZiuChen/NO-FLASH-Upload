type TPropListItem = {
  prop?: string;
  label: string;
  minWidth?: string;
  slotName?: string;
  align?: string;
  sortable?: boolean;
  filters?: any[];
  "filtered-value"?: (-1 | 0 | 1)[];
  "filter-method"?: (value: any, row: any, column: any) => any;
};

type TSortItem = {
  prop: string;
  order?: string;
};

type TRow = {
  [key: string]: any;
};

export interface ITableConfig {
  title: string;
  propList: TPropListItem[];
  tableHeight?: string;
  defaultSort?: TSortItem;
  rowClassName?: (row: TRow) => any;
  showDragHandler?: boolean;
}
