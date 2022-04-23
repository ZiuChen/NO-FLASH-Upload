<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>脚本信息</span>
      </div>
    </template>
    <div class="card-body">
      <div class="title" align="center">
        <h2>免Flash文件上传</h2>
        <el-tag type="success">{{ config.version }}</el-tag>
      </div>
      <div class="description" align="center">
        <span>
          {{ config.description }}
        </span>
      </div>
      <div class="button-block" align="center">
        <el-button class="inner-button" @click="handleButtonClick('github')">
          <el-icon :size="iconSize">
            <svg
              t="1649577317658"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21691"
              width="200"
              height="200"
            >
              <path
                d="M512 85.333333A426.666667 426.666667 0 0 0 85.333333 512c0 188.586667 122.453333 348.586667 291.84 405.333333 21.333333 3.413333 28.16-9.813333 28.16-21.333333v-72.106667c-118.186667 25.6-143.36-57.173333-143.36-57.173333-19.626667-49.493333-47.36-62.72-47.36-62.72-38.826667-26.453333 2.986667-25.6 2.986667-25.6 42.666667 2.986667 65.28 43.946667 65.28 43.946667 37.12 64.853333 99.84 45.653333 124.16 35.413333 3.84-27.733333 14.933333-46.506667 26.88-57.173333-94.72-10.666667-194.133333-47.36-194.133333-209.92 0-47.36 16.213333-85.333333 43.946666-115.626667-4.266667-10.666667-19.2-55.04 4.266667-112.64 0 0 35.84-11.52 117.333333 43.52 33.706667-9.386667 70.4-14.08 106.666667-14.08 36.266667 0 72.96 4.693333 106.666667 14.08 81.493333-55.04 117.333333-43.52 117.333333-43.52 23.466667 57.6 8.533333 101.973333 4.266667 112.64 27.733333 30.293333 43.946667 68.266667 43.946666 115.626667 0 162.986667-99.84 198.826667-194.986666 209.493333 15.36 13.226667 29.44 39.253333 29.44 78.933333V896c0 11.52 6.826667 25.173333 28.586666 21.333333C816.64 860.16 938.666667 700.586667 938.666667 512A426.666667 426.666667 0 0 0 512 85.333333z"
                fill=""
                p-id="21692"
              ></path>
            </svg>
          </el-icon>
          主页
        </el-button>
        <el-button class="inner-button" @click="handleButtonClick('donate')">
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
          捐赠
        </el-button>
        <el-dropdown class="inner-button" @command="handleButtonClick">
          <el-button class="el-dropdown-link">
            <el-icon :size="iconSize">
              <svg
                t="1649577361138"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="22096"
                width="200"
                height="200"
              >
                <path
                  d="M768 597.333333h-320l85.333333-85.333333H768M256 597.333333v-106.666666l293.546667-292.693334c8.106667-8.106667 21.76-8.106667 30.293333 0l75.093333 75.52c8.533333 8.533333 8.533333 21.76 0 30.293334L361.386667 597.333333M853.333333 85.333333H170.666667a85.333333 85.333333 0 0 0-85.333334 85.333334v768l170.666667-170.666667h597.333333a85.333333 85.333333 0 0 0 85.333334-85.333333V170.666667a85.333333 85.333333 0 0 0-85.333334-85.333334z"
                  fill=""
                  p-id="22097"
                ></path>
              </svg>
            </el-icon>
            反馈</el-button
          >
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="'github'"
                >Github Issue</el-dropdown-item
              >
              <el-dropdown-item :command="'support'"
                >腾讯兔小巢</el-dropdown-item
              >
              <el-dropdown-item :command="'qq'">加入反馈群</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-badge :is-dot="needUpdate">
          <el-button class="inner-button" @click="CheckUpdate()">
            <el-icon :size="iconSize">
              <svg
                t="1649576753250"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="21556"
                width="200"
                height="200"
              >
                <path
                  d="M896 431.786667h-289.28l116.906667-120.32c-116.48-115.2-305.066667-119.466667-421.546667-4.266667a293.845333 293.845333 0 0 0 0 418.133333c116.48 115.2 305.066667 115.2 421.546667 0 58.026667-57.6 87.04-124.586667 87.04-209.066666h85.333333c0 84.48-37.546667 194.133333-112.64 268.373333-149.76 148.48-392.96 148.48-542.72 0-149.333333-148.053333-150.613333-388.693333-0.853333-536.746667a383.445333 383.445333 0 0 1 539.733333 0L896 128v303.786667M533.333333 341.333333v181.333334l149.333334 88.746666-30.72 51.626667L469.333333 554.666667V341.333333h64z"
                  fill=""
                  p-id="21557"
                ></path>
              </svg>
            </el-icon>
            更新
          </el-button>
        </el-badge>
        <el-button class="inner-button" @click="handleButtonClick('notify')">
          <el-icon :size="iconSize">
            <svg
              t="1650700559946"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="20746"
              width="200"
              height="200"
            >
              <path
                d="M554.666667 426.666667h-85.333334V256h85.333334m0 341.333333h-85.333334v-85.333333h85.333334m298.666666-426.666667H170.666667a85.333333 85.333333 0 0 0-85.333334 85.333334v768l170.666667-170.666667h597.333333a85.333333 85.333333 0 0 0 85.333334-85.333333V170.666667a85.333333 85.333333 0 0 0-85.333334-85.333334z"
                fill=""
                p-id="20747"
              ></path>
            </svg>
          </el-icon>
          通知
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import config from "../../ts/Config/Config";
import CheckUpdate from "../../ts/CheckUpdate";
import getVersionInfo from "../../ts/GetVersionInfo";
import API from "../../ts/API";
export default {
  mounted() {
    this.getVersionInfo();
  },
  data() {
    return {
      config: config,
      needUpdate: false,
      iconSize: 18,
      donateUrl: `https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/img/Buy%20me%20a%20coffee.png`,
    };
  },
  methods: {
    handleButtonClick(type) {
      if (type === "github") {
        window.open(this.config.githubURL);
      } else if (type === "donate") {
        window.open(this.donateUrl);
      } else if (type === "notify") {
        API.getLastestScriptNotify(true);
      } else if (command === "support") {
        // drop-down items
        window.open(`https://support.qq.com/products/395800`);
      } else if (command === "qq") {
        // drop-down items
        window.open(
          `https://qm.qq.com/cgi-bin/qm/qr?k=9qfHKTaQuWqYN1ys1yiQPdJ4iIlHwgL5&jump_from=webapi`
        );
      }
    },
    CheckUpdate() {
      CheckUpdate();
    },
    async getVersionInfo() {
      await getVersionInfo().then((res) => {
        this.needUpdate = res.need;
      });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
  align-content: baseline;
  justify-content: center;
}

.title h2 {
  padding-right: 5px;
}

.description {
  color: #909399;
  padding-bottom: 10px;
}

.el-icon {
  margin-right: 5px;
}

.button-block {
  margin-top: 10px;
  margin-bottom: 10px;
}

.inner-button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
