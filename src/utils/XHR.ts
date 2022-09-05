import { ElNotification } from "element-plus";
import log from "../hooks/useLog";
import config from "../hooks/Config/Config";
declare function GM_xmlhttpRequest(param: any): any;

export default function XHR(XHROptions: any) {
  return new Promise((resolve) => {
    const onerror = (error: any) => {
      log("XHR", error, error);
      ElNotification({
        title: "免Flash文件上传",
        type: "error",
        message: `请求出错：${error}，请重新尝试或点此联系开发者解决。`,
        duration: 0,
        onClick: function () {
          window.open(config.supportURL);
        },
      });
      resolve(undefined);
    };
    if (XHROptions.GM) {
      if (XHROptions.method === "POST") {
        if (XHROptions.headers === undefined) XHROptions.headers = {};
        if (XHROptions.headers["Content-Type"] === undefined)
          XHROptions.headers["Content-Type"] =
            "application/x-www-form-urlencoded; charset=utf-8";
      }
      XHROptions.timeout = 30 * 1000;
      XHROptions.onload = (res: any) =>
        resolve({ response: res, body: res.response });
      XHROptions.onerror = onerror;
      XHROptions.ontimeout = onerror;
      GM_xmlhttpRequest(XHROptions);
    } else {
      const xhr = new XMLHttpRequest();
      xhr.open(XHROptions.method, XHROptions.url);
      if (
        XHROptions.method === "POST" &&
        xhr.getResponseHeader("Content-Type") === null
      )
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded; charset=utf-8"
        );
      if (XHROptions.cookie) xhr.withCredentials = true;
      if (XHROptions.responseType !== undefined)
        xhr.responseType = XHROptions.responseType;
      xhr.timeout = 30 * 1000;
      xhr.onload = (ev) => {
        const res = ev.target as any;
        resolve({ response: res, body: res.response });
      };
      xhr.onerror = onerror;
      xhr.ontimeout = onerror;
      xhr.send(XHROptions.data);
    }
  });
}
