import tipsBlow from "./tips-blow";

let inputDiv = /* html */ `<div id="inputDiv"><div id="inputArea"><div id="textShow"><p id="p1">📁文件上传📝</p><p id="p2" style="font-size: 15px">（支持拖拽上传文件）</p></div></div></div>`

let inputTag = /* html */ `<input id="currentFile" type="file" multiple="multiple"</input>`
let fileInfoDiv = /* html */ `<div id="fileInfo"><a>已选择文件：</a></div>`
let filenamesDiv = /* html */ `<div id="filenames"></div>`
let uploadBtn = /* html */ `<a id="uploadTrigger" title="上传">上传</a>`
let emptyBtn = /* html */ `<a id="emptyTrigger" title="清空">清空</a>`
let buttonDiv = /* html */ `<div id="buttonDiv">${uploadBtn}${emptyBtn}</div>`
let usertipsDiv = /* html */ `<div id="userTips"><details>${tipsBlow.p1}${tipsBlow.p2}${tipsBlow.p3}<summary>更多信息</summary></details></div>`

let uploadBox = /* html */ `<tr><td><div id="outerDiv">${inputDiv}${inputTag}${fileInfoDiv}${filenamesDiv}${buttonDiv}${usertipsDiv}</div></td></tr>`

export default {
    box: uploadBox,
    uploadBtn: uploadBtn,
    emptyBtn: emptyBtn
}