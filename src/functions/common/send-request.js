async function sendRequest(url, callBack, options) {
    let res = await fetch(url, options)
        .then(response => { return response.blob() })
        .then(blob => {
            return new Promise(resolve => {
                let reader = new FileReader();
                reader.onload = () => {
                    let htmlData = reader.result;
                    htmlData = (new window.DOMParser()).parseFromString(htmlData, "text/html");
                    resolve(htmlData)
                }
                reader.readAsText(blob, 'GBK')
            })
        })
        .then(response => {
            return callBack(response)
        })
        .catch(error => { console.error(error) })
    return res
}
export default sendRequest