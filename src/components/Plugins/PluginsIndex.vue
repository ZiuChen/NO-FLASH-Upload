<template>
  <div class="plugin-index">
    <ZUCard v-bind="CardConfig" :listData="pluginList" @reload="fetchTableData">
      <template #status="scope">
        <el-tag :type="scope.row.status ? 'success' : 'danger'">{{
          scope.row.status ? "可用" : "不可用"
        }}</el-tag>
      </template>
      <template #version="scope">
        <el-tag>{{ scope.row.version }}</el-tag>
      </template>
      <template #handler="scope">
        <el-button @click="handleInstallClick(scope.row.id)"
          >安装/更新</el-button
        >
      </template>
    </ZUCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ZUCard from "@/base-ui/card";
import { CardConfig } from "./config/card.config";
import API from "@/request/API";
import ConfigOperations from "@/hooks/Config/ConfigOperations";

const pluginList = ref([]);
const fetchTableData = async ({ loadingStatus }) => {
  return API.getPluginsData()
    .then((json) => (pluginList.value = json))
    .then((res) => (loadingStatus.value = false));
};
const handleInstallClick = (id) => {
  const baseURL = ConfigOperations.readConfig()["pluginsBaseURL"];
  window.location.href = baseURL + id + ".user.js";
  ElMessageBox.alert("请在弹出的网页中更新脚本, 更新后点击OK重新加载此页面", {
    callback: (action) => action === "confirm" || window.location.reload(),
  });
};
</script>

<style scoped></style>
