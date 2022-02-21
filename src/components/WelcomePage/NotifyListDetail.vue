<template>
  <div :class="`notify-list-detail ${lid}`">
    <p
      :key="notify.id"
      v-for="notify in Notifies"
      @click="NotifyDetailClick(lid, notify.id)"
    >
      <span class="notify-list-detail-name" :title="notify.notifyName">{{
        notify.notifyName
      }}</span>
      <span class="notify-list-detail-pubtime">{{ notify.pubTime }}</span>
    </p>
  </div>
</template>

<script>
import getInfo from "../../function/GetInfo";
export default {
  props: ["lid"],
  data() {
    return {
      lessonID: this.lid,
      Notifies: [],
    };
  },
  mounted() {
    this.getInformList(this.lessonID);
  },
  methods: {
    async getInformList(activeNotifyID) {
      this.Notifies = await getInfo.getInformList(activeNotifyID);
    },
    async NotifyDetailClick(lid, nid) {
      let url = `http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/course_meswrap.jsp`;
      window.open(`${url}?courseId=${lid}&nid=${nid}`);
      console.log(lid, nid);
    },
  },
};
</script>

<style scoped>
.notify-list-detail {
  cursor: pointer;
}

.notify-list-detail-name {
  float: left;
  white-space: nowrap;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
}

.notify-list-detail-pubtime {
  float: right;
}
</style>
