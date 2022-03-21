<template>
  <el-container>
    <el-header>
      <head-bar></head-bar>
    </el-header>
    <el-container style="height: calc(100vh - 75px)">
      <el-aside>
        <side-bar></side-bar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
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
};
</script>

<style>
.el-header {
  z-index: 999;
  box-shadow: 0px 5px 15px #51525354;
}

.el-card {
  margin: 10px 10px 10px 10px;
  border-radius: 15px;
  padding: 10px;
  /* max-height: 1000px; */
}

.card-header {
  height: 1.3em;
  font-size: 1.1em;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #005bac;
  font-weight: bold;
}

.el-header {
  padding: 0;
  height: auto;
}

.el-aside {
  width: auto;
  padding: 0;
  height: auto;
}

.el-main {
  background: radial-gradient(
    879px at 10.4% 22.3%,
    rgb(255, 235, 238) 0%,
    rgb(186, 190, 245) 93.6%
  );
}
</style>
