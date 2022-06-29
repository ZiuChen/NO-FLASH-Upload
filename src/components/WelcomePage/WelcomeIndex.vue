<template>
  <div class="welcome-index">
    <el-row>
      <template v-for="c of components" :key="c.cpn">
        <el-col :span="c.span">
          <component :is="c.cpn"></component>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup>
import { plainConfig } from "./config/welcomeindex.config";
import usePageSort from "@/hooks/usePageSort";

const [components] = usePageSort(plainConfig, {
  selector: ".welcome-index .el-row",
  otherOptions: {
    handle: ".drag-handler",
  },
});
</script>

<style scope></style>
