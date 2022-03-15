import sendRequest from "../SendRequest";

export default async function getHwtReviewOld(hwtid: string) {
  return await sendRequest(
    `http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid=${hwtid}`,
    (obj: Document) => {
      return obj;
    }
  )
    .then((res) => {
      let table = res.querySelectorAll(".infotable>tbody>tr>td");
      return {
        title: table[0].innerText.trim(),
        deadLine: table[1].innerText.split(`\n`)[0],
        fullMark: table[2].innerText.trim(),
        score: table[3].innerText.trim(),
        content: table[4].querySelectorAll("input")[0].value,
        hwaAnswer:
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
