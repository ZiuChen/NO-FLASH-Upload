<template>
  <el-row>
    <el-col :span="12">
      <ScriptInfoCard></ScriptInfoCard>
    </el-col>
    <el-col :span="12">
      <ScriptNotify></ScriptNotify>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <UpdateLogCard></UpdateLogCard>
    </el-col>
    <el-col :span="12">
      <DonateCard></DonateCard>
    </el-col>
  </el-row>
</template>

<script>
import ScriptInfoCard from "./ScriptInfoCard.vue";
import ScriptNotify from "./ScriptNotify.vue";
import UpdateLogCard from "./UpdateLogCard.vue";
import DonateCard from "./DonateCard.vue";
export default {
  components: {
    ScriptInfoCard,
    ScriptNotify,
    UpdateLogCard,
    DonateCard,
  },
};
</script>

<style scoped>
.el-card {
  margin: 10px 10px 10px 10px;
  /* max-height: 1000px; */
}
</style>
