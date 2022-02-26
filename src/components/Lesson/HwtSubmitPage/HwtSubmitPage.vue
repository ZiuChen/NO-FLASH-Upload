<template>
  <el-calendar />
</template>

<script>
import getInfo from "../../ts/GetInfo";
export default {
  created() {
    getInfo.getHwtContent("38680").then((res) => {
      console.log(res);
    });
  },
};
</script>

<style scoped></style>
