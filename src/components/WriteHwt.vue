<template>
  <el-container>
    <el-header>
      <head-bar></head-bar>
    </el-header>
    <el-container style="height: calc(100vh - 100px)">
      <el-scrollbar>
        <el-main>
          <main-page></main-page>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import HeadBar from "./Common/HeadBar.vue";
import MainPage from "./HwtSubmitPage/MainPage.vue";
export default {
  components: {
    HeadBar,
    MainPage,
  },
};
</script>

<style scoped>
.el-scrollbar {
  width: 100%;
}

.el-header {
  padding: 0;
  height: auto;
}

.el-aside {
  padding: 0;
  height: auto;
}
</style>
