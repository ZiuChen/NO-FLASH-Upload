<template>
  <div class="hwt-list">
    <ZUCard
      ref="ZUCardRef"
      v-bind="CardConfig"
      :listData="hwtList"
      @reload="fetchTableData"
    >
      <template #remain="{ row }">
        {{ formatterRemain(row) }}
      </template>
      <template #title="{ row }">
        <el-link @click="handlePageJump(row)">{{ row.title }}</el-link>
      </template>
      <template #answerStatus="{ row }">
        <el-tag :type="formatterAnswerStatus(row).tag">{{
          formatterAnswerStatus(row).text
        }}</el-tag>
      </template>
      <template #courseId="{ row }">
        <el-tag>{{ formatterCourseId(row) }}</el-tag>
      </template>
      <template #mark="{ row }">
        <el-tag :type="formatterMark(row).tag">{{
          formatterMark(row).text
        }}</el-tag>
      </template>
      <template #handler="{ row }">
        <el-button @click="handlePageJump(row)" size="small">{{
          formatterHandler(row)
        }}</el-button>
      </template>
    </ZUCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ZUCard from "@/base-ui/card";
import { CardConfig } from "./config/hwtlist.card.config";
import API from "@/request/API";
import { useHwtFormatter } from "@/hooks/useHwtFormatter";

const ZUCardRef = ref();
const lessonList = ref([]);
const hwtList = ref([]);
const fetchLessonList = async () => {
  return API.getLessonList()
    .then((list) => (lessonList.value = list))
    .then(() => ZUCardRef.value.handleReloadClick());
};
fetchLessonList();
const fetchTableData = async ({ loadingStatus }) => {
  hwtList.value.length = 0;
  for (const { id } of lessonList.value) {
    await API.getHwtList(id).then((list) => {
      hwtList.value.push(...list);
    });
  }
  loadingStatus.value = false;
};
const router = useRouter();
const handlePageJump = ({ courseId, id, able }) => {
  router.push(`/lesson/${courseId}/submit/${id}?able=${able}`);
};
const {
  formatterRemain,
  formatterAnswerStatus,
  formatterCourseId,
  formatterMark,
  formatterHandler,
} = useHwtFormatter();
</script>

<style>
.el-table .danger-row {
  --el-table-tr-bg-color: var(--el-color-danger-light-8);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-8);
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-8);
}
.el-table .info-row {
  --el-table-tr-bg-color: var(--el-color-info-light-8);
}
</style>
