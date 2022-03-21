<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>作业设置</span>
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
    <div class="config default-filter">
      <span>{{ userConfig["config-hwt-default-filter"].name }}</span>
      <el-select
        v-model="defaultFilterStatus"
        @change="
          handleChange($event, {
            id: 'config-hwt-default-filter',
          })
        "
        placeholder="选择默认筛选方式"
      >
        <el-option label="近期截止" value="近期截止" />
        <el-option label="今日截止" value="今日截止" />
        <el-option label="未过期" value="未过期" />
        <el-option label="已过期" value="已过期" />
      </el-select>
    </div>
    <div class="config">
      <span>{{ userConfig["config-hwt-submit-drag"].name }}</span>
      <el-switch
        v-model="hwtSubmitDragStatus"
        @change="
          handleChange($event, {
            id: 'config-hwt-submit-drag',
          })
        "
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
      recentRangeStatus: {},
      defaultSortStatus: "",
      defaultFilterStatus: "",
      hwtSubmitDragStatus: false,
    };
  },
  methods: {
    dataInit() {
      this.userConfig = ConfigOperations.readUserConfig();
      this.recentRangeStatus = this.userConfig["config-hwt-recent-range"].value;
      this.defaultSortStatus = this.userConfig["config-hwt-default-sort"].value;
      this.defaultFilterStatus =
        this.userConfig["config-hwt-default-filter"].value;
      this.hwtSubmitDragStatus =
        this.userConfig["config-hwt-submit-drag"].value;
    },
    handleChange(status, payload) {
      if (payload.id === "config-hwt-recent-range") {
        ConfigOperations.setUserConfig(payload.id, this.recentRangeStatus);
      } else {
        ConfigOperations.setUserConfig(payload.id, status);
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
.default-sort,
.default-filter {
  padding-top: 10px;
}
</style>
