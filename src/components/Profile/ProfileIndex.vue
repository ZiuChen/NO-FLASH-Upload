<template>
  <el-row>
    <el-col :span="8">
      <ModifyWelcomeConfig></ModifyWelcomeConfig>
    </el-col>
    <el-col :span="8">
      <ModifyHwtListConfig></ModifyHwtListConfig>
    </el-col>
    <el-col :span="8">
      <ModifyUserConfig></ModifyUserConfig>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24" class="button-group">
      <el-button @click="handleImport">导入设置</el-button>
      <el-button @click="handleExport">导出设置</el-button>
      <el-button @click="handleRestore">重置设置</el-button>
    </el-col>
  </el-row>
</template>

<script>
import configOperations from "../../ts/Config/ConfigOperations";
import ModifyWelcomeConfig from "./ModifyWelcomeConfig.vue";
import ModifyHwtListConfig from "./ModifyHwtListConfig.vue";
import ModifyUserConfig from "./ModifyHwtListConfig.vue";
export default {
  components: {
    ModifyWelcomeConfig,
    ModifyHwtListConfig,
    ModifyUserConfig,
  },
  methods: {
    handleRestore() {
      configOperations.restoreUserConfig();
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `设置已重置，部分设置刷新后生效`,
        onClick: () => {
          notify.close();
        },
      });
    },
    handleExport() {
      configOperations.exportUserConfig();
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `设置文件已导出`,
        onClick: () => {
          notify.close();
        },
      });
    },
    handleImport() {
      configOperations.importUserConfig();
    },
  },
};
</script>

<style scoped>
.button-group {
  padding-top: 55px;
  display: flex;
  justify-content: center;
}
.el-card {
  height: 100%;
}
</style>
