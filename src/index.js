'use strict';
import apppendTags from "./functions/append-tags/append-tags";
import fileUploader from "./functions/file-upload/file-uploader";
import getHomeworkInfo from "./functions/listpage-get-homework-info"
import getReminder from "./functions/get-reminder";
import getResources from "./functions/get-resources";
import judgeOnceSubmit from "./functions/only-once-commit";
import checkUpdate from "./functions/check-update";
import uploadBoxCSS from './style/css/upload-doms.css';
import popNotify from "./style/css/PopNotify.css"

apppendTags();
fileUploader();
getReminder();
getResources();
getHomeworkInfo();
judgeOnceSubmit();
checkUpdate();