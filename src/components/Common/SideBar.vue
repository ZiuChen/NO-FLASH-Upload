<template>
  <el-scrollbar>
    <el-aside>
      <el-menu
        default-active="welcome"
        text-color="#7e8f9f"
        active-text-color="#005bac"
        :default-openeds="['lesson']"
        @select="handleSelect"
      >
        <el-menu-item class="mdui-ripple" index="welcome">
          <el-icon :size="iconSize">
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
        <el-sub-menu class="mdui-ripple" index="lesson">
          <template #title>
            <el-icon :size="iconSize">
              <svg
                t="1646098033361"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="20883"
                width="200"
                height="200"
              >
                <path
                  d="M810.666667 810.666667H213.333333V341.333333h597.333334m-128-298.666666v85.333333H341.333333V42.666667H256v85.333333H213.333333c-47.36 0-85.333333 37.973333-85.333333 85.333333v597.333334a85.333333 85.333333 0 0 0 85.333333 85.333333h597.333334a85.333333 85.333333 0 0 0 85.333333-85.333333V213.333333a85.333333 85.333333 0 0 0-85.333333-85.333333h-42.666667V42.666667m-42.666667 469.333333h-213.333333v213.333333h213.333333v-213.333333z"
                  fill=""
                  p-id="20884"
                ></path>
              </svg>
            </el-icon>
            <span>课程列表</span>
          </template>
          <!-- <el-menu-item-group title="置顶课程"> </el-menu-item-group> -->
          <el-menu-item-group title="所有课程">
            <el-menu-item
              class="mdui-ripple"
              v-for="lesson in lessonInfo"
              :key="lesson.id"
              :index="lesson.id"
              >{{ lesson.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item class="mdui-ripple" index="profile">
          <el-icon :size="iconSize">
            <svg
              t="1646098098097"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21183"
              width="200"
              height="200"
            >
              <path
                d="M384 170.666667a170.666667 170.666667 0 0 0-170.666667 170.666666 170.666667 170.666667 0 0 0 170.666667 170.666667 170.666667 170.666667 0 0 0 170.666667-170.666667 170.666667 170.666667 0 0 0-170.666667-170.666666m0 426.666666c-113.92 0-341.333333 56.746667-341.333333 170.666667v85.333333h472.746666c-2.133333-14.08-3.413333-28.16-3.413333-42.666666 0-64 21.333333-128 60.16-179.2-65.28-22.186667-137.813333-34.133333-188.16-34.133334m384 0a11.093333 11.093333 0 0 0-11.093333 8.96l-8.106667 56.32c-12.8 5.546667-25.173333 12.373333-36.266667 20.053334l-52.906666-21.333334c-4.693333 0-10.24 0-13.226667 5.546667l-42.666667 73.813333c-2.56 4.693333-1.706667 10.24 2.56 13.653334l45.226667 34.986666a178.901333 178.901333 0 0 0 0 42.666667l-45.226667 34.986667a11.093333 11.093333 0 0 0-2.56 13.653333l42.666667 73.813333c2.56 5.546667 8.106667 5.546667 13.226667 5.546667l52.906666-21.333333c11.093333 7.68 23.04 14.933333 36.266667 20.053333l8.106667 56.32c0.853333 5.12 5.12 8.96 11.093333 8.96h85.333333c4.693333 0 9.386667-3.84 10.24-8.96l8.106667-56.32c12.8-5.546667 24.32-12.373333 35.84-20.053333l52.48 21.333333c5.546667 0 11.093333 0 14.08-5.546667l42.666667-73.813333a11.093333 11.093333 0 0 0-2.56-13.653333l-45.653334-34.986667c0.853333-7.253333 1.706667-14.08 1.706667-21.333333 0-7.253333-0.426667-14.08-1.706667-21.333334l45.226667-34.986666a11.093333 11.093333 0 0 0 2.56-13.653334l-42.666667-73.813333c-2.56-5.546667-8.106667-5.546667-13.653333-5.546667l-52.48 21.333334c-11.52-7.68-23.04-14.933333-36.266667-20.053334l-8.106666-56.32A10.069333 10.069333 0 0 0 853.333333 597.333333m-42.666666 149.333334a64 64 0 0 1 64 64 64 64 0 0 1-64 64c-35.84 0-64-28.586667-64-64a64 64 0 0 1 64-64z"
                fill=""
                p-id="21184"
              ></path></svg
          ></el-icon>
          <span>个人设置</span>
        </el-menu-item>
        <el-menu-item class="mdui-ripple" index="about">
          <el-icon :size="iconSize">
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
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      lessonInfo: [],
      iconSize: 18,
    };
  },
  mounted() {
    this.getLessonInfo();
  },
  methods: {
    async getLessonInfo() {
      this.lessonInfo = await getInfo.getLessonInfo();
    },
    handleSelect(index, indexPath, item, routeResult) {
      let rtn =
        indexPath.length === 2
          ? { path: `/${indexPath[0]}/${indexPath[1]}/info` }
          : { path: `/${index}` };
      this.$router.push(rtn);
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
  zoom: 150%;
}
</style>
