function log(msg: string) {
  let time = new Date().toLocaleTimeString();
  console.log(`%c[${time}][NOFLASHUPLOAD] ${msg}`, "color: #005bac");
}
export default log;
