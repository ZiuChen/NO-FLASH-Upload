import sendRequest from "../SendRequest";

export default async function getLessonList() {
  let url = `http://cc.bjtu.edu.cn:81/meol/lesson/blen.student.lesson.list.jsp`;
  return await sendRequest(url, (doc: Document) => {
    return doc.querySelectorAll("tbody > tr");
  }).then((res) => {
    let rtnArray: object[] = [];
    res.forEach((item: HTMLTableRowElement, index: number) => {
      if (index === 0) return;
      let course = item.querySelectorAll("td a")[0] as HTMLTableCellElement;
      let academy = item.children[2] as HTMLTableCellElement;
      let teacher = item.children[3] as HTMLTableCellElement;
      rtnArray.push({
        number: item.querySelector("td").innerText,
        id: course
          .getAttribute("onclick")
          .split("courseId=")[1]
          .split("','")[0],
        name: course.innerText.split("\n")[0].trim(),
        academy: academy.innerText.split("\n")[0],
        teacher: teacher.innerText.split("\n")[0],
      });
    });
    return rtnArray;
  });
}
