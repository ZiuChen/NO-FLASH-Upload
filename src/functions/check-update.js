import sendRequest from "./common/send-request";
import PopNotify from "../js/PopNotify"

const { version } = require('../../package.json')

async function getLastestVersion() {
    const GreasyUrl = "https://greasyfork.org/zh-CN/scripts/432056"
    let res = sendRequest(GreasyUrl, (obj) => {
        return obj.querySelectorAll('.script-show-version>span')[1].textContent
    })
    return res
}

async function checkVersion() {
    if (location.href.indexOf('welcomepage/student/index.jsp') == -1) {
        // 只发welcome页的一次请求
        return
    }
    getLastestVersion().then(res => {
        let weightLastest = 0
        let weightNow = 0
        res.split('.').reverse().forEach((value, index) => {
            weightLastest += (index + 1) * value
        })
        version.split('.').reverse().forEach((value, index) => {
            weightNow += (index + 1) * value
        })
        if (weightLastest > weightNow) {
            console.log('need update');
            PopNotify.show(`有新版本[${res}]`, "点击安装新版本", "success", "90", () => {
                window.open(`https://greasyfork.org/zh-CN/scripts/432056`)
            });
        } else console.log('version Checked');
    })
}

export default checkVersion