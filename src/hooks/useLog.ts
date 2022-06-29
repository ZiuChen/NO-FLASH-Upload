import ConfigOperations from "./Config/ConfigOperations";

export default function log(Position: string, content: string, type?: string) {
  if (
    ConfigOperations.readUserConfig()["config-console-log-show"].value === false
  )
    return;
  let time = new Date().toLocaleTimeString();
  let color = "";
  switch (type) {
    case "success":
      color = "green";
      break;
    case "warning":
      color = "orange";
      break;
    case "error":
      color = "red";
      break;
    case "info":
      color = "blue";
      break;
    default:
      color = "grey";
      break;
  }
  return console.log(
    `%c[${time}]` + `%c [${Position}] ` + content,
    "color: #005bac;",
    `color: ${color};`
  );
}
