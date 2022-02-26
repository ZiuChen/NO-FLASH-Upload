<template>
  <div id="editor"></div>
  <div class="operation">
    <el-button @click="handleButtonTest">Debug</el-button>
    <el-button @click="handleButtonSubmit">提交</el-button>
    <el-button @click="handleButtonReturn">返回</el-button>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="回到原版检查作业提交效果，此按钮将在未来删除"
      placement="right-start"
    >
      <el-button @click="handleButtonReview">查看效果</el-button>
    </el-tooltip>
  </div>
</template>

<script>
import getInfo from "../../../ts/GetInfo";
import log from "../../../ts/Log";
import sendRequest from "../../../ts/SendRequest";
const E = window.wangEditor;
let editor = {};
export default {
  data() {
    return {
      hwtContent: {}, // dont assign this.propHwtContent directly
      submitContent: "",
    };
  },
  watch: {
    propHwtContent: "watchCallBack",
  },
  props: ["propHwtContent"],
  methods: {
    initEditor() {
      editor = new E("#editor");
      editor.config.height = 240;
      editor.create();
    },
    async getSubmitContent(hwtid) {
      return await getInfo.getHwtSubmitContent(hwtid);
    },
    async watchCallBack(val) {
      this.hwtContent = val;
      this.submitContent = await this.getSubmitContent(this.hwtContent.hwtid);
      this.initEditor();
      editor.txt.html(this.submitContent);
    },
    getEditorContent() {
      return editor.txt.html();
    },
    handleButtonSubmit() {
      log("hwt submit trigger");
      let url = `http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.do.jsp`;
      let formData = new FormData();
      formData.append("hwtid", this.hwtContent.hwtid);
      formData.append("hwaid", this.hwtContent.hwaid);
      formData.append("IPT_BODY", this.getEditorContent());
      sendRequest(url, undefined, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok === true) {
          log("hwt submit successfully");
          let notify = ElNotification({
            title: "免Flash文件上传",
            type: "success",
            message: `作业已成功提交`,
            onClick: () => {
              notify.close();
            },
          });
        }
      });
    },
    handleButtonReturn() {
      console.log("return");
      this.$router.go(-1);
    },
    handleButtonReview() {
      window.open(
        `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=${this.hwtContent.hwtid}`
      );
    },
    handleButtonTest() {
      console.log(editor.txt.html());
    },
  },
};
</script>

<style scoped>
#editor {
  margin-top: 25px;
}

.operation {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
</style>
