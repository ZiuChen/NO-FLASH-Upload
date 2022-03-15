import getHwtList from "./Requests/getHwtList";
import getHwtSubmitNew from "./Requests/getHwtSubmitNew";
import getHwtReviewNew from "./Requests/getHwtReviewNew";
import getHwtSubmitOld from "./Requests/getHwtSubmitOld";
import getHwtReviewOld from "./Requests/getHwtReviewOld";
import getLessonList from "./Requests/getLessonList";
import lessonOrderOperation from "./Requests/lessonOrderOperation";

export default {
  getHwtList: getHwtList,
  getHwtSubmitNew: getHwtSubmitNew,
  getHwtReviewNew: getHwtReviewNew,
  getHwtSubmitOld: getHwtSubmitOld,
  getHwtReviewOld: getHwtReviewOld,
  getLessonList: getLessonList,
  lessonOrderOperation: lessonOrderOperation,
};
