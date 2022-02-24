<template>
  <el-scrollbar height="450px">
    <el-table
      fixed
      :data="tableData"
      :default-sort="{ prop: 'remain', order: 'ascending' }"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column prop="remain" label="剩余时间" sortable width="100" />
      <el-table-column prop="name" label="作业标题" width="180" />
      <el-table-column prop="date" label="截止日期" width="180" />
      <el-table-column
        prop="lesson"
        label="Lesson"
        width="180"
        :filters="toFilterArray(PropHwtList)"
        :filter-method="filterLesson"
        ><template #default="scope">
          <el-tag :type="getTagType()" disable-transitions>{{
            scope.row.lesson
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleRowJump(scope.$index, scope.row)"
            >交作业</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      tableData: [],
      PropHwtList: [],
    };
  },
  props: ["hwts"],
  watch: {
    hwts: async function (val) {
      this.PropHwtList = val;
      // Async Trap: cannot async in forEach
      for (let remindHwt of this.PropHwtList) {
        await getInfo.visitLessonPage(remindHwt.id).then(async () => {
          await getInfo.getHwtInfo(remindHwt.id).then((res) => {
            console.log(res);
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
      if (tableObj.remain < start && tableObj.remain > end) return true;
      else false;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.remain <= 3 && row.remain > 0) {
        return "warning-row";
      } else if (row.remain < 0) {
        return "success-row";
      } else if (row.remain === 0) {
        return "danger-row";
      } else {
        return "info-row";
      }
    },
    async handleRowJump(index, row) {
      console.log(index, row);
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
      if (this.tableDataFilter(tableObj, 15, -7)) {
        this.tableData.push(tableObj);
      } else {
        // do nothing
      }
    },
  },
};
</script>

<style>
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-lighter);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-lighter);
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-lighter);
}

.el-table .info-row {
  --el-table-tr-bg-color: var(--el-color-info-lighter);
}
</style>
