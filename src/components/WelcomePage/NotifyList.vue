<template>
  <div class="notify-list">
    <ZUTable
      v-bind="TableConfig"
      :listData="notifyList"
      @reload="fetchListData"
    >
      <template #notifyName="{ row }">
        <el-link
          :href="notifyHref(row)"
          :underline="false"
          :title="row.notifyName"
          target="_blank"
          >{{ row.notifyName }}</el-link
        >
      </template>
      <template #hadRead="{ row }">
        <el-tag :type="row.hadRead ? 'success' : 'danger'">{{
          row.hadRead ? "已阅读" : "未阅读"
        }}</el-tag>
      </template>
    </ZUTable>
  </div>
</template>

<script>
export default {
  name: "NotifyList",
};
</script>

<script setup>
import { ref } from "vue";
import ZUTable from "@/base-ui/table";
import { TableConfig } from "./config/notifylist.table.config";
import API from "@/request/API";
const notifyList = ref([]);
const fetchListData = async ({ loadingStatus }) => {
  return API.getRemindInfo()
    .then(({ notify }) => notify)
    .then((lessons) => {
      notifyList.value.length = 0; // empty array
      for (const { id, name } of lessons) {
        API.getNotifyList(id).then((notifies) => {
          for (const { notifyName, pubTime, nid, hadRead } of notifies) {
            notifyList.value.push({
              lid: id,
              lessonName: name,
              notifyName,
              pubTime,
              nid,
              hadRead,
            });
          }
        });
      }
    })
    .then(() => (loadingStatus.value = false));
};
const notifyHref = ({ lid, nid }) =>
  `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/course_meswrap.jsp?courseId=${lid}&nid=${nid}`;
</script>
