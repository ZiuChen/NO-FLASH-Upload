import config from "./Config";
import readConfig from "./ReadConfig";
import updateConfig from "./UpdateConfig";
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

export default initConfig;
