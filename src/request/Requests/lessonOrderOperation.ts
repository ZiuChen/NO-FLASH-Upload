import sendRequest from "../SendRequest";

export default async function lessonOrderOperation(
  courseId: string,
  action: string
) {
  let LESSUP = `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp?ACTION=LESSUP&lid=${courseId}`;
  let LESSDOWN = `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp?ACTION=LESSDOWN&lid=${courseId}`;
  switch (action) {
    case "up":
      return await sendRequest(LESSUP);
    case "down":
      return await sendRequest(LESSDOWN);
  }
}
