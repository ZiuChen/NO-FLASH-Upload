<template>
  <el-table
    height="400px"
    :data="tableData"
    :default-sort="{ prop: 'remain', order: 'ascending' }"
    :row-class-name="tableRowClassName"
    style="width: 100%"
  >
    <el-table-column
      prop="remain"
      label="剩余时间"
      sortable
      align="center"
      :formatter="remainDayFormatter"
    />
    <el-table-column prop="name" label="作业标题">
      <template #default="scope">
        <el-link
          :href="taskAnswerUrl + scope.row.hwtID"
          :underline="false"
          target="_blank"
          >{{ scope.row.name }}</el-link
        >
      </template>
    </el-table-column>
    <el-table-column prop="date" label="截止日期" />
    <el-table-column
      prop="lesson"
      label="Lesson"
      :filters="toFilterArray(PropHwtList)"
      :filter-method="filterLesson"
      ><template #default="scope">
        <el-tag
          class="lesson-tag"
          :type="getTagType()"
          @click="handleTagClick(scope.row.lid)"
          disable-transitions
        >
          {{ scope.row.lesson }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          size="small"
          @click="handleSubmitClick(scope.$index, scope.row)"
          >交作业</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      tableData: [],
      PropHwtList: [],
      lessonPageUrl: `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=`,
      taskAnswerUrl: `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=`,
    };
  },
  props: ["hwts"],
  watch: {
    hwts: async function (val) {
      this.PropHwtList = val;
      console.log(val);
      // Async Trap: cannot async in forEach
      for (let remindHwt of this.PropHwtList) {
        await getInfo.visitLessonPage(remindHwt.id).then(async () => {
          await getInfo.getHwtInfo(remindHwt.id).then((res) => {
            res.forEach((item) => {
              this.hwtObj2TableObj(item, remindHwt).then((res) => {
                this.appendTableData(res);
              });
            });
            return res;
          });
        });
      }
    },
  },
  methods: {
    filterLesson(value, row) {
      return row.lesson === value;
    },
    toFilterArray(hwtArray) {
      let rtnArray = [];
      hwtArray.forEach((item) => {
        let obj = { text: "", value: "" };
        obj.text = item.name;
        obj.value = item.name;
        rtnArray.push(obj);
      });
      return rtnArray;
    },
    getTagType() {
      let types = ["success", "info", "warning", "danger"];
      // return types[Math.floor(Math.random() * 4)];
      return types[0];
    },
    tableDataFilter(tableObj, start, end) {
      // start: lager, end: smaller
      // won't add to tableData
      return true; // FIXME: REMOVE THIS
      if (tableObj.remain < start && tableObj.remain > end) return true;
      else false;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.remain <= 3 && row.remain > 0) {
        return "warning-row";
      } else if (row.remain < 0) {
        return "info-row";
      } else if (row.remain === 0) {
        return "danger-row";
      } else {
        return "success-row";
      }
    },
    remainDayFormatter(row, column) {
      if (row.remain < 0) {
        return `已过期${Math.abs(row.remain).toString()}天`;
      } else if (row.remain === 0) {
        return `今日截止`;
      } else if (row.remain > 0) {
        return `还有${row.remain}天截止`;
      }
    },

    async handleSubmitClick(index, row) {
      console.log(index, row);
      let url = `${this.taskAnswerUrl}${row.hwtID}`;
      window.open(url);
    },
    async handleTagClick(lid) {
      let url = `${this.lessonPageUrl}${lid}`;
      window.open(url);
    },
    async hwtObj2TableObj(hwtObj, remindHwt) {
      let tableObj = {
        remain: 0,
        name: "",
        date: "",
        lesson: "",
        lid: "",
        hwtID: "",
        able: false,
      };
      tableObj.remain = parseFloat(hwtObj.remainTime);
      tableObj.name = hwtObj.hwtName;
      tableObj.date = hwtObj.date;
      tableObj.lesson = remindHwt.name;
      tableObj.lid = remindHwt.id;
      tableObj.hwtID = hwtObj.hwtID;
      tableObj.able = hwtObj.able;
      return tableObj;
    },
    async appendTableData(tableObj) {
      if (this.tableDataFilter(tableObj, 15, -3)) {
        this.tableData.push(tableObj);
      } else {
        // do nothing
      }
    },
  },
};
</script>

<style>
.lesson-tag {
  cursor: pointer;
}

.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light);
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light);
}

.el-table .info-row {
  --el-table-tr-bg-color: var(--el-color-info-light);
}
</style>
