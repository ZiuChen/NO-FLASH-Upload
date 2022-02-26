<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>提交作业</span>
      </div>
    </template>
    <hwt-info :propHwtContent="hwtContent"></hwt-info>
    <hwt-editor :propHwtContent="hwtContent"></hwt-editor>
  </el-card>
</template>

<script>
import getInfo from "../../../ts/GetInfo";
import HwtInfo from "./HwtInfo.vue";
import HwtEditor from "./HwtEditor.vue";
export default {
  components: {
    HwtInfo,
    HwtEditor,
  },
  data() {
    return {
      lid: "",
      hwtid: "",
      hwtContent: {},
    };
  },
  created() {
    this.lid = this.$route.params.lid;
    this.hwtid = this.$route.params.hwtid;
    this.dataInit(this.hwtid);
  },
  methods: {
    async dataInit(hwtid) {
      return await getInfo.getHwtContent(hwtid).then((res) => {
        this.hwtContent = res;
        console.log(this.hwtContent);
        return res;
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  min-height: 100%;
  height: 100%;
}
</style>
