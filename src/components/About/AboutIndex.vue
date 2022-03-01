<template>
  <el-card>
    <div class="title" align="center">
      <h2>
        免Flash文件上传<el-tag type="success">{{ config.version }}</el-tag>
      </h2>
    </div>
    <div class="description" align="center">
      <span>
        {{ config.description }}
      </span>
    </div>
    <div class="button-block" align="center">
      <el-button @click="handleButtonClick(config.githubUrl)">
        <el-icon :size="iconSize"
          ><svg
            t="1646098546718"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="21783"
            width="200"
            height="200"
          >
            <path
              d="M170.666667 85.333333h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333334v682.666666a85.333333 85.333333 0 0 1-85.333334 85.333334h-219.733333c-14.933333-3.413333-14.933333-32.426667-14.933333-42.666667v-116.906667c0-39.68-14.08-65.706667-29.44-78.933333 95.146667-10.666667 194.986667-46.506667 194.986666-209.493333 0-47.36-16.213333-85.333333-43.946666-115.626667 4.266667-10.666667 19.2-55.04-4.266667-112.64 0 0-35.84-11.52-117.333333 43.52-33.706667-9.386667-70.4-14.08-106.666667-14.08-36.266667 0-72.96 4.693333-106.666667 14.08-81.493333-55.04-117.333333-43.52-117.333333-43.52-23.466667 57.6-8.533333 101.973333-4.266667 112.64-27.733333 30.293333-43.946667 68.266667-43.946666 115.626667 0 162.56 99.413333 199.253333 194.133333 209.92-11.946667 10.666667-23.04 29.44-26.88 57.173333-24.32 10.24-87.04 29.44-124.16-35.413333 0 0-22.613333-40.96-65.28-43.946667 0 0-41.813333-0.853333-4.266667 25.6 0 0 29.013333 13.226667 48.64 62.72 0 0 25.173333 82.773333 143.36 57.173333V896c0 10.24 0 39.253333-15.36 42.666667H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333334V170.666667a85.333333 85.333333 0 0 1 85.333334-85.333334z"
              fill=""
              p-id="21784"
            ></path></svg></el-icon
        >主页</el-button
      >
      <el-button @click="handleButtonClick(config.githubUrl + '/issues')">
        <el-icon :size="iconSize">
          <svg
            t="1646098492774"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="21633"
            width="200"
            height="200"
          >
            <path
              d="M853.333333 85.333333H170.666667a85.333333 85.333333 0 0 0-85.333334 85.333334v768l170.666667-170.666667h597.333333a85.333333 85.333333 0 0 0 85.333334-85.333333V170.666667a85.333333 85.333333 0 0 0-85.333334-85.333334M256 384h512v85.333333H256m341.333333 128H256v-85.333333h341.333333m170.666667-170.666667H256V256h512"
              fill=""
              p-id="21634"
            ></path>
          </svg>
        </el-icon>
        反馈</el-button
      >
      <el-button @click="handleButtonClick(this.donateUrl)">
        <el-icon :size="iconSize">
          <svg
            t="1646098584201"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="21933"
            width="200"
            height="200"
          >
            <path
              d="M512 910.933333l-61.866667-56.32C230.4 655.36 85.333333 523.52 85.333333 362.666667 85.333333 230.826667 188.586667 128 320 128c74.24 0 145.493333 34.56 192 88.746667C558.506667 162.56 629.76 128 704 128 835.413333 128 938.666667 230.826667 938.666667 362.666667c0 160.853333-145.066667 292.693333-364.8 491.946666L512 910.933333z"
              fill=""
              p-id="21934"
            ></path>
          </svg>
        </el-icon>
        捐赠</el-button
      >
    </div>
  </el-card>
</template>

<script>
import config from "../../ts/Config/Config";
export default {
  data() {
    return {
      config: config,
      iconSize: 18,
      donateUrl: `https://raw.githubusercontent.com/ZiuChen/NO-FLASH-Upload/v2.x-Vue/doc/img/Buy%20me%20a%20coffee.png`,
    };
  },
  methods: {
    handleButtonClick(url) {
      window.open(url);
    },
  },
};
</script>

<style scoped>
.title {
  display: inline;
}
.description span {
  color: #909399;
}

.el-icon {
  margin-right: 5px;
}

.button-block {
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-card {
  display: flex;
  justify-content: center;
}
</style>
