<template>
  <el-descriptions
    class="margin-top"
    title="Without border"
    :column="3"
    :size="size"
    :style="blockMargin"
  >
    <template #extra>
      <el-button type="primary">Operation</el-button>
    </template>
    <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
    <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
    <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
    <el-descriptions-item label="Remarks">
      <el-tag size="small">School</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
    </el-descriptions-item>
  </el-descriptions>
  <div id="welcomeEditor"></div>
</template>

<script>
import log from "../ts/Log";
import getInfo from "../ts/GetInfo";
export default {
  data() {
    return {};
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    async test() {
      return await getInfo.getHwtContent("38680").then((res) => {
        console.log(res);
      });
    },
    initEditor() {
      if (this.editor != null) {
        return;
      }
      const E = window.wangEditor;
      this.editor = new E("#welcomeEditor");
      this.editor.config.height = 240;
      this.editor.config.menus = [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "strikeThrough",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "justify",
        "emoticon",
        "table",
        "splitLine",
        "undo",
        "redo",
      ];
      this.editor.create();
    },
  },
};
</script>

<style scoped></style>
