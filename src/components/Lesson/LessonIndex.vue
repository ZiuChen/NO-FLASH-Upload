<template>
  <el-tabs
    v-model="activeTabName"
    type="card"
    class="demo-tabs"
    @tab-click="handleTabClick"
  >
    <el-tab-pane name="main" label="主页">
      <lesson-main></lesson-main>
    </el-tab-pane>
    <el-tab-pane name="homework" label="作业">
      <lesson-homework></lesson-homework>
    </el-tab-pane>
    <el-tab-pane name="notify" label="通知">
      <lesson-notify></lesson-notify>
    </el-tab-pane>
    <el-tab-pane name="resource" label="资源">
      <lesson-resource></lesson-resource>
    </el-tab-pane>
  </el-tabs>
  <router-view></router-view>
</template>

<script>
import LessonMain from "./LessonMain.vue";
import LessonHomework from "./LessonHomework.vue";
import LessonNotify from "./LessonNotify.vue";
import LessonResource from "./LessonResource.vue";
export default {
  components: {
    LessonMain,
    LessonHomework,
    LessonNotify,
    LessonResource,
  },
  data() {
    return {
      activeTabName: "main",
    };
  },
  mounted() {},
  methods: {
    handleTabClick(tab, event) {
      console.log(tab.props.name);
    },
  },
};
</script>

<style scoped></style>
