<template>
  <el-row>
    <el-col :span="8">
      <div class="title">
        <img src="https://bjtu.edu.cn/images/img2019/logo_01.png" alt="logo" />
        <h2>课程平台</h2>
      </div>
    </el-col>
    <el-col :span="8"> </el-col>
    <el-col :span="8">
      <div class="welcome-info">
        <span>欢迎你，{{ userInfo.name }}</span>
      </div>
      <div class="operation">
        <el-dropdown @command="handleCommand">
          <el-badge :is-dot="needUpdate">
            <el-button class="el-dropdown-link" plain>
              <el-icon
                ><svg
                  t="1645608428232"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="20733"
                  width="200"
                  height="200"
                >
                  <path
                    d="M128 256h768v85.333333H128V256m0 213.333333h768v85.333334H128v-85.333334m0 213.333334h768v85.333333H128v-85.333333z"
                    fill=""
                    p-id="20734"
                  ></path></svg
              ></el-icon>
            </el-button>
          </el-badge>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="check">
                检查更新
                <el-badge :is-dot="needUpdate"></el-badge>
              </el-dropdown-item>
              <el-dropdown-item command="sidebar"
                >展示/隐藏侧栏</el-dropdown-item
              >
              <el-dropdown-item command="old">返回旧版</el-dropdown-item>
              <el-dropdown-item command="exit">退出当前账号</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import getInfo from "../../ts/GetInfo";
import ConfigOperations from "../../ts/Config/ConfigOperations";
import CheckUpdate from "../../ts/CheckUpdate";
import getVersionInfo from "../../ts/GetVersionInfo";

export default {
  data() {
    return {
      userInfo: {},
      needUpdate: false,
    };
  },
  created() {
    this.getUserInfo();
    this.getVersionInfo();
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await getInfo.getUserInfo();
    },
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
        ConfigOperations.setUserConfig("back-to-old", true);
        window.location.reload();
      } else if (command === "sidebar") {
        let status = ConfigOperations.readUserConfig()["show-side-bar"].value;
        status
          ? (document.querySelector(".el-aside").style.display = "none")
          : (document.querySelector(".el-aside").style.display = "");
        ConfigOperations.setUserConfig("show-side-bar", !status);
      } else if (command === "check") {
        CheckUpdate();
      }
    },
  },
};
</script>

<style scoped>
.el-row {
  background-color: #005bac;
}

.el-row img {
  object-fit: contain;
}

.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0px 15px 0px;
}

.title {
  display: flex;
}

.title h2 {
  margin-left: 25px;
  color: #ffffff;
  cursor: default;
}

.welcome-info {
  margin-right: 10px;
}

.welcome-info span {
  color: #ffffff;
  cursor: default;
}
</style>
