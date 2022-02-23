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
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="exit">退出当前账号</el-dropdown-item>
              <el-dropdown-item command="old">返回旧版</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import getInfo from "../../ts/GetInfo";
import readConfig from "../../ts/Config/ReadConfig";
import updateConfig from "../../ts/Config/updateConfig";

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
    handleCommand(command) {
      console.log(`${command}`);
      if (command === "exit") {
        window.location.href =
          "http://cc.bjtu.edu.cn:81/meol/popups/logout.jsp";
      } else if (command === "old") {
        let config = readConfig();
        let userConfig = config.userConfig;
        userConfig["backToOld"].value = true;
        updateConfig(config);
        window.location.reload();
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
