async function sendRequest(url: string, callBack: Function, options?: Object) {
  let res = await fetch(url, options)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsText(blob, "GBK");
        reader.onload = () => {
          let data: any = reader.result;
          let dom = new window.DOMParser().parseFromString(
            data,
            "text/html"
          );
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