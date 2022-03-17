<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>用户设置</span>
      </div>
    </template>
    <div class="config">
      <span>{{ userConfig["config-back-to-old"].name }}</span>
      <el-switch
        v-model="backToOldStatus"
        @change="handleChange($event, 'config-back-to-old')"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-show-side-bar"].name }}</span>
      <el-switch
        v-model="showSideBarStatus"
        @change="handleChange($event, 'config-show-side-bar')"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-background-color"].name }}</span>
      <el-color-picker
        v-model="backGroundColor"
        @change="handleChange($event, 'config-background-color')"
      />
    </div>
  </el-card>
</template>

<script>
import ConfigOperations from "../../ts/Config/ConfigOperations";

export default {
  created() {
    this.dataInit();
  },
  data() {
    return {
      userConfig: {},
      backToOldStatus: false,
      showSideBarStatus: false,
      backGroundColor: "",
    };
  },
  methods: {
    dataInit() {
      this.userConfig = ConfigOperations.readUserConfig();
      this.backToOldStatus = this.userConfig["config-back-to-old"].value;
      this.showSideBarStatus = this.userConfig["config-show-side-bar"].value;
      this.backGroundColor = this.userConfig["config-background-color"].value;
    },
    handleChange(status, param) {
      ConfigOperations.setUserConfig(param, status);
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `修改了用户设置，刷新后生效`,
        onClick: () => {
          notify.close();
        },
      });
    },
  },
};
</script>

<style scoped>
.config {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  height: 100%;
}
</style>
