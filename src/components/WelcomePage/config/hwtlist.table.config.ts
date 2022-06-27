import type { ITableConfig } from "@/base-ui/table/types";

export const TableConfig: ITableConfig = {
  title: "作业列表",
  propList: [
    {
      prop: "remain",
      label: "剩余时间",
      minWidth: "100",
      align: "center",
      slotName: "remain",
      sortable: true,
    },
    {
      prop: "title",
      label: "作业标题",
      minWidth: "200",
      align: "center",
      slotName: "title",
    },
    {
      prop: "answerStatus",
      label: "提交状态",
      minWidth: "80",
      align: "center",
      slotName: "answerStatus",
    },
    {
      prop: "courseId",
      label: "课程名",
      minWidth: "150",
      align: "center",
      slotName: "courseId",
      sortable: true,
    },
    {
      prop: "deadLine",
      label: "截止日期",
      minWidth: "150",
      align: "center",
    },
    {
      prop: "mark",
      label: "取得分数",
      minWidth: "80",
      align: "center",
      slotName: "mark",
      sortable: true,
    },
    {
      label: "操作",
      minWidth: "80",
      align: "center",
      slotName: "handler",
    },
  ],
  tableHeight: "550",
  defaultSort: {
    prop: "remain",
    order: "descending",
  },
  rowClassName: ({ row }) => {
    if (row.able === false) {
      return "info-row";
    } else {
      if (row.remain <= 3 && row.remain > 0) {
        return "warning-row";
      } else if (row.remain === 0) {
        return "danger-row";
      } else {
        return "success-row";
      }
    }
  },
};
