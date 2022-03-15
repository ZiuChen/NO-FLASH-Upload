<template>
  <el-descriptions :column="4" size="default" direction="vertical" border>
    <el-descriptions-item label="作业名" :span="2">{{
      propHwtContent.title
    }}</el-descriptions-item>
    <el-descriptions-item label="截止日期">{{
      propHwtContent.deadLine
    }}</el-descriptions-item>
    <el-descriptions-item label="重复提交">{{
      manySubmitStatusFormatter
    }}</el-descriptions-item>
    <el-descriptions-item label="总分">{{
      propHwtContent.fullMark
    }}</el-descriptions-item>
    <el-descriptions-item label="取得分数">{{
      propHwtContent.score
    }}</el-descriptions-item>
    <el-descriptions-item label="评语" :span="2">{{
      propHwtContent.comments
    }}</el-descriptions-item>
    <el-descriptions-item label="作业内容" :span="4">
      <div v-html="propHwtContent.content"></div>
    </el-descriptions-item>
    <el-descriptions-item label="回答内容" :span="4">
      <div v-html="propHwtContent.hwaAnswer"></div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import API from "../../../ts/API";
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
      this.getmanySubmitStatus();
    },
  },
  methods: {
    async getmanySubmitStatus() {
      return await API.getHwtReviewNew(
        this.$route.params.lid,
        this.$route.params.hwtid
      ).then((res) => {
        res.json().then((res) => {
          this.manySubmitStatus = res.datas.manySubmitStatus;
          return res;
        });
      });
    },
  },
  computed: {
    manySubmitStatusFormatter: function () {
      if (this.manySubmitStatus) {
        return "允许重复提交";
      } else {
        return "只允许提交一次";
      }
    },
  },
  props: ["propHwtContent"],
};
</script>

<style scoped></style>
