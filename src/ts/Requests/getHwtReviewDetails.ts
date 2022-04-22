import sendRequest from "../SendRequest";

export default async function getHwtReviewDetails(hwtId: string) {
  let url = `http://cc.bjtu.edu.cn:81/meol/hw/stu/hwShowReviewDetails.do?type=tea&hwtId=${hwtId}`;
  return await sendRequest(url, undefined).then((res) => {
    return res.json();
  });
  return {
    datas: {
      answer: "", // 提交内容
      content: "", // 作业内容
      finishTime: "2022-03-19 10:00:00", // 提交时间
      fullMark: 5, // 满分
      id: 33333, // HwtId
      markTime: "2022-03-29 10:00", // 评分时间
      mutualRealName: "李四四", // 评分人
      operationStatus: true, //
      realName: "张三三", // 学生名
      score: 5, // 获得分数
      title: "", // 作业标题
    },
    sessionid: "",
    status: 1,
  };
}
