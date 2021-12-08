'use strict';
import apppendTags from "./functions/append-tags/append-tags";
import fileUploader from "./functions/file-upload/file-uploader";
import getHomeworkInfo from "./functions/listpage-get-homework-info"
import getReminder from "./functions/get-reminder";
import getResources from "./functions/get-resources";
import judgeOnceSubmit from "./functions/only-once-commit";
import checkUpdate from "./functions/check-update";

apppendTags();
fileUploader();
getReminder();
getResources();
getHomeworkInfo();
judgeOnceSubmit();
checkUpdate();