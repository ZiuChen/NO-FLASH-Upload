<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>用户设置</span>
      </div>
    </template>
    <div :key="config.name" v-for="config in inputNumberConfigs">
      <span>{{ config.name }}</span>
      <el-input-number
        v-model="num"
        :min="1"
        :max="10"
        @change="handleChange"
      />
    </div>
  </el-card>
</template>

<script>
import ConfigOperations from "../../ts/Config/ConfigOperations";

export default {
  data() {
    return {
      inputNumberConfigs:
        ConfigOperations.readUserConfigWithFilter("input-number"),
      switchConfigs: ConfigOperations.readUserConfigWithFilter("switch"),
    };
  },
};
</script>

<style scoped></style>
