<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      tableData: [],
      hwtListTmp: {},
    };
  },
  created() {
    this.visitLesson("10625");
  },
  methods: {
    async getHwt() {
      let list = await getInfo.getHwtInfo().then((res) => {
        console.log(res);
        return res;
      });
      return list;
    },
    async visitLesson(lid) {
      let list = await getInfo.visitLessonPage(lid).then((res) => {
        console.log(res);
        this.getHwt();
        return res;
      });
      return list;
    },
  },
};
</script>

<style scoped></style>
