<template>
  <div class="welcome-index">
    <el-row>
      <el-col :span="24">
        <HwtList v-if="userConfig['config-hwtlist-show'].value"></HwtList>
      </el-col>
      <el-col :span="12">
        <NotifyList
          v-if="userConfig['config-notifylist-show'].value"
        ></NotifyList>
      </el-col>
      <el-col :span="12">
        <InformList
          v-if="userConfig['config-informlist-show'].value"
        ></InformList>
      </el-col>
      <el-col :span="24">
        <LessonList
          v-if="userConfig['config-lessonlist-show'].value"
        ></LessonList>
      </el-col>
      <el-col :span="12">
        <LessonTopList
          v-if="userConfig['config-lessontoplist-show'].value"
        ></LessonTopList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ConfigOperations from "@/hooks/Config/ConfigOperations";
import HwtList from "./HwtList.vue";
import InformList from "./InformList.vue";
import NotifyList from "./NotifyList.vue";
import LessonList from "./LessonList.vue";
import LessonTopList from "./LessonTopList.vue";

export default {
  components: {
    HwtList,
    InformList,
    NotifyList,
    LessonList,
    LessonTopList,
  },
  data() {
    return {
      userConfig: ConfigOperations.readUserConfig(),
    };
  },
};
</script>

<style scope></style>
