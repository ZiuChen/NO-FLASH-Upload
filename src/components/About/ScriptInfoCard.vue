<template>
  <ZUCard>
    <template #header>
      <div class="card-header">
        <span>脚本信息</span>
      </div>
    </template>
    <div class="card-body">
      <div class="title" align="center">
        <h2>免Flash文件上传</h2>
        <el-tag type="success">{{ config.version }}</el-tag>
      </div>
      <div class="description" align="center">
        <span>
          {{ config.description }}
        </span>
      </div>
      <div class="button-block" align="center">
        <el-button class="inner-button" @click="handleBtnClick('github')">
          <el-icon :size="iconSize">
            <svg
              t="1649577317658"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21691"
              width="200"
              height="200"
            >
              <path
                d="M512 85.333333A426.666667 426.666667 0 0 0 85.333333 512c0 188.586667 122.453333 348.586667 291.84 405.333333 21.333333 3.413333 28.16-9.813333 28.16-21.333333v-72.106667c-118.186667 25.6-143.36-57.173333-143.36-57.173333-19.626667-49.493333-47.36-62.72-47.36-62.72-38.826667-26.453333 2.986667-25.6 2.986667-25.6 42.666667 2.986667 65.28 43.946667 65.28 43.946667 37.12 64.853333 99.84 45.653333 124.16 35.413333 3.84-27.733333 14.933333-46.506667 26.88-57.173333-94.72-10.666667-194.133333-47.36-194.133333-209.92 0-47.36 16.213333-85.333333 43.946666-115.626667-4.266667-10.666667-19.2-55.04 4.266667-112.64 0 0 35.84-11.52 117.333333 43.52 33.706667-9.386667 70.4-14.08 106.666667-14.08 36.266667 0 72.96 4.693333 106.666667 14.08 81.493333-55.04 117.333333-43.52 117.333333-43.52 23.466667 57.6 8.533333 101.973333 4.266667 112.64 27.733333 30.293333 43.946667 68.266667 43.946666 115.626667 0 162.986667-99.84 198.826667-194.986666 209.493333 15.36 13.226667 29.44 39.253333 29.44 78.933333V896c0 11.52 6.826667 25.173333 28.586666 21.333333C816.64 860.16 938.666667 700.586667 938.666667 512A426.666667 426.666667 0 0 0 512 85.333333z"
                fill=""
                p-id="21692"
              ></path>
            </svg>
          </el-icon>
          Github
        </el-button>
        <el-button class="inner-button" @click="handleBtnClick('gitee')">
          <el-icon :size="iconSize">
            <svg
              t="1653490652186"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="20876"
              width="200"
              height="200"
            >
              <path
                d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"
                fill=""
                p-id="20877"
              ></path>
            </svg>
          </el-icon>
          Gitee
        </el-button>
        <el-button class="inner-button" @click="handleBtnClick('donate')">
          <el-icon :size="iconSize"><StarFilled /></el-icon>
          捐赠
        </el-button>
        <el-dropdown class="inner-button" @command="handleBtnClick">
          <el-button icon="Promotion" class="el-dropdown-link"> 反馈</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="'github'"
                >Github Issue</el-dropdown-item
              >
              <el-dropdown-item :command="'support'"
                >腾讯兔小巢</el-dropdown-item
              >
              <el-dropdown-item :command="'qGroup'"
                >加入反馈群</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-badge :is-dot="needUpdate">
          <el-button class="inner-button" @click="CheckUpdate">
            <el-icon :size="iconSize"><Refresh /></el-icon>
            更新
          </el-button>
        </el-badge>
        <el-button class="inner-button" @click="handleBtnClick('notify')">
          <el-icon :size="iconSize"><BellFilled /></el-icon>
          通知
        </el-button>
      </div>
    </div>
  </ZUCard>
</template>

<script setup>
import { ref } from "vue";
import ZUCard from "@/base-ui/card";
import config from "@/hooks/Config/Config";
import CheckUpdate from "@/hooks/CheckUpdate";
import getVersionInfo from "@/hooks/GetVersionInfo";
import API from "@/request/API";

const iconSize = 18;
const needUpdate = ref(false);
getVersionInfo().then(({ need }) => {
  needUpdate.value = need;
});
const handleBtnClick = (type) => {
  if (type === "notify") {
    API.getLastestScriptNotify(true);
  } else {
    window.open(config[`${type}URL`]);
  }
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  align-content: baseline;
  justify-content: center;
}

.title h2 {
  padding-right: 5px;
}

.description {
  color: #909399;
  padding-bottom: 10px;
}

.el-icon {
  margin-right: 5px;
}

.button-block {
  margin-top: 10px;
  margin-bottom: 10px;
}

.inner-button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
