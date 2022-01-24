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
        <el-popconfirm title="是否确认退出？" @confirm="confirmEvent">
          <template #reference>
            <el-button>退出</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import getInfo from "../../function/GetInfo";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await getInfo.getUserInfo();
    },
    confirmEvent() {
      window.open("http://cc.bjtu.edu.cn:81/meol/popups/logout.jsp");
      console.log("logout");
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
