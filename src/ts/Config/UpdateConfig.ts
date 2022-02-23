import log from "../Log";

function updateConfig(config: object) {
  localStorage.setItem("config", JSON.stringify(config));
  log("config updated");
}

export default updateConfig;
