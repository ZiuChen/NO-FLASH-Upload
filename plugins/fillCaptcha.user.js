// ==UserScript==
// @name         识别并自动填写MIS验证码
// @namespace    https://github.com/ZiuChen/NO-FLASH-Upload
// @version      0.1
// @description  利用讯飞识别API，识别并自动填写MIS入口的验证码答案，使用前需自行申请API
// @author       Ziu
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/fillCaptcha.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/plugins/fillCaptcha.user.js
// @match        https://cas.bjtu.edu.cn/*
// @connect      webapi.xfyun.cn
// @grant        GM_xmlhttpRequest
// @require      https://cdn.bootcss.com/crypto-js/3.1.9-1/crypto-js.min.js
// @icon         https://cdn.jsdelivr.net/gh/ZiuChen/ZiuChen@main/avatar.jpg
// ==/UserScript==

// 讯飞开放平台 印刷文字识别接口 免费申请链接 www.xfyun.cn 每天500次
// 使用前请先申请，申请后将APPID与APIKey填入下方config中
const config = {
  hostUrl: "https://webapi.xfyun.cn/v1/service/v1/ocr/general",
  host: "webapi.xfyun.cn",
  appid: "**********", // 控制台->我的应用->文字识别->印刷文字识别->APPID
  apiKey: "********************", // 控制台->我的应用->文字识别->印刷文字识别->APIKey
  uri: "/v1/ise",
};

// 获取当前时间戳
let ts = parseInt(new Date().getTime() / 1000);

// 发送识别请求
await getPostBody().then((body) => {
  XHR({
    GM: true,
    anonymous: true,
    method: "POST",
    url: config.hostUrl,
    headers: getReqHeader(),
    data: body,
    responseType: "json",
  }).then((res) => {
    try {
      let originString = res.body.data.block[0].line[0].word[0].content;
      document.querySelector("#id_captcha_1").value =
        processString(originString).toString(); // 填入输入框内
      // FIXME: Debug output
      console.log(originString);
      console.log(processString(originString));
    } catch (error) {
      console.log(error);
      if (confirm("识别失败，请检查Key是否正确填写，点击确定重新识别")) {
        location.reload();
      }
    }
  });
});

// 处理ocr识别传回的字符串
function processString(string) {
  if (string.indexOf("x") !== -1) {
    return parseInt(string.split("x")[0]) * parseInt(string.split("x")[1]);
  } else if (string.indexOf("X") !== -1) {
    return parseInt(string.split("X")[0]) * parseInt(string.split("X")[1]);
  } else if (string.indexOf("×") !== -1) {
    return parseInt(string.split("×")[0]) * parseInt(string.split("×")[1]);
  } else if (string.indexOf("*") !== -1) {
    return parseInt(string.split("*")[0]) * parseInt(string.split("*")[1]);
  } else if (string.indexOf("+") !== -1) {
    return parseInt(string.split("+")[0]) + parseInt(string.split("+")[1]);
  } else if (string.indexOf("-") !== -1) {
    return parseInt(string.split("-")[0]) - parseInt(string.split("-")[1]);
  } else if (string.indexOf(".") !== -1) {
    return parseInt(string.split(".")[0]) - parseInt(string.split(".")[1]);
  } else {
    return "未能成功识别";
  }
}

// 获取图片base64编码
async function getBase64() {
  let url = document.querySelector(".captcha").src;
  return await fetch(url).then(async (res) => {
    if (res.ok) {
      return res.blob().then(async (blob) => {
        return await readFileAsync(blob).then((base64) => {
          return base64.split("base64,")[1]; // 移除前缀
        });
        function readFileAsync(blob) {
          return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        }
      });
    } else {
      alert("获取源图像失败");
    }
  });
}

// 组装业务参数
function getXParamStr() {
  let xParam = {
    language: "cn|en",
  };
  return CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(JSON.stringify(xParam))
  );
}

// 组装请求头
function getReqHeader() {
  let xParamStr = getXParamStr();
  let xCheckSum = CryptoJS.MD5(config.apiKey + ts + xParamStr).toString();
  return {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    "X-Appid": config.appid,
    "X-CurTime": ts + "",
    "X-Param": xParamStr,
    "X-CheckSum": xCheckSum,
  };
}

// 生成请求body
async function getPostBody() {
  return await getBase64().then((base64) => {
    return "image=" + base64;
  });
}

// 发起xmlhttpRequest请求（GM函数和浏览器原生）
// @Github andywang425
function XHR(XHROptions) {
  return new Promise((resolve) => {
    const onerror = (error) => {
      console.log("XHR出错");
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
      XHROptions.onload = (res) =>
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
        const res = ev.target;
        resolve({ response: res, body: res.response });
      };
      xhr.onerror = onerror;
      xhr.ontimeout = onerror;
      xhr.send(XHROptions.data);
    }
  });
}
