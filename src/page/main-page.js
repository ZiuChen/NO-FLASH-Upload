import getInfo from "../functions/send-request/get-info"

async function appendMainPage() {
    $("body").empty()
    $("link,script,div").remove()
    let sideBar = document.createElement("input")
    sideBar.className = "xinput"
        // sideBar.innerHTML = "你好啊，"
    document.body.appendChild(sideBar)
    let a = await getInfo.getUserInfo()
        .then(res => {
            console.log(res);
            res.name
            res.loginTime

        })
}


export default appendMainPage