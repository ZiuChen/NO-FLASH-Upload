(function() {
    'use strict';
    // 全局变量
    let onUpload = 0;
    let index = 0;
    let isAbort = 0;
    let oloaded = 0;
    let ot = 0;
 
    // 预置DOM
    let frontTag1 = "<li><a id='add_button' title='上传作业' onclick=location='http://cc.bjtu.edu.cn:81/meol/common/hw/student/hwtask.jsp?tagbug=client&strStyle=new06'><span>上传作业</span></a></li>";
    let frontTag2 = "<li><a id='add_button' title='下载资源' onclick=location='http://cc.bjtu.edu.cn:81/meol/common/script/listview.jsp?lid="+location.href.split('courseId=')[1]+"&folderid=0'><span>下载资源</span></a></li>";
    let inputDiv = '<div id="inputDiv" style="height: 200px; width: 560px; margin-top: 20px; margin-bottom: 10px; cursor:pointer; border: 3px dashed; border-radius:10px; border-color: #82b900; background: #c6f062;"><div id="inputArea"><div id="textShow" style="margin-top: 80px; font-size: 20px; color: #424d55; text-align: center;"><p id="p1">📁文件上传📝</p><p id="p2" style="font-size: 15px">（支持拖拽上传文件）</p></div><input id="currentFile" type="file" multiple="multiple" style="display:none;" </input></div></div>';
    let filenamesDiv = '<div id="filenames" style="margin-top: 10px; margin-bottom: 10px; border: 3px solid rgb(130, 185, 0); border-radius: 10px;"></div>';
    let buttonDiv = '<div id="buttonDiv" style="margin-top: 20px; margin-bottom: 10px; text-align: center"></div>';
    let usertipsDiv = '<div id="userTips"><details style="color: #c0c1bb; cursor: default;"><p>感谢您使用此脚本，欢迎<a href="https://greasyfork.org/zh-CN/scripts/432056" target="blank">好评</a>并<a href="https://blog.csdn.net/Huuc6/article/details/120256435" target="blank">推荐</a>给身边同学，</p><p>如果喜欢这个脚本，可以选择<a href="https://gitee.com/ziuc/utool-filebed/raw/master/Buy me a coffee.png" target="blank">捐赠</a>，这将鼓励我持续维护这个脚本。</p><summary>更多信息</summary></details></div>';
    let uploadBox = '<tr><td><div id="outerDiv" style="font-size: 14px; width: 590px; margin:0 auto; margin-top: 5px; margin-bottom: 5px;">'+inputDiv+'<div id="fileInfo" style="text-align: left; cursor: default;"><a>已选择文件：</a></div>'+filenamesDiv+buttonDiv+usertipsDiv+'</div></td></tr>'
    let uploadBtn = '<a id="uploadTrigger" title="上传" style="cursor:pointer; padding-top: 3.5px; padding-bottom: 3.5px; padding-right: 10px; padding-left: 10px; margin-right: 10px; margin-left: 10px; background-color: #c6f062; border: 2px solid;">上传</a>';
    let emptyBtn = '<a id="emptyTrigger" title="清空" style="cursor:pointer; padding-top: 3.5px; padding-bottom: 3.5px; padding-right: 10px; padding-left: 10px; margin-right: 10px; margin-left: 10px; background-color: #c6f062; border: 2px solid;">清空</a>';
 
    // 外部DOM操作
    $('#tmenu').append(frontTag1, frontTag2);
    $('.infotable>tbody>tr:contains("请输入你的答案")').after(uploadBox);
    $('#filenames, #buttonDiv, #fileInfo').hide();
 
    // 信息显示部分
    let processImg = 'http://cc.bjtu.edu.cn:81/meol/styles/newstyle/course/new06/body_bg.jpg';
    let upldIconList = ['🕒','⚡','✅','🕒','⌛','🔒','✅']; // 所有icon统一管理
    let infoIconList = ['🔄','⚠','🚫','🕒','⌛','🔒','✅'];
    let fileTypeIconList = ['📄','⛺','📚','🎬','📝','📜'];
 
    // 动效
    $('#inputDiv').mouseenter(function (){$('#inputDiv').css({'background-color': '#aad63d'});$('#textShow').css('color','#ffffff')});
    $('#inputDiv').mouseleave(function (){$('#inputDiv').css({'background-color': '#c6f062'});$('#textShow').css('color','#424d55')});
    $('tr[class=even]').mouseenter(function (){$(this).attr('class','even over');});
 
    function appendObjects(filelist){
        // 缓存区更新前DOM操作
        $('#filenames, #buttonDiv, #fileInfo').show();
        $('#filenames, #buttonDiv').empty(); // 清空缓存区
        $('#inputDiv').hide(); // 隐藏上传框
        let sizeType = getSizeType(filelist);
        let nameType = getNameType(filelist);
        let fileType = getFileType(filelist);
        for(let i=0;i<filelist.length;i++){
            let item = {};
            item.file = filelist[i];
            item.sizeType = sizeType[i];
            item.initName = item.file.name;
            item.showName = nameType[i];
            item.fileTypeIcon = fileType[i].icon;
            item.fileTypeInfo = fileType[i].info;
            let fileObject = '<div class="fileObjects" id="fileTh'+i+'"style="cursor:default; margin-top: 10px; margin-bottom: 10px; background-image: url('+processImg+'); background-repeat:no-repeat; background-size: 0%;"><a class="fileindex" id="fileindex'+i+'" title="'+item.fileTypeInfo+'" type="'+item.file.type+'" style="cursor:pointer; margin-left: 15px;">'+item.fileTypeIcon+'</a>&nbsp&nbsp|&nbsp&nbsp<a class="filename" id="filenameTH'+i+'" title="'+item.initName+'" data-clipboard-text="">'+item.showName+'<a class="fileSize">  ('+item.sizeType.size+item.sizeType.type+')</a>'+'</a><a class="uploadSpeed" id="speedTh'+i+'" title="上传速度"></a><a class="timeRemain" id="timeRemainTh'+i+'"></a></div>';
            $('#filenames').append(fileObject);
        }
        // 缓存区更新后DOM操作
        $('#buttonDiv').append(uploadBtn);
        $('#buttonDiv').append(emptyBtn);
        // 动效 (所有Object都已插入完毕)
        $('.fileObjects').mouseenter(function (){
            // 1.变背景色 2.文字加粗 3.展示全名
            let prevBgc = $(this).css('background-color');
            let prevName = $(this).find('.filename').html();
            $(this).css('background-color','#e7e8e0');
            $(this).find('.filename').css('font-weight','bold');
            $('.fileObjects').mouseleave(function (){
                $(this).css('background-color',prevBgc);
                $(this).find('.filename').css('font-weight','');
                $(this).find('.filename').html(prevName);
            });
            if(onUpload==1&&index==$(this).attr('id').split('fileTh')[1]){
                // 文件已经开始上传且this为正在上传的文件, 此后的命令将不被执行
                return
            }
            $(this).find('.filename').html($(this).find('.filename').attr('title'));
        });
 
        $('.fileindex').mouseenter(function (){
            if(onUpload==1||$(this).attr('title')=='[已上传]'){
                // 上传进程已开始/已经上传完 屏蔽按钮
                return
            }
            let iconNow = $(this).html();
            let titleNow = $(this).attr('title');
            $(this).html('❌');
            $(this).attr('title','删除');
            $('.fileindex').mouseleave(function (){
                if(onUpload==1||$(this).attr('title')=='[已上传]'){
                    return
                }
                $(this).html(iconNow);
                $(this).attr('title',titleNow);
            });
        });
    }
 
    let flag = 0;
    let filelist = [];
 
    // 文件选择前事件监听
    $('#inputDiv').click(function (){$('#currentFile').trigger('click');});
    $('#currentFile').change(function (){
        flag = 0;
        filelist = []; // 先执行清空 再push
        fileChangedByInput();
    });
 
    function fileChangedByInput(){
        if(flag==0){
            let filelistTMP = {};
            for(let i=0;i<$('#currentFile')[0].files.length;i++){
                filelistTMP = $('#currentFile')[0].files[i];
                filelist.push(filelistTMP);
                filelistTMP = {};
            }
        }
        // 缓存区更新
        appendObjects(filelist);
 
        // 文件更新后事件监听
        $('#emptyTrigger').click(function (){$('#currentFile').val('');$('#filenames, #buttonDiv').empty();$('#inputDiv').show();isAbort=1;onUpload=0;filelist=[];$('#filenames, #buttonDiv, #fileInfo').hide();});
        $('.fileindex').click(function (){
            if(onUpload==1||$(this).attr('title')=='[已上传]'){
                // 上传进程已开始/已经上传完 屏蔽按钮
                return
            }
            let th = $(this).attr('id').split('fileindex')[1];
            filelist.splice(th,1);
            // 缓存区更新
            appendObjects(filelist);
            flag = 1; // 执行change前，flag置1，不重新读文件
            fileChangedByInput();
            flag = 0; // 执行change后，flag置0，为下次重新读文件做准备
            if(filelist.length==0){
                // 点击的文件是最后一个文件，则直接执行清空
                $('#emptyTrigger').trigger('click');
            }
        })
 
        // 上传按钮的监听要放在change中: change后才有#uploadtrigger
        $('#uploadTrigger').click(function (){
            $('#uploadTrigger').hide();
            if(onUpload==1){
                // 上传进程开始，屏蔽按钮
                return
            }
            // 处理文件缓存区
            isAbort = 0; // 按上传之前按过清空，将isAbort置回0
            sendFileMsg();
            function sendFileMsg(){
                if(index >= filelist.length){
                    // 递归结束
                    $('#currentFile').val(''); // <input>文件清空
                    index = 0; // 递归条件置零
                    onUpload = 0; // 上传开始标志位置0
                    return // 结束递归
                }
 
                let formData = new FormData();
                formData.append('Filename', filelist[index].name);
                formData.append('Filedata', filelist[index]);
 
                let xReq = new XMLHttpRequest();
                xReq.open('POST','http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload');
                xReq.addEventListener("load", onSuccess);
                xReq.addEventListener("error", onError);
                xReq.upload.onloadstart = onStart;
                xReq.upload.onprogress = onProgress;
                xReq.upload.onabort = onAbort;
                xReq.send(formData);
 
                function onStart(){
                    onUpload = 1; // 上传标志位置1
                    ot = new Date().getTime(); // 设置上传开始时间,用以计算时间速度
                    oloaded = 0; // 设置上传开始时，已上传的文件大小为0
                    // 上传开始，缓存区加入竖线
                    // $('#speedTh'+index).prepend('&nbsp; | &nbsp;');
                    if(filelist[index].size>52428800){
                        // 大于50M文件 插入timeremain竖线
                        $('#timeRemainTh'+index).before('&nbsp; | &nbsp;');
                    }
                }
 
                function onProgress(evt){
                    if(isAbort==1){
                        xReq.abort(); // 上传过程中随时检查，终止请求
                    }
                    // 进度计算
                    let percentage;
                    percentage = (evt.loaded * 100 / evt.total).toFixed(0);
 
                    // 速度计算
                    let nt = new Date().getTime(); // 获取当前时间
                    let perTime = (nt-ot)/1000; // 计算出上次调用该方法时到现在的时间差，单位为s
                    ot = new Date().getTime(); //重新赋值，用以下次计算
                    let perLoad = evt.loaded - oloaded; // 计算该分段上传的文件大小，单位b
                    oloaded = evt.loaded; // 重新赋值，用以下次计算
                    let speed = perLoad/perTime; // 单位 B/s
                    let bspeed = speed;
                    let Sunits = 'B/s';
                    if(speed/1024>1){
                        speed = speed/1024;
                        Sunits = 'KB/s'
                    }
                    if(speed/1024>1){
                        speed = speed/1024;
                        Sunits = 'MB/s';
                    }
                    speed = speed.toFixed(1);
 
                    // 时间计算 文件>50MB触发
                    if(evt.total>52428800){
                        let restTime = ((evt.total-evt.loaded)/bspeed).toFixed(0);
                        // 实时更新文件缓存区
                        $('#timeRemainTh'+index).html(upldIconList[0]+restTime+'s');
                        $('#timeRemainTh'+index).attr('title','剩余时间');
                    }
 
                    // 实时更新文件缓存区
                    $('#fileTh'+index).css('background-size',percentage+'%');
                    $('#speedTh'+index).html('&nbsp; | &nbsp;'+upldIconList[1]+speed+Sunits);
                }
 
                function onAbort(){
                    isAbort = 0; // 终止条件置零
                    index = 0; // 请求终止后index也必须归零，因为中止未完成递归，若中止文件index>0则第二次上传请求无法发起
                    onUpload = 0; // 上传标志位置0
                }
 
                function onSuccess(){
                    // 插入编辑器操作
                    let myiframe = document.getElementsByTagName('iframe')[1].contentDocument;
                    let textArea = myiframe.getElementsByClassName('cke_show_borders');
                    let constructor = '<p><a data-cke-saved-href="/meol/'+this.responseText+'" href="/meol/'+this.responseText+'">'+filelist[index].name+'</a></p>';
                    $(textArea).append(constructor);
 
                    // 处理缓存区操作
                    let clipboard = new ClipboardJS('#filenameTH'+index); // 要用id做索引 否则会重复调用.on 但在清空后重新上传还是会重复调用T.T
                    let fileURL = 'http://cc.bjtu.edu.cn:81/meol/'+this.responseText;
 
                    $('#filenameTH'+index).attr("data-clipboard-text",fileURL);
                    $('#filenameTH'+index).css('cursor','pointer');
                    $('#fileindex'+index).html('<a>'+upldIconList[2]+'</a>')
                    $('#fileindex'+index).attr('title', '[已上传]')
                    $('#speedTh'+index).html('');
                    $('#timeRemainTh'+index).remove();
                    $('#fileTh'+index).css('background','#ffffff');
                    $('#fileTh'+index).css('font-color','#e7e8e0');
 
                    clipboard.on('success', function(evt) {
                        alert('【'+$(evt.trigger).text()+'】文件链接已复制到剪切板')
                        evt.clearSelection();
                    });
 
                    // 递归操作
                    index++;
                    sendFileMsg();
                }
                function onError(){
                    alert('Failed');
                }
            }
        })
    }
 
    function getSizeType(filelist){
        let RtnsizeType = [];
        for(let item of filelist){
            let sizeTypeTMP = {};
            if(item.size<1024){
                sizeTypeTMP.size = (item.size).toFixed(2);
                sizeTypeTMP.type = 'B';
            }
            else if(item.size>1024&&item.size<1048576){
                sizeTypeTMP.size = (item.size/1024).toFixed(2);
                sizeTypeTMP.type = 'KB';
            }
            else if(item.size>1048576&&item.size<1073741824){
                sizeTypeTMP.size = (item.size/1048576).toFixed(2);
                sizeTypeTMP.type = 'MB';
            }
            else if(item.size>1073741824){
                alert('你选择了大于1GB的文件，服务器存储资源有限，建议选择其他传输方式。');
                sizeTypeTMP.size = (item.size/1073741824).toFixed(2);
                sizeTypeTMP.type = 'GB';
            }
            RtnsizeType.push(sizeTypeTMP);
        }
        return RtnsizeType;
    }
 
    function getNameType(filelist){
        // 文件名显示长度限制
        let nameType = [];
        let limit;
        for(let item of filelist){
            let splitName = item.name.split('.'); // 预防文件名中含.的情况
            let newName = splitName[0];
            for(let i=1;i<splitName.length-1;i++){
                newName = newName + '.' + splitName[i];
            }
            limit = isChina(newName); // 即时生成limit限制
            if(newName.length>limit){ // 有后缀超长文件
                newName = newName.slice(0,limit) + '... .'+ splitName.pop();
            }
            else if(newName.length==0){ // 无后缀文件
                newName = splitName[0];
            }
            else { // 默认去掉了后缀 把后缀加回来
                newName = newName +'.'+ splitName.pop();
            }
            nameType.push(newName);
        }
 
        function isChina(str){
            if (escape(str).indexOf("%u")<0){
                return 35; // 不包含中文
            } else {
                return 18; // 包含中文
            }
        }
        return nameType;
    }
 
    function getFileType(filelist){
        // 文件图标类型
        let fileType = [];
        for(let item of filelist){
            let fileTypeTMP = {};
            if(item.type.indexOf('image')!=-1){
                fileTypeTMP.icon = fileTypeIconList[1];
                fileTypeTMP.info = '[图像]';
            }
            else if(item.type.indexOf('zip')!=-1){
                fileTypeTMP.icon = fileTypeIconList[2];
                fileTypeTMP.info = '[压缩文件]';
            }
            else if(item.type.indexOf('video')!=-1){
                fileTypeTMP.icon = fileTypeIconList[3];
                fileTypeTMP.info = '[视频]';
            }
            else if(item.type.indexOf('officedocument')!=-1){
                fileTypeTMP.icon = fileTypeIconList[4];
                fileTypeTMP.info = '[文档]';
            }
            else if(item.type.indexOf('pdf')!=-1){
                fileTypeTMP.icon = fileTypeIconList[5];
                fileTypeTMP.info = '[文档]';
            }
            else {
                fileTypeTMP.icon = fileTypeIconList[0];
                fileTypeTMP.info = '[文件]';
            }
            fileType.push(fileTypeTMP);
        }
        return fileType;
    }
 
    function judgeOnceInPage(){
        if($("script:contains('该作业不允许重复提交,确定提交作业吗？')").length!=0){
            let newspan = '<span>（只能提交一次）</span>';
            $('span:contains("查看作业任务")').after(newspan);
            alert("注意，此作业只能提交一次，请检查无误后再提交！");
            return 1;
        }
        else return 0;
    }
 
    function getInfoList(){
        let initInfoList = $('.infolist');
        let initSubmits = $('.enter');
        let infoList = [];
        for(let i=0;i<initInfoList.length;i++){
            let infoTMP = {};
            infoTMP.id = initInfoList[i].getAttribute('href').split('=')[1];
            infoTMP.name = initInfoList[i].innerText;
            for(let j=0;j<initSubmits.length;j++){
                infoTMP.able = (initSubmits[j].getAttribute('href').split('=')[1]==infoTMP.id);
                if(infoTMP.able) break;
            }
            infoList.push(infoTMP);
            appendOnceInfo(infoTMP.id);
            appendSubmitInfo(infoTMP.id);
 
            function appendOnceInfo(hwtid){
                if(!infoTMP.able){ // 过期作业，不发请求
                    return
                }
                let url = 'http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid='+hwtid;
                let data = 'hwtid='+hwtid;
                let xReq = new XMLHttpRequest();
                xReq.open('GET',url,false); // 注意，此处请求应当为同步请求 否则调用this拿到的数据是undefined
                xReq.addEventListener("load", onSuccess);
                xReq.send(data);
                function onSuccess(){
                    let myResponse = this.responseText; // 检查是否只能提交一次
                    if(myResponse.indexOf('该作业不允许重复提交,确定提交作业吗？')!=-1){
                        let attentionIcon = '<a class="attentionIcon" title="此作业只允许提交一次" style="cursor:default;">'+infoIconList[5]+'</a>'
                        $(".infolist[href='hwtask.view.jsp?hwtid="+infoTMP.id+"']").before(attentionIcon);
                    }
                    else {
                        let attentionIcon = '<a class="attentionIcon" title="此作业允许重复提交" style="cursor:default;">'+infoIconList[3]+'</a>'
                        $(".infolist[href='hwtask.view.jsp?hwtid="+infoTMP.id+"']").before(attentionIcon);
                    }
                }
            }
 
            function appendSubmitInfo(hwtid){
                if(!infoTMP.able){ // 过期作业，不发请求
                    return
                }
                let url = 'http://cc.bjtu.edu.cn:81/meol/common/hw/student/taskanswer.jsp?hwtid='+hwtid;
                let data = 'hwtid='+hwtid;
                let xReq = new XMLHttpRequest();
                xReq.responseType = "document";
                xReq.open('GET',url); // 此处请求应当为异步请求 用以接收text/html数据
                xReq.addEventListener("load", onSuccess);
                xReq.send(data);
                function onSuccess(){ // 检查是否已经提交
                    let myResponse = this.responseXML;
                    let iptArea = $(myResponse).find("tr:contains('回答的内容')+tr>td>input");
                    if(iptArea.length<=0){
                        let submitIcon = '<a class="submitIcon" title="作业未提交" style="cursor:default;">'+infoIconList[4]+'</a>'
                        $(".infolist[href='hwtask.view.jsp?hwtid="+infoTMP.id+"']").before(submitIcon);
                    }
                    else{
                        let submitIcon = '<a class="submitIcon" title="作业已提交" style="cursor:default;">'+infoIconList[6]+'</a>'
                        $(".infolist[href='hwtask.view.jsp?hwtid="+infoTMP.id+"']").before(submitIcon);
                    }
                }
            }
        }
        return infoList;
    }
 
    function dateString2Object(dateString, toFormatted){
        let year = dateString.split('年')[0];
        dateString = dateString.split('年')[1];
        let month = dateString.split('月')[0];
        dateString = dateString.split('月')[1];
        let day = dateString.split('日')[0];
        dateString = dateString.split('日')[1];
        // 当天23:59:59为作业提交截止日期
        let rtnDate = new Date(year,month,day,23,59,59);
        if(toFormatted==1) return (year+'-'+month+'-'+day);
        else return new Date(year,month-1,day,23,59,59);
    }
 
    function getReminder(){
        if(location.href.indexOf('main.jsp')>=0||location.href.indexOf('welcomepage/student/index.jsp')==-1){
            // 只发welcome页的一次请求，在main或不在welcome都返回
            return
        }
        let url = 'http://cc.bjtu.edu.cn:81/meol/welcomepage/student/interaction_reminder.jsp?';
        let xReq = new XMLHttpRequest();
        xReq.responseType = "document";
        xReq.open('GET',url,true); // 注意，此处请求应当为异步请求 用以接收text/html数据
        xReq.addEventListener("load", onSuccess);
        xReq.send();
        function onSuccess(){
            let reminderList = $(this.responseXML).find("li:contains('门课程有待提交作业')").find('ul>li');
            let courseTable = document.getElementsByClassName('courseList');
            let courseIdList = [];
            for(let i=0;i<reminderList.length;i++){
                // 1.主界面reminder标红 2.提取标红课程ID->courseIdList
                let nowID = $(reminderList[i]).find('a').attr('href').split('lid=')[1].split('&t=hw')[0];
                let nowCourse = $(courseTable).find("a[href*='"+nowID+"']");
                $(nowCourse).css('color','#C00');
                courseIdList.push($(reminderList[i]).find('a').attr('href').split('lid=')[1].split('&t=hw')[0]);
            }
            let noteList = document.getElementsByClassName('notelist');
            $(noteList).find('.list>ul').hide();
            $(noteList).find('.more>a').hide();
            $(noteList).find('.list').append('<ul class="now"></ul>');
            $(noteList).find('.list').append('<h4 class="loading">作业列表加载中...</h4>');
            $(noteList).find('.more').prepend('<a class="scheduleToggleBtn" title="查看作业" style="font-weight: bold; cursor: pointer"><<查看作业&nbsp;&nbsp;</a>');
            $(noteList).find('.more').prepend('<a class="noticeToggleBtn" title="查看通知" style="font-weight: bold; cursor: pointer">查看通知>></a>');
            $(noteList).find('.more').prepend('<a class="sortToggleBtn" title="按课程/时间排序" style="font-weight: bold; cursor: pointer" sortStatus="0">#️⃣&nbsp;&nbsp;</a>');
            $(noteList).find('.list').css({ "overflow": "auto", "height": "150px"});
            $(noteList).find(".list>ul[class='now']").css("padding-bottom", "35px");
            $(noteList).find('.scheduleToggleBtn').hide();
            $(noteList).find('.noticeToggleBtn').click(function (){$(noteList).find('.list>ul').toggle();$(noteList).find('.more>a').toggle();});
            $(noteList).find('.scheduleToggleBtn').click(function (){$(noteList).find('.list>ul').toggle();$(noteList).find('.more>a').toggle();});
            courseIdList.forEach(function (courseID) {
                // 1.访问课程页 onSuccess() => 2.访问当前课程作业界面 onSuccess() => 3.整理作业信息
                let thisURL = 'http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId='+courseID;
                let thisXReq = new XMLHttpRequest();
                let thisData = 'courseId='+courseID;
                thisXReq.open('GET',thisURL,false); // 此步须同步，否则只能取到[-1]的信息
                thisXReq.addEventListener("load", onSuccess);
                thisXReq.send(thisData); // 1.访问课程页
                function onSuccess(){
                    let courseName = this.responseText.split('<title>网络课程—')[1].split('</title>')[0].trim();
                    let baseURL = 'http://cc.bjtu.edu.cn:81/meol/common/hw/student/hwtask.jsp'
                    let baseXReq = new XMLHttpRequest();
                    baseXReq.responseType = 'document';
                    baseXReq.open('GET',baseURL);
                    baseXReq.send(); // 2.访问当前课程作业界面
                    baseXReq.addEventListener("load", onSuccess);
                    function onSuccess(){ // 3.整理作业信息
                        $(noteList).find(".list>h4[class='loading']").remove(); // 移除加载loading信息
                        let myResponse = this.responseXML;
                        let initInfoList = $(myResponse).find('.infolist');
                        let initSubmits = $(myResponse).find('.enter');
                        let initDate = $(myResponse).find("td[class!='align_c']+td");
                        let infoList = [];
                        for(let i=0;i<initInfoList.length;i++) {
                            let infoTMP = {};
                            let dateString = initDate[i].innerText.split('\n')[0];
                            infoTMP.courseID = courseID;
                            infoTMP.courseName = courseName;
                            infoTMP.hwtID = initInfoList[i].getAttribute('href').split('=')[1];
                            infoTMP.hwtName = initInfoList[i].innerText.split('\n')[0];
                            infoTMP.dateStr = dateString;
                            infoTMP.dateObj = dateString2Object(dateString);
                            infoTMP.dateStrF = dateString2Object(dateString, 1);
                            for (let j=0;j<initSubmits.length;j++){
                                infoTMP.able = (initSubmits[j].getAttribute('href').split('=')[1] == infoTMP.hwtID);
                                if (infoTMP.able) break;
                            }
                            infoList.push(infoTMP);
                        }
                        infoList.sort(function (a, b){
                            return new Date(a.dateObj) - new Date(b.dateObj) // 排序
                        })
                        let infoListToShow = infoList.filter(function(value){ // 只显示截止日期近一周的作业
                            return value.dateObj.valueOf()>new Date().valueOf() && (value.dateObj.valueOf()-new Date().valueOf())<1296000000;
                        })
                        for(let value of infoListToShow){
                            $(noteList).find(".list>ul[class='now']").append('<li courseID="'+value.courseID+'"><a href="http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid='+value.hwtID+'" type="hwt" title="'+value.hwtName+'" target="_blank">'+value.hwtName+'</a><a href="http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId='+value.courseID+'" target="_blank" type="course" style="background: none;">['+value.courseName+']</a><span class="date">'+value.dateStrF+'</span></li>')
                        }
                        if(courseIdList.indexOf(courseID)+1==courseIdList.length){
                            // 此次遍历为最后一次
                            // 1.添加链接预访问事件监听
                            $(noteList).find(".list>ul[class='now']>li").mouseenter(function (){
                                let ulID = $(this).attr('courseID');
                                let ulURL = 'http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId='+ulID;
                                let ulXReq = new XMLHttpRequest();
                                let ulData = 'courseId='+ulID;
                                ulXReq.open('GET',ulURL,true);
                                ulXReq.addEventListener("load", onSuccess);
                                ulXReq.send(ulData);
                                function onSuccess(){
                                    return
                                }
                            })
                            // 2.标红加粗插入时间提示
                            let hwtList = $(noteList).find(".list>ul[class='now']>li>a[type='hwt']");
                            let dateSpan = $(noteList).find(".list>ul[class='now']>li>span");
                            for(let i=0;i<dateSpan.length;i++){
                                let item = $(hwtList[i]);
                                let itemTime = dateSpan[i].innerText.split('-');
                                let thisStamp = new Date(itemTime[0],itemTime[1]-1,itemTime[2],23,59,59).valueOf();
                                let nowStamp = new Date().valueOf();
                                let diffStamp = thisStamp - nowStamp;
                                if(diffStamp<86400000){
                                    $(item).html('[今天截止]&nbsp;&nbsp;'+$(item).html()); // 小于24小时，当日截止
                                    $(item).parent().attr('remaintime','0');
                                }
                                else{
                                    $(item).html('[还有'+parseInt(diffStamp/(1000*60*60*24))+'天截止]&nbsp;'+$(item).html());
                                    $(item).parent().attr('remaintime',parseInt(diffStamp/(1000*60*60*24)));
                                }
                                if(parseInt(diffStamp/(1000*60*60*24))<=3){ // 时间戳差值小于三天则标红且加粗(ms)
                                    $(item).attr('class','top');
                                    $(item).next().attr('class','top');
                                    $(item).css('font-weight','bold');
                                    $(item).next().css('font-weight','bold');
                                }
                            }
                            // 3.添加排序事件监听 默认按剩余时间排序
                            $('.sortToggleBtn').click(function (){
                                let liList = $(noteList).find(".list>ul[class='now']>li");
                                if($(this).attr('sortstatus')==0){ // 按课程名排序
                                    let courses = liList.map(function (){
                                        return $(this).attr('courseid')
                                    })
                                    sortDOM(liList, courses, 'courseid');
                                    $(this).attr('sortstatus','1');
                                }
                                else if($(this).attr('sortstatus')==1){ // 按截止日期排序
                                    let remaintimes = liList.map(function (){
                                        return $(this).attr('remaintime')
                                    })
                                    sortDOM(liList, remaintimes, 'remaintime');
                                    $(this).attr('sortstatus','0');
                                }
                            })
                            function sortDOM(liList, sortBy, sortName){
                                sortBy.sort(function (a,b){
                                    return a-b;
                                })
                                for(let i=0;i<sortBy.length;i++){
                                    let value = sortBy[i];
                                    for(let i=0;i<liList.length;i++){
                                        let item = liList[i];
                                        if($(item).attr(sortName)==value){
                                            $(noteList).find(".list>ul[class='now']").append(item);
                                        }
                                    }
                                }
                            }
                            let liList = $(noteList).find(".list>ul[class='now']>li");
                            let remaintimes = liList.map(function (){
                                return $(this).attr('remaintime')
                            })
                            sortDOM(liList, remaintimes, 'remaintime'); // 默认按时间排序
                        }
                    }
                }
            })
        }
    }
 
    function getResources(){
        // TODO: 批量下载课程资源功能
        if(location.href.indexOf('listview.jsp?')==-1){
            return
        }
        let fileLinks = [];
        for(let i=0;i<$('tbody>tr').length;i++){
            let href = $($('tbody>tr')[i]).find('td>a').attr('href');
            if(href&&href.indexOf('listview.jsp?')!=0){
                fileLinks.push('http://cc.bjtu.edu.cn:81/meol/common/script/download.jsp'+$($('tbody>tr')[i]).find('td>a').attr('href').split('download_preview.jsp')[1])
            }
        }
    }
 
    // 页面加载完毕执行函数
    window.onload = function () {
        if($("span:contains('查看作业任务')").length==0){
            // 判断是否在作业页面
            return
        }
        let oBox = document.getElementById('inputDiv');
        let timer = null;
        document.ondragover = function(){
            clearTimeout(timer);
            timer = setTimeout(function(){
                // 文件放下后执行操作
                $('#p1').html('📁文件上传📝');
                $('#inputDiv').css('background-color','#c6f062');$('#textShow').css('color','#424d55');
            },200);
        };
        // 进入子集的时候 会触发ondragover 频繁触发 不给ondrop机会
        oBox.ondragover = function(){
            return false;
        };
        oBox.ondragleave = function(){
            $('#p1').html('📌请将文件拖拽到此区域');
            $('#inputDiv').css('background-color','#aad63d');$('#textShow').css('color','#ffffff');
        };
        oBox.ondrop = function(ev){
            $('#currentFile')[0].files = ev.dataTransfer.files;
            fileChangedByInput();
            return false;
        };
    };
 
    // 列表信息增强与单词提交判断函数触发
    judgeOnceInPage();
    getInfoList();
    getReminder();
})();