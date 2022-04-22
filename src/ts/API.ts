import getUserInfo from "./Requests/getUserInfo";
import getRemindInfo from "./Requests/getRemindInfo";
import getHwtList from "./Requests/getHwtList";
import getHwtSubmitNew from "./Requests/getHwtSubmitNew";
import getHwtReviewNew from "./Requests/getHwtReviewNew";
import getHwtReviewDetails from "./Requests/getHwtReviewDetails";
import getHwtSubmitOld from "./Requests/getHwtSubmitOld";
import getHwtReviewOld from "./Requests/getHwtReviewOld";
import getLessonList from "./Requests/getLessonList";
import getNotifyList from "./Requests/getNotifyList";
import getInformList from "./Requests/getInformList";
import lessonOrderOperation from "./Requests/lessonOrderOperation";
import getLoginStatus from "./Requests/getLoginStatus";
import getLessonTopList from "./Requests/getLessonTopList";
import getScriptNotify from "./Requests/getScriptNotify";
import getScriptUpdateLog from "./Requests/getScriptUpdateLog";
import getPluginsData from "./Requests/getPluginsData";

export default {
  getUserInfo: getUserInfo,
  getRemindInfo: getRemindInfo,
  getHwtList: getHwtList,
  getHwtSubmitNew: getHwtSubmitNew,
  getHwtReviewNew: getHwtReviewNew,
  getHwtReviewDetails: getHwtReviewDetails,
  getHwtSubmitOld: getHwtSubmitOld,
  getHwtReviewOld: getHwtReviewOld,
  getLessonList: getLessonList,
  getNotifyList: getNotifyList,
  getInformList: getInformList,
  lessonOrderOperation: lessonOrderOperation,
  getLoginStatus: getLoginStatus,
  getLessonTopList: getLessonTopList,
  getScriptNotify: getScriptNotify,
  getScriptUpdateLog: getScriptUpdateLog,
  getPluginsData: getPluginsData,
};
