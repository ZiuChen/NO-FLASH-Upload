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
                @click="tableExpandStatus = !tableExpandStatus"
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
            v-if="route.query.able === 'true'"
            :propHwtContent="hwtContent"
          ></HwtEditor>
          <div v-if="route.query.able === 'true'" class="operation">
            <el-button @click="handleButtonSubmit">提交</el-button>
            <el-button @click="handleButtonReturn">返回</el-button>
          </div>
        </ZUCard>
      </el-col>
      <el-col :span="expandSpanWidth[tableExpandStatus.toString()].right">
        <HwtList
          :showDragHandler="false"
          :reloadTrigger="reloadTrigger"
        ></HwtList>
        <LessonList :showDragHandler="false"></LessonList>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

import ConfigOperations from "@/hooks/Config/ConfigOperations";
import API from "@/request/API";
import log from "@/hooks/useLog";
import sendRequest from "@/request/SendRequest";

import HwtList from "@/components/WelcomePage/HwtList.vue";
import LessonList from "@/components/WelcomePage/LessonList.vue";
import HwtInfo from "@/components/Lesson/LessonSubmit/HwtInfo.vue";
import HwtEditor from "@/components/Lesson/LessonSubmit/HwtEditor.vue";
import ZUCard from "@/base-ui/card";

const route = useRoute();
const router = useRouter();

const lid = ref("");
const hwtid = ref("");
const hwtContent = ref({});
const hwtContentWithId = ref({}); // hwtid & hwaid
const expandSpanWidth = ref({
  true: { left: 24, right: 0 },
  false: {
    left: 14,
    right: 10,
  },
});
const manySubmitStatus = ref(false);
const loadingStatus = ref(true);
const reloadTrigger = ref(false);
const tableExpandStatus = ref(
  ConfigOperations.readUserConfig()["config-hwt-default-expand"].value
);

const dataInit = async (lid, hwtid) => {
  await API.getHwtReviewOld(hwtid).then((res) => {
    // 新接口加载速度很慢，在弃用旧接口前暂时不换
    hwtContent.value = res;
    loadingStatus.value = false;
    return res;
  });
  await API.getHwtReviewNew(lid, hwtid).then((res) => {
    // 只用新接口获取重复提交信息
    hwtContent.value.manySubmitStatus = res.datas.manySubmitStatus;
    manySubmitStatus.value = res.datas.manySubmitStatus;
    return res.datas.manySubmitStatus;
  });
  if (route.query.able === "true") {
    await API.getHwtSubmitNew(lid, hwtid).then((res) => {
      hwtContentWithId.value = res;
      return res;
    });
  }
};

const refreshTable = () => {
  loadingStatus.value = true;
  dataInit(route.params.lid, route.params.hwtid);
};

const hwtSubmit = () => {
  log("hwtSubmit", "提交作业确认");

  const url = `http://cc.bjtu.edu.cn:81/meol/hw/stu/hwStuSubmitDo.do`;
  const formData = new FormData();
  const answer = window.editor.getHtml();

  if (hwtContentWithId.value.hwaId !== undefined) {
    // 只能提交一次的作业不再要求hwaId参数
    formData.append("hwaId", hwtContentWithId.value.hwaId);
  }
  formData.append("hwtId", hwtContentWithId.value.id);
  formData.append("courseId", lid.value);
  formData.append("answer", answer);

  sendRequest(url, undefined, {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.ok === true) {
      log("hwtSubmit", "成功提交作业", "success");
      refreshTable();
      reloadTrigger.value = !reloadTrigger.value;
      ElMessage({
        message: "作业已成功提交",
        type: "success",
      });
    }
  });
};

const handleButtonSubmit = () => {
  log("handleButtonSubmit", "触发作业提交");

  if (window.editor.isEmpty() || window.editor.getText().trim() === "") {
    log("handleButtonSubmit", "编辑器为空，拒绝执行提交", "error");
    ElMessage({
      message: "编辑器内容为空，提交请求被拒绝",
      type: "error",
    });
    return;
  }
  if (manySubmitStatus.value === false) {
    ElMessageBox.confirm(`该作业不允许重复提交，确定提交作业吗？`, "警告", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    })
      .then((res) => {
        hwtSubmit();
      })
      .catch((res) => {
        log("handleButtonSubmit", "作业提交被取消", "warning");
      });
  } else {
    hwtSubmit();
  }
};

const handleButtonReturn = () => {
  router.go(-1);
};

onMounted(() => {
  // 初始化页面数据
  lid.value = route.params.lid;
  hwtid.value = route.params.hwtid;
  dataInit(lid.value, hwtid.value);
});

watch(route, () => {
  if (route.params.hwtid === undefined) return;
  hwtContent.value = {};
  hwtContentWithId.value = {};
  loadingStatus.value = true;
  dataInit(route.params.lid, route.params.hwtid);
});
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
