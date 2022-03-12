<template>
  <div>
    <el-row>
      <el-col :span="this.userConfig['hwt-list-card-size'].value">
        <hwt-list></hwt-list>
      </el-col>
      <el-col :span="this.userConfig['notify-list-card-size'].value">
        <notify-list></notify-list>
      </el-col>
      <el-col :span="this.userConfig['notify-list-card-size'].value">
        <lesson-list></lesson-list>
      </el-col>
      <el-col :span="this.userConfig['inform-list-card-size'].value">
        <inform-list></inform-list>
      </el-col>
      <el-col :span="this.userConfig['user-info-card-size'].value">
        <user-info></user-info>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HwtList from "./HwtList.vue";
import UserInfo from "./UserInfo.vue";
import InformList from "./InformList.vue";
import NotifyList from "./NotifyList.vue";
import LessonList from "./LessonList.vue";
import configOperations from "../../ts/Config/ConfigOperations";
export default {
  components: {
    HwtList,
    UserInfo,
    InformList,
    NotifyList,
    LessonList,
  },
  created() {
    this.userConfig = configOperations.readUserConfig();
  },
  data() {
    return {
      userConfig: configOperations.readUserConfig(),
    };
  },
};
</script>

<style>
.el-card {
  margin: 10px 10px 10px 10px;
  /* max-height: 1000px; */
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
