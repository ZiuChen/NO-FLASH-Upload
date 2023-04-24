<template>
  <div class="lesson-top-list">
    <ZUTable
      ref="ZUTableRef"
      v-bind="TableConfig"
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
    </ZUTable>
  </div>
</template>

<script>
export default {
  name: "LessonTopList",
};
</script>

<script setup>
import ZUTable from "@/base-ui/table";
import { TableConfig } from "./config/lessontoplist.table.config";
import API from "@/request/API";
const ZUTableRef = ref();
const type = ref("today"); // totay | total
const listData = ref([]);
const fetchTableData = async ({ loadingStatus }) => {
  return API.getLessonTopList(type.value)
    .then((list) => (listData.value = list))
    .then(() => (loadingStatus.value = false));
};
watch(type, () => ZUTableRef.value.handleReloadClick());
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
}
</style>
