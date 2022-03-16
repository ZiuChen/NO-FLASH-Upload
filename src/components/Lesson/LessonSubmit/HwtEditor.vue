<template>
  <el-upload
    id="upload-trigger"
    action="http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload"
    :on-success="handleUploadSuccess"
    multiple
  >
  </el-upload>
  <div id="toolbar-container"></div>
  <div id="editor-container" style="height: 350px"></div>
  <!-- 此处须为行内样式，否则编辑器只有有内容的行可以点击 -->
</template>

<script>
import sendRequest from "../../../ts/SendRequest";
import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar, Boot } from "@wangeditor/editor";

export default {
  mounted() {
    this.initEditor();
  },
  data() {
    return {
      editorObj: {},
      submitContent: "",
    };
  },
  watch: {
    propHwtContents: function (val) {
      this.submitContent = ""; // 先重置
      this.editorObj.clear();
      this.submitContent = val.hwtContent.hwaAnswer; // 再赋值
      this.editorObj.dangerouslyInsertHtml(this.submitContent);
    },
  },
  props: ["propHwtContents"],
  methods: {
    initEditor() {
      class ButtonMenuClass {
        title = "上传附件";
        iconSvg = "";
        tag = "button";
        getValue() {}
        isActive() {
          return false;
        }
        isDisabled() {
          return false;
        }
        exec(editor, value) {
          document.querySelector("#upload-trigger input").click();
        }
      }
      const buttonMenu = {
        key: "attachment",
        factory() {
          return new ButtonMenuClass();
        },
      };
      Boot.registerMenu(buttonMenu);
      const editorConfig = {
        placeholder: "请输入内容...",
        onChange: (editor) => {
          // 即时赋值，否则提交时会出现闪烁
          this.submitContent = editor.getHtml();
        },
        MENU_CONF: {
          uploadImage: {
            async customUpload(file, insertFn) {
              let formData = new FormData();
              formData.append("Filename", file.name);
              formData.append("Filedata", file);
              sendRequest(
                `http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload`,
                undefined,
                {
                  method: "POST",
                  body: formData,
                }
              ).then((res) => {
                if (res.ok === true) {
                  res.text().then((resURL) => {
                    insertFn("/meol/" + resURL);
                  });
                }
              });
            },
          },
          uploadVideo: {
            async customUpload(file, insertFn) {
              let formData = new FormData();
              formData.append("Filename", file.name);
              formData.append("Filedata", file);
              sendRequest(
                `http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload`,
                undefined,
                {
                  method: "POST",
                  body: formData,
                }
              ).then((res) => {
                if (res.ok === true) {
                  res.text().then((resURL) => {
                    insertFn("/meol/" + resURL);
                  });
                }
              });
            },
          },
        },
      };
      const toolbarConfig = {
        excludeKeys: ["blockquote", "insertTable", "codeBlock", "fullScreen"],
        insertKeys: {
          index: 29,
          keys: ["attachment"],
        },
      };
      // 创建编辑器
      const editor = createEditor({
        selector: "#editor-container",
        config: editorConfig,
        html: this.submitContent,
        mode: "simple",
      });
      // 创建工具栏
      const toolbar = createToolbar({
        editor,
        config: toolbarConfig,
        selector: "#toolbar-container",
        mode: "simple",
      });
      this.editorObj = editor; // 编辑器对象传递给父组件执行上传
    },
    handleUploadSuccess(response, file, fileList) {
      const node = {
        type: "link",
        url: `/meol/${response}" href="/meol/${response}`,
        children: [{ text: file.name }],
      };
      this.editorObj.insertNode(node);
    },
  },
};
</script>

<style scoped>
#toolbar-container {
  border: 1px solid #ccc;
}
#editor-container {
  border: 1px solid #ccc;
  border-style: none solid solid solid;
}
</style>
