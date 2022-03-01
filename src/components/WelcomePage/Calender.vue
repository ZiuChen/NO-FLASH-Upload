<template>
  <el-card class="calender" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>日历</span>
      </div>
    </template>
    <el-calendar v-model="currentDate">
      <template #header="{ date }">
        <span>{{ date }}</span>
      </template>
    </el-calendar>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
    };
  },
};
</script>

<style scoped></style>
<style>
.el-calendar-table .el-calendar-day {
  height: 38px;
  width: 38px;
}
</style>
