function readConfig() {
  return JSON.parse(localStorage.getItem("config"));
}

export default readConfig;
