<template>
  <el-row>
    <el-col :span="8">
      <ModifyUserConfig></ModifyUserConfig>
    </el-col>
    <el-col :span="8">
      <ModifyHwtListConfig></ModifyHwtListConfig>
    </el-col>
    <el-col :span="8">
      <ModifyWelcomeConfig></ModifyWelcomeConfig>
    </el-col>
  </el-row>
</template>

<script>
import ModifyUserConfig from "./ModifyUserConfig.vue";
import ModifyHwtListConfig from "./ModifyHwtListConfig.vue";
import ModifyWelcomeConfig from "./ModifyWelcomeConfig.vue";
export default {
  components: {
    ModifyUserConfig,
    ModifyHwtListConfig,
    ModifyWelcomeConfig,
  },
};
</script>

<style scoped></style>
