<template>
  <el-card class="notify-list" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>未读通知</span>
        <el-button
          :loading="loadingStatus"
          :disabled="loadingStatus"
          @click="refreshNotifyList"
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
    <!-- <el-empty v-if="notifyEmpty" description="没有未读通知哦~"></el-empty> -->
    <el-scrollbar height="400px">
      <el-collapse>
        <el-collapse-item
          :key="lesson.id"
          v-for="lesson in notifies"
          :title="lesson.name"
          :name="lesson.id"
        >
          <notify-list-detail :lid="lesson.id"></notify-list-detail>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </el-card>
</template>

<script>
import getInfo from "../../ts/GetInfo";
import NotifyListDetail from "./NotifyListDetail.vue";
export default {
  components: {
    NotifyListDetail,
  },
  created() {
    this.getRemindNotifies();
  },
  data() {
    return {
      notifies: [],
      loadingStatus: true,
    };
  },
  methods: {
    async getRemindNotifies() {
      this.notifies = await getInfo.getRemindInfo().then((res) => {
        this.loadingStatus = false;
        return res.notify;
      });
    },
    async refreshNotifyList() {
      this.loadingStatus = true;
      this.notifies = [];
      this.getRemindNotifies();
    },
  },
};
</script>

<style scoped>
.el-collapse-item {
  font-size: 1.2em;
}
</style>
