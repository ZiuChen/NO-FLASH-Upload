let Tag1 = /*html*/ `<li><a id='add_button' title='上传作业' onclick=location='http://cc.bjtu.edu.cn:81/meol/common/hw/student/hwtask.jsp?tagbug=client&strStyle=new06'><span>上传作业</span></a></li>`;
let Tag2 = /*html*/ `<li><a id='add_button' title='下载资源' onclick=location='http:/ / cc.bjtu.edu.cn: 81 / meol / common / script / listview.jsp ? lid = " + location.href.split('courseId=')[1] + " & folderid = 0 '><span>下载资源</span></a></li>`;

export default {
    tag1: Tag1,
    tag2: Tag2
}