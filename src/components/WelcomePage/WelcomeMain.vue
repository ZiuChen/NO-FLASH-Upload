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
        <notify-list></notify-list>
      </el-col>
      <el-col :span="8">
        <inform-list></inform-list>
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

export default {
  components: {
    HwtList,
    UserInfo,
    Calender,
    InformList,
    NotifyList,
    LessonList,
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
