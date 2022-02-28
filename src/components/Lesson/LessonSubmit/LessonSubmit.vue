<template>
  <el-row>
    <el-col :span="14">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header">
            <span>提交作业</span>
            <el-button
              :loading="loadingStatus"
              :disabled="loadingStatus"
              @click="refreshTable"
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
          </div>
        </template>
        <hwt-info :propHwtContent="hwtContent"></hwt-info>
        <hwt-editor
          ref="editorObj"
          :propHwtContents="{
            hwtContent: hwtContent,
            hwtContentWithId: hwtContentWithId,
          }"
        ></hwt-editor>
        <div class="operation">
          <el-button @click="handleButtonSubmit">提交</el-button>
          <el-button @click="handleButtonReturn">返回</el-button>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="查看提交效果，此按钮将在未来被删除"
            placement="right-start"
          >
            <el-button @click="handleButtonDebug">查看效果</el-button>
          </el-tooltip>
        </div>
      </el-card>
    </el-col>
    <el-col :span="10">
      <hwt-list></hwt-list>
    </el-col>
  </el-row>
</template>

<script>
import getInfo from "../../../ts/GetInfo";
import HwtInfo from "../LessonSubmit/HwtInfo.vue";
import HwtEditor from "./HwtEditor.vue";
import HwtList from "../../WelcomePage/HwtList.vue";
import log from "../../../ts/Log";
import sendRequest from "../../../ts/SendRequest";

export default {
  components: {
    HwtInfo,
    HwtEditor,
    HwtList,
  },
  data() {
    return {
      lid: "",
      hwtid: "",
      hwtContent: {},
      hwtContentWithId: {}, // hwtid & hwaid
      loadingStatus: true,
    };
  },
  created() {
    this.lid = this.$route.params.lid;
    this.hwtid = this.$route.params.hwtid;
    this.dataInit(this.hwtid);
  },
  watch: {
    $route(to) {
      // if (to.path.indexOf("review") !== -1) return;
      if (this.$route.params.hwtid === undefined) return;
      this.dataInit(this.$route.params.hwtid);
    },
  },
  methods: {
    async dataInit(hwtid) {
      await getInfo.getHwtReviewContent(hwtid).then((res) => {
        this.hwtContent = res;
        this.loadingStatus = false;
        return res;
      });
      if (this.$route.query.able === "true") {
        await getInfo.getHwtContent(hwtid).then((res) => {
          this.hwtContentWithId = res;
          return res;
        });
      }
    },
    refreshTable() {
      this.loadingStatus = true;
      this.dataInit(this.$route.params.hwtid);
    },
    getEditorContent() {
      let editor = this.$refs.editorObj.editorObj;
      return editor.txt.html();
    },
    handleButtonSubmit() {
      log("hwt submit trigger");
      let url = `http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.do.jsp`;
      const GBK = window.GBK;
      var details = {
        hwtid: this.hwtContentWithId.hwtid,
        hwaid: this.hwtContentWithId.hwaid,
        IPT_BODY: this.getEditorContent(),
      };
      var formBody = [];
      for (var property in details) {
        var encodedKey = GBK.URI.encodeURIComponent(property);
        var encodedValue = GBK.URI.encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      sendRequest(url, undefined, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      }).then((res) => {
        if (res.ok === true) {
          log("hwt submit successfully");
          this.refreshTable();
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
      this.$router.go(-1);
    },
    handleButtonDebug() {
      window.open(
        `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=${this.hwtContentWithId.hwtid}`
      );
    },
  },
};
</script>

<style scoped>
.hwt-list .el-table {
  height: 100%;
}

.el-card {
  min-height: 100%;
  height: 100%;
}

.operation {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
</style>
