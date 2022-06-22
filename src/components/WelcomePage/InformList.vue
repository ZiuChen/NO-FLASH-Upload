<template>
  <el-card class="inform-list" shadow="always">
    <template #header>
      <div class="card-header">
        <span>系统通知</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="getInformList"
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
      :data="tableData"
      height="400px"
      v-load="loadingStatus"
      style="width: 100%"
    >
      <el-table-column prop="notifyName" label="通知">
        <template #default="scope">
          <el-link
            :underline="false"
            :href="informUrl + scope.row.id"
            :title="scope.row.notifyName"
            target="_blank"
            >{{ scope.row.notifyName }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="pubTime" label="发布时间" align="right" />
    </el-table>
  </el-card>
</template>

<script>
import API from "@/ts/API";
export default {
  data() {
    return {
      tableData: [],
      loadingStatus: true,
      informUrl: `http://cc.bjtu.edu.cn:81/meol/common/inform/message_content.jsp?nid=`,
    };
  },
  created() {
    this.getInformList();
  },
  methods: {
    async getInformList() {
      this.tableData = [];
      this.loadingStatus = true;
      this.tableData = await API.getInformList().then((res) => {
        this.loadingStatus = false;
        return res;
      });
    },
  },
};
</script>

<style scoped></style>
