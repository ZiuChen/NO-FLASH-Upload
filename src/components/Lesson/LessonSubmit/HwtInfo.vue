<template>
  <el-descriptions :column="3" size="default" direction="vertical" border>
    <el-descriptions-item label="作业名" :span="2">{{
      propHwtContent.title
    }}</el-descriptions-item>
    <el-descriptions-item label="截止日期">{{
      propHwtContent.deadline
    }}</el-descriptions-item>
    <el-descriptions-item label="总分">{{
      propHwtContent.score
    }}</el-descriptions-item>
    <el-descriptions-item label="取得分数">{{
      propHwtContent.getscore
    }}</el-descriptions-item>
    <el-descriptions-item label="评语" :span="2">{{
      propHwtContent.comments
    }}</el-descriptions-item>
    <el-descriptions-item label="作业内容" :span="3">
      <div v-html="propHwtContent.content"></div>
    </el-descriptions-item>
    <el-descriptions-item label="回答内容" :span="3">
      <div v-html="propHwtContent.answer"></div>
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
