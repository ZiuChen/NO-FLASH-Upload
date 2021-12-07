function dateString2Object(dateString, toFormatted) {
    let year = dateString.split('年')[0];
    dateString = dateString.split('年')[1];
    let month = dateString.split('月')[0];
    dateString = dateString.split('月')[1];
    let day = dateString.split('日')[0];
    dateString = dateString.split('日')[1];
    // 当天23:59:59为作业提交截止日期
    let rtnDate = new Date(year, month, day, 23, 59, 59);
    if (toFormatted == 1) return (year + '-' + month + '-' + day);
    else return new Date(year, month - 1, day, 23, 59, 59);
}

function getReminder() {
    // 由于iframe结构的网页会多次发送请求 避免每次请求都触发一次getReminder()
    // appendFlag不可取：访问其他页面也会发送多余请求
    if (location.href.indexOf('welcomepage/student/index.jsp') == -1) {
        // 只发welcome页的一次请求
        return
    }
    let url = 'http://cc.bjtu.edu.cn:81/meol/welcomepage/student/interaction_reminder.jsp?';
    let xReq = new XMLHttpRequest();
    xReq.responseType = "document";
    xReq.open('GET', url, true); // 注意，此处请求应当为异步请求 用以接收text/html数据
    xReq.addEventListener("load", onSuccess);
    xReq.send();

    function onSuccess() {
        let reminderList = $(this.responseXML).find("li:contains('门课程有待提交作业')").find('ul>li');
        let courseTable = document.getElementsByClassName('courseList');
        let courseIdList = [];
        for (let i = 0; i < reminderList.length; i++) {
            // 1.主界面reminder标红 2.提取标红课程ID->courseIdList
            let nowID = $(reminderList[i]).find('a').attr('href').split('lid=')[1].split('&t=hw')[0];
            let nowCourse = $(courseTable).find("a[href*='" + nowID + "']");
            $(nowCourse).css('color', '#C00');
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
        $(noteList).find('.list').css({ "overflow": "auto", "height": "150px" });
        $(noteList).find(".list>ul[class='now']").css("padding-bottom", "35px");
        $(noteList).find('.scheduleToggleBtn').hide();
        $(noteList).find('.noticeToggleBtn').click(function() {
            $(noteList).find('.list>ul').toggle();
            $(noteList).find('.more>a').toggle();
        });
        $(noteList).find('.scheduleToggleBtn').click(function() {
            $(noteList).find('.list>ul').toggle();
            $(noteList).find('.more>a').toggle();
        });
        courseIdList.forEach(function(courseID) {
            // 1.访问课程页 onSuccess() => 2.访问当前课程作业界面 onSuccess() => 3.整理作业信息
            let thisURL = 'http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=' + courseID;
            let thisXReq = new XMLHttpRequest();
            let thisData = 'courseId=' + courseID;
            thisXReq.open('GET', thisURL, false); // 此步须同步，否则只能取到[-1]的信息
            thisXReq.addEventListener("load", onSuccess);
            thisXReq.send(thisData); // 1.访问课程页
            function onSuccess() {
                let courseName = this.responseText.split('<title>网络课程—')[1].split('</title>')[0].trim();
                let baseURL = 'http://cc.bjtu.edu.cn:81/meol/common/hw/student/hwtask.jsp'
                let baseXReq = new XMLHttpRequest();
                baseXReq.responseType = 'document';
                baseXReq.open('GET', baseURL);
                baseXReq.send(); // 2.访问当前课程作业界面
                baseXReq.addEventListener("load", onSuccess);

                function onSuccess() { // 3.整理作业信息
                    $(noteList).find(".list>h4[class='loading']").remove(); // 移除加载loading信息
                    let myResponse = this.responseXML;
                    let initInfoList = $(myResponse).find('.infolist');
                    let initSubmits = $(myResponse).find('.enter');
                    let initDate = $(myResponse).find("td[class!='align_c']+td");
                    let infoList = [];
                    for (let i = 0; i < initInfoList.length; i++) {
                        let infoTMP = {};
                        let dateString = initDate[i].innerText.split('\n')[0];
                        infoTMP.courseID = courseID;
                        infoTMP.courseName = courseName;
                        infoTMP.hwtID = initInfoList[i].getAttribute('href').split('=')[1];
                        infoTMP.hwtName = initInfoList[i].innerText.split('\n')[0];
                        infoTMP.dateStr = dateString;
                        infoTMP.dateObj = dateString2Object(dateString);
                        infoTMP.dateStrF = dateString2Object(dateString, 1);
                        for (let j = 0; j < initSubmits.length; j++) {
                            infoTMP.able = (initSubmits[j].getAttribute('href').split('=')[1] == infoTMP.hwtID);
                            if (infoTMP.able) break;
                        }
                        infoList.push(infoTMP);
                    }
                    infoList.sort(function(a, b) {
                        return new Date(a.dateObj) - new Date(b.dateObj) // 排序
                    })
                    let infoListToShow = infoList.filter(function(value) { // 只显示截止日期近一周的作业
                        return value.dateObj.valueOf() > new Date().valueOf() && (value.dateObj.valueOf() - new Date().valueOf()) < 1296000000;
                    })
                    for (let value of infoListToShow) {
                        $(noteList).find(".list>ul[class='now']").append('<li courseID="' + value.courseID + '"><a href="http://cc.bjtu.edu.cn:81/meol/common/hw/student/write.jsp?hwtid=' + value.hwtID + '" type="hwt" title="' + value.hwtName + '" target="_blank">' + value.hwtName + '</a><a href="http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=' + value.courseID + '" target="_blank" type="course" style="background: none;">[' + value.courseName + ']</a><span class="date">' + value.dateStrF + '</span></li>')
                    }
                    if (courseIdList.indexOf(courseID) + 1 == courseIdList.length) {
                        // 此次遍历为最后一次
                        // 1.添加链接预访问事件监听
                        $(noteList).find(".list>ul[class='now']>li").mouseenter(function() {
                                let ulID = $(this).attr('courseID');
                                let ulURL = 'http://cc.bjtu.edu.cn:81/meol/jpk/course/layout/newpage/index.jsp?courseId=' + ulID;
                                let ulXReq = new XMLHttpRequest();
                                let ulData = 'courseId=' + ulID;
                                ulXReq.open('GET', ulURL, true);
                                ulXReq.addEventListener("load", onSuccess);
                                ulXReq.send(ulData);

                                function onSuccess() {
                                    return
                                }
                            })
                            // 2.标红加粗插入时间提示
                        let hwtList = $(noteList).find(".list>ul[class='now']>li>a[type='hwt']");
                        let dateSpan = $(noteList).find(".list>ul[class='now']>li>span");
                        for (let i = 0; i < dateSpan.length; i++) {
                            let item = $(hwtList[i]);
                            let itemTime = dateSpan[i].innerText.split('-');
                            let thisStamp = new Date(itemTime[0], itemTime[1] - 1, itemTime[2], 23, 59, 59).valueOf();
                            let nowStamp = new Date().valueOf();
                            let diffStamp = thisStamp - nowStamp;
                            if (diffStamp < 86400000) {
                                $(item).html('[今天截止]&nbsp;&nbsp;' + $(item).html()); // 小于24小时，当日截止
                                $(item).parent().attr('remaintime', '0');
                            } else {
                                $(item).html('[还有' + parseInt(diffStamp / (1000 * 60 * 60 * 24)) + '天截止]&nbsp;' + $(item).html());
                                $(item).parent().attr('remaintime', parseInt(diffStamp / (1000 * 60 * 60 * 24)));
                            }
                            if (parseInt(diffStamp / (1000 * 60 * 60 * 24)) <= 3) { // 时间戳差值小于三天则标红且加粗(ms)
                                $(item).attr('class', 'top');
                                $(item).next().attr('class', 'top');
                                $(item).css('font-weight', 'bold');
                                $(item).next().css('font-weight', 'bold');
                            }
                        }
                        // 3.添加排序事件监听 默认按剩余时间排序
                        $('.sortToggleBtn').click(function() {
                            let liList = $(noteList).find(".list>ul[class='now']>li");
                            if ($(this).attr('sortstatus') == 0) { // 按课程名排序
                                let courses = liList.map(function() {
                                    return $(this).attr('courseid')
                                })
                                sortDOM(liList, courses, 'courseid');
                                $(this).attr('sortstatus', '1');
                            } else if ($(this).attr('sortstatus') == 1) { // 按截止日期排序
                                let remaintimes = liList.map(function() {
                                    return $(this).attr('remaintime')
                                })
                                sortDOM(liList, remaintimes, 'remaintime');
                                $(this).attr('sortstatus', '0');
                            }
                        })

                        function sortDOM(liList, sortBy, sortName) {
                            sortBy.sort(function(a, b) {
                                return a - b;
                            })
                            for (let i = 0; i < sortBy.length; i++) {
                                let value = sortBy[i];
                                for (let i = 0; i < liList.length; i++) {
                                    let item = liList[i];
                                    if ($(item).attr(sortName) == value) {
                                        $(noteList).find(".list>ul[class='now']").append(item);
                                    }
                                }
                            }
                        }
                        let liList = $(noteList).find(".list>ul[class='now']>li");
                        let remaintimes = liList.map(function() {
                            return $(this).attr('remaintime')
                        })
                        sortDOM(liList, remaintimes, 'remaintime'); // 默认按时间排序
                    }
                }
            }
        })
    }
}

export default getReminder