<template>
  <div class="lesson-list">
    <ZUTable
      ref="ZUTableRef"
      v-bind="TableConfig"
      :listData="lessonList"
      @reload="fetchTableData"
    >
      <template #name="{ row }">
        <el-link
          :underline="false"
          :href="baseURL + row.id"
          :title="row.name"
          target="_blank"
        >
          {{ row.name }}
        </el-link>
      </template>
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

<script>
export default {
  name: "LessonList",
};
</script>

<script setup>
import { ref } from "vue";
import ZUTable from "@/base-ui/table";
import { TableConfig } from "./config/lessonlist.table.config";
import API from "@/request/API";
import localCache from "@/utils/localCache";
const lessonList = ref([]);
const ZUTableRef = ref();
const fetchTableData = async ({ loadingStatus }) => {
  const localLessonList = localCache.getCache("lesson-list");
  lessonList.value = localLessonList || (await API.getLessonList());
  loadingStatus.value = false;
};
const handleBtnClick = async (courseId, action) => {
  await API.lessonOrderOperation(courseId, action)
    .then(() => API.getLessonList()) // fetch data & updateCache
    .then(() => ZUTableRef.value.handleReloadClick());
};
const baseURL =
  "http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=";
</script>
