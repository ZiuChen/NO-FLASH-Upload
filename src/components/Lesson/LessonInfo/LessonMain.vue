<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>课程主页</span>
      </div>
    </template>
    <el-empty description="当前页面施工中..."></el-empty>
  </el-card>
</template>

<script>
import getInfo from "../../../ts/GetInfo";
export default {
  data() {
    return {
      lid: "",
      lessonDetail: {},
    };
  },
  methods: {
    async getLessonDetail(lid) {
      this.lessonDetail = await getInfo
        .getLessonPageInfo(lid)
        .then((res) => {
          return res;
        })
        .then((res) => {
          return res;
        });
    },
  },
};
</script>

<style scoped></style>
