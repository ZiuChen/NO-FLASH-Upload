<template>
  <div class="zu-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <div class="button-group">
            <slot name="button-group">
              <el-button
                icon="Refresh"
                :loading="loadingStatus"
                :disabled="loadingStatus"
                @click="handleReloadClick"
                circle
              >
              </el-button>
              <slot name="more-button"></slot>
            </slot>
          </div>
        </div>
      </template>
      <el-table
        :data="listData"
        :height="tableHeight"
        v-load="loadingStatus"
        :default-sort="defaultSort"
        :row-class-name="rowClassName"
      >
        <template v-for="item of propList" :key="item.prop">
          <el-table-column v-bind="item" :align="item?.align">
            <template #default="scope">
              <slot :name="item.slotName" :row="scope.row">
                {{ scope.row[item.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  listData: {
    type: Array,
    required: true,
  },
  propList: {
    type: Array,
    required: true,
  },
  tableHeight: {
    type: String,
    default: "auto",
  },
  defaultSort: {
    type: Object,
    default: () => ({}),
  },
  rowClassName: {
    type: Function,
    default: () => {},
  },
});
const emit = defineEmits(["reload"]);
const loadingStatus = ref(true);
const handleReloadClick = () => {
  loadingStatus.value = true;
  emit("reload", { loadingStatus });
};
emit("reload", { loadingStatus });
defineExpose({
  handleReloadClick,
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
  font-size: 1.1em;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #005bac;
  font-weight: bold;
}
</style>
