<template>
  <el-aside>
    <el-menu default-active="welcome" background-color="" router>
      <el-menu-item index="welcome">
        <el-icon>
          <svg
            t="1642871200836"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3037"
            width="200"
            height="200"
          >
            <path
              d="M938.666667 725.333333h-273.066667l85.333333 170.666667h-469.333333l76.8-170.666667H85.333333V128h853.333334z"
              p-id="3038"
            ></path>
          </svg>
        </el-icon>
        <span>主页</span>
      </el-menu-item>
      <el-sub-menu index="lesson">
        <template #title>
          <el-icon>
            <svg
              t="1642871087737"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2766"
              width="200"
              height="200"
            >
              <path
                d="M810.666667 170.666667V85.333333h-85.333334v85.333334H298.666667V85.333333H213.333333v85.333334H85.333333v768h853.333334V170.666667h-128zM384 768H298.666667v-85.333333h85.333333v85.333333z m0-170.666667H298.666667v-85.333333h85.333333v85.333333z m170.666667 170.666667h-85.333334v-85.333333h85.333334v85.333333z m0-170.666667h-85.333334v-85.333333h85.333334v85.333333z m0-170.666666h-85.333334V341.333333h85.333334v85.333334z m170.666666 341.333333h-85.333333v-85.333333h85.333333v85.333333z m0-170.666667h-85.333333v-85.333333h85.333333v85.333333z m0-170.666666h-85.333333V341.333333h85.333333v85.333334z"
                p-id="2767"
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
            t="1642871023889"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2630"
            width="200"
            height="200"
          >
            <path
              d="M938.666667 384c0-17.066667-8.533333-34.133333-29.866667-38.4l-384-128c-8.533333-4.266667-17.066667-4.266667-25.6-4.266667l-384 128c-38.4 12.8-38.4 68.266667 0 81.066667L512 554.666667l341.333333-115.2V725.333333h85.333334V384z"
              p-id="2631"
            ></path>
            <path
              d="M256 563.2V725.333333c0 17.066667 12.8 34.133333 25.6 38.4 72.533333 29.866667 149.333333 42.666667 230.4 42.666667 76.8 0 153.6-12.8 230.4-42.666667 17.066667-8.533333 25.6-21.333333 25.6-38.4v-166.4l-256 85.333334-256-81.066667z"
              p-id="2632"
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
      console.log(this.lessonInfo);
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
