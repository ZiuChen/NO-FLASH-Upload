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
        /* 
          只能提交一次的作业
            未过期
              已提交 able: false answerStatus: false
              未提交 able: true answerStatus: undefined
            已过期
              已提交 
              未提交 able: false answerStatus: undefined
          允许重复提交的作业
            未过期
              已提交 able: true answerStatus: true
              未提交 able: true answerStatus: undefined
            已过期
              已提交 able: false answerStatus: false
              未提交 able: false answerStatus： undefined
        */
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
          answerStatus: item.answerStatus, // 是否已经提交
          showGrade: item.showGrade, // answerStatus == true || able == false
        });
      });
      return rtnArray;
    });
  });
}
