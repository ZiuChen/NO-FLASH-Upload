<template>
  <el-scrollbar height="450px">
    <el-collapse v-model="activeNotifyID">
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
</template>

<script>
import NotifyListDetail from "./NotifyListDetail.vue";
export default {
  components: {
    NotifyListDetail,
  },
  data() {
    return { InformList: {}, activeNotifyID: "", Notifies: [] };
  },
  props: ["notifies"],
  methods: {},
};
</script>

<style scoped>
.el-collapse-item {
  font-size: 1.2em;
}
</style>
