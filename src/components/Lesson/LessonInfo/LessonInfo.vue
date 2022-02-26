<template>
  <div>
    <el-row>
      <el-col :span="16">
        <lesson-homework></lesson-homework>
      </el-col>
      <el-col :span="8">
        <lesson-notify></lesson-notify>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <lesson-resource></lesson-resource>
      </el-col>
      <el-col :span="8">
        <lesson-main></lesson-main>
      </el-col>
    </el-row>
  </div>
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
    return {};
  },
  mounted() {
    // this.$watch(
    //   () => this.$route.params,
    //   (toParams, previousParams) => {
    //     console.log(toParams, previousParams);
    //   }
    // );
  },
  methods: {},
};
</script>

<style scoped>
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
