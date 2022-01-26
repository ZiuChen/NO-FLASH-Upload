<template>
  <el-collapse v-model="activeNotifyID" accordion>
    <el-collapse-item
      :key="lesson.id"
      v-for="lesson in remindList.notify"
      :title="lesson.name"
      :name="lesson.id"
    >
      <notify-list-detail :lid="lesson.id"></notify-list-detail>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import getInfo from "../../function/GetInfo";
import NotifyListDetail from "./NotifyListDetail.vue";
export default {
  components: {
    NotifyListDetail,
  },
  data() {
    return { InformList: {}, activeNotifyID: "", Notifies: [] };
  },
  props: ["remindList"],
  methods: {
    // async activeNotifyChange(activeNotifyID) {
    //   this.Notifies = await getInfo.getInformList(activeNotifyID);
    //   getNotifyDetail(activeNotifyID);
    // },
  },
};
</script>

<style scoped></style>
