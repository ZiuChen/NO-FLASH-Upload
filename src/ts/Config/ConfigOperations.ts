import config from "./Config";
import log from "../Log";

function initConfig() {
  if (readConfig() === null) {
    localStorage.setItem("config", JSON.stringify(config));
    return;
  }
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

function readConfig() {
  return JSON.parse(localStorage.getItem("config"));
}

function readUserConfig() {
  return readConfig().userConfig;
}

function readUserConfigWithFilter(type: string) {
  let userConfig = readConfig().userConfig;
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
  log("config updated");
}

export default {
  initConfig: initConfig,
  readConfig: readConfig,
  readUserConfig: readUserConfig,
  readUserConfigWithFilter: readUserConfigWithFilter,
  updateConfig: updateConfig,
  setUserConfig: setUserConfig,
};
