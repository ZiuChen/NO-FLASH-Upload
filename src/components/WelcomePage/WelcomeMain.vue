<template>
  <div>
    <el-row>
      <el-col :span="16">
        <hwt-list></hwt-list>
      </el-col>
      <el-col :span="8">
        <el-card class="lesson-list" shadow="always">
          <template #header>
            <div class="card-header">
              <span>课程列表</span>
              <el-check-tag
                size="small"
                :checked="operationEnabled"
                @change="toggleOperationEnabledStatus"
              >
                <template #default="">
                  <el-icon>
                    <svg
                      t="1645760155626"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="20883"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M810.666667 128a85.333333 85.333333 0 0 1 85.333333 85.333333v597.333334a85.333333 85.333333 0 0 1-85.333333 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h597.333334m-98.133334 270.933333c9.386667-8.96 9.386667-23.893333 0-32.853333L657.92 311.466667a22.698667 22.698667 0 0 0-32.853333 0l-42.666667 42.666666 87.466667 87.466667 42.666666-42.666667M298.666667 637.44V725.333333h87.893333l258.56-258.56-87.893333-87.893333L298.666667 637.44z"
                        fill=""
                        p-id="20884"
                      ></path>
                    </svg>
                  </el-icon>
                </template>
              </el-check-tag>
            </div>
          </template>
          <lesson-list :operationStatus="this.operationEnabled"></lesson-list>
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
      hwtEmpty: false, // cant use true
      notifyEmpty: false,
      operationEnabled: false,
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
        this.hwtEmpty = Object.keys(res.hwt).length === 0;
        this.notifyEmpty = Object.keys(res.notify).length === 0;
      });
    },
    toggleOperationEnabledStatus(val) {
      this.operationEnabled = val;
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
