<template>
  <el-descriptions :column="5" size="default" direction="vertical" border>
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
      formatter
    }}</el-descriptions-item>
    <el-descriptions-item label="作业内容" :span="5">
      <div v-html="propHwtContent.content"></div>
    </el-descriptions-item>
    <el-descriptions-item label="回答内容" :span="5">
      <div v-html="propHwtContent.hwaAnswer"></div>
      <span v-if="propHwtContent.hwaAnswer === undefined">未提交内容</span>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import API from "../../../ts/API";
export default {
  data() {
    return {
      hwtContent: {}, // dont assign this.propHwtContent directly
    };
  },
  props: ["propHwtContent"],
  watch: {
    propHwtContent: function (val) {
      this.hwtContent = val;
    },
  },
  computed: {
    formatter: function () {
      if (this.hwtContent.manySubmitStatus) {
        return "允许重复提交";
      } else {
        return "只允许提交一次";
      }
    },
  },
};
</script>

<style scoped></style>
