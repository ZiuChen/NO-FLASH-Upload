<template>
  <el-row>
    <el-col :span="8">
      <modify-user-config></modify-user-config>
    </el-col>
    <el-col :span="8">
      <modify-hwt-list-config></modify-hwt-list-config>
    </el-col>
  </el-row>
</template>

<script>
import ModifyUserConfig from "./ModifyUserConfig.vue";
import ModifyHwtListConfig from "./ModifyHwtListConfig.vue";
export default {
  components: {
    ModifyUserConfig,
    ModifyHwtListConfig,
  },
};
</script>

<style scoped></style>
