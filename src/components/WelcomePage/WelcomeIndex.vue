<template>
  <div>
    <el-row>
      <el-col :span="24">
        <hwt-list></hwt-list>
      </el-col>
      <el-col :span="12">
        <notify-list></notify-list>
      </el-col>
      <el-col :span="12">
        <lesson-list></lesson-list>
      </el-col>
      <el-col :span="24">
        <inform-list></inform-list>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HwtList from "./HwtList.vue";
import InformList from "./InformList.vue";
import NotifyList from "./NotifyList.vue";
import LessonList from "./LessonList.vue";
export default {
  components: {
    HwtList,
    InformList,
    NotifyList,
    LessonList,
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
