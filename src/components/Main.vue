<template>
  <el-container class="welcome-page">
    <el-header>
      <head-bar></head-bar>
    </el-header>
    <el-container style="height: calc(100vh - 100px)">
      <el-aside>
        <side-bar></side-bar>
      </el-aside>
      <el-scrollbar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import HeadBar from "./Common/HeadBar.vue";
import SideBar from "./Common/SideBar.vue";
import WelcomeMain from "./WelcomePage/WelcomeMain.vue";
export default {
  components: {
    HeadBar,
    SideBar,
    WelcomeMain,
  },
};
</script>

<style scoped>
.el-header {
  padding: 0;
  height: auto;
}
</style>
