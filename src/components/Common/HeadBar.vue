<template>
  <el-row>
    <el-col :span="8">
      <div class="title">
        <img src="https://bjtu.edu.cn/images/img2019/logo_01.png" alt="logo" />
        <h2>课程平台</h2>
      </div>
    </el-col>
    <el-col :span="8"> </el-col>
    <el-col :span="4">
      <div class="user-info">
        <span>欢迎你，{{ userInfo.name }}</span>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="operation">
        <el-popconfirm title="是否确认退出？">
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
      console.log(this.userInfo);
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

.user-info span {
  color: #ffffff;
  cursor: default;
}
</style>
