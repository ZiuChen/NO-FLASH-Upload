<template>
  <div class="lesson-submit">
    <el-row class="card-container">
      <el-col :span="expandSpanWidth[tableExpandStatus.toString()].left">
        <ZUCard v-load="loadingStatus">
          <template #header>
            <span>提交作业</span>
            <div class="buttonDiv">
              <el-button
                :loading="loadingStatus"
                :disabled="loadingStatus"
                @click="expandTable"
                circle
              >
                <el-icon v-show="tableExpandStatus">
                  <ZoomOut />
                </el-icon>
                <el-icon v-show="!tableExpandStatus">
                  <ZoomIn />
                </el-icon>
              </el-button>
              <el-button
                icon="Refresh"
                :loading="loadingStatus"
                :disabled="loadingStatus"
                @click="refreshTable"
                circle
              >
              </el-button>
            </div>
          </template>
          <HwtInfo :propHwtContent="hwtContent"></HwtInfo>
          <HwtEditor
            v-if="this.$route.query.able === 'true'"
            ref="editorObj"
            :propHwtContent="hwtContent"
          ></HwtEditor>
          <div v-if="this.$route.query.able === 'true'" class="operation">
            <el-button @click="handleButtonSubmit">提交</el-button>
            <el-button @click="handleButtonReturn">返回</el-button>
          </div>
        </ZUCard>
      </el-col>
      <el-col :span="expandSpanWidth[tableExpandStatus.toString()].right">
        <HwtList :reloadTrigger="reloadTrigger"></HwtList>
        <LessonList></LessonList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ConfigOperations from "@/hooks/Config/ConfigOperations";
import API from "@/request/API";
import log from "@/hooks/useLog";
import sendRequest from "@/request/SendRequest";
import HwtList from "../../WelcomePage/HwtList.vue";
import LessonList from "../../WelcomePage/LessonList.vue";
import HwtInfo from "../LessonSubmit/HwtInfo.vue";
import HwtEditor from "./HwtEditor.vue";
import ZUCard from "@/base-ui/card";

export default {
  components: {
    HwtList,
    LessonList,
    HwtInfo,
    HwtEditor,
    ZUCard,
  },
  data() {
    return {
      lid: "",
      hwtid: "",
      hwtContent: {},
      hwtContentWithId: {}, // hwtid & hwaid
      expandSpanWidth: {
        true: { left: 24, right: 0 },
        false: {
          left: 14,
          right: 10,
        },
      },
      manySubmitStatus: false,
      loadingStatus: true,
      reloadTrigger: false,
      tableExpandStatus:
        ConfigOperations.readUserConfig()["config-hwt-default-expand"].value,
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
      this.loadingStatus = true;
      this.dataInit(this.$route.params.lid, this.$route.params.hwtid);
    },
  },
  methods: {
    async dataInit(lid, hwtid) {
      await API.getHwtReviewOld(hwtid).then((res) => {
        // 新接口加载速度很慢，在弃用旧接口前暂时不换
        this.hwtContent = res;
        this.loadingStatus = false;
        return res;
      });
      await API.getHwtReviewNew(lid, hwtid).then((res) => {
        // 只用新接口获取重复提交信息
        this.hwtContent.manySubmitStatus = res.datas.manySubmitStatus;
        this.manySubmitStatus = res.datas.manySubmitStatus;
        return res.datas.manySubmitStatus;
      });
      if (this.$route.query.able === "true") {
        await API.getHwtSubmitNew(lid, hwtid).then((res) => {
          this.hwtContentWithId = res;
          return res;
        });
      }
    },
    expandTable() {
      this.tableExpandStatus = !this.tableExpandStatus;
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
        // 只能提交一次的作业不再要求hwaId参数
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
          this.reloadTrigger = !this.reloadTrigger;
          ElMessage({
            message: "作业已成功提交",
            type: "success",
          });
        }
      });
    },
    handleButtonSubmit() {
      log("handleButtonSubmit", "触发作业提交");
      if (
        this.$refs.editorObj.editorObj.isEmpty() ||
        this.$refs.editorObj.editorObj.getText() === ` `
      ) {
        log("handleButtonSubmit", "编辑器为空，拒绝执行提交", "error");
        ElMessage({
          message: "编辑器内容为空，提交请求被拒绝",
          type: "error",
        });
        return;
      }
      if (this.manySubmitStatus === false) {
        ElMessageBox.confirm(`该作业不允许重复提交，确定提交作业吗？`, "警告", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
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
