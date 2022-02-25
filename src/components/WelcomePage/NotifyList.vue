<template>
  <el-card class="notify-list" shadow="always">
    <template #header>
      <div class="card-header">
        <span>未读通知</span>
      </div>
    </template>
    <el-empty v-if="notifyEmpty" description="没有未读通知哦~"></el-empty>
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
    };
  },
  methods: {
    async getRemindNotifies() {
      this.notifies = await getInfo.getRemindInfo().then((res) => {
        return res.notify;
      });
    },
  },
};
</script>

<style scoped>
.el-collapse-item {
  font-size: 1.2em;
}
</style>
