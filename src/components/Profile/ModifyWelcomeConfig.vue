<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>主页卡片设置</span>
      </div>
    </template>
    <div class="config">
      <span>{{ userConfig["config-hwtlist-show"].name }}</span>
      <el-switch
        v-model="hwtlistShow"
        @change="handleChange($event, { id: 'config-hwtlist-show' })"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-lessonlist-show"].name }}</span>
      <el-switch
        v-model="lessonlistShow"
        @change="handleChange($event, { id: 'config-lessonlist-show' })"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-notifylist-show"].name }}</span>
      <el-switch
        v-model="notifylistShow"
        @change="handleChange($event, { id: 'config-notifylist-show' })"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-informlist-show"].name }}</span>
      <el-switch
        v-model="informlistShow"
        @change="handleChange($event, { id: 'config-informlist-show' })"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-lessontoplist-show"].name }}</span>
      <el-switch
        v-model="lessontoplistShow"
        @change="handleChange($event, { id: 'config-lessontoplist-show' })"
      />
    </div>
    <div class="config">
      <span>{{ userConfig["config-userinfo-show"].name }}</span>
      <el-switch
        v-model="userinfoShow"
        @change="handleChange($event, { id: 'config-userinfo-show' })"
      />
    </div>
  </el-card>
</template>

<script>
import ConfigOperations from "@/hooks/Config/ConfigOperations";

export default {
  created() {
    this.dataInit();
  },
  data() {
    return {
      userConfig: {},
      hwtlistShow: false,
      notifylistShow: false,
      lessonlistShow: false,
      informlistShow: false,
      lessontoplistShow: false,
      userinfoShow: false,
    };
  },
  methods: {
    dataInit() {
      this.userConfig = ConfigOperations.readUserConfig();
      this.hwtlistShow = this.userConfig["config-hwtlist-show"].value;
      this.notifylistShow = this.userConfig["config-notifylist-show"].value;
      this.lessonlistShow = this.userConfig["config-lessonlist-show"].value;
      this.informlistShow = this.userConfig["config-informlist-show"].value;
      this.lessontoplistShow =
        this.userConfig["config-lessontoplist-show"].value;
      this.userinfoShow = this.userConfig["config-userinfo-show"].value;
    },
    handleChange(status, payload) {
      ConfigOperations.setUserConfig(payload.id, status);
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
</style>
