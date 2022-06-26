<template>
  <el-row>
    <el-col>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>插件列表</span>
            <div class="button-group">
              <el-button
                :loading="loadingStatus"
                :disabled="loadingStatus"
                @click="handleHelpClick"
                circle
              >
                <el-icon
                  ><svg
                    t="1650701162497"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="20746"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M469.333333 768h85.333334v-85.333333h-85.333334v85.333333m42.666667-682.666667A426.666667 426.666667 0 0 0 85.333333 512a426.666667 426.666667 0 0 0 426.666667 426.666667 426.666667 426.666667 0 0 0 426.666667-426.666667A426.666667 426.666667 0 0 0 512 85.333333m0 768c-188.16 0-341.333333-153.173333-341.333333-341.333333s153.173333-341.333333 341.333333-341.333333 341.333333 153.173333 341.333333 341.333333-153.173333 341.333333-341.333333 341.333333m0-597.333333a170.666667 170.666667 0 0 0-170.666667 170.666667h85.333334a85.333333 85.333333 0 0 1 85.333333-85.333334 85.333333 85.333333 0 0 1 85.333333 85.333334c0 85.333333-128 74.666667-128 213.333333h85.333334c0-96 128-106.666667 128-213.333333a170.666667 170.666667 0 0 0-170.666667-170.666667z"
                      fill=""
                      p-id="20747"
                    ></path></svg
                ></el-icon>
              </el-button>
              <el-button
                :loading="loadingStatus"
                :disabled="loadingStatus"
                @click="updateData"
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
          </div>
        </template>
        <el-table :data="plugins" v-load="loadingStatus" style="width: 100%">
          <el-table-column prop="name" label="插件名" width="200" />
          <el-table-column prop="description" label="描述" />
          <el-table-column
            prop="author"
            label="作者"
            width="100"
            align="center"
          />
          <el-table-column
            prop="version"
            label="最新版本"
            width="100"
            align="center"
          >
            <template #default="scope">
              <el-tag type="success"> {{ scope.row.version }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            :formatter="statusFormatter"
            label="可用性"
            width="100"
            align="center"
          />
          <el-table-column prop="id" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button @click="handleInstallClick(scope.row.id)"
                >安装/更新</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, reactive } from "vue";
import API from "@/request/API";
import ConfigOperations from "@/hooks/Config/ConfigOperations";

const loadingStatus = ref(true);
const plugins = reactive([]);
const updateData = async () => {
  plugins.length = 0;
  loadingStatus.value = true;
  return await API.getPluginsData().then((json) => {
    plugins.push(...json);
    loadingStatus.value = false;
    return json;
  });
};
updateData();
const statusFormatter = (row) => {
  return row.status ? "可用" : "不可用";
};
const handleInstallClick = (id) => {
  const baseURL = ConfigOperations.readConfig()["pluginsBaseURL"];
  window.location.href = baseURL + id + ".user.js";
  ElMessageBox.alert(
    `请在弹出的网页中更新脚本，更新后点击“ OK ”重新加载此页面`,
    "提示",
    {
      confirmButtonText: "OK",
      callback: (action) => {
        if (action === "confirm") {
          window.location.reload();
        } else {
          return false;
        }
      },
    }
  );
};
const handleHelpClick = () => {
  const content = `
      这里你可以提交自己编写的用户脚本，用来提升平台的使用体验，脚本将在审核后展示在这里，供所有人安装使用，你编写的脚本独立于原脚本运行，详见教程：
      <p><a href="https://juejin.cn/post/6933130783268241422" target="_blank">强大的油猴Tampermonkey：简单的脚本制作</a></p>
      <p>有任何问题，欢迎随时通过反馈通道与我联系 :D</p>
      `;
  ElMessageBox.alert(content, "这是什么", {
    confirmButtonText: "OK",
    dangerouslyUseHTMLString: true,
  });
};
</script>

<style scoped></style>
