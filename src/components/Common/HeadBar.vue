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
    <el-col :span="8">
      <el-dropdown @command="handleCommand">
        <el-badge :is-dot="needUpdate">
          <el-icon
            class="el-dropdown-link dropdown-trigger mdui-ripple"
            :size="25"
            color="white"
          >
            <svg
              t="1647786304896"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21307"
              width="200"
              height="200"
            >
              <path
                d="M128 170.666667h768v170.666666H128V170.666667m0 256h768v170.666666H128v-170.666666m0 256h768v170.666666H128v-170.666666z"
                fill=""
                p-id="21308"
              ></path>
            </svg>
          </el-icon>
        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="check">
              检查更新
              <el-badge :is-dot="needUpdate"></el-badge>
            </el-dropdown-item>
            <el-dropdown-item command="sidebar">
              展示/隐藏侧栏
            </el-dropdown-item>
            <el-dropdown-item command="old">返回旧版</el-dropdown-item>
            <el-dropdown-item command="exit">退出当前账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import ConfigOperations from "../../ts/Config/ConfigOperations";
import CheckUpdate from "../../ts/CheckUpdate";
import getVersionInfo from "../../ts/GetVersionInfo";
import API from "../../ts/API";

export default {
  data() {
    return {
      userInfo: {},
      needUpdate: false,
    };
  },
  created() {
    this.getVersionInfo();
    this.popNotify();
  },
  methods: {
    async getVersionInfo() {
      this.needUpdate = await getVersionInfo().then((res) => {
        return res.need;
      });
    },
    handleCommand(command) {
      if (command === "exit") {
        window.location.href =
          "http://cc.bjtu.edu.cn:81/meol/popups/logout.jsp";
      } else if (command === "old") {
        ConfigOperations.setUserConfig("config-back-to-old", true);
        window.location.reload();
      } else if (command === "check") {
        CheckUpdate();
      }
    },
    async popNotify() {
      return await API.getScriptNotify().then((notify) => {
        if (
          notify.id >
          ConfigOperations.readUserConfig()["data-last-read-notify"].value
        ) {
          // 还未阅读此通知
          ElMessageBox.alert(notify.content, notify.title, {
            confirmButtonText: "OK",
          });
          ConfigOperations.setUserConfig("data-last-read-notify", notify.id);
        } else {
          // 此通知已阅读
          // nothing to do
        }
      });
    },
  },
};
</script>

<style scoped>
.el-row {
  background: linear-gradient(135deg, #743481, #005bac, #743481);
}

.dropdown-trigger {
  cursor: pointer;
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
