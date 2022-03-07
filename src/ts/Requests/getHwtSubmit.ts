import sendRequest from "../SendRequest";

async function getHwtDetail(courseId: string, hwtId: string) {
  let url = `http://cc.bjtu.edu.cn:81/meol/hw/stu/hwStuSubmit.do?courseId=${courseId}&hwtId=${hwtId}`;
  return await sendRequest(url, undefined);
  return {
    datas: {
      answer: "", // 回答内容
      content: "", // 题目
      deadLine: "", // 截止日期
      finishTime: "", // 最近提交日期
      fullMark: 0, // 满分
      hwaId: 1111111, // hwaId
      id: 11111, // hwtId
      manySubmitStatus: true, // 允许多次提交
      realName: "", // 发布人
      title: "", // 作业标题
    },
    sessionid: "",
    status: 1,
  };
}

export default getHwtDetail;
