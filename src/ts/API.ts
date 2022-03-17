import getUserInfo from "./Requests/getUserInfo";
import getUserAvatar from "./Requests/getUserAvatar";
import getRemindInfo from "./Requests/getRemindInfo";
import getHwtList from "./Requests/getHwtList";
import getHwtSubmitNew from "./Requests/getHwtSubmitNew";
import getHwtReviewNew from "./Requests/getHwtReviewNew";
import getHwtSubmitOld from "./Requests/getHwtSubmitOld";
import getHwtReviewOld from "./Requests/getHwtReviewOld";
import getLessonList from "./Requests/getLessonList";
import getNotifyList from "./Requests/getNotifyList";
import getInformList from "./Requests/getInformList";
import lessonOrderOperation from "./Requests/lessonOrderOperation";
import getLoginStatus from "./Requests/getLoginStatus";
import getLessonTopList from "./Requests/getLessonTopList";

export default {
  getUserInfo: getUserInfo,
  getUserAvatar: getUserAvatar,
  getRemindInfo: getRemindInfo,
  getHwtList: getHwtList,
  getHwtSubmitNew: getHwtSubmitNew,
  getHwtReviewNew: getHwtReviewNew,
  getHwtSubmitOld: getHwtSubmitOld,
  getHwtReviewOld: getHwtReviewOld,
  getLessonList: getLessonList,
  getNotifyList: getNotifyList,
  getInformList: getInformList,
  lessonOrderOperation: lessonOrderOperation,
  getLoginStatus: getLoginStatus,
  getLessonTopList: getLessonTopList,
};
