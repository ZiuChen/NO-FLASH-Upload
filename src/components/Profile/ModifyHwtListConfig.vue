<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>作业列表设置</span>
      </div>
    </template>
    <div class="config">
      <span>{{ userConfig["config-recent-range"].name }}</span>
      <div class="input-number-group">
        <div>
          最远日期
          <el-input-number
            v-model="recentRangeStatus.max"
            :min="0"
            :max="365"
            size="small"
            @change="
              handleChange($event, { id: 'config-recent-range', order: 'max' })
            "
          />
        </div>
        <div>
          最近日期
          <el-input-number
            v-model="recentRangeStatus.min"
            :min="-365"
            :max="0"
            size="small"
            @change="
              handleChange($event, { id: 'config-recent-range', order: 'min' })
            "
          />
        </div>
      </div>
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
      recentRangeStatus: {},
    };
  },
  methods: {
    dataInit() {
      this.userConfig = ConfigOperations.readUserConfig();
      this.recentRangeStatus = this.userConfig["config-recent-range"].value;
    },
    handleChange(status, payload) {
      ConfigOperations.setUserConfig(payload.id, this.recentRangeStatus);
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
.input-number-group {
  display: flex;
  flex-direction: column;
}
.el-card {
  height: 100%;
}
</style>
