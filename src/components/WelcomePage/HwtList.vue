<template>
  <div class="hwt-list">
    <ZUTable
      ref="ZUTableRef"
      v-bind="TableConfig"
      :showDragHandler="showDragHandler"
      :listData="hwtList"
      @reload="fetchTableData"
    >
      <template #remain="{ row }">
        {{ formatterRemain(row) }}
      </template>
      <template #title="{ row }">
        <el-link @click="handlePageJump(row)" :underline="false">{{
          row.title
        }}</el-link>
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
    </ZUTable>
  </div>
</template>

<script>
export default {
  name: "HwtList",
};
</script>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import ZUTable from "@/base-ui/table";
import { TableConfig } from "./config/hwtlist.table.config";
import API from "@/request/API";
import { useHwtFormatter } from "@/hooks/useHwtFormatter";

const props = defineProps({
  showDragHandler: {
    type: Boolean,
    default: true,
  },
  reloadTrigger: {
    type: Boolean,
    default: false,
  },
});

const ZUTableRef = ref();
const lessonList = ref([]);
const hwtList = ref([]);
const fetchLessonList = async () => {
  return API.getLessonList()
    .then((list) => (lessonList.value = list))
    .then(() => ZUTableRef.value.handleReloadClick());
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
// 作业提交 触发reloadTrigger改变 刷新作业列表
watch(
  () => props.reloadTrigger,
  (newVal) => {
    if (newVal) {
      fetchLessonList();
    }
  }
);
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
