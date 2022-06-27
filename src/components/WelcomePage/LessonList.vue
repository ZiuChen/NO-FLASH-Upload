<template>
  <div class="lesson-list">
    <ZUCard
      ref="ZUCardRef"
      v-bind="CardConfig"
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
    </ZUCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ZUCard from "@/base-ui/card";
import { CardConfig } from "./config/lessonlist.card.config";
import API from "@/request/API";
const lessonList = ref([]);
const ZUCardRef = ref();
const fetchTableData = async ({ loadingStatus }) => {
  return API.getLessonList()
    .then((list) => (lessonList.value = list))
    .then(() => (loadingStatus.value = false));
};
const handleBtnClick = async (courseId, action) => {
  return API.lessonOrderOperation(courseId, action).then(() =>
    ZUCardRef.value.handleReloadClick()
  );
};
</script>
