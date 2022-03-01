<template>
  <el-card class="hwt-list" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>作业列表</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="refreshHwtList"
          circle
        >
          <el-icon
            ><svg
              t="1645775950545"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21783"
              width="200"
              height="200"
            >
              <path
                d="M753.066667 270.933333A339.541333 339.541333 0 0 0 512 170.666667a341.333333 341.333333 0 0 0-341.333333 341.333333 341.333333 341.333333 0 0 0 341.333333 341.333333c159.146667 0 291.84-108.8 329.813333-256h-88.746666A255.573333 255.573333 0 0 1 512 768a256 256 0 0 1-256-256 256 256 0 0 1 256-256c70.826667 0 133.973333 29.44 180.053333 75.946667L554.666667 469.333333h298.666666V170.666667l-100.266666 100.266666z"
                fill=""
                p-id="21784"
              ></path></svg
          ></el-icon>
        </el-button>
      </div>
    </template>
    <el-table
      ref="tableRef"
      height="400px"
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column
        prop="remain"
        label="剩余时间"
        align="center"
        :filters="[
          { text: '今日截止', value: '今日截止' },
          { text: '近期截止', value: '近期截止' },
          { text: '未过期', value: '未过期' },
          { text: '已过期', value: '已过期' },
        ]"
        :filter-method="filterRemain"
        :filtered-value="checkedFilters"
        :formatter="remainDayFormatter"
      />
      <el-table-column prop="name" label="作业标题" align="center">
        <template #default="scope">
          <el-link
            :href="taskAnswerUrl + scope.row.hwtID"
            :underline="false"
            target="_blank"
            >{{ scope.row.name }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="date" label="截止日期" align="center" sortable />
      <el-table-column
        prop="lesson"
        label="课程名"
        align="center"
        :filters="toFilterArray(lessonList)"
        :filter-method="filterLesson"
        ><template #default="scope">
          <el-tag
            class="lesson-tag"
            :title="scope.row.lesson"
            type="success"
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
            v-if="scope.row.able"
            @click="handleSubmitClick(scope.$index, scope.row)"
            >交作业
          </el-button>
          <el-button
            size="small"
            v-if="!scope.row.able"
            @click="handleReviewClick(scope.$index, scope.row)"
            >看作业
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import getInfo from "../../ts/GetInfo";

export default {
  created() {
    this.getLessonList();
  },
  data() {
    return {
      lessonList: [],
      tableData: [],
      checkedFilters: ["近期截止"],
      loadingStatus: true,
      lessonPageUrl: `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=`,
      taskAnswerUrl: `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=`,
      hwtWriteUrl: `http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid=`,
    };
  },
  watch: {
    lessonList: async function (val) {
      // Async Trap: cannot async in forEach
      for (let remindHwt of this.lessonList) {
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
      this.loadingStatus = false;
    },
  },
  methods: {
    filterLesson(value, row) {
      return row.lesson === value;
    },
    filterRemain(value, row) {
      switch (value) {
        case "今日截止":
          return row.remain === 0;
        case "近期截止":
          return row.remain <= 15 && row.remain >= -3;
        case "未过期":
          return row.remain > 0;
        case "已过期":
          return row.remain < 0;
      }
      // return row.lesson === value;
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
    tableDataFilter(tableObj, start, end) {
      // start: larger, end: smaller
      // won't add to tableData
      if (tableObj.remain < start && tableObj.remain > end) return true;
      else false;
    },
    tableRowClassName({ row, rowIndex }) {
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
    remainDayFormatter(row, column) {
      if (row.remain < 0) {
        return `已过期${Math.abs(row.remain).toString()}天`;
      } else if (row.remain === 0) {
        return `今日截止`;
      } else if (row.remain > 0) {
        return `${row.remain}天`;
      }
    },
    async getLessonList() {
      this.lessonList = await getInfo.getLessonInfo().then((res) => {
        return res;
      });
    },
    async handleSubmitClick(index, row) {
      this.$router.push(`/lesson/${row.lid}/submit/${row.hwtID}?able=true`);
    },
    async handleReviewClick(index, row) {
      this.$router.push(`/lesson/${row.lid}/submit/${row.hwtID}?able=false`);
    },
    async handleTagClick(lid) {
      let url = `${this.lessonPageUrl}${lid}`;
      window.open(url);
    },
    async hwtObj2TableObj(hwtObj, remindHwt) {
      let tableObj = {
        remain: parseFloat(hwtObj.remainTime),
        name: hwtObj.hwtName,
        date: hwtObj.date,
        hwtID: hwtObj.hwtID,
        able: hwtObj.able,
        lesson: remindHwt.name,
        lid: remindHwt.id,
      };
      return tableObj;
    },
    async appendTableData(tableObj) {
      if (this.tableDataFilter(tableObj, 365, -365)) {
        this.tableData.push(tableObj);
      } else {
        // do nothing
      }
    },
    async refreshHwtList() {
      this.loadingStatus = true;
      this.tableData = [];
      this.getLessonList();
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
