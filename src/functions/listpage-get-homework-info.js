let infoIconList = ['🔄', '⚠', '🚫', '🕒', '⌛', '🔒', '✅'];

function getInfoList() {
    let initInfoList = $('.infolist');
    let initSubmits = $('.enter');
    let infoList = [];
    for (let i = 0; i < initInfoList.length; i++) {
        let infoTMP = {};
        infoTMP.id = initInfoList[i].getAttribute('href').split('=')[1];
        infoTMP.name = initInfoList[i].innerText;
        for (let j = 0; j < initSubmits.length; j++) {
            infoTMP.able = (initSubmits[j].getAttribute('href').split('=')[1] == infoTMP.id);
            if (infoTMP.able) break;
        }
        infoList.push(infoTMP);
        appendOnceInfo(infoTMP.id);
        appendSubmitInfo(infoTMP.id);

        function appendOnceInfo(hwtid) {
            if (!infoTMP.able) { // 过期作业，不发请求
                return
            }
            let url = 'http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid=' + hwtid;
            let data = 'hwtid=' + hwtid;
            let xReq = new XMLHttpRequest();
            xReq.open('GET', url, false); // 注意，此处请求应当为同步请求 否则调用this拿到的数据是undefined
            xReq.addEventListener("load", onSuccess);
            xReq.send(data);

            function onSuccess() {
                let myResponse = this.responseText; // 检查是否只能提交一次
                if (myResponse.indexOf('该作业不允许重复提交,确定提交作业吗？') != -1) {
                    let attentionIcon = '<a class="attentionIcon" title="此作业只允许提交一次" style="cursor:default;">' + infoIconList[5] + '</a>'
                    $(".infolist[href='hwtask.view.jsp?hwtid=" + infoTMP.id + "']").before(attentionIcon);
                } else {
                    let attentionIcon = '<a class="attentionIcon" title="此作业允许重复提交" style="cursor:default;">' + infoIconList[3] + '</a>'
                    $(".infolist[href='hwtask.view.jsp?hwtid=" + infoTMP.id + "']").before(attentionIcon);
                }
            }
        }

        function appendSubmitInfo(hwtid) {
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
    }
}
export default getInfoList