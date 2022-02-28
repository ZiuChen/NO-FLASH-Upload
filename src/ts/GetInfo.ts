import sendRequest from "./SendRequest";
const baseUrl = `http://cc.bjtu.edu.cn:81/meol`;
const userinfoUrl = `${baseUrl}/welcomepage/student/index.jsp`; // 个人信息
const reminderUrl = `${baseUrl}/welcomepage/student/interaction_reminder.jsp`; // 互动提醒
const lessonUrl = `${baseUrl}/lesson/blen.student.lesson.list.jsp`; // 课程列表
const hwtListUrl = `${baseUrl}/common/hw/student/hwtask.jsp`; // 课程作业
const hwtDetailUrl = `${baseUrl}/common/hw/student/taskanswer.jsp`; // 课程作业详情 ?hwtid=
const hwtContentUrl = `${baseUrl}/common/hw/student/write.jsp`; // 作业提交页
const hwtReviewContentUrl = `${baseUrl}/common/hw/student/taskanswer.jsp`; // 作业查看结果页
const notifyListUrl = `${baseUrl}/common/inform/index_stu.jsp`; // 通知列表(有已阅读信息) ?lid=
const notifyMessageUrl = `${baseUrl}/jpk/course/layout/course_meswrap.jsp`; // 通知内容
const lessonPageUrl = `${baseUrl}/jpk/course/layout/newpage/index.jsp`; // 课程主页 ?courseId=
const lessonPageInfo = `${baseUrl}/jpk/course/layout/newpage/default_demonstrate.jsp`; // 课程信息 ?courseId=

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
      return arry;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getHwtSubmitStatus(hwtid: string) {
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

async function getHwtSubmitContent(hwtid: string) {
  return await sendRequest(
    hwtReviewContentUrl + `?hwtid=${hwtid}`,
    (obj: Document) => {
      return obj.querySelectorAll(".text>input")[1].attributes["value"].value;
    }
  )
    .then((res) => {
      return res; // a string contain submit content
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

async function getInformList() {
  return await getNotifyList("0");
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

async function getLessonPageInfo(lid: string) {
  return await sendRequest(
    lessonPageInfo + `?courseId=${lid}`,
    (obj: Document) => {
      return obj;
    }
  )
    .then(async (OuterRes) => {
      return await visitLessonPage(lid).then((InnerRes) => {
        return {
          introduction: OuterRes.querySelector(".coursecomm .body p").innerText,
          teacherInfo: {
            name: InnerRes.querySelectorAll(
              ".course_info .tutor .body li"
            )[0].innerText.split("教师姓名：")[1],
            academy: InnerRes.querySelectorAll(
              ".course_info .tutor .body li"
            )[1].innerText.split("所属院系：")[1],
            selfIntroduce: InnerRes.querySelectorAll(
              ".course_info .tutor .body li"
            )[2].innerText.split("个人简介：")[1],
          },
          // TODO: 课程信息
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getHwtContent(hwtid: string) {
  return await sendRequest(
    hwtContentUrl + `?hwtid=${hwtid}`,
    (obj: Document) => {
      return obj;
    }
  )
    .then((res) => {
      let table = res.querySelectorAll(".infotable>tbody>tr>td");
      return {
        // TODO: add only once submit
        title: table[0].innerText.trim(),
        deadline: table[1].innerText.split(`\n`)[0],
        score: table[2].innerText.trim(),
        content: table[3].querySelectorAll("input")[0].value,
        hwtid: res.querySelector("input[name=hwtid]").attributes["value"].value,
        hwaid: res.querySelector("input[name=hwaid]").attributes["value"].value,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getHwtReviewContent(hwtid: string) {
  return await sendRequest(
    hwtReviewContentUrl + `?hwtid=${hwtid}`,
    (obj: Document) => {
      return obj;
    }
  )
    .then((res) => {
      let table = res.querySelectorAll(".infotable>tbody>tr>td");
      return {
        // TODO: add evaluation results and comments
        title: table[0].innerText.trim(),
        deadline: table[1].innerText.split(`\n`)[0],
        score: table[2].innerText.trim(),
        getscore: table[3].innerText.trim(),
        content: table[4].querySelectorAll("input")[0].value,
        answer:
          res.querySelectorAll(".text>input")[1] === undefined
            ? undefined
            : res.querySelectorAll(".text>input")[1].value,
        results: undefined,
        comments: undefined,
      };
    })
    .catch((err) => {
      console.log(err);
    });
}

export default {
  getUserInfo: getUserInfo,
  getRemindInfo: getRemindInfo,
  getLessonInfo: getLessonInfo,
  getHwtInfo: getHwtInfo,
  getHwtSubmitStatus: getHwtSubmitStatus,
  getHwtContent: getHwtContent,
  getNotifyList: getNotifyList,
  getInformList: getInformList,
  visitLessonPage: visitLessonPage,
  getLessonPageInfo: getLessonPageInfo,
  getHwtSubmitContent: getHwtSubmitContent,
  getHwtReviewContent: getHwtReviewContent,
};
