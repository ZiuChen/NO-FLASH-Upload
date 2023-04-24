<template>
  <div class="inform-list">
    <ZUTable
      v-bind="TableConfig"
      :listData="tableData"
      @reload="fetchTableData"
    >
      <template #notifyName="{ row }">
        <el-link
          :underline="false"
          :href="baseUrl + row.nid"
          :title="row.notifyName"
          target="_blank"
          >{{ row.notifyName }}</el-link
        >
      </template>
    </ZUTable>
  </div>
</template>

<script>
export default {
  name: "InformList",
};
</script>

<script setup>
import ZUTable from "@/base-ui/table";
import { TableConfig } from "./config/informlist.table.config";
import API from "@/request/API";

const tableData = ref([]);
const baseUrl =
  "http://cc.bjtu.edu.cn:81/meol/common/inform/message_content.jsp?nid=";

const fetchTableData = async ({ loadingStatus }) => {
  return API.getInformList()
    .then((res) => (tableData.value = res))
    .then((res) => (loadingStatus.value = false));
};
</script>
