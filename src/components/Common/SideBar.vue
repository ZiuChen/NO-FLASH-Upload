<template>
  <el-scrollbar>
    <el-aside>
      <el-menu
        default-active="welcome"
        text-color="#7e8f9f"
        active-text-color="#005bac"
        router
      >
        <el-menu-item index="welcome">
          <el-icon>
            <svg
              t="1644896946264"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2645"
              width="200"
              height="200"
            >
              <path
                d="M827.733333 341.333333l-285.866666-247.466666c-17.066667-12.8-38.4-12.8-55.466667 0L196.266667 341.333333H85.333333v597.333334h853.333334V341.333333h-110.933334zM512 183.466667L695.466667 341.333333H328.533333L512 183.466667z"
                p-id="2646"
              ></path>
            </svg>
          </el-icon>
          <span>主页</span>
        </el-menu-item>
        <el-sub-menu index="lesson">
          <template #title>
            <el-icon>
              <svg
                t="1644897021046"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2795"
                width="200"
                height="200"
              >
                <path
                  d="M137 887h750v-450h-750v450zM661.8 512h75v75h-75V512z m0 225h-75V662h75v75z m-150-225h75v75h-75V512z m0 225h-75V662h75v75z m-150-225h75v75h-75V512z m-75 150h75v75h-75V662zM736.8 211.8V137h-75v74.8h-300V137h-75v74.8H137V362h750v-150.2z"
                  p-id="2796"
                ></path>
              </svg>
            </el-icon>
            <span>课程列表</span>
          </template>
          <!-- <el-menu-item-group title="置顶课程"> </el-menu-item-group> -->
          <el-menu-item-group title="所有课程">
            <el-menu-item
              v-for="lesson in lessonInfo"
              :key="lesson.id"
              :index="'lesson-' + lesson.id"
              >{{ lesson.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="profile">
          <el-icon>
            <svg
              t="1644897146242"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3245"
              width="200"
              height="200"
            >
              <path
                d="M512 426.666667c93.866667 0 170.666667-76.8 170.666667-170.666667s-76.8-170.666667-170.666667-170.666667-170.666667 76.8-170.666667 170.666667 76.8 170.666667 170.666667 170.666667zM640 533.333333v72.533334c0 76.8-29.866667 149.333333-85.333333 204.8v-298.666667h-85.333334v298.666667c-55.466667-55.466667-85.333333-128-85.333333-204.8v-72.533334c-149.333333 51.2-256 196.266667-256 362.666667 0 25.6 17.066667 42.666667 42.666667 42.666667h682.666666c25.6 0 42.666667-21.333333 42.666667-42.666667 0-166.4-106.666667-311.466667-256-362.666667z"
                p-id="3246"
              ></path></svg
          ></el-icon>
          <span>个人设置</span>
        </el-menu-item>
        <el-menu-item index="bug-report">
          <el-icon>
            <svg
              t="1642941163672"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2630"
              width="200"
              height="200"
            >
              <path
                d="M662 774.4V812H212V212h450v38.2c22.4-17 47.6-29 75-34.6V137h-600v750h600v-184.8l-72.2 72.2H662z"
                p-id="2631"
              ></path>
              <path
                d="M854 319.8c-44-43.8-115.2-43.8-159 0L474.4 540.4v159h159.4L854 479c44-44 44-115.4 0-159.2zM287 287h300V362h-300zM399.4 509.2l72.2-72.2h-184.6V512h112.4zM287 587h112.4V662h-112.4z"
                p-id="2632"
              ></path></svg
          ></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>

<script>
import getInfo from "../../function/GetInfo";
export default {
  data() {
    return {
      lessonInfo: [],
    };
  },
  mounted() {
    this.getLessonInfo();
  },
  methods: {
    async getLessonInfo() {
      this.lessonInfo = await getInfo.getLessonInfo();
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
