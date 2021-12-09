import getInfo from "./send-request/get-info";
import sendRequest from "./common/send-request";

const baseUrl = `http://cc.bjtu.edu.cn:81/meol`
const courseUrl = `${baseUrl}/jpk/course/layout/newpage/index.jsp?courseId=`
const writeUrl = `${baseUrl}/common/hw/student/write.jsp?hwtid=` // 查看作业任务write.jsp
const taskanswerUrl = `${baseUrl}/common/hw/student/taskanswer.jsp?hwtid=` // 查看批阅结果taskanswer.jsp

const onceSubmitInfo = "该作业不允许重复提交,确定提交作业吗？"
const onceSubmitTag = /*html*/ `<a class="icon" title="只允许提交一次" style="cursor:default;"> 🔒 </a>`
const freeSubmitTag = /*html*/ `<a class="icon" title="允许重复提交" style="cursor:default;"> 🔔 </a>`
const hadSubmitTag = /*html*/ `<a class="icon" title="已提交" style="cursor:default;"> 🟢 </a>`
const notSubmitTag = /*html*/ `<a class="icon" title="未提交" style="cursor:default;"> 🟠 </a>`

async function initializate(courseID) {
    let inPage = false
    if (location.href.indexOf("hwtask.jsp") === -1) { inPage = false } else { inPage = true }
    if (inPage) { // dont initializate, get info directly
        let a = await appendOnceInfo()
        let b = await appendSubmitInfo()
    } else { // initializate, then get info directly
        if (courseID === undefined) return
        let init = await sendRequest(courseUrl + courseID, (obj) => {
                return obj // nothing todo
            })
            .then(() => {
                appendOnceInfo()
                appendSubmitInfo()
            })
            .catch(error => { console.log(error); })
        return init
    }
}

async function appendOnceInfo() {
    let hwtList = await getInfo.getHwtInfo()
    console.log(hwtList);
    for (let it of hwtList) {
        // cant await in forEach
        if (it.able == false) return
        let append = await sendRequest(writeUrl + it.hwtID, (obj) => {
                return obj.querySelectorAll("script")
            })
            .then(res => {
                if (res[7].innerText.indexOf(onceSubmitInfo) !== -1) {
                    $(document.querySelectorAll(".infolist[href='hwtask.view.jsp?hwtid=" + it.hwtID + "']")[0]).before(onceSubmitTag)
                } else {
                    $(document.querySelectorAll(".infolist[href='hwtask.view.jsp?hwtid=" + it.hwtID + "']")[0]).before(freeSubmitTag)
                }
            })
            .catch(error => { console.log(error); })
            // return append
    }
}

async function appendSubmitInfo() {
    let hwtList = await getInfo.getHwtInfo()
    console.log(hwtList);
    for (let it of hwtList) {
        // cant await in forEach
        if (it.able == false) return
        let append = await sendRequest(taskanswerUrl + it.hwtID, (obj) => {
                return $(obj).find("tr:contains('回答的内容')+tr>td>input").length
            })
            .then(res => {
                if (res === 1) {
                    $(document.querySelectorAll(".infolist[href='hwtask.view.jsp?hwtid=" + it.hwtID + "']")[0]).before(hadSubmitTag)
                } else {
                    $(document.querySelectorAll(".infolist[href='hwtask.view.jsp?hwtid=" + it.hwtID + "']")[0]).before(notSubmitTag)
                }
            })
            .catch(error => { console.log(error); })
            // return append
    }
}

export default initializate