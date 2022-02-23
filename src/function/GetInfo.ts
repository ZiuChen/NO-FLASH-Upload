import sendRequest from "./SendRequest";
const baseUrl = `http://cc.bjtu.edu.cn:81/meol`;
const userinfoUrl = `${baseUrl}/welcomepage/student/index.jsp`; // 个人信息leftBar
const reminderUrl = `${baseUrl}/welcomepage/student/interaction_reminder.jsp`; // 互动提醒reminder
const lessonUrl = `${baseUrl}/lesson/blen.student.lesson.list.jsp`; // 课程列表courselist
const hwtListUrl = `${baseUrl}/common/hw/student/hwtask.jsp`; // 课程作业hwtlist
const informListUrl = `${baseUrl}/common/inform/index_stu.jsp`; // 通知列表inform (有已阅读信息)
const informMessageUrl = `${baseUrl}/jpk/course/layout/course_meswrap.jsp`; // 通知内容course_meswrap

async function getUserInfo() {
  let stuInfo = await sendRequest(userinfoUrl, (obj: Document) => {
    return obj.querySelectorAll(".userinfobody>ul>li");
  })
    .then((res) => {
      let obj: object = {
        name: "",
        loginTime: "",
        onlineTime: "",
        loginTimes: "",
      };
      res.forEach((item: { innerText: string }, index: string | number) => {
        obj[Object.keys(obj)[index]] = item.innerText.split("：")[1].trim();
      });
      return obj;
    })
    .catch((error) => {
      console.log(error);
    });

  return stuInfo;
}

async function getRemindInfo() {
  let remindInfo = await sendRequest(reminderUrl, (obj: Document) => {
    return obj.querySelectorAll("ul[id='reminder']>li>ul");
  })
    .then((res) => {
      let obj: object = {
        notify: [],
        hwt: [],
      };
      res.forEach((it: Document, ind: number) => {
        it.querySelectorAll("li>a").forEach((item: HTMLElement) => {
          let classobj = {
            name: "",
            id: "",
            type: "",
          };
          classobj.name = item.innerText.trim();
          classobj.id = item
            .getAttribute("href")
            .split("lid=")[1]
            .split("&t=")[0];
          classobj.type = item
            .getAttribute("href")
            .split("lid=")[1]
            .split("&t=")[1];
          if (classobj.type === "hw") {
            obj["hwt"].push(classobj);
          } else if (classobj.type === "info") {
            obj["notify"].push(classobj);
          }
        });
      });
      // return obj;
      return {
        notify: [
          {
            name: "电子测量",
            id: "19003",
            type: "info",
          },
          {
            name: "传感器与检测技术",
            id: "20697",
            type: "info",
          },
          {
            name: "导航与定位技术",
            id: "22961",
            type: "info",
          }
        ],
        hwt: [
          {
            name: "现代控制理论",
            id: "10625",
            type: "info",
          },
          {
            name: "计算机控制系统",
            id: "16597",
            type: "info",
          },
        ]
      };
    })
    .catch((error) => {
      console.log(error);
    });

  return remindInfo;
}

async function getLessonInfo() {
  let lessonInfo = await sendRequest(lessonUrl, (obj: Document) => {
    return obj.querySelectorAll("tbody>tr");
  })
    .then((res) => {
      let arry: object[] = [];
      res.forEach((item: HTMLTableRowElement, index: number) => {
        if (index === 0) return;
        let obj = {
          id: "",
          name: "",
          academy: "",
          teacher: "",
        };
        let course = item.firstElementChild
          .firstElementChild as HTMLAnchorElement;
        let academy = item.children[1] as HTMLTableCellElement;
        let teacher = item.children[2] as HTMLTableCellElement;
        obj.id = course.getAttribute("href").split("lid=")[1];
        obj.name = course.innerText.split("\n")[0].trim();
        obj.academy = academy.innerText.split("\n")[0];
        obj.teacher = teacher.innerText.split("\n")[0];
        arry.push(obj);
      });
      return arry;
    })
    .catch((error) => {
      console.log(error);
    });

  return lessonInfo;
}

async function getHwtInfo() {
  let hwtInfo = await sendRequest(hwtListUrl, (obj: Document) => {
    return obj.querySelectorAll("tbody>tr");
  })
    .then((res) => {
      let arry: object[] = [];
      res.forEach((item: Document, index: number) => {
        if (index === 0) return;
        let obj = {
          hwtID: "",
          hwtName: "",
          date: "",
          Date: new Date(),
          remainTime: "",
          able: false,
        };
        let hwt = item.querySelectorAll(".infolist")[0] as HTMLAnchorElement;
        let deadline = item.children[1] as HTMLTableCellElement;

        obj.hwtID = hwt.getAttribute("href").split("hwtid=")[1];
        obj.hwtName = hwt.innerText.split("\n")[0].trim();
        obj.date = deadline.innerText.split("\n")[0];
        obj.Date = new Date(
          `${obj.date.split("年")[0]},${
            obj.date.split("年")[1].split("月")[0]
          },${obj.date.split("年")[1].split("月")[1].split("日")[0]},23:59:59`
        );
        obj.remainTime = parseInt(
          (
            (obj.Date.getTime() - new Date().getTime()) /
            (24 * 60 * 60 * 1000)
          ).toString()
        ).toString();
        obj.able = item.children[5].childElementCount !== 0;
        arry.push(obj);
      });
      return arry;
    })
    .catch((error) => {
      console.log(error);
    });
  return hwtInfo;
}

async function getInformList(lid: string) {
  let InformInfo = await sendRequest(
    informListUrl + `?lid=${lid}`,
    (obj: Document) => {
      return obj.querySelectorAll(".valuelist tr");
    }
  ).then((res) => {
    let array: object[] = [];
    res.forEach((item: HTMLTableCellElement, index: number) => {
      if (index === 0) return;
      let obj = {
        notifyName: "",
        id: "",
        pubTime: "",
        hadRead: false,
      };
      if (item.querySelectorAll("a").length === 0) return;
      obj.notifyName = item.querySelectorAll("a")[0].getAttribute("title");
      obj.id = item
        .querySelectorAll("a")[0]
        .getAttribute("href")
        .split("?nid=")[1]
        .split('"')[0];
      obj.pubTime = item.querySelectorAll(".align_c")[0].innerHTML;
      obj.hadRead = item.querySelectorAll("b").length === 0; // without </b> return true
      array.push(obj);
    });
    return array;
  });
  return InformInfo;
}

export default {
  getUserInfo: getUserInfo,
  getRemindInfo: getRemindInfo,
  getLessonInfo: getLessonInfo,
  getHwtInfo: getHwtInfo,
  getInformList: getInformList,
};
