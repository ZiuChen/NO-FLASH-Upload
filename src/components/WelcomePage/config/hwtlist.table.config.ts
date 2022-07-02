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
      filters: [
        {
          text: "近期截止",
          value: 1,
        },
        {
          text: "未过期",
          value: 0,
        },
        {
          text: "已过期",
          value: -1,
        },
      ],
      "filtered-value": [1],
      "filter-method": (value, row) => {
        switch (value) {
          case 1:
            return row.remain <= 15 && row.remain >= -2;
          case 0:
            return row.remain >= 0;
          case -1:
            return row.remain < 0;
        }
      },
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
  defaultSort: {
    prop: "remain",
    order: "ascending",
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
  showDragHandler: true,
};
