<template>
  <div class="zu-table">
    <ZUCard :showDragHandler="showDragHandler">
      <template #header>
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
      <template #footer><slot name="footer"></slot></template>
    </ZUCard>
  </div>
</template>

<script setup>
import ZUCard from "@/base-ui/card";
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
    default: undefined,
  },
  defaultSort: {
    type: Object,
    default: () => ({}),
  },
  rowClassName: {
    type: Function,
    default: () => {},
  },
  showDragHandler: {
    type: Boolean,
    default: false,
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
