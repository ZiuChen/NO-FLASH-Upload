import sendRequest from "../SendRequest";

interface IUserInfoObj {
  name: string;
  loginTime: string;
  onlineTime: string;
  loginTimes: string;
  [key: string]: any;
}

export default async function getUserInfo() {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/welcomepage/student/index.jsp`,
    (obj: Document) => {
      return obj.querySelectorAll(".userinfobody>ul>li");
    }
  )
    .then((res) => {
      let obj: IUserInfoObj = {
        name: "",
        loginTime: "",
        onlineTime: "",
        loginTimes: "",
      };
      res.forEach((item: { innerText: string }, index: number) => {
        obj[Object.keys(obj)[index]] = item.innerText.split("：")[1].trim();
      });
      return obj;
    })
    .catch((error) => {
      console.log(error);
    });
}
