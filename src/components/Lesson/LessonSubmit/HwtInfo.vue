<template>
  <el-descriptions :column="3" size="default" direction="vertical" border>
    <el-descriptions-item label="作业名" :span="2">{{
      propHwtContent.title
    }}</el-descriptions-item>
    <el-descriptions-item label="截止日期">{{
      propHwtContent.deadLine
    }}</el-descriptions-item>
    <el-descriptions-item label="总分">{{
      propHwtContent.fullMark
    }}</el-descriptions-item>
    <el-descriptions-item label="重复提交">{{
      manySubmitStatusFormatter(propHwtContent.manySubmitStatus)
    }}</el-descriptions-item>
    <el-descriptions-item label="最近提交日期">{{
      propHwtContent.finishTime
    }}</el-descriptions-item>
    <el-descriptions-item label="作业内容" :span="3">
      <div v-html="propHwtContent.content"></div>
    </el-descriptions-item>
    <el-descriptions-item label="回答内容" :span="3">
      <div v-html="propHwtContent.hwaAnswer"></div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  data() {
    return {
      hwtContent: {}, // dont assign this.propHwtContent directly
      manySubmitStatus: false,
    };
  },
  watch: {
    propHwtContent: function (val) {
      this.hwtContent = val;
    },
  },
  methods: {
    manySubmitStatusFormatter(status) {
      switch (status) {
        case true:
          return "允许重复提交";
        case false:
          return "只允许提交一次";
      }
    },
  },
  props: ["propHwtContent"],
};
</script>

<style scoped></style>
