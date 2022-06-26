type TPropListItem = {
  prop?: string;
  label: string;
  minWidth?: string;
  slotName?: string;
  align?: string;
};

export interface ICardConfig {
  title: string;
  propList: TPropListItem[];
  tableHeight?: string;
}
