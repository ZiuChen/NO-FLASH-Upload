import sendRequest from "../SendRequest";

export default async function getLessonTopList(type: string) {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/homepage/common/${type}_lesson_top_list.jsp`,
    (doc: Document) => {
      return doc.querySelectorAll(".datatable tr");
    }
  ).then((res) => {
    let rtnArray: object[] = [];
    res.forEach((item: HTMLTableCellElement, index: number) => {
      if (index === 0) return;
      rtnArray.push({
        id: item
          .querySelector("a")
          .getAttribute("href")
          .split("?courseId=")[1]
          .split("&_style=")[0],
        course: item.querySelector("a").innerHTML,
        teacher: item.querySelector(".tea").innerHTML,
        visit: item.querySelector("p").innerHTML,
      });
    });
    return rtnArray;
  });
}
