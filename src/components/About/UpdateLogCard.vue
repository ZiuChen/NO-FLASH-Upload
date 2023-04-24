<template>
  <ZUCard>
    <template #header>
      <span>更新日志</span>
      <el-button
        icon="Refresh"
        :loading="loadingStatus"
        :disabled="loadingStatus"
        @click="fetchUpdateLog"
        circle
      >
      </el-button>
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
  </ZUCard>
</template>

<script setup>
import API from "@/request/API";
import ZUCard from "@/base-ui/card";

const loadingStatus = ref(true);
const log = ref("");
const fetchUpdateLog = async () => {
  loadingStatus.value = true;
  log.value = await API.getScriptUpdateLog();
  loadingStatus.value = false;
};
fetchUpdateLog();
</script>

<style scoped>
.full-log {
  text-align: right;
}
</style>
