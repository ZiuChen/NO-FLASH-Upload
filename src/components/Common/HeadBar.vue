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

<script>
import ConfigOperations from "../../ts/Config/ConfigOperations";
import API from "../../ts/API";
import log from "../../ts/Log";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.popNotify();
    this.createInterval();
  },
  methods: {
    async popNotify() {
      return await API.getScriptNotify().then((notifies) => {
        // 取最大通知id若未阅读则弹窗提示阅读
        notifies.sort((a, b) => {
          return b.id - a.id;
        });
        if (
          notifies[0].id >
          ConfigOperations.readUserConfig()["data-last-read-notify"].value
        ) {
          // 还未阅读此通知
          ElMessageBox.alert(notifies[0].content, notifies[0].title, {
            confirmButtonText: "OK",
            callback: (action) => {
              ConfigOperations.setUserConfig(
                "data-last-read-notify",
                notifies[0].id
              );
            },
          });
        } else {
          // 此通知已阅读
          // nothing to do
        }
      });
    },
    async createInterval() {
      if (
        ConfigOperations.readUserConfig("config-post-interval").value === false
      )
        return;
      let callBack = () => {
        API.getUserInfo().then((res) => {
          log("createInterval", "已发送身份保活请求", "success");
          return res;
        });
      };
      window.setInterval(callBack, 120000);
    },
  },
};
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
