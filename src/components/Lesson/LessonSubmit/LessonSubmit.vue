<template>
  <el-row class="card-container">
    <el-col :span="14">
      <el-card shadow="always">
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
        <HwtInfo :propHwtContent="hwtContent"></HwtInfo>
        <HwtEditor
          v-if="this.$route.query.able === 'true'"
          ref="editorObj"
          :propHwtContents="{
            hwtContent: hwtContent,
          }"
        ></HwtEditor>
        <div v-if="this.$route.query.able === 'true'" class="operation">
          <el-button @click="handleButtonSubmit">提交</el-button>
          <el-button @click="handleButtonReturn">返回</el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :span="10">
      <HwtList></HwtList>
      <LessonList></LessonList>
    </el-col>
  </el-row>
</template>

<script>
import API from "../../../ts/API";
import log from "../../../ts/Log";
import sendRequest from "../../../ts/SendRequest";
import HwtList from "../../WelcomePage/HwtList.vue";
import LessonList from "../../WelcomePage/LessonList.vue";
import HwtInfo from "../LessonSubmit/HwtInfo.vue";
import HwtEditor from "./HwtEditor.vue";

export default {
  components: {
    HwtList,
    LessonList,
    HwtInfo,
    HwtEditor,
  },
  data() {
    return {
      lid: "",
      hwtid: "",
      hwtContent: {},
      hwtContentWithId: {}, // hwtid & hwaid
      manySubmitStatus: false,
      loadingStatus: true,
    };
  },
  created() {
    this.lid = this.$route.params.lid;
    this.hwtid = this.$route.params.hwtid;
    this.dataInit(this.lid, this.hwtid);
  },
  watch: {
    $route(to) {
      // if (to.path.indexOf("review") !== -1) return;
      if (this.$route.params.hwtid === undefined) return;
      this.hwtContent = {};
      this.hwtContentWithId = {};
      this.dataInit(this.$route.params.lid, this.$route.params.hwtid);
    },
  },
  methods: {
    async dataInit(lid, hwtid) {
      await API.getHwtReviewNew(lid, hwtid).then((res) => {
        res.json().then((res) => {
          this.manySubmitStatus = res.datas.manySubmitStatus;
          return res;
        });
      });
      await API.getHwtReviewOld(hwtid).then((res) => {
        this.hwtContent = res;
        this.loadingStatus = false;
        return res;
      });
      if (this.$route.query.able === "true") {
        await API.getHwtSubmitNew(lid, hwtid).then((res) => {
          this.hwtContentWithId = res;
          return res;
        });
      }
    },
    refreshTable() {
      this.loadingStatus = true;
      this.dataInit(this.$route.params.lid, this.$route.params.hwtid);
    },
    getEditorContent() {
      let editor = this.$refs.editorObj.editorObj;
      return editor.getHtml();
    },
    hwtSubmit() {
      log("hwtSubmit", "提交作业确认");
      let url = `http://cc.bjtu.edu.cn:81/meol/hw/stu/hwStuSubmitDo.do`;
      let formData = new FormData();
      formData.append("hwtId", this.hwtContentWithId.id);
      if (this.hwtContentWithId.hwaId !== undefined) {
        formData.append("hwaId", this.hwtContentWithId.hwaId);
      }
      formData.append("courseId", this.lid);
      formData.append("answer", this.getEditorContent());
      sendRequest(url, undefined, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (res.ok === true) {
          log("hwtSubmit", "成功提交作业", "success");
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
    handleButtonSubmit() {
      log("handleButtonSubmit", "触发作业提交");
      if (this.manySubmitStatus === false) {
        ElMessageBox.confirm(`该作业不允许重复提交，确定提交作业吗？`, "警告", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        })
          .then((res) => {
            this.hwtSubmit();
          })
          .catch((res) => {
            log("handleButtonSubmit", "作业提交被取消", "warning");
          });
      } else {
        this.hwtSubmit();
      }
    },
    handleButtonReturn() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.card-container {
  justify-content: center;
}
.operation {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}
</style>
