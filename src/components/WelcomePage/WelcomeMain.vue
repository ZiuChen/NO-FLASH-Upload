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
          <el-empty v-if="hwtEmpty" description="没有待提交作业哦~"></el-empty>
          <!-- TODO: add optional choice to config -->
          <hwt-list v-if="!hwtEmpty" :hwts="remindList.hwt"></hwt-list>
          <!-- <hwt-list v-if="!hwtEmpty" :hwts="lessonList"></hwt-list> -->
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
        <el-card class="notify-list" shadow="always">
          <template #header>
            <div class="card-header">
              <span>未读通知</span>
            </div>
          </template>
          <el-empty v-if="notifyEmpty" description="没有未读通知哦~"></el-empty>
          <notify-list
            v-if="!notifyEmpty"
            :notifies="remindList.notify"
          ></notify-list>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="inform-list" shadow="always">
          <template #header>
            <div class="card-header">
              <span>系统通知</span>
            </div>
          </template>
          <inform-list></inform-list>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HwtList from "./HwtList.vue";
import UserInfo from "./UserInfo.vue";
import Calender from "./Calender.vue";
import InformList from "./InformList.vue";
import NotifyList from "./NotifyList.vue";
import getInfo from "../../ts/GetInfo";

export default {
  components: {
    HwtList,
    UserInfo,
    Calender,
    InformList,
    NotifyList,
  },
  data() {
    return {
      lessonList: [],
      remindList: {},
      hwtEmpty: false, // cant use true
      notifyEmpty: false,
    };
  },
  created() {
    this.getLessonList();
    this.getRemindList();
    this.isEmpty();
  },
  methods: {
    async getLessonList() {
      this.lessonList = await getInfo.getLessonInfo().then((res) => {
        return res;
      });
    },
    async getRemindList() {
      this.remindList = await getInfo.getRemindInfo();
      return this.remindList;
    },
    async isEmpty() {
      await getInfo.getRemindInfo().then((res) => {
        console.log(res);
        this.hwtEmpty = Object.keys(res.hwt).length === 0;
        this.notifyEmpty = Object.keys(res.notify).length === 0;
      });
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
  font-size: 1.1em;
  cursor: default;
  display: flex;
  align-items: center;
  color: #005bac;
  font-weight: bold;
}
</style>
