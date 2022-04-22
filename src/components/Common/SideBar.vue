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
      <el-icon title="主页" :size="iconSize">
        <svg
          t="1646100577131"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="22083"
          width="200"
          height="200"
        >
          <path
            d="M426.666667 853.333333v-256h170.666666v256h213.333334v-341.333333h128L512 128 85.333333 512h128v341.333333h213.333334z"
            fill=""
            p-id="22084"
          ></path>
        </svg>
      </el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-menu-item class="mdui-ripple top-menu-item" index="plugins">
      <el-icon title="插件" :size="iconSize">
        <svg
          t="1649904381349"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="21103"
          width="200"
          height="200"
        >
          <path
            d="M874.666667 469.333333H810.666667V298.666667c0-46.933333-38.4-85.333333-85.333334-85.333334h-170.666666V149.333333C554.666667 89.6 507.733333 42.666667 448 42.666667S341.333333 89.6 341.333333 149.333333V213.333333H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333334v162.133333h64c64 0 115.2 51.2 115.2 115.2S213.333333 691.2 149.333333 691.2H85.333333V853.333333c0 46.933333 38.4 85.333333 85.333334 85.333334h162.133333v-64c0-64 51.2-115.2 115.2-115.2 64 0 115.2 51.2 115.2 115.2V938.666667H725.333333c46.933333 0 85.333333-38.4 85.333334-85.333334v-170.666666h64c59.733333 0 106.666667-46.933333 106.666666-106.666667S934.4 469.333333 874.666667 469.333333z"
            p-id="21104"
          ></path>
        </svg>
      </el-icon>
      <span>关于</span>
    </el-menu-item>
    <el-menu-item class="mdui-ripple top-menu-item" index="about">
      <el-icon title="关于" :size="iconSize">
        <svg
          t="1646097918982"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="20733"
          width="200"
          height="200"
        >
          <path
            d="M554.666667 384h-85.333334V298.666667h85.333334m0 426.666666h-85.333334v-256h85.333334m-42.666667-384A426.666667 426.666667 0 0 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667 426.666667 426.666667 0 0 0 426.666667-426.666667A426.666667 426.666667 0 0 0 512 85.333333z"
            fill=""
            p-id="20734"
          ></path>
        </svg>
      </el-icon>
      <span>关于</span>
    </el-menu-item>
    <el-menu-item class="mdui-ripple bottom-menu-item" index="profile">
      <el-icon title="个人设置" :size="iconSize">
        <svg
          t="1647787200801"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="21457"
          width="200"
          height="200"
        >
          <path
            d="M512 661.333333A149.333333 149.333333 0 0 1 362.666667 512 149.333333 149.333333 0 0 1 512 362.666667a149.333333 149.333333 0 0 1 149.333333 149.333333 149.333333 149.333333 0 0 1-149.333333 149.333333m317.013333-107.946666c1.706667-13.653333 2.986667-27.306667 2.986667-41.386667 0-14.08-1.28-28.16-2.986667-42.666667l90.026667-69.546666c8.106667-6.4 10.24-17.92 5.12-27.306667l-85.333333-147.626667c-5.12-9.386667-16.64-13.226667-26.026667-9.386666l-106.24 42.666666c-22.186667-16.64-45.226667-31.146667-72.106667-41.813333l-15.786666-113.066667A21.589333 21.589333 0 0 0 597.333333 85.333333h-170.666666c-10.666667 0-19.626667 7.68-21.333334 17.92l-15.786666 113.066667c-26.88 10.666667-49.92 25.173333-72.106667 41.813333l-106.24-42.666666c-9.386667-3.84-20.906667 0-26.026667 9.386666l-85.333333 147.626667c-5.546667 9.386667-2.986667 20.906667 5.12 27.306667L194.986667 469.333333c-1.706667 14.506667-2.986667 28.586667-2.986667 42.666667 0 14.08 1.28 27.733333 2.986667 41.386667l-90.026667 70.826666c-8.106667 6.4-10.666667 17.92-5.12 27.306667l85.333333 147.626667c5.12 9.386667 16.64 12.8 26.026667 9.386666l106.24-43.093333c22.186667 17.066667 45.226667 31.573333 72.106667 42.24l15.786666 113.066667c1.706667 10.24 10.666667 17.92 21.333334 17.92h170.666666c10.666667 0 19.626667-7.68 21.333334-17.92l15.786666-113.066667c26.88-11.093333 49.92-25.173333 72.106667-42.24l106.24 43.093333c9.386667 3.413333 20.906667 0 26.026667-9.386666l85.333333-147.626667c5.12-9.386667 2.986667-20.906667-5.12-27.306667l-90.026667-70.826666z"
            fill=""
            p-id="21458"
          ></path>
        </svg>
      </el-icon>
      <span>个人设置</span>
    </el-menu-item>
    <el-menu-item
      class="mdui-ripple bottom-menu-item"
      index="logout"
      @click="handleLogoutClick"
    >
      <el-icon title="退出" :size="iconSize">
        <svg
          t="1649576180183"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="21421"
          width="200"
          height="200"
        >
          <path
            d="M512 85.333333c235.946667 0 426.666667 190.72 426.666667 426.666667s-190.72 426.666667-426.666667 426.666667S85.333333 747.946667 85.333333 512 276.053333 85.333333 512 85.333333m153.173333 213.333334L512 451.84 358.826667 298.666667 298.666667 358.826667 451.84 512 298.666667 665.173333 358.826667 725.333333 512 572.16 665.173333 725.333333 725.333333 665.173333 572.16 512 725.333333 358.826667 665.173333 298.666667z"
            fill=""
            p-id="21422"
          ></path>
        </svg>
      </el-icon>
      <span>退出</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      iconSize: 18,
    };
  },
  methods: {
    handleSelect(index, indexPath, item, routeResult) {
      if (index === "logout") return;
      let rtn =
        indexPath.length === 2
          ? { path: `/${indexPath[0]}/${indexPath[1]}/info` }
          : { path: `/${index}` };
      this.$router.push(rtn);
    },
    handleLogoutClick() {
      ElMessageBox.confirm("即将退出当前账号", "免Flash文件上传", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.location.href =
            "http://cc.bjtu.edu.cn:81/meol/popups/logout.jsp";
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "操作已取消",
          });
        });
    },
  },
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
  top: 425px;
}
</style>
