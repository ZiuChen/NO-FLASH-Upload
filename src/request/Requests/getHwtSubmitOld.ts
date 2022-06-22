import sendRequest from "../SendRequest";

export default async function getHwtSubmitOld(hwtid: string) {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid=${hwtid}`,
    (obj: Document) => {
      return obj;
    }
  )
    .then((res) => {
      let table = res.querySelectorAll(".infotable>tbody>tr>td");
      return {
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
