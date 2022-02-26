<template>
  <div>Main</div>
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  data() {
    return {
      lid: "",
      lessonDetail: {},
    };
  },
  mounted() {
    this.getLessonDetail(this.$route.params.lid);
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        console.log(toParams, previousParams);
        if (toParams.lid === undefined) return; // necessary
        this.lid = toParams.lid;
      }
    );
  },
  watch: {
    lid: function (val) {
      this.getLessonDetail(val);
    },
  },
  methods: {
    async getLessonDetail(lid) {
      console.log(lid);
      this.lessonDetail = await getInfo
        .getLessonPageInfo(lid)
        .then((res) => {
          return res;
        })
        .then((res) => {
          console.log(this.lessonDetail);
          return res;
        });
    },
  },
};
</script>

<style scoped></style>
