<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-card class="hwt-list" shadow="always">
          <template #header>
            <div class="card-header">
              <span>作业列表</span>
            </div>
          </template>
          <hwt-list></hwt-list>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="user-info" shadow="always">
          <template #header>
            <div class="card-header">
              <span>用户信息</span>
            </div>
          </template>
          <user-info></user-info>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-card class="inform-list" shadow="always">
          <template #header>
            <div class="card-header">
              <span>通知列表</span>
            </div>
          </template>
          <el-scrollbar height="500px">
            <notify-list :remindList="remindList"></notify-list>
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="calendar">
          <calender></calender>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HwtList from "./HwtList.vue";
import UserInfo from "./UserInfo.vue";
import Calender from "./Calender.vue";
import getInfo from "../../function/GetInfo";
import NotifyList from "./NotifyList.vue";

export default {
  components: {
    HwtList,
    UserInfo,
    Calender,
    NotifyList,
  },
  data() {
    return {
      remindList: {},
    };
  },
  mounted() {
    this.getRemindList();
  },
  methods: {
    async getRemindList() {
      this.remindList = await getInfo.getRemindInfo();
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
  height: 500px;
  /* overflow: auto; */
}

.card-header {
  display: flex;
  align-items: center;
  color: #005bac;
  font-weight: bold;
}
</style>
