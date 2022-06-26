import sendRequest from "../SendRequest";
interface INotifyObj {
  notify: any[];
  hwt: any[];
}

export default async function getRemindInfo() {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/welcomepage/student/interaction_reminder.jsp`,
    (obj: Document) => {
      return obj.querySelectorAll("ul[id='reminder']>li>ul");
    }
  )
    .then((res) => {
      let obj: INotifyObj = {
        notify: [],
        hwt: [],
      };
      res.forEach((it: Document, ind: number) => {
        it.querySelectorAll("li>a").forEach((item: any) => {
          let classobj = {
            name: "",
            id: "",
            type: "",
          };
          classobj.name = item.innerText.trim();
          classobj.id = item
            ?.getAttribute("href")
            ?.split("lid=")[1]
            ?.split("&t=")[0] as string;
          classobj.type = item
            ?.getAttribute("href")
            ?.split("lid=")[1]
            ?.split("&t=")[1] as string;
          if (classobj.type === "hw") {
            obj["hwt"].push(classobj);
          } else if (classobj.type === "info") {
            obj["notify"].push(classobj);
          }
        });
      });
      return obj;
    })
    .catch((error) => {
      console.log(error);
    });
}
