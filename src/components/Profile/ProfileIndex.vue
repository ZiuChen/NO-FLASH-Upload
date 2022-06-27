<template>
  <div class="profile-index">
    <ZUCard>
      <template #header>
        <span>用户设置</span>
      </template>
      <ZUForm v-model="formData" v-bind="FormConfig"></ZUForm>
    </ZUCard>
    <el-row>
      <el-col :span="24" class="button-group">
        <el-button @click="handleImport">导入设置</el-button>
        <el-button @click="handleExport">导出设置</el-button>
        <el-button @click="handleRestore">重置设置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import configOperations from "@/hooks/Config/ConfigOperations";
import ZUCard from "@/base-ui/card";
import ZUForm from "@/base-ui/form";
import { FormConfig } from "./config/form.config";
const formData = ref({});
const userConfig = configOperations.readUserConfig();
for (const [key, item] of Object.entries(userConfig)) {
  formData.value[key] = item.value;
}
watch(formData, (formData) => {
  for (const [key, value] of Object.entries(formData)) {
    configOperations.setUserConfig(key, value);
  }
});
const handleRestore = () => {
  configOperations.restoreUserConfig();
  ElMessage({
    message: "设置已重置，部分设置刷新后生效",
    type: "success",
  });
};
const handleExport = () => {
  configOperations.exportUserConfig();
  ElMessage({
    message: "设置文件已导出",
    type: "success",
  });
};
const handleImport = () => {
  configOperations.importUserConfig();
};
</script>

<style scoped>
.button-group {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
