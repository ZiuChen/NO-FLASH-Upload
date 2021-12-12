import getInfo from "./send-request/get-info";
import getHwtMoreInfo from "./get-homework-more-info"
import PopNotify from "../js/PopNotify";
import reminderCSS from "../style/css/reminderCSS.css"

const baseUrl = `http://cc.bjtu.edu.cn:81/meol`
const hwtUrl = `${baseUrl}/common/hw/student/write.jsp?hwtid=`
const hwtTagTemplate = /*html*/ `<a onclick="return" class="hwtName"></a><span class="date"></span>`

function sortByTime() {
    let liList = $(".listwrap>.list>ul>li");
    let remainList = [];
    for (let i = 0; i < liList.length; i++) {
        remainList.push($(liList[i]).find(".date").attr("remain"))
    }
    remainList.sort((a, b) => { return a - b })
    remainList.forEach((it, ind) => {
        for (let i = 0; i < liList.length; i++) {
            if ($(liList[i]).find(".date").attr("remain") === it) {
                $(".listwrap>.list>ul").append(liList[i])
            }
        }
    })
}

async function createHwtList(remindInfo) {
    $(".list>ul").empty()
    for (let courseItem of remindInfo.hwt) {
        // Async Trap: cannot async in forEach
        await getHwtMoreInfo(courseItem.id).then(async() => {
            await getInfo.getHwtInfo().then(hwtList => {
                let ableHwtList = hwtList.filter(hwtItem => {
                    return hwtItem.able == true && hwtItem.remainTime <= 15
                })
                for (let hwtItem of ableHwtList) {
                    let hwtTag = document.createElement("li")
                    hwtTag.innerHTML = hwtTagTemplate
                    let Info = ``
                    if (hwtItem.remainTime === 0) {
                        Info = `今日截止`
                    } else {
                        Info = `[还有${hwtItem.remainTime}天截止]`
                    }
                    $(hwtTag).find(".hwtName").text(`${Info} ${hwtItem.hwtName} [${courseItem.name}]`)
                    $(hwtTag).find(".date").text(hwtItem.DateObj.toLocaleDateString())
                    $(hwtTag).find(".date").attr("remain", `${hwtItem.remainTime}`)
                    if (hwtItem.remainTime <= 3) { $(hwtTag).find("a").addClass("top") }
                    $(hwtTag).click(() => {
                        getHwtMoreInfo(courseItem.id).then(() => { window.open(`${hwtUrl}${hwtItem.hwtID}`, "_parent") })
                    })
                    $(".list>ul").append(hwtTag)
                }
            })
        })
    }
}

async function drawRed(remindInfo) {
    remindInfo.hwt.forEach(courseItem => {

        $(".courseList").find("a[href*='" + courseItem.id + "']").css("color", "#C00")

    })
}

async function getReminderNew() {
    if (location.href.indexOf('welcomepage/student/index.jsp') == -1) return
    let remindInfo = await getInfo.getRemindInfo()
        .then(res => {
            createHwtList(res)
                .then(() => {
                    PopNotify.show("成功", "作业列表加载完毕", "success", 2.5)
                    sortByTime()
                })
            drawRed(res)
        })
}

export default getReminderNew