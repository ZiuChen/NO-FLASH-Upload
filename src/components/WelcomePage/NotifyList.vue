<template>
  <el-card class="notify-list" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>未读通知</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="refreshNotifyList"
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
    <!-- <el-empty v-if="notifyEmpty" description="没有未读通知哦~"></el-empty> -->
    <el-table
      :data="tableData"
      height="400px"
      :default-sort="{ prop: 'pubTime', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column prop="notifyName" label="通知名" width="200px">
        <template #default="scope">
          <el-link
            :href="`http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/course_meswrap.jsp?courseId=${scope.row.lid}&nid=${scope.row.nid}`"
            :underline="false"
            target="_blank"
            >{{ scope.row.notifyName }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="lessonName" label="课程名" align="center" />
      <el-table-column
        prop="hadRead"
        label="阅读状态"
        align="center"
        :formatter="hadReadformatter"
        :filters="[
          { text: '已阅读', value: 'true' },
          { text: '未阅读', value: 'false' },
        ]"
        :filter-method="hadReadfilterHandler"
        :filtered-value="checkedFilters"
      />
      <el-table-column prop="pubTime" label="发布时间" sortable="" />
    </el-table>
  </el-card>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  created() {
    this.getRemindNotifies();
  },
  data() {
    return {
      notifies: [],
      tableData: [],
      checkedFilters: ["false"],
      loadingStatus: true,
    };
  },
  methods: {
    async getRemindNotifies() {
      this.tableData = [];
      this.notifies = await getInfo.getRemindInfo().then(async (res) => {
        this.loadingStatus = false;
        for (let lesson of res.notify) {
          await getInfo.getNotifyList(lesson.id).then((notifies) => {
            notifies.forEach((notify) => {
              this.tableData.push({
                lid: lesson.id,
                lessonName: lesson.name,
                notifyName: notify.notifyName,
                pubTime: notify.pubTime,
                nid: notify.id,
                hadRead: notify.hadRead,
              });
            });
          });
        }
      });
    },
    async refreshNotifyList() {
      this.loadingStatus = true;
      this.notifies = [];
      this.getRemindNotifies();
    },
    hadReadfilterHandler(value, row, column) {
      return row.hadRead.toString() === value;
    },
    hadReadformatter(row, column) {
      if (row.hadRead === true) {
        return "已阅读";
      } else {
        return "未阅读";
      }
    },
  },
};
</script>

<style scoped>
.el-collapse-item {
  font-size: 1.2em;
}
</style>
