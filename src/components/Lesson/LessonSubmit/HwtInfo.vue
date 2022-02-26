<template>
  <el-descriptions :column="4" size="default" direction="vertical" border>
    <el-descriptions-item label="作业名">{{
      hwtContent.title
    }}</el-descriptions-item>
    <el-descriptions-item label="截止日期">{{
      hwtContent.deadline
    }}</el-descriptions-item>
    <el-descriptions-item label="总分" :span="2">{{
      hwtContent.score
    }}</el-descriptions-item>
    <el-descriptions-item label="作业内容">
      <div v-html="hwtContent.content"></div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  data() {
    return {
      hwtContent: {}, // dont assign this.propHwtContent directly
    };
  },
  watch: {
    propHwtContent: function (val) {
      this.hwtContent = val;
    },
  },
  props: ["propHwtContent"],
};
</script>

<style scoped></style>
