<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>更新日志</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="fetchUpdateLog"
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
    <el-scrollbar height="125px">
      <div v-load="loadingStatus" v-html="log"></div>
    </el-scrollbar>
    <div class="full-log">
      <el-link
        href="https://github.com/ZiuChen/NO-FLASH-Upload/blob/master/doc/update_log.md"
        type="primary"
        target="_blank"
      >
        查看完整更新日志
      </el-link>
    </div>
  </el-card>
</template>

<script>
import API from "@/request/API";
export default {
  mounted() {
    this.fetchUpdateLog();
  },
  data() {
    return {
      log: ``,
      loadingStatus: true,
    };
  },
  methods: {
    async fetchUpdateLog() {
      this.loadingStatus = true;
      this.log = await API.getScriptUpdateLog().then((res) => {
        this.loadingStatus = false;
        return res;
      });
    },
  },
};
</script>

<style scoped>
.full-log {
  text-align: right;
}
</style>
