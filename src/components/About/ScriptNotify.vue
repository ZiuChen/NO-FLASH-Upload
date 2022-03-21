<template>
  <el-card shadow="always">
    <template #header>
      <div class="card-header">
        <span>脚本通知</span>
      </div>
    </template>
    <div class="container">
      <p>{{ notify.content }}</p>
      <p>
        <el-tag>{{ notify.pubTime }}</el-tag>
      </p>
    </div>
  </el-card>
</template>

<script>
import API from "../../ts/API";
export default {
  mounted() {
    this.updateScriptNotify();
  },
  data() {
    return {
      notify: {},
    };
  },
  methods: {
    async updateScriptNotify() {
      return await API.getScriptNotify().then((res) => {
        this.notify = res;
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  text-align: center;
}
</style>
