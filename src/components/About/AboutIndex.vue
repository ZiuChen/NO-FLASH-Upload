<template>
  <el-row>
    <el-col :span="24">
      <ScriptInfoCard></ScriptInfoCard>
    </el-col>
    <el-col :span="12">
      <UpdateLogCard></UpdateLogCard>
    </el-col>
    <el-col :span="12">
      <DonateCard></DonateCard>
    </el-col>
  </el-row>
</template>

<script setup>
import ScriptInfoCard from "./ScriptInfoCard.vue";
import UpdateLogCard from "./UpdateLogCard.vue";
import DonateCard from "./DonateCard.vue";
</script>

<style scoped></style>
