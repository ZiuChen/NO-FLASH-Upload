<template>
  <el-row>
    <el-col :span="8"> </el-col>
    <el-col class="title" :span="8">
      <img
        src="https://bjtu.edu.cn/images/img2019/logo_01.png"
        height="45"
        alt="logo"
      />
    </el-col>
    <el-col :span="8"> </el-col>
  </el-row>
</template>

<script setup>
import ConfigOperations from "@/hooks/Config/ConfigOperations";
import CheckUpdate from "@/hooks/CheckUpdate";
import API from "@/request/API";
import log from "@/hooks/useLog";

const createInterval = async () => {
  const callBack = () => {
    API.getUserInfo().then((res) => {
      log("createInterval", "已发送身份保活请求", "success");
      return res;
    });
  };
  if (ConfigOperations.readUserConfig("config-post-interval").value) {
    window.setInterval(callBack, 120000);
  }
};

CheckUpdate();
API.getLastestScriptNotify();
createInterval();
</script>

<style scoped>
.el-row {
  background: linear-gradient(135deg, #743481, #005bac, #743481);
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px 15px 0px;
}

.title {
  color: #ffffff;
  cursor: default;
  justify-content: space-around;
}
</style>
