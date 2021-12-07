import tipsBlow from "./tips-blow";

let inputDiv = '<div id="inputDiv"><div id="inputArea"><div id="textShow"><p id="p1">📁文件上传📝</p><p id="p2" style="font-size: 15px">（支持拖拽上传文件）</p></div></div></div>';
let inputTag = '<input id="currentFile" type="file" multiple="multiple"</input>'
let filenamesDiv = '<div id="filenames"></div>';
let buttonDiv = '<div id="buttonDiv"></div>';
let usertipsDiv = `<div id="userTips"><details>${tipsBlow.p1}${tipsBlow.p2}<summary>更多信息</summary></details></div>`;
let uploadBox = '<tr><td><div id="outerDiv">' + inputDiv + inputTag + '<div id="fileInfo"><a>已选择文件：</a></div>' + filenamesDiv + buttonDiv + usertipsDiv + '</div></td></tr>'

export default uploadBox