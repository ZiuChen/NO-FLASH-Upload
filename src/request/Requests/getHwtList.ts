import sendRequest from "../SendRequest";

interface json {
  datas: {
    courseId: string;
    hwtList: [];
  };
}

export default async function getHwtList(courseId: string) {
  let url = `http://cc.bjtu.edu.cn:81/meol/hw/stu/hwStuHwtList.do?courseId=${courseId}&pagingNumberPer=100`;
  return await sendRequest(url, undefined).then((response: any) => {
    return response.json().then((json: json) => {
      let rtnArray: object[] = [];
      if (json.datas.hwtList === undefined) return [];
      json.datas.hwtList.forEach((item: any) => {
        rtnArray.push({
          courseId: json.datas.courseId,
          id: item.id.toString(),
          title: item.title,
          deadLine: item.deadLine,
          remainFloat:
            (new Date(item.deadLine).getTime() - new Date().getTime()) /
            (24 * 60 * 60 * 1000),
          remain: Math.floor(
            (new Date(item.deadLine).getTime() - new Date().getTime()) /
              (24 * 60 * 60 * 1000)
          ),
          able: item.submitStruts, // 是否允许提交
          mark: item.mark,
          publisher: item.realName,
          mutualTask: item.mutualTask,
          answerStatus: item.answerStatus, // 是否已经提交，未提交为undefined，已经提交为true，过期为false
          showGrade: item.showGrade, // answerStatus == true || able == false
        });
      });
      return rtnArray;
    });
  });
}
