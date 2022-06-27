<template>
  <div class="zu-card">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <div class="button-group">
            <slot name="button-group">
              <el-button
                :loading="loadingStatus"
                :disabled="loadingStatus"
                @click="handleReloadClick"
                circle
              >
                <el-icon
                  ><svg
                    t="1645775950545"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="21783"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M753.066667 270.933333A339.541333 339.541333 0 0 0 512 170.666667a341.333333 341.333333 0 0 0-341.333333 341.333333 341.333333 341.333333 0 0 0 341.333333 341.333333c159.146667 0 291.84-108.8 329.813333-256h-88.746666A255.573333 255.573333 0 0 1 512 768a256 256 0 0 1-256-256 256 256 0 0 1 256-256c70.826667 0 133.973333 29.44 180.053333 75.946667L554.666667 469.333333h298.666666V170.666667l-100.266666 100.266666z"
                      fill=""
                      p-id="21784"
                    ></path></svg
                ></el-icon>
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
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
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
  },
});
const emit = defineEmits(["reload"]);
console.log(props.defaultSort);
const loadingStatus = ref(true);
const handleReloadClick = () => {
  loadingStatus.value = true;
  emit("reload", { loadingStatus });
};
emit("reload", { loadingStatus });
</script>

<style scoped></style>
