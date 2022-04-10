import config from "./Config";
import log from "../Log";

function initConfig() {
  if (readConfig() === null) {
    localStorage.setItem("config", JSON.stringify(config));
    return;
  }
  initScriptConfig();
  initUserConfig();
  log("initConfig", "设置初始化完毕", "success");
}

function initScriptConfig() {
  // 不移除已有项，只添加新项或赋初值
  let defaultScriptConfig = config;
  let currentScriptConfig = readConfig();
  let defaultKeys = Object.keys(defaultScriptConfig);
  defaultKeys.forEach((key) => {
    if (key === "userConfig") return;
    currentScriptConfig[key] = defaultScriptConfig[key];
  });
  updateConfig(currentScriptConfig);
}

function initUserConfig() {
  // 只检查新增或移除项并执行添加或删除，不改变项值
  let currentConfig = readConfig();
  let currentUserConfig = currentConfig.userConfig;
  let currentUserConfigs = Object.getOwnPropertyNames(currentUserConfig);
  let defaultUserConfigs = Object.getOwnPropertyNames(config.userConfig);
  let removedConfigs = currentUserConfigs.filter((item) => {
    return defaultUserConfigs.indexOf(item) === -1;
  });
  let newConfigs = defaultUserConfigs.filter((item) => {
    return currentUserConfigs.indexOf(item) === -1;
  });
  if (newConfigs.length === 0 && removedConfigs.length === 0) return;
  else {
    removedConfigs.forEach((item) => {
      delete currentUserConfig[item];
    });
    newConfigs.forEach((item) => {
      currentUserConfig[item] = config.userConfig[item];
    });
    currentConfig.userConfig = currentUserConfig;
    updateConfig(currentConfig);
  }
}

function setUserConfig(id: string, value: boolean | object | string | number) {
  let currentConfig = readConfig();
  currentConfig.userConfig[id].value = value;
  updateConfig(currentConfig);
}

function getDefaultConfig() {
  return config;
}

function getDefaultUserConfig() {
  return config.userConfig;
}

function readConfig() {
  return JSON.parse(localStorage.getItem("config"));
}

function readUserConfig() {
  return readConfig().userConfig;
}

function readUserConfigWithFilter(type: string) {
  let userConfig = readUserConfig();
  let rtnArray: object[] = [];
  Object.keys(userConfig).forEach((key) => {
    if (userConfig[key].type === type) {
      rtnArray.push(userConfig[key]);
    }
  });
  return rtnArray;
}

function updateConfig(config: object) {
  localStorage.setItem("config", JSON.stringify(config));
}

function updateUserConfig(userConfig: object) {
  let currentConfig = readConfig();
  currentConfig.userConfig = userConfig;
  localStorage.setItem("config", JSON.stringify(currentConfig));
}

function restoreUserConfig() {
  updateUserConfig(getDefaultUserConfig());
  log("restoreUserConfig", "用户设置已重置", "success");
}

function exportUserConfig() {
  let blob = new Blob(
    [
      JSON.stringify({
        flag: "NOFLASHUPLOAD Setting",
        userConfig: readUserConfig(),
      }),
    ],
    {
      type: "text/json",
    }
  );
  let a = document.createElement("a");
  a.download = `[NOFLASHUPLOAD] setting.json`;
  a.href = window.URL.createObjectURL(blob);
  a.click();
  log("exportUserConfig", "用户设置已导出", "success");
}

function importUserConfig() {
  let input = document.createElement("input");
  input.type = "file";
  input.click();
  input.addEventListener("change", (e: any) => {
    let reader = new FileReader();
    reader.onload = (res) => {
      let result: any = res.target.result;
      if (result.indexOf(`NOFLASHUPLOAD Setting`) === -1) {
        log("importUserConfig", "校验错误，导入设置中止", "error");
        ElMessage({
          message: "校验出错，导入中止，请检查后重试",
          type: "error",
        });
        return false;
      } else {
        updateUserConfig(JSON.parse(result).userConfig);
        log("importUserConfig", "成功导入设置", "success");
        ElMessage({
          message: "成功导入设置，即将自动刷新",
          type: "success",
        });
        setTimeout("location.reload()", 2500);
        return true;
      }
    };
    reader.readAsText(e.path[0].files[0], "utf-8");
  });
}

export default {
  initConfig: initConfig,
  readConfig: readConfig,
  readUserConfig: readUserConfig,
  readUserConfigWithFilter: readUserConfigWithFilter,
  updateConfig: updateConfig,
  setUserConfig: setUserConfig,
  restoreUserConfig: restoreUserConfig,
  exportUserConfig: exportUserConfig,
  importUserConfig: importUserConfig,
};
