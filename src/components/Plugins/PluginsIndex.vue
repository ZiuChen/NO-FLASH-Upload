<template>
  <el-row>
    <el-col :span="20">
      <el-card>
        <el-table :data="plugins" v-load="loadingStatus" style="width: 100%">
          <el-table-column prop="name" label="插件名" width="180" />
          <el-table-column prop="description" label="描述" />
          <el-table-column
            prop="author"
            label="作者"
            width="180"
            align="center"
          />
          <el-table-column
            prop="version"
            label="最新版本"
            width="180"
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
            width="180"
            align="center"
          />
          <el-table-column prop="id" label="操作" width="180" align="center">
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

<script>
import API from "../../ts/API";
import ConfigOperations from "../../ts/Config/ConfigOperations";
export default {
  mounted() {
    this.updateData();
  },
  data() {
    return {
      loadingStatus: true,
      plugins: [],
    };
  },
  methods: {
    async updateData() {
      return await API.getPluginsData().then((json) => {
        this.plugins = json;
        this.loadingStatus = false;
        return json;
      });
    },
    statusFormatter(row) {
      if (row.status) {
        return "可用";
      } else {
        return "不可用";
      }
    },
    handleInstallClick(id) {
      const baseURL = ConfigOperations.readConfig()["pluginsBaseURL"];
      window.open(baseURL + id + ".js");
    },
  },
};
</script>

<style scoped>
.el-row {
  justify-content: center;
}
</style>
