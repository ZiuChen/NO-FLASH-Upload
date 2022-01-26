<template>
  <div :class="`notify-list-detail ${lid}`">
    <p :key="notify" v-for="notify in Notifies">
      <span class="notify-list-detail-name">{{ notify.notifyName }}</span>
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
  },
};
</script>

<style scoped></style>
