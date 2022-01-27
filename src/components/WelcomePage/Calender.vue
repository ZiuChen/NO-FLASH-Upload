<template>
  <el-calendar v-model="currentMonth" />
</template>

<script>
export default {
  data() {
    return {
      currentMonth: new Date(),
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
