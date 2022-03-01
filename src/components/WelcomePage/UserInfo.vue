<template>
  <el-card class="user-info" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>用户信息</span>
      </div>
    </template>
    <p>用户名：{{ userInfo.name }}</p>
    <p>登录时间：{{ userInfo.loginTime }}</p>
    <p>在线时间：{{ userInfo.onlineTime }}</p>
    <p>登录次数：{{ userInfo.loginTimes }}</p>
  </el-card>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await getInfo.getUserInfo();
    },
  },
};
</script>

<style scoped></style>
