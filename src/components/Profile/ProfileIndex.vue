<template>
  <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>主页卡片显示设置</span>
      </div>
    </template>
    <div class="slider-demo-block" :key="key.id" v-for="key in cardSizeConfigs">
      <span class="demonstration">{{ cardNameformatter(key.id) }}</span>
      <el-slider
        v-model="key.value"
        :min="0"
        :max="24"
        :step="1"
        show-stops
        :marks="marks"
      >
      </el-slider>
    </div>
  </el-card>
  <div class="button-div">
    <el-button @click="saveConfig">保存</el-button>
    <el-button @click="restoreConfig">重置</el-button>
  </div>
</template>

<script>
import configOperations from "../../ts/Config/ConfigOperations";
export default {
  data() {
    return {
      marks: {
        0: "不显示",
        6: "6",
        12: "12",
        18: "18",
        24: "24",
      },
      userConfig: configOperations.readUserConfig(),
      cardSizeConfigs: configOperations.readUserConfigWithFilter("card-size"), // Array
    };
  },
  methods: {
    saveConfig() {
      this.cardSizeConfigs.forEach((config) => {
        configOperations.setUserConfig(config.id, config.value);
      });
      let notify = ElNotification({
        title: "免Flash文件上传",
        type: "success",
        message: `设置已更新`,
        onClick: () => {
          notify.close();
        },
      });
    },
    restoreConfig() {
      this.cardSizeConfigs.forEach((config, index) => {
        this.cardSizeConfigs[index].value = config.default;
        configOperations.setUserConfig(config.id, config.default);
      });
      this.saveConfig();
    },

    cardNameformatter(id) {
      switch (id) {
        case "hwt-list-card-size":
          return "作业列表";
        case "notify-list-card-size":
          return "通知列表";
        case "lesson-list-card-size":
          return "课程列表";
        case "inform-list-card-size":
          return "系统通知";
        case "user-info-card-size":
          return "用户信息";
        case "calender-card-size":
          return "日历";
      }
    },
  },
};
</script>

<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.button-div {
  padding-top: 25px;
  text-align: center;
}
</style>
