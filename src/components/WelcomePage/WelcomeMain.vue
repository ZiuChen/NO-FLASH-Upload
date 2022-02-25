<template>
  <div>
    <el-row>
      <el-col :span="16">
        <hwt-list></hwt-list>
      </el-col>
      <el-col :span="8">
        <lesson-list></lesson-list>
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
import LessonList from "./LessonList.vue";
import getInfo from "../../ts/GetInfo";

export default {
  components: {
    HwtList,
    UserInfo,
    Calender,
    InformList,
    NotifyList,
    LessonList,
  },
  data() {
    return {
      lessonList: [],
      remindList: {},
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
        this.notifyEmpty = Object.keys(res.notify).length === 0;
      });
    },
  },
};
</script>

<style>
.el-card {
  margin: 5px 10px 5px 10px;
  height: 500px;
}

.card-header {
  height: 1.3em;
  font-size: 1.1em;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #005bac;
  font-weight: bold;
}
</style>
