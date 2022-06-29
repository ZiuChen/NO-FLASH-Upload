<template>
  <div class="zu-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <el-icon class="drag-handler" v-if="showDragHandler"
            ><CollectionTag
          /></el-icon>
          <slot name="header"></slot>
        </div>
      </template>
      <slot></slot>
      <slot name="footer"></slot>
    </el-card>
  </div>
</template>

<script setup>
const props = defineProps({
  showDragHandler: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.el-card {
  margin: 10px 10px 10px 10px;
  border-radius: 15px;
  padding: 10px;
  /* max-height: 1000px; */
}
.card-header {
  height: 1.3em;
  font-size: 1.2em;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #005bac;
  font-weight: bold;
}
.drag-handler {
  cursor: move;
}
</style>
