import log from "./Log";
declare var GM_xmlhttpRequest: any;

/**
 * 发起xmlhttpRequest请求（GM函数和浏览器原生）
 * @Author Github/andywang425/BLTH
 * @param XHROptions
 * @returns {object}  resolve({response: res, body: res.response})
 */
export default function XHR(XHROptions: any) {
  return new Promise((resolve) => {
    const onerror = (error: any) => {
      log("XHR", "XHR出错", "error");
      resolve(undefined);
    };
    if (XHROptions.GM) {
      if (XHROptions.method === "POST") {
        if (XHROptions.headers === undefined) XHROptions.headers = {};
        if (XHROptions.headers["Content-Type"] === undefined) {
          XHROptions.headers["Content-Type"] =
            "application/x-www-form-urlencoded; charset=utf-8";
        }
      }
      XHROptions.timeout = 30 * 1000;
      XHROptions.onload = (res: any) =>
        resolve({ response: res, body: res.response });
      XHROptions.onerror = onerror;
      XHROptions.ontimeout = onerror;
      XHROptions.nocache = true;
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
      xhr.onload = (ev: any) => {
        const res = ev.target;
        resolve({ response: res, body: res.response });
      };
      xhr.onerror = onerror;
      xhr.ontimeout = onerror;
      xhr.send(XHROptions.data);
    }
  });
}
