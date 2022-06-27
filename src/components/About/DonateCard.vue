<template>
  <ZUCard>
    <template #header>
      <div class="card-header">
        <span>感谢捐赠❤</span>
      </div>
    </template>
    <div class="card-body">
      <el-link
        type="primary"
        href="https://docs.qq.com/sheet/DRWFjSFlKWFplSldi"
        target="_blank"
        >【定期更新】感谢捐赠名单❤</el-link
      >
    </div>
  </ZUCard>
</template>

<script setup>
import ZUCard from "@/base-ui/card";
</script>

<style scoped>
.card-body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>
