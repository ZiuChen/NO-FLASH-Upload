<template>
  <el-row>
    <el-col :span="8">
      <ModifyWelcomeConfig></ModifyWelcomeConfig>
    </el-col>
    <el-col :span="8">
      <ModifyHwtListConfig></ModifyHwtListConfig>
    </el-col>
  </el-row>
  <el-divider />
  <el-row class="button-group">
    <el-button @click="handleRestore">重置设置</el-button>
    <el-button @click="handleExport">导出设置</el-button>
  </el-row>
</template>

<script>
import configOperations from "../../ts/Config/ConfigOperations";
import ModifyWelcomeConfig from "./ModifyWelcomeConfig.vue";
import ModifyHwtListConfig from "./ModifyHwtListConfig.vue";
export default {
  components: {
    ModifyWelcomeConfig,
    ModifyHwtListConfig,
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
  },
};
</script>

<style scoped>
.button-group {
  justify-content: center;
}
</style>
