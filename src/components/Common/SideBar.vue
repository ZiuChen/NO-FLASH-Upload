<template>
  <el-menu
    mode="vertical"
    :collapse="true"
    default-active="welcome"
    text-color="#7e8f9f"
    active-text-color="#005bac"
    :default-openeds="['lesson']"
    @select="handleSelect"
  >
    <el-menu-item class="mdui-ripple top-menu-item" index="welcome">
      <el-icon :size="iconSize"><Platform /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item class="mdui-ripple top-menu-item" index="plugins">
      <el-icon :size="iconSize"><Menu /></el-icon>
      <span>插件</span>
    </el-menu-item>
    <el-menu-item class="mdui-ripple top-menu-item" index="profile">
      <el-icon :size="iconSize"><Open /></el-icon>
      <span>个人设置</span>
    </el-menu-item>
    <el-menu-item class="mdui-ripple top-menu-item" index="about">
      <el-icon :size="iconSize"><MoreFilled /></el-icon>
      <span>关于</span>
    </el-menu-item>
    <el-menu-item
      class="mdui-ripple bottom-menu-item"
      index="logout"
      @click="handleLogoutClick"
    >
      <el-icon :size="iconSize"><CircleCloseFilled /></el-icon>
      <span>退出</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
const router = useRouter();
const iconSize = 16;
const handleSelect = (index, indexPath, item, routeResult) => {
  if (index === "logout") return;
  let rtn =
    indexPath.length === 2
      ? { path: `/${indexPath[0]}/${indexPath[1]}/info` }
      : { path: `/${index}` };
  router.push(rtn);
};
const handleLogoutClick = () => {
  ElMessageBox.confirm("即将退出当前账号", "免Flash文件上传", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      window.location.href = "http://cc.bjtu.edu.cn:81/meol/popups/logout.jsp";
    })
    .catch(() => {
      // cancel
    });
};
</script>

<style scoped>
.el-menu-item span,
.el-sub-menu span {
  font-weight: bold;
}

.el-icon {
  transform: scale(1.5);
}

.top-menu-item {
  top: 10px;
}

.bottom-menu-item {
  position: fixed;
  bottom: 10px;
}
</style>
