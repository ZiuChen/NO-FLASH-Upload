const dictionary = {
  通知: ["inform"],
  检查更新: ["greasyfork"],
  作业: ["hw", "hwt", "hwtask"],
};

function getErrorTips(url: string) {
  let rtnContent: string = "";
  Object.keys(dictionary).forEach((errorType) => {
    dictionary[errorType].forEach((key: string) => {
      if (url.indexOf(key) !== -1) {
        rtnContent += `${errorType}`;
      }
    });
  });
  if (rtnContent === "") {
    return "";
  } else {
    return `可能与${rtnContent}有关，`;
  }
}

export default getErrorTips;
