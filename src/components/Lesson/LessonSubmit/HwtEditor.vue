<template>
  <el-upload
    id="upload-trigger"
    action="http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload"
    :on-success="handleUploadSuccess"
    :drag="hwtSubmitDragStatus"
    multiple
  >
    <div v-if="hwtSubmitDragStatus">
      <el-icon class="el-icon--upload">
        <svg
          t="1647834161622"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="20761"
          width="200"
          height="200"
        >
          <path
            d="M384 682.666667v-256H213.333333l298.666667-298.666667 298.666667 298.666667h-170.666667v256H384m-170.666667 170.666666v-85.333333h597.333334v85.333333H213.333333z"
            fill=""
            p-id="20762"
          ></path>
        </svg>
      </el-icon>
      <div class="el-upload__text">拖拽文件到此处或 <em>点击上传附件</em></div>
    </div>
  </el-upload>
  <div id="toolbar-container"></div>
  <div id="editor-container" style="height: 350px"></div>
  <!-- 此处须为行内样式，否则编辑器只有有内容的行可以点击 -->
</template>

<script>
import sendRequest from "../../../ts/SendRequest";
import ConfigOperations from "../../../ts/Config/ConfigOperations";
const E = window.wangEditor;
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
E.Boot.registerMenu(buttonMenu);
export default {
  mounted() {
    this.status = "config-hwt-submit-drag";
    this.initEditor();
  },
  data() {
    return {
      editorObj: null,
      hwtSubmitDragStatus:
        ConfigOperations.readUserConfig()["config-hwt-submit-drag"].value,
    };
  },
  watch: {
    propHwtContent: function (val) {
      console.log(val);
      this.editorObj.clear();
      this.editorObj.dangerouslyInsertHtml(val.hwaAnswer);
    },
  },
  props: ["propHwtContent"],
  beforeUnmount() {
    this.editorObj.destroy(); // 取消挂载时销毁编辑器
  },
  methods: {
    initEditor() {
      const editorConfig = {
        placeholder: "请输入内容...",
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
      const editor = E.createEditor({
        selector: "#editor-container",
        config: editorConfig,
        html: this.propHwtContent.hwaAnswer,
        mode: "default",
      });
      // 创建工具栏
      const toolbar = E.createToolbar({
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
#upload-trigger {
  text-align: center;
  padding: 10px;
}
#toolbar-container {
  border: 1px solid #ccc;
}
#editor-container {
  border: 1px solid #ccc;
  border-style: none solid solid solid;
}
</style>
