<template>
  <el-card shadow="hover">
    <template #header>
      <div class="card-header">
        <span>更新日志</span>
      </div>
    </template>
    <div class="log-table" v-html="log"></div>
  </el-card>
</template>

<script>
import config from "../../ts/Config/Config";
import sendRequest from "../../ts/SendRequest";
export default {
  mounted() {
    this.fetchUpdateLog();
  },
  data() {
    return {
      log: ``,
    };
  },
  methods: {
    async fetchUpdateLog() {
      return await sendRequest(config.updateLOG, undefined, {
        cache: "no-cache",
      }).then((res) => {
        return res.text().then((res) => {
          this.log = res;
          return res;
        });
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  height: 100%;
}
</style>
