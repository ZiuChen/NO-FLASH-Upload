<template>
  <el-card class="lesson-list" shadow="always">
    <template #header>
      <div class="card-header">
        <span>课程列表</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="updateLessonList"
          circle
        >
          <el-icon
            ><svg
              t="1645775950545"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="21783"
              width="200"
              height="200"
            >
              <path
                d="M753.066667 270.933333A339.541333 339.541333 0 0 0 512 170.666667a341.333333 341.333333 0 0 0-341.333333 341.333333 341.333333 341.333333 0 0 0 341.333333 341.333333c159.146667 0 291.84-108.8 329.813333-256h-88.746666A255.573333 255.573333 0 0 1 512 768a256 256 0 0 1-256-256 256 256 0 0 1 256-256c70.826667 0 133.973333 29.44 180.053333 75.946667L554.666667 469.333333h298.666666V170.666667l-100.266666 100.266666z"
                fill=""
                p-id="21784"
              ></path></svg
          ></el-icon>
        </el-button>
      </div>
    </template>
    <el-table
      :data="lessonList"
      height="400px"
      v-loading="loadingStatus"
      style="width: 100%"
    >
      <el-table-column prop="number" label="课程号" align="center" />
      <el-table-column prop="name" label="课程名" align="center">
        <template #default="scope">
          <el-link
            :underline="false"
            :href="lessonPageUrl + scope.row.id"
            target="_blank"
            >{{ scope.row.name }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="teacher" label="教师" align="center" />
      <el-table-column prop="academy" label="学院" align="center" />
      <el-table-column prop="id" label="操作" align="center" min-width="100px">
        <template #default="scope">
          <el-button-group>
            <el-button
              type="primary"
              plain
              @click="handleButtonClick(scope.row.id, 'up')"
              ><el-icon
                ><svg
                  t="1645760757857"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="21633"
                  width="200"
                  height="200"
                >
                  <path
                    d="M896 810.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h597.333334a85.333333 85.333333 0 0 1 85.333333 85.333333v597.333334m-341.333333-42.666667V405.333333l149.333333 149.333334 60.586667-60.586667L512 241.493333l-252.586667 252.586667L320 554.666667 469.333333 405.333333V768h85.333334z"
                    fill=""
                    p-id="21634"
                  ></path></svg></el-icon
            ></el-button>
            <el-button
              type="primary"
              plain
              @click="handleButtonClick(scope.row.id, 'down')"
            >
              <el-icon>
                <svg
                  t="1645760748848"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="21483"
                  width="200"
                  height="200"
                >
                  <path
                    d="M128 213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h597.333334a85.333333 85.333333 0 0 1 85.333333 85.333333v597.333334a85.333333 85.333333 0 0 1-85.333333 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333m341.333333 42.666667v362.666667L320 469.333333l-60.586667 60.586667L512 782.506667l252.586667-252.586667L704 469.333333 554.666667 618.666667V256h-85.333334z"
                    fill=""
                    p-id="21484"
                  ></path>
                </svg>
              </el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import API from "../../ts/API";
export default {
  data() {
    return {
      lessonList: [],
      loadingStatus: true,
      lessonPageUrl: `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=`,
    };
  },
  created() {
    this.updateLessonList();
  },
  methods: {
    async updateLessonList() {
      this.loadingStatus = true;
      this.lessonList = await API.getLessonList().then((res) => {
        this.loadingStatus = false;
        return res;
      });
    },
    async handleButtonClick(courseId, action) {
      return await API.lessonOrderOperation(courseId, action).then((res) => {
        return this.updateLessonList();
      });
    },
  },
};
</script>

<style scoped>
.table-header-check-tag {
  zoom: 15%;
}
</style>
