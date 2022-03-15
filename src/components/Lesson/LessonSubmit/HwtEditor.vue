<template>
  <el-upload
    class="upload-trigger"
    action="http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload"
    :on-success="handleUploadSuccess"
    multiple
  >
  </el-upload>
  <div id="editor"></div>
</template>

<script>
import getInfo from "../../../ts/GetInfo";
import sendRequest from "../../../ts/SendRequest";
const E = window.wangEditor;
const { BtnMenu } = E;
let editor = null;
class AlertMenu extends BtnMenu {
  constructor(editor) {
    const $elem = E.$(
      `<div class="w-e-menu" data-title="上传附件">
                <i title="上传附件" class="w-e-icon-upload2"></i>
            </div>`
    );
    super($elem, editor);
  }
  clickHandler() {
    document.querySelector(".upload-trigger input").click();
  }
  tryChangeActive() {} // Keep it, don't delete
}
const menuKey = "alertMenuKey";
E.registerMenu(menuKey, AlertMenu); // register menu
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
    async handleUploadSuccess(response, file, fileList) {
      editor.txt.append(
        `<p><a data-cke-saved-href="/meol/${response}" href="/meol/${response}">${file.name}</a><br/></p>`
      );
    },
    async getSubmitContent(hwtid) {
      return await getInfo.getHwtSubmitContent(hwtid);
    },
    async watchCallBack(val) {
      this.hwtContent = val.hwtContent;
      this.hwtContentWithId = val.hwtContentWithId;
      this.submitContent = this.hwtContent.hwaAnswer;
      this.initEditor();
      editor.txt.html(this.submitContent);
    },
    initEditor() {
      if (editor !== null) {
        editor.destroy();
        editor = null;
      }
      editor = new E("#editor");
      editor.config.menus = [
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
        "list",
        "justify",
        "image",
        "video",
        "table",
        "code",
        "splitLine",
        "undo",
        "redo",
      ];
      editor.config.height = 240;
      editor.config.zIndex = 99;
      editor.config.uploadImgServer = "/upload-img";
      editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        let formData = new FormData();
        formData.append("Filename", resultFiles[0].name);
        formData.append("Filedata", resultFiles[0]);
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
              console.log(resURL);
              insertImgFn("/meol/" + resURL);
            });
          }
        });
      };
      editor.config.customUploadVideo = function (resultFiles, insertVideoFn) {
        let formData = new FormData();
        formData.append("Filename", resultFiles[0].name);
        formData.append("Filedata", resultFiles[0]);
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
              insertVideoFn("/meol/" + resURL);
            });
          }
        });
      };
      editor.create();
      this.editorObj = editor;
    },
  },
};
</script>

<style scoped>
#editor {
  margin-top: 25px;
}
</style>
