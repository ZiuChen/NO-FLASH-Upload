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
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import HeadBar from "./Common/HeadBar.vue";
import SideBar from "./Common/SideBar.vue";
import WelcomeMain from "./WelcomePage/WelcomeIndex.vue";
</script>

<style scoped>
.el-header {
  z-index: 999;
  box-shadow: 0px 5px 15px #51525354;
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
