import ConfigOperations from "./Config/ConfigOperations";

function log(Position: string, content: string, type?: string) {
  if (
    ConfigOperations.readUserConfig()["config-console-log-show"].value === false
  )
    return;
  let time = new Date().toLocaleTimeString();
  let color = "";
  if (type === "success") {
    color = "green";
  } else if (type === "warning") {
    color = "orange";
  } else if (type === "error") {
    color = "red";
  } else if (type === "info") {
    color = "white";
  } else {
    color = "grey";
  }
  return console.log(
    `%c[${time}]` + `%c [${Position}] ` + content,
    "color: #005bac",
    `color: ${color}`
  );
}
export default log;
