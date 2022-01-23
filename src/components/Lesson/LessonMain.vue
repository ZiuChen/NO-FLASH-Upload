<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="Notify"> 课程通知 </el-tab-pane>
      <el-tab-pane label="Config"> 课程作业 </el-tab-pane>
      <el-tab-pane label="Role"> 课程资源 </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
