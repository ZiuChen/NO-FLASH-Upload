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
import { createEditor, createToolbar, Boot } from "@wangeditor/editor";
let editor = null;
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
      if (editor !== null) {
        // 非null则销毁重新创建
        editor.destroy();
        editor = null;
      } else {
        // 只注册一次：editor为null时注册
        class ButtonMenuClass {
          title = "上传附件";
          iconSvg = `<svg t="1647484105757" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30375" width="200" height="200"><path d="M950.877407 878.109433H73.406289a72.980745 72.980745 0 0 0 0 145.890567H950.877407a72.980745 72.980745 0 0 0 0-145.890567zM170.713949 439.728494h158.727802v296.249342a69.079928 69.079928 0 0 0 69.009004 69.079928h227.949577a69.079928 69.079928 0 0 0 69.150852-69.009004V439.728494h158.656878a35.036432 35.036432 0 0 0 25.745394-58.725031L538.100014 11.205984a35.461975 35.461975 0 0 0-51.490788 0L145.110403 381.003463A35.036432 35.036432 0 0 0 170.713949 439.728494z" fill="#707070" p-id="30376"></path></svg>`;
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
      }
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
          index: 26,
          keys: ["attachment"],
        },
      };
      // 创建编辑器
      editor = createEditor({
        selector: "#editor-container",
        config: editorConfig,
        html: this.submitContent,
        mode: "default",
      });
      // 创建工具栏
      const toolbar = createToolbar({
        editor,
        config: toolbarConfig,
        selector: "#toolbar-container",
        mode: "default",
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
