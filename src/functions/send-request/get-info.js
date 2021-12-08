import sendRequest from "../common/send-request"
const baseUrl = `http://cc.bjtu.edu.cn:81/meol`
const userinfoUrl = `${baseUrl}/welcomepage/student/index.jsp` // 个人信息leftBar
const reminderUrl = `${baseUrl}/welcomepage/student/interaction_reminder.jsp` // 互动提醒reminder
const lessonUrl = `${baseUrl}/lesson/blen.student.lesson.list.jsp` // 课程列表courselist
const hwtListUrl = `${baseUrl}/common/hw/student/hwtask.jsp` // 课程作业hwtlist

async function getUserInfo() {
    let stuInfo = await sendRequest(userinfoUrl, (obj) => {
            return obj.querySelectorAll(".userinfobody>ul>li")
        })
        .then(res => {
            let obj = {
                name: '',
                loginTime: '',
                onlineTime: '',
                loginTimes: ''
            }
            res.forEach((item, index) => {
                obj[Object.keys(obj)[index]] = item.innerText.split("：")[1].trim()
            })
            return obj
        })
        .catch(error => { console.log(error); })

    return stuInfo
}

async function getRemindInfo() {
    let remindInfo = await sendRequest(reminderUrl, (obj) => {
            return obj.querySelectorAll("ul[id='reminder']>li>ul")
        })
        .then(res => {
            let obj = {
                notify: [],
                hwt: []
            }
            res.forEach((it, ind) => {
                it.querySelectorAll("li>a").forEach(item => {
                    let classobj = {
                        name: '',
                        id: ''
                    }
                    classobj.name = item.innerText.trim()
                    classobj.id = item.getAttribute("href").split("lid=")[1].split("&t=")[0]
                    obj[Object.keys(obj)[ind]].push(classobj)
                })
            })
            return obj
        })
        .catch(error => { console.log(error); })

    return remindInfo
}

async function getLessonInfo() {
    let lessonInfo = await sendRequest(lessonUrl, (obj) => {
            return obj.querySelectorAll("tbody>tr")
        })
        .then(res => {
            let arry = []
            res.forEach((item, index) => {
                if (index === 0) return
                let obj = {
                    id: '',
                    name: '',
                    academy: '',
                    teacher: ''
                }
                obj.id = item.firstElementChild.firstElementChild.getAttribute("href").split("lid=")[1]
                obj.name = item.firstElementChild.firstElementChild.innerText.split("\n")[0].trim()
                obj.academy = item.children[1].innerText.split("\n")[0]
                obj.teacher = item.children[2].innerText.split("\n")[0]
                arry.push(obj)
            })
            return arry
        })
        .catch(error => { console.log(error); })

    return lessonInfo
}

async function gethwtInfo() {
    let hwtInfo = await sendRequest(hwtListUrl, (obj) => {
            return obj.querySelectorAll("tbody>tr")
        })
        .then(res => {
            let arry = []
            res.forEach((item, index) => {
                if (index === 0) return
                let obj = {
                    hwtID: '',
                    hwtName: '',
                    date: '',
                    able: false
                }
                obj.hwtID = item.querySelectorAll(".infolist")[0].getAttribute("href").split("hwtid=")[1]
                obj.hwtName = item.querySelectorAll(".infolist")[0].innerText.split("\n")[0].trim()
                obj.date = item.children[1].innerText.split("\n")[0]
                obj.able = item.children[5].childElementCount !== 0
                arry.push(obj)
            })
            return arry
        })
        .catch(error => { console.log(error); })

    return hwtInfo
}

export default {
    getUserInfo: getUserInfo,
    getRemindInfo: getRemindInfo,
    getLessonInfo: getLessonInfo,
    gethwtInfo: gethwtInfo
}