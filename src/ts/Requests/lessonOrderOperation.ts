import sendRequest from "../SendRequest";

async function lessonOrderOperation(courseId: string, action: string) {
  let LESSUP = `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp?ACTION=LESSUP&lid=`;
  let LESSDOWN = `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp?ACTION=LESSDOWN&lid=`;
  switch (action) {
    case "up":
      return await sendRequest(LESSUP + courseId);
    case "down":
      return await sendRequest(LESSDOWN + courseId);
  }
}

export default lessonOrderOperation;
