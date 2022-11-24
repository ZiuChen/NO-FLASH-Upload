<template>
  <div class="hwt-info">
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
            <el-button size="small" @click="hwtContentShow = !hwtContentShow">
              显示/隐藏作业内容
            </el-button>
          </div>
        </template>
        <div class="hwt-content">
          <div v-show="hwtContentShow" v-html="propHwtContent.content"></div>
          <div v-show="!hwtContentShow">
            <el-tag type="warning">作业内容已隐藏</el-tag>
          </div>
        </div>
      </el-descriptions-item>
      <el-descriptions-item :span="5">
        <template #label>
          <div class="answer-content-label">
            <span>回答内容</span>
            <el-button
              size="small"
              @click="answerContentShow = !answerContentShow"
            >
              显示/隐藏回答内容
            </el-button>
          </div>
        </template>
        <div class="hwt-answer">
          <div v-show="answerContentShow">
            <div v-html="propHwtContent.hwaAnswer"></div>
            <span v-if="propHwtContent.hwaAnswer === undefined"
              >未提交内容</span
            >
          </div>
          <div v-show="!answerContentShow">
            <el-tag type="warning">回答内容已隐藏</el-tag>
          </div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const hwtContent = ref({}); // dont assign this.propHwtContent directly
const hwtContentShow = ref(true);
const answerContentShow = ref(true);

const props = defineProps({
  propHwtContent: {
    type: Object,
    required: true,
  },
});

watch(
  () => props.propHwtContent,
  (val) => (hwtContent.value = val)
);

const formatter = computed(() => {
  const status = hwtContent.value.manySubmitStatus;
  return status
    ? {
        status: true,
        type: "success",
        content: "允许重复提交",
      }
    : {
        status: false,
        type: "warning",
        content: "只允许提交一次",
      };
});
</script>

<style scoped>
.hwt-content-label,
.answer-content-label {
  display: flex;
  justify-content: space-between;
}
.hwt-content .hwt-answer {
  max-width: 500px;
}
</style>
