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
    <el-descriptions-item label="重复提交">
      <el-tag :type="formatter.type"> {{ formatter.content }} </el-tag>
    </el-descriptions-item>
    <el-descriptions-item :span="5">
      <template #label>
        <div class="hwt-content-label">
          <span>作业内容</span>
          <el-button size="small" @click="toggleHwtContentShow">
            显示/隐藏作业内容
          </el-button>
        </div>
      </template>
      <div v-show="hwtContentShow" v-html="propHwtContent.content"></div>

      <div v-show="!hwtContentShow">
        <el-tag type="warning">作业内容已隐藏</el-tag>
      </div>
    </el-descriptions-item>
    <el-descriptions-item :span="5">
      <template #label>
        <div class="answer-content-label">
          <span>回答内容</span>
          <el-button size="small" @click="toggleAnswerContentShow">
            显示/隐藏回答内容
          </el-button>
        </div>
      </template>
      <div class="hwt-answer">
        <div v-show="answerContentShow">
          <div v-html="propHwtContent.hwaAnswer"></div>
          <span v-if="propHwtContent.hwaAnswer === undefined">未提交内容</span>
        </div>
        <div v-show="!answerContentShow">
          <el-tag type="warning">回答内容已隐藏</el-tag>
        </div>
      </div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  data() {
    return {
      hwtContent: {}, // dont assign this.propHwtContent directly
      hwtContentShow: true,
      answerContentShow: true,
    };
  },
  props: ["propHwtContent"],
  watch: {
    propHwtContent: function (val) {
      this.hwtContent = val;
    },
  },
  methods: {
    toggleHwtContentShow() {
      this.hwtContentShow = !this.hwtContentShow;
    },
    toggleAnswerContentShow() {
      this.answerContentShow = !this.answerContentShow;
    },
  },
  computed: {
    formatter: function () {
      if (this.hwtContent.manySubmitStatus === true) {
        return {
          status: true,
          type: "success",
          content: "允许重复提交",
        };
      } else if (this.hwtContent.manySubmitStatus === false) {
        return {
          status: false,
          type: "warning",
          content: "只允许提交一次",
        };
      } else {
        return {
          status: undefined,
          type: "info",
          content: "...",
        };
      }
    },
  },
};
</script>

<style scoped>
.hwt-content-label,
.answer-content-label {
  display: flex;
  justify-content: space-between;
}
.hwt-answer {
  max-width: 500px;
}
</style>
