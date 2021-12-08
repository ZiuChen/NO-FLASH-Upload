async function sendRequest(url, callBack) {
    let res = await fetch(url)
        .then(response => {
            return response.text().then(DOMString => {
                let obj = document.createElement("div")
                obj.innerHTML = DOMString
                return callBack(obj)
            })
        })
        .catch(error => { console.error(error) })
    return res
}
export default sendRequest