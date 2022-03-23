<template>
  <el-card class="hwt-list" shadow="always">
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
      :data="tableData"
      :default-sort="{ prop: 'remain', order: configSort }"
      :row-class-name="tableRowClassName"
      v-loading="loadingStatus"
      style="width: 100%"
    >
      <el-table-column
        prop="remain"
        label="剩余时间"
        align="center"
        :filters="[
          { text: '近期截止', value: '近期截止' },
          { text: '今日截止', value: '今日截止' },
          { text: '未过期', value: '未过期' },
          { text: '已过期', value: '已过期' },
        ]"
        :filter-method="filterRemain"
        :filtered-value="checkedFilters"
        :formatter="remainDayFormatter"
        min-width="120px"
        sortable
      />
      <el-table-column
        prop="name"
        label="作业标题"
        align="center"
        min-width="150px"
      >
        <template #default="scope">
          <el-link
            @click="handleHwtNameClick(scope.$index, scope.row)"
            :underline="false"
            target="_blank"
            >{{ scope.row.name }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column label="提交状态" align="center">
        <template #default="scope">
          <el-tag :type="hadFormatter(scope.row).tag" disable-transitions>
            {{ hadFormatter(scope.row).text }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="截止日期"
        align="center"
        min-width="150px"
        sortable
      />
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
      <el-table-column label="能否提交" align="center">
        <template #default="scope">
          <el-tag :type="ableFormatter(scope.row.able).tag" disable-transitions>
            {{ ableFormatter(scope.row.able).text }}</el-tag
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
import API from "../../ts/API";
import ConfigOperations from "../../ts/Config/ConfigOperations";

export default {
  created() {
    this.getLessonList();
  },
  data() {
    return {
      lessonList: [],
      tableData: [],
      checkedFilters: [
        ConfigOperations.readUserConfig()["config-hwt-default-filter"].value,
      ],
      loadingStatus: true,
      configRange:
        ConfigOperations.readUserConfig()["config-hwt-recent-range"].value,
      configSort:
        ConfigOperations.readUserConfig()["config-hwt-default-sort"].value,
      lessonPageUrl: `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=`,
      taskAnswerUrl: `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=`,
      hwtWriteUrl: `http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid=`,
    };
  },
  watch: {
    lessonList: async function (val) {
      // Async Trap: cannot async in forEach
      for (let lesson of this.lessonList) {
        await API.getHwtList(lesson.id).then((hwtList) => {
          for (let hwt of hwtList) {
            this.hwtObj2TableObj(lesson, hwt).then((tableObject) => {
              this.appendTableData(tableObject);
            });
          }
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
          return (
            row.remain <= this.configRange.max &&
            row.remain >= this.configRange.min
          );
        case "未过期":
          return row.remain >= 0;
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
        return `还有${row.remain}天截止`;
      }
    },
    ableFormatter(able) {
      if (able === true) {
        return {
          text: "允许提交",
          tag: "success",
        };
      } else {
        return {
          text: "禁止提交",
          tag: "info",
        };
      }
    },
    hadFormatter(row) {
      if (row.remain >= 0) {
        // 未过期
        if (row.answerStatus === undefined) {
          return {
            text: "未提交",
            tag: "warning",
          };
        } else {
          // 只要不是 undefined 一定是提交过的
          return {
            text: "已提交",
            tag: "success",
          };
        }
      } else {
        // 已过期
        if (row.answerStatus === undefined) {
          return {
            text: "未提交",
            tag: "warning",
          };
        } else {
          return {
            text: "已提交",
            tag: "success",
          };
        }
      }
    },
    async getLessonList() {
      this.lessonList = await API.getLessonList();
    },
    async handleSubmitClick(index, row) {
      this.$router.push(`/lesson/${row.lid}/submit/${row.hwtID}?able=true`);
    },
    async handleReviewClick(index, row) {
      this.$router.push(`/lesson/${row.lid}/submit/${row.hwtID}?able=false`);
    },
    async handleHwtNameClick(index, row) {
      this.$router.push(
        `/lesson/${row.lid}/submit/${row.hwtID}?able=${row.able}`
      );
    },
    async handleTagClick(lid) {
      let url = `${this.lessonPageUrl}${lid}`;
      window.open(url);
    },
    async hwtObj2TableObj(lesson, hwt) {
      return {
        lid: lesson.id,
        lesson: lesson.name,
        hwtID: hwt.id,
        name: hwt.title,
        date: hwt.deadLine,
        remain: hwt.remain,
        able: hwt.able,
        publisher: hwt.publisher,
        mutualTask: hwt.mutualTask,
        answerStatus: hwt.answerStatus,
        showGrade: hwt.showGrade, // answerStatus == true || submitStruts == false
      };
    },
    async appendTableData(tableObject) {
      if (this.tableDataFilter(tableObject, 365, -365)) {
        this.tableData.push(tableObject);
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
