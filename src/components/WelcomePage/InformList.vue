<template>
  <div class="inform-list">
    <ZUCard v-bind="CardConfig" :listData="tableData" @reload="fetchTableData">
      <template #notifyName="scope">
        <el-link
          :underline="false"
          :href="baseUrl + scope.row.id"
          :title="scope.row.notifyName"
          target="_blank"
          >{{ scope.row.notifyName }}</el-link
        >
      </template>
    </ZUCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ZUCard from "@/base-ui/card";
import { CardConfig } from "./config/informlist.card.config";
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
