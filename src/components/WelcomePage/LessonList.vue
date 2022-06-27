<template>
  <div class="lesson-list">
    <ZUTable
      ref="ZUTableRef"
      v-bind="TableConfig"
      :listData="lessonList"
      @reload="fetchTableData"
    >
      <template #handler="{ row }">
        <el-button-group>
          <el-button
            icon="ArrowUpBold"
            plain
            @click="handleBtnClick(row.id, 'up')"
          >
          </el-button>
          <el-button
            icon="ArrowDownBold"
            plain
            @click="handleBtnClick(row.id, 'down')"
          >
          </el-button>
        </el-button-group>
      </template>
    </ZUTable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ZUTable from "@/base-ui/table";
import { TableConfig } from "./config/lessonlist.table.config";
import API from "@/request/API";
const lessonList = ref([]);
const ZUTableRef = ref();
const fetchTableData = async ({ loadingStatus }) => {
  return API.getLessonList()
    .then((list) => (lessonList.value = list))
    .then(() => (loadingStatus.value = false));
};
const handleBtnClick = async (courseId, action) => {
  return API.lessonOrderOperation(courseId, action).then(() =>
    ZUTableRef.value.handleReloadClick()
  );
};
</script>
