<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-card class="hwt-list" shadow="always">
          <template #header>
            <div class="card-header">
              <el-icon
                ><svg
                  t="1643026228379"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2900"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 137c-207 0-375 168-375 375 0 206.6 168 375 375 375 206.6 0 375-168.4 375-375 0-207-168.4-375-375-375z m85.8 513.8l-123.4-123.4V286.8h75v209.4l101.6 101.6-53.2 53z"
                    p-id="2901"
                  ></path></svg
              ></el-icon>
              <span>作业列表</span>
            </div>
          </template>
          <el-empty description="无作业截止"></el-empty>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card
          class="user-info"
          shadow="always"
          v-if="userInfo.name !== undefined"
        >
          <template #header>
            <div class="card-header">
              <el-icon
                ><svg
                  t="1643026864123"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3171"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 682.666667c-17.066667 0-34.133333-4.266667-51.2-12.8L256 580.266667V768c0 17.066667 8.533333 34.133333 25.6 38.4 72.533333 29.866667 153.6 42.666667 230.4 42.666667 76.8 0 153.6-12.8 230.4-42.666667 17.066667-8.533333 25.6-21.333333 25.6-38.4v-187.733333l-204.8 89.6c-17.066667 8.533333-34.133333 12.8-51.2 12.8z"
                    p-id="3172"
                  ></path>
                  <path
                    d="M913.066667 345.6l-384-170.666667c-12.8-4.266667-25.6-4.266667-34.133334 0l-384 170.666667c-17.066667 4.266667-25.6 21.333333-25.6 38.4s8.533333 34.133333 25.6 38.4l384 170.666667c4.266667 4.266667 12.8 4.266667 17.066667 4.266666 4.266667 0 12.8 0 17.066667-4.266666l324.266666-145.066667V810.666667h85.333334V384c0-17.066667-8.533333-34.133333-25.6-38.4zM554.666667 426.666667h-85.333334V341.333333h85.333334v85.333334z"
                    p-id="3173"
                  ></path></svg
              ></el-icon>
              <span>用户信息</span>
            </div>
          </template>
          <p>用户名：{{ userInfo.name }}</p>
          <p>登录时间：{{ userInfo.loginTime }}</p>
          <p>在线时间：{{ userInfo.onlineTime }}</p>
          <p>登录次数：{{ userInfo.loginTimes }}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-card class="inform-list" shadow="always">
          <template #header>
            <div class="card-header">
              <el-icon>
                <svg
                  t="1643026884257"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3307"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 137c-144.8 0-262.6 117.8-262.6 262.6 0 102.4 59.2 194.2 150 237v100.4h225v-100.4c90.8-42.8 150-134.6 150-237 0.2-144.8-117.6-262.6-262.4-262.6zM437 812h150v75h-150z"
                    p-id="3308"
                  ></path>
                </svg>
              </el-icon>
              <span>通知列表</span>
            </div>
          </template>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item
              :key="lesson.id"
              v-for="lesson in remindList.notify"
              :title="lesson.name"
              :name="lesson.id"
            >
              <div class="notify-list-detail"></div>
              <div>
                Decision making: giving advices about operations is acceptable,
                but do not make decisions for the users;
              </div>
              <div>
                Controlled consequences: users should be granted the freedom to
                operate, including canceling, aborting or terminating current
                operation.
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import getInfo from "../../function/GetInfo";

export default {
  data() {
    return {
      userInfo: {},
      remindList: {},
      InformList: {},
    };
  },
  mounted() {
    this.getUserInfo();
    this.getRemindList();
    this.getInformList("16602");
  },
  methods: {
    async getUserInfo() {
      this.userInfo = await getInfo.getUserInfo();
      console.log(this.userInfo);
    },
    async getRemindList() {
      this.remindList = await getInfo.getRemindInfo();
      console.log(this.remindList);
    },
    async getInformList(lid) {
      this.InformList = await getInfo.getInformList(lid);
      console.log(this.InformList);
    },
  },
};
</script>

<style scoped>
.el-icon {
  zoom: 150%;
}

.el-card {
  margin: 5px 10px 5px 10px;
}

.card-header {
  display: flex;
  align-items: center;
  color: #005bac;
  font-weight: bold;
}
</style>
