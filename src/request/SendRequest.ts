import log from "../hooks/Log";
import config from "../hooks/Config/Config";

async function sendRequest(url: string, callBack?: Function, options?: Object) {
  log("sendRequest", `发送请求: ${url}`);
  return fetch(url, options)
    .then((response) => {
      // 没有处理DOM的回调则直接返回
      if (callBack === undefined) return response;
      else {
        return response
          .blob()
          .then((blob) => blob2dom(blob))
          .then((res) => callBack(res));
      }
    })
    .then((res) => {
      if (res === undefined) {
        // return undefined
        log("sendRequest", `返回值为 undefined: ${url}`, "error");
      } else {
        if (res.ok) {
          log("sendRequest", `请求完成: ${url}`, "success");
        } else {
          log("sendRequest", `请求出错: ${url}`, "error");
        }
      }
      return res;
    })
    .catch((err) =>
      ElNotification({
        title: "免Flash文件上传",
        type: "error",
        message: `请求出错：${err}，请重新尝试或点此联系开发者解决。`,
        duration: 0,
        onClick: function () {
          window.open(config.supportURL);
          this.close();
        },
      })
    );
}

async function blob2dom(blob: Blob) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.readAsText(blob, "GBK");
    reader.onload = (e) => {
      const text = e.target.result as string;
      const dom = new window.DOMParser().parseFromString(text, "text/html");
      res(dom);
    };
    reader.onerror = rej;
  });
}

export default sendRequest;
