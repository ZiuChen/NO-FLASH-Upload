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
    <el-sub-menu class="mdui-ripple" index="lesson" v-if="false">
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
          v-for="lesson in lessonList"
          :key="lesson.id"
          :index="lesson.id"
          >{{ lesson.name }}</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item class="mdui-ripple" index="profile">
      <el-icon :size="iconSize">
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
</template>

<script>
import API from "../../ts/API";
export default {
  data() {
    return {
      lessonList: [],
      iconSize: 18,
    };
  },
  mounted() {
    this.getLessonList();
  },
  methods: {
    async getLessonList() {
      this.lessonList = await API.getLessonList();
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
