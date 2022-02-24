<template>
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
</template>

<script>
import NotifyListDetail from "./NotifyListDetail.vue";
export default {
  components: {
    NotifyListDetail,
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
