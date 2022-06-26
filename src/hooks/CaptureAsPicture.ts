import { ElMessage } from "element-plus";

declare global {
  interface Window {
    domtoimage: any;
  }
}

export default function captureAsPicture(selector: string) {
  let node = document.querySelector(selector);
  let timeString = new Date().toLocaleDateString();
  window.domtoimage
    .toPng(node, { filter: filter })
    .then(function (dataUrl: string) {
      var link = document.createElement("a");
      link.download = "MyHwtTable_" + timeString + ".png";
      link.href = dataUrl;
      link.click();
      ElMessage({
        type: "success",
        message: "成功将列表导出为PNG图像",
      });
    })
    .catch(function (error: any) {
      ElMessage({
        type: "error",
        message: "导出为PNG时出错",
      });
    });
  function filter(node: HTMLElement) {
    return node.className !== "button-group"; // filter out .button-group
  }
}
