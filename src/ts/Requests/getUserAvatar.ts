import sendRequest from "../SendRequest";

export default async function getUserInfo(SID: string) {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/popups/viewstudent_info.jsp?SID=${SID}`,
    (obj: Document) => {
      return obj.querySelector("img").getAttribute("src");
    }
  ).catch((error) => {
    console.log(error);
  });
}
