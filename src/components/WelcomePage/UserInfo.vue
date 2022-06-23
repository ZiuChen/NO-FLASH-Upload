<template>
  <el-card class="user-info" shadow="always">
    <template #header>
      <div class="card-header">
        <span>用户信息</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="getUserInfo()"
          circle
        >
          <el-icon
            ><svg
              t="1645775950545"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21783"
              width="200"
              height="200"
            >
              <path
                d="M753.066667 270.933333A339.541333 339.541333 0 0 0 512 170.666667a341.333333 341.333333 0 0 0-341.333333 341.333333 341.333333 341.333333 0 0 0 341.333333 341.333333c159.146667 0 291.84-108.8 329.813333-256h-88.746666A255.573333 255.573333 0 0 1 512 768a256 256 0 0 1-256-256 256 256 0 0 1 256-256c70.826667 0 133.973333 29.44 180.053333 75.946667L554.666667 469.333333h298.666666V170.666667l-100.266666 100.266666z"
                fill=""
                p-id="21784"
              ></path></svg
          ></el-icon>
        </el-button>
      </div>
    </template>
    <div class="container" v-load="loadingStatus">
      <p>用户名：{{ userInfo.name }}</p>
      <p>登录时间：{{ userInfo.loginTime }}</p>
      <p>在线时间：{{ userInfo.onlineTime }}</p>
      <p>登录次数：{{ userInfo.loginTimes }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from "vue";
import API from "@/request/API";

const loadingStatus = ref(true);
const userInfo = ref({});
const getUserInfo = async () => {
  loadingStatus.value = true;
  await API.getUserInfo().then((res) => {
    userInfo.value = { ...res };
    loadingStatus.value = false;
    return res;
  });
};
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
