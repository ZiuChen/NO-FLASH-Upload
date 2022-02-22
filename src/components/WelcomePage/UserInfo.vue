<template>
  <p>用户名：{{ userInfo.name }}</p>
  <p>登录时间：{{ userInfo.loginTime }}</p>
  <p>在线时间：{{ userInfo.onlineTime }}</p>
  <p>登录次数：{{ userInfo.loginTimes }}</p>
</template>

<script>
import getInfo from "../../function/GetInfo";
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
