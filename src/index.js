'use strict';
import apppendTags from "./functions/append-tags/append-tags";
import fileUploader from "./functions/file-upload/file-uploader";
import getHwtMoreInfo from "./functions/get-homework-more-info"
import getReminder from "./functions/get-reminder";
import getResources from "./functions/get-resources";
import judgeOnceSubmit from "./functions/only-once-commit";
import checkUpdate from "./functions/check-update";
import getInfo from "./functions/send-request/get-info"

apppendTags();
fileUploader();
getReminder();
getResources();
getHwtMoreInfo();
judgeOnceSubmit();
checkUpdate();
// getInfo.getHwtInfo();