import sendRequest from "../SendRequest";

export default async function getUserInfo() {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/welcomepage/student/index.jsp`,
    (obj: Document) => {
      return obj;
    }
  )
    .then((res) => {
      let lis = res.querySelectorAll(".userinfobody>ul>li");
      return {
        name: lis[0].innerText.split("：")[1].trim(),
        loginTime: lis[1].innerText.split("：")[1].trim(),
        onlineTime: lis[2].innerText.split("：")[1].trim(),
        loginTimes: lis[3].innerText.split("：")[1].trim(),
        SID: res
          .querySelector(".info")
          .getAttribute("href")
          .split("?SID=")[1]
          .split("&from=")[0],
      };
    })
    .catch((error) => {
      console.log(error);
    });
}
