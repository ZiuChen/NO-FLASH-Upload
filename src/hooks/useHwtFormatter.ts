import localCache from "@/utils/localCache";

const formatterRemain = ({ remainFloat, remain, date }: any) => {
  const dDate = new Date(date).getDate();
  const cDate = new Date().getDate();
  if (remainFloat < 0) {
    return `已过期${Math.abs(remain)}天`;
  } else if (remainFloat >= 0 && remainFloat < 1) {
    if (dDate > cDate) {
      return "还有1天截止"; // <24h 但是截止日期在明天
    } else {
      return `今日截止`;
    }
  } else {
    return `还有${remain}天截止`;
  }
};
const formatterAnswerStatus = ({ able, answerStatus }: any) => {
  // 挺复杂的 😅 详细注释在 getHwtList.ts 中
  if (able === false && answerStatus === false) {
    return { text: "已提交", tag: "success" };
  } else if (able === false && answerStatus === undefined) {
    return { text: "未提交", tag: "warning" };
  } else if (able === true && answerStatus === true) {
    return { text: "已提交", tag: "success" };
  } else if (able === true && answerStatus === undefined) {
    return { text: "未提交", tag: "warning" };
  } else if (able === true && answerStatus === false) {
    return { text: "已提交", tag: "success" };
  }
};
const formatterCourseId = ({ courseId }: any) => {
  const lessonList = localCache.getCache("lesson-list");
  return lessonList?.find((lesson: any) => lesson.id === courseId).name;
};
const formatterMark = ({ mark }: any) => {
  return mark !== undefined
    ? { text: mark, tag: "" }
    : { text: "未批阅", tag: "info" };
};
const formatterHandler = ({ able }: any) => {
  return able ? "交作业" : "看作业";
};

export function useHwtFormatter() {
  return {
    formatterRemain,
    formatterAnswerStatus,
    formatterCourseId,
    formatterMark,
    formatterHandler,
  };
}
