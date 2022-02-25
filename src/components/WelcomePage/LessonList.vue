<template>
  <el-card class="lesson-list" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>课程列表</span>
        <el-check-tag
          size="small"
          :checked="operationEnabled"
          @change="toggleOperationEnabledStatus"
        >
          <template #default="">
            <el-icon>
              <svg
                t="1645760155626"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="20883"
                width="200"
                height="200"
              >
                <path
                  d="M810.666667 128a85.333333 85.333333 0 0 1 85.333333 85.333333v597.333334a85.333333 85.333333 0 0 1-85.333333 85.333333H213.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333a85.333333 85.333333 0 0 1 85.333333-85.333333h597.333334m-98.133334 270.933333c9.386667-8.96 9.386667-23.893333 0-32.853333L657.92 311.466667a22.698667 22.698667 0 0 0-32.853333 0l-42.666667 42.666666 87.466667 87.466667 42.666666-42.666667M298.666667 637.44V725.333333h87.893333l258.56-258.56-87.893333-87.893333L298.666667 637.44z"
                  fill=""
                  p-id="20884"
                ></path>
              </svg>
            </el-icon>
          </template>
        </el-check-tag>
      </div>
    </template>
    <el-table :data="lessonList" height="400px" style="width: 100%">
      <el-table-column
        prop="name"
        label="课程名"
        :show-overflow-tooltip="true"
        width="150px"
      >
        <template #default="scope">
          <el-link
            :underline="false"
            :href="lessonPageUrl + scope.row.id"
            target="_blank"
            >{{ scope.row.name }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="teacher" label="教师" />
      <el-table-column prop="academy" label="学院" />
      <el-table-column
        v-if="this.operationEnabled"
        prop="operation"
        label="操作"
        fixed="right"
        min-width="150px"
      >
        <template #default="scope">
          <el-button-group>
            <el-button
              type="primary"
              @click="handleButtonClick('up', scope.row.id)"
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
              @click="handleButtonClick('down', scope.row.id)"
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
import getInfo from "../../ts/GetInfo";
import sendRequest from "../../ts/SendRequest";
export default {
  data() {
    return {
      lessonList: [],
      operationEnabled: false,
      lessonPageUrl: `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=`,
      lessonUPUrl: `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp?ACTION=LESSUP&lid=`,
      lessonDOWNUrl: `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp?ACTION=LESSDOWN&lid=`,
    };
  },
  created() {
    this.updateLessonList();
  },
  props: ["operationStatus"],
  watch: {
    operationStatus: function (val) {
      this.operationEnabled = val;
    },
  },
  methods: {
    async updateLessonList() {
      this.lessonList = await getInfo.getLessonInfo().then((res) => {
        return res;
      });
    },
    async handleButtonClick(type, lid) {
      switch (type) {
        case "up":
          sendRequest(`${this.lessonUPUrl}${lid}`, (obj) => {
            // do nothing
            return obj;
          }).then(async (res) => {
            return await this.updateLessonList();
          });
          break;
        case "down":
          sendRequest(`${this.lessonDOWNUrl}${lid}`, (obj) => {
            // do nothing
            return obj;
          }).then(async (res) => {
            return await this.updateLessonList();
          });
          break;
      }
    },
    toggleOperationEnabledStatus(status) {
      this.operationEnabled = status;
    },
  },
};
</script>

<style scoped>
.table-header-check-tag {
  zoom: 15%;
}
</style>
