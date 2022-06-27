<template>
  <div class="lesson-top-list">
    <ZUCard
      ref="ZUCardRef"
      v-bind="CardConfig"
      :listData="listData"
      @reload="fetchTableData"
    >
      <template #footer>
        <div class="footer">
          <el-select v-model="type" placeholder="选择何种排行">
            <el-option label="今日排行" value="today" />
            <el-option label="总排行" value="total" />
          </el-select>
        </div>
      </template>
    </ZUCard>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import ZUCard from "@/base-ui/card";
import { CardConfig } from "./config/lessontoplist.card.config";
import API from "@/request/API";
const ZUCardRef = ref();
const type = ref("today"); // totay | total
const listData = ref([]);
const fetchTableData = async ({ loadingStatus }) => {
  return API.getLessonTopList(type.value)
    .then((list) => (listData.value = list))
    .then(() => (loadingStatus.value = false));
};
watch(type, () => ZUCardRef.value.handleReloadClick());
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
</style>
