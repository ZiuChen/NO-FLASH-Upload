<template>
  <div id="editor"></div>
</template>

<script>
import getInfo from "../../../ts/GetInfo";
const E = window.wangEditor;
let editor = null;
export default {
  data() {
    return {
      hwtContent: {}, // dont assign this.propHwtContent directly
      hwtContentWithId: {},
      submitContent: "",
      editorObj: {},
    };
  },
  watch: {
    propHwtContents: "watchCallBack",
  },
  props: ["propHwtContents"],
  methods: {
    initEditor() {
      if (editor !== null) {
        editor.destroy();
        editor = null;
      }
      editor = new E("#editor");
      this.editorObj = editor;
      editor.config.height = 240;
      editor.create();
    },
    async getSubmitContent(hwtid) {
      return await getInfo.getHwtSubmitContent(hwtid);
    },
    async watchCallBack(val) {
      this.hwtContent = val.hwtContent;
      this.hwtContentWithId = val.hwtContentWithId;
      this.submitContent = this.hwtContent.answer;
      this.initEditor();
      editor.txt.html(this.submitContent);
    },
  },
};
</script>

<style scoped>
#editor {
  margin-top: 25px;
}
</style>
