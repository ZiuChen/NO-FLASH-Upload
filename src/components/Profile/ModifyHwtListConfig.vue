<template>
  <ZUCard>
    <template #header>
      <div class="card-header">
        <span>作业设置</span>
      </div>
    </template>
    <div class="config submit-drag">
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
    <div class="config default-expand">
      <span>{{ userConfig["config-hwt-default-expand"].name }}</span>
      <el-switch
        v-model="defaultExpandStatus"
        @change="
          handleChange($event, {
            id: 'config-hwt-default-expand',
          })
        "
      />
    </div>
  </ZUCard>
</template>

<script>
import ConfigOperations from "@/hooks/Config/ConfigOperations";
import ZUCard from "@/base-ui/card";

export default {
  components: {
    ZUCard,
  },
  created() {
    this.dataInit();
  },
  data() {
    return {
      userConfig: {},
      hwtSubmitDragStatus: false,
      defaultExpandStatus: false,
    };
  },
  methods: {
    dataInit() {
      this.userConfig = ConfigOperations.readUserConfig();
      this.hwtSubmitDragStatus =
        this.userConfig["config-hwt-submit-drag"].value;
      this.defaultExpandStatus =
        this.userConfig["config-hwt-default-expand"].value;
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
.input-number-group {
  display: flex;
  flex-direction: column;
}
.default-sort,
.default-filter,
.submit-drag {
  padding-top: 10px;
}
</style>
