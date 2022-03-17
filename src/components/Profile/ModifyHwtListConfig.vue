<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>作业列表设置</span>
      </div>
    </template>
    <div class="config">
      <span>{{ userConfig["config-hwt-recent-range"].name }}</span>
      <div class="input-number-group">
        <div>
          最远日期
          <el-input-number
            v-model="recentRangeStatus.max"
            :min="0"
            :max="365"
            size="small"
            @change="
              handleChange($event, {
                id: 'config-hwt-recent-range',
                order: 'max',
              })
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
              handleChange($event, {
                id: 'config-hwt-recent-range',
                order: 'min',
              })
            "
          />
        </div>
      </div>
    </div>
    <div class="config default-sort">
      <span>{{ userConfig["config-hwt-default-sort"].name }}</span>
      <el-select
        v-model="defaultSortStatus"
        @change="
          handleChange($event, {
            id: 'config-hwt-default-sort',
          })
        "
        placeholder="选择默认排序方式"
      >
        <el-option label="最近截止在上" value="ascending" />
        <el-option label="最远截止在上" value="descending" />
      </el-select>
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
      defaultSortStatus: "",
    };
  },
  methods: {
    dataInit() {
      this.userConfig = ConfigOperations.readUserConfig();
      this.recentRangeStatus = this.userConfig["config-hwt-recent-range"].value;
      this.defaultSortStatus = this.userConfig["config-hwt-default-sort"].value;
    },
    handleChange(status, payload) {
      if (payload.id === "config-hwt-default-sort") {
        ConfigOperations.setUserConfig(payload.id, status);
      } else if (payload.id === "config-hwt-recent-range") {
        ConfigOperations.setUserConfig(payload.id, this.recentRangeStatus);
      }
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
.default-sort {
  padding-top: 10px;
}
.el-card {
  height: 100%;
}
</style>
