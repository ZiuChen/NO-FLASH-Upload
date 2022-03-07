import sendRequest from "../SendRequest";

interface json {
  datas: {
    courseId: string;
    hwtList: [];
  };
}

async function getHwtList(courseId: string) {
  let url = `http://cc.bjtu.edu.cn:81/meol/hw/stu/hwStuHwtList.do?courseId=${courseId}&pagingNumberPer=100`;
  return await sendRequest(url, undefined).then((response) => {
    return response.json().then((json: json) => {
      let rtnArray: object[] = [];
      if (json.datas.hwtList === undefined) return [];
      json.datas.hwtList.forEach((item: any) => {
        rtnArray.push({
          courseId: json.datas.courseId,
          id: item.id.toString(),
          title: item.title,
          deadLine: item.deadLine,
          remain: Math.floor(
            (new Date(item.deadLine).getTime() - new Date().getTime()) /
              (24 * 60 * 60 * 1000)
          ),
          able: item.submitStruts, // 是否允许提交
          publisher: item.realName,
          mutualTask: item.mutualTask,
          answerStatus: item.answerStatus,
          showGrade: item.showGrade, // answerStatus == true || able == false
        });
      });
      return rtnArray;
    });
  });
}

export default getHwtList;
