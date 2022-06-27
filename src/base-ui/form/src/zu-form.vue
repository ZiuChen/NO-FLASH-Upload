<template>
  <div class="zu-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :label-position="labelPosition">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'switch'">
                <el-switch
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-switch>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array,
    required: true,
  },
  labelWidth: {
    type: String,
    default: "200px",
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 10px" }),
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 8,
      lg: 8,
      md: 12,
      sm: 12,
      xs: 24,
    }),
  },
  labelPosition: {
    type: String,
    default: "right",
  },
});
const emits = defineEmits(["update:modelValue"]);
const handleValueChange = (value, field) => {
  emits("update:modelValue", { ...props.modelValue, [field]: value });
};
</script>

<style scoped>
.zu-form {
  padding-top: 20px;
}
</style>
