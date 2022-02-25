import getErrorTips from "./GetErrorTips";

async function sendRequest(url: string, callBack: Function, options?: Object) {
  let res = await fetch(url, options)
    .then((response) => {
      if (response.ok === false) {
        let notify = ElNotification({
          title: "免Flash文件上传",
          type: "error",
          dangerouslyUseHTMLString: true,
          message: `吖，请求</br><a href="javascript:;">${url}</a></br>时出错了，${getErrorTips(
            url
          )}请检查网络后重试或联系开发者`,
          duration: 0,
          onClick: () => {
            window.open(url);
            notify.close();
          },
        });
        throw Error(
          `Request to ${url} rejected, with status ${response.status}`
        );
      }
      return response.blob();
    })
    .then((blob) => {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsText(blob, "GBK");
        reader.onload = () => {
          let data: any = reader.result;
          let dom = new window.DOMParser().parseFromString(data, "text/html");
          resolve(dom);
        };
      });
    })
    .then((response) => {
      return callBack(response);
    })
    .catch((error) => {
      console.error(error);
    });
  return res;
}

export default sendRequest;
