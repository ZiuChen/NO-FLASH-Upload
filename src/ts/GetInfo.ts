import sendRequest from "./SendRequest";
const baseUrl = `http://cc.bjtu.edu.cn:81/meol`;
const userinfoUrl = `${baseUrl}/welcomepage/student/index.jsp`; // 个人信息leftBar
const reminderUrl = `${baseUrl}/welcomepage/student/interaction_reminder.jsp`; // 互动提醒reminder
const lessonUrl = `${baseUrl}/lesson/blen.student.lesson.list.jsp`; // 课程列表courselist
const hwtListUrl = `${baseUrl}/common/hw/student/hwtask.jsp`; // 课程作业hwtlist
const hwtDetailUrl = `${baseUrl}/common/hw/student/taskanswer.jsp`; // 课程作业详情taskanswer
const notifyListUrl = `${baseUrl}/common/inform/index_stu.jsp`; // 通知列表notify (有已阅读信息)
const notifyMessageUrl = `${baseUrl}/jpk/course/layout/course_meswrap.jsp`; // 通知内容course_meswrap
const lessonPageUrl = `${baseUrl}/jpk/course/layout/newpage/index.jsp`; // 某一课程的主页

async function getUserInfo() {
  return await sendRequest(userinfoUrl, (obj: Document) => {
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
}

async function getRemindInfo() {
  return await sendRequest(reminderUrl, (obj: Document) => {
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
      // FIXME: Debugging
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
            name: "现代控制理论",
            id: "10625",
            type: "info",
          },
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
        ],
      };
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getLessonInfo() {
  return await sendRequest(lessonUrl, (obj: Document) => {
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
}

async function getHwtInfo(lid: string) {
  return await sendRequest(hwtListUrl, (obj: Document) => {
    return obj.querySelectorAll("tbody>tr");
  })
    .then((res) => {
      // TODO: add hadSubmit
      let arry: object[] = [];
      res.forEach((item: Document, index: number) => {
        if (index === 0) return;
        let obj = {
          hwtID: "",
          hwtName: "",
          lid: lid,
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
      // return arry;
      // FIXME: Debugging
      // FIXME: remove all lid
      if (lid === "10625") {
        return [
          {
            hwtID: "23514",
            hwtName: "实验作业提交——请做成3个PDF文件",
            lid: "10625",
            date: "2022年1月8日",
            Date: "2022-01-08T15:59:59.000Z",
            remainTime: "-46",
            able: false,
          },
          {
            hwtID: "23209",
            hwtName: "chap4作业补交",
            lid: "10625",
            date: "2022年1月25日",
            Date: "2022-01-25T15:59:59.000Z",
            remainTime: "-29",
            able: false,
          },
          {
            hwtID: "22868",
            hwtName: "chap3作业（补交）",
            lid: "10625",
            date: "2022年1月12日",
            Date: "2022-01-12T15:59:59.000Z",
            remainTime: "-42",
            able: false,
          },
          {
            hwtID: "22195",
            hwtName: "chap3作业",
            lid: "10625",
            date: "2022年3月31日",
            Date: "2022-03-31T15:59:59.000Z",
            remainTime: "35",
            able: true,
          },
          {
            hwtID: "20999",
            hwtName: "chap2 作业",
            lid: "10625",
            date: "2022年3月15日",
            Date: "2022-03-15T15:59:59.000Z",
            remainTime: "19",
            able: true,
          },
          {
            hwtID: "20419",
            hwtName: "chap1-3作业",
            lid: "10625",
            date: "2022年2月25日",
            Date: "2022-02-25T15:59:59.000Z",
            remainTime: "1",
            able: true,
          },
          {
            hwtID: "20166",
            hwtName: "chap 1-2 作业",
            lid: "10625",
            date: "2022年2月24日",
            Date: "2022-02-24T15:59:59.000Z",
            remainTime: "0",
            able: true,
          },
        ];
      } else if (lid === "16597") {
        return [
          {
            hwtID: "31389",
            hwtName: "第三次作业",
            lid: "16597",
            date: "2022年2月21日",
            Date: "2022-02-21T15:59:59.000Z",
            remainTime: "-2",
            able: false,
          },
          {
            hwtID: "31203",
            hwtName: "第二次作业",
            lid: "16597",
            date: "2022年2月14日",
            Date: "2022-02-14T15:59:59.000Z",
            remainTime: "-9",
            able: false,
          },
          {
            hwtID: "30911",
            hwtName: "第一次作业",
            lid: "16597",
            date: "2022年3月7日",
            Date: "2022-03-07T15:59:59.000Z",
            remainTime: "11",
            able: true,
          },
          {
            hwtID: "24041",
            hwtName: "期末测试试卷提交",
            lid: "16597",
            date: "2022年4月26日",
            Date: "2022-04-26T15:59:59.000Z",
            remainTime: "61",
            able: true,
          },
          {
            hwtID: "14171",
            hwtName: "第三章作业",
            lid: "16597",
            date: "2022年3月18日",
            Date: "2022-03-18T15:59:59.000Z",
            remainTime: "22",
            able: true,
          },
          {
            hwtID: "14170",
            hwtName: "第二章作业",
            lid: "16597",
            date: "2022年3月17日",
            Date: "2022-03-17T15:59:59.000Z",
            remainTime: "21",
            able: true,
          },
        ];
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getHwtDetail(hwtid: string) {
  return await sendRequest(
    hwtDetailUrl + `?hwtid=${hwtid}`,
    (obj: Document) => {
      return (
        obj.querySelectorAll(".infotable")[1].querySelectorAll("input")
          .length !== 0
      );
    }
  )
    .then((res) => {
      return res; // a boolean that whether submitted
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getNotifyList(lid: string) {
  return await sendRequest(
    notifyListUrl + `?tagbug=client&s_order=0&lid=${lid}`,
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
}

async function visitLessonPage(lid: string) {
  return await sendRequest(
    lessonPageUrl + `?courseId=${lid}`,
    (obj: Document) => {
      return obj;
    }
  ).catch((err) => {
    console.log(err);
  });
}

export default {
  getUserInfo: getUserInfo,
  getRemindInfo: getRemindInfo,
  getLessonInfo: getLessonInfo,
  getHwtInfo: getHwtInfo,
  getHwtDetail: getHwtDetail,
  getNotifyList: getNotifyList,
  visitLessonPage: visitLessonPage,
};
