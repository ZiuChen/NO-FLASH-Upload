import getInfo from "./send-request/get-info";
import sendRequest from "./common/send-request";
const writeUrl = `http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid=` // 查看作业任务write.jsp
const taskanswerUrl = `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=` // 查看批阅结果taskanswer.jsp
const infoIconList = ['🔄', '⚠', '🚫', '🕒', '⌛', '', '✅']
const onceInfo = "该作业不允许重复提交,确定提交作业吗？"
const onceTag = /*html*/ `<a class="attentionIcon" title="此作业只允许提交一次" style="cursor:default;">🔒</a>`

async function appendOnceInfo() {
    let hwtList = await getInfo.gethwtInfo()
    for (let it of hwtList) {
        // 不能在forEach中执行异步操作
        if (it.able == false) return
        let append = await sendRequest(writeUrl + it.hwtID, (obj) => {
                return obj.querySelectorAll("script")
            })
            .then(res => {
                if (res[7].innerText.indexOf(onceInfo) !== -1) {
                    $(".infolist[href='hwtask.view.jsp?hwtid=" + it.hwtID + "']").before(onceTag);
                }
            })
            .then(res => { console.log(res); })
            .catch(error => { console.log(error); })
    }
}

async function appendSubmitInfo(hwtid) {
    if (!infoTMP.able) { // 过期作业，不发请求
        return
    }
    let url = 'http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=' + hwtid;
    let data = 'hwtid=' + hwtid;
    let xReq = new XMLHttpRequest();
    xReq.responseType = "document";
    xReq.open('GET', url); // 此处请求应当为异步请求 用以接收text/html数据
    xReq.addEventListener("load", onSuccess);
    xReq.send(data);

    function onSuccess() { // 检查是否已经提交
        let myResponse = this.responseXML;
        let iptArea = $(myResponse).find("tr:contains('回答的内容')+tr>td>input");
        if (iptArea.length <= 0) {
            let submitIcon = '<a class="submitIcon" title="作业未提交" style="cursor:default;">' + infoIconList[4] + '</a>'
            $(".infolist[href='hwtask.view.jsp?hwtid=" + infoTMP.id + "']").before(submitIcon);
        } else {
            let submitIcon = '<a class="submitIcon" title="作业已提交" style="cursor:default;">' + infoIconList[6] + '</a>'
            $(".infolist[href='hwtask.view.jsp?hwtid=" + infoTMP.id + "']").before(submitIcon);
        }
    }
}
export default appendOnceInfo