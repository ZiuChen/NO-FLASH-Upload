<template>
  <el-table :data="tableData" height="400px" style="width: 100%">
    <el-table-column prop="notifyName" label="通知">
      <template #default="scope">
        <el-link
          :underline="false"
          :href="informUrl + scope.row.id"
          target="_blank"
          >{{ scope.row.notifyName }}</el-link
        >
      </template>
    </el-table-column>
    <el-table-column prop="pubTime" label="发布时间" />
  </el-table>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      tableData: [],
      informUrl: `http://cc.bjtu.edu.cn:81/meol/common/inform/message_content.jsp?nid=`,
    };
  },
  created() {
    this.getInformList();
  },
  methods: {
    async getInformList() {
      this.tableData = await getInfo.getInformList();
    },
  },
};
</script>

<style scoped></style>
