import sendRequest from "../common/send-request"

async function getInfomation() {
    const baseUrl = `http://cc.bjtu.edu.cn:81/meol`
    const indexUrl = `${baseUrl}/welcomepage/student/index.jsp`
    const reminderUrl = `${baseUrl}/welcomepage/student/interaction_reminder.jsp`

    let stuInfo = await sendRequest(indexUrl, (obj) => {
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
        .catch((error) => { console.log(error); })

    let remindInfo = await sendRequest(reminderUrl, (obj) => {
            return obj.querySelectorAll("ul[id='reminder']>li>ul")
        })
        .then(res => {
            let obj = {
                notify: [],
                hwt: []
            }
            res.forEach((it, ind) => {
                it.querySelectorAll("li>a").forEach((item, index) => {
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
        .then(res => { console.log(res); })
        .catch((error) => { console.log(error); })

    return {}

}

async function appendStyle() {

}

export default getInfomation