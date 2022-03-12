<template>
  <el-container>
    <el-header>
      <head-bar></head-bar>
    </el-header>
    <el-container style="height: calc(100vh - 100px)">
      <el-aside v-show="status">
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
import WelcomeMain from "./WelcomePage/WelcomeIndex.vue";
import ConfigOperations from "../ts/Config/ConfigOperations";
export default {
  components: {
    HeadBar,
    SideBar,
    WelcomeMain,
  },
  data() {
    return {
      status: true,
    };
  },
  created() {
    this.status =
      ConfigOperations.readUserConfig()["config-show-side-bar"].value;
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
