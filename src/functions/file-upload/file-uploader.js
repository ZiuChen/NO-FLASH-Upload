import uploadDoms from "./upload-doms";
import PopNotify from "../../js/PopNotify"
import uploadBoxCSS from "../../style/css/upload-doms.css";

function fileUploader() {
    if ($("span:contains('查看作业任务')").length == 0) {
        // 判断是否在作业页面
        return
    }
    $('.infotable>tbody>tr:contains("请输入你的答案")').after(uploadDoms.box);
    $('#filenames, #buttonDiv, #fileInfo').hide();
    // 全局变量
    let onUpload = 0;
    let index = 0;
    let isAbort = 0;
    let alreadyLoaded = 0;
    let startTime = 0;
    let flag = 0;
    let filelist = [];

    // 信息显示部分
    let processImg = 'http://cc.bjtu.edu.cn:81/meol/styles/newstyle/course/new06/body_bg.jpg';
    let upldIconList = ['🕒', '⚡', '✅', '🕒', '⌛', '🔒', '✅']; // 所有icon统一管理
    let fileTypeIconList = ['📄', '⛺', '📚', '🎬', '📝', '📜', '🎵'];

    // 动效
    $('#inputDiv').mouseenter(function() {
        $('#inputDiv').css({ 'background-color': '#aad63d' });
        $('#textShow').css('color', '#ffffff')
    });
    $('#inputDiv').mouseleave(function() {
        $('#inputDiv').css({ 'background-color': '#c6f062' });
        $('#textShow').css('color', '#424d55')
    });

    function appendObjects(filelist) {
        // 缓存区更新前DOM操作
        $('#filenames, #buttonDiv, #fileInfo').show();
        $('#filenames, #buttonDiv').empty(); // 清空缓存区
        $('#inputDiv').hide(); // 隐藏上传框
        let sizeType = getSizeType(filelist);
        let nameType = getNameType(filelist);
        let fileType = getFileType(filelist);
        for (let i = 0; i < filelist.length; i++) {
            let item = {};
            item.file = filelist[i];
            item.sizeType = sizeType[i];
            item.initName = item.file.name;
            item.showName = nameType[i];
            item.fileTypeIcon = fileType[i].icon;
            item.fileTypeInfo = fileType[i].info;
            let fileObject = /*html*/`<div class="fileObjects" id="fileTh${i}"style="cursor:default; margin-top: 10px; margin-bottom: 10px; background-image: url(${processImg}); background-repeat:no-repeat; background-size: 0%;"><a class="fileindex" id="fileindex${i}" title="${item.fileTypeInfo}" type="${item.file.type}" style="cursor:pointer; margin-left: 15px;">${item.fileTypeIcon}</a>&nbsp&nbsp|&nbsp&nbsp<a class="filename" id="filenameTH${{i}}" title="${item.initName}" data-clipboard-text="">${item.showName}<a class="fileSize">  (${item.sizeType.size}${item.sizeType.type})</a></a><a class="uploadSpeed" id="speedTh${i}" title="上传速度"></a><a class="timeRemain" id="timeRemainTh${i}"></a></div>`;
            $('#filenames').append(fileObject);
        }
        // 缓存区更新后DOM操作
        $('#buttonDiv').append(uploadDoms.uploadBtn);
        $('#buttonDiv').append(uploadDoms.emptyBtn);
        // 动效 (所有Object都已插入完毕)
        $('.fileObjects').mouseenter(function() {
            // 1.变背景色 2.文字加粗 3.展示全名
            let prevBgc = $(this).css('background-color');
            let prevName = $(this).find('.filename').html();
            $(this).css('background-color', '#e7e8e0');
            $(this).find('.filename').css('font-weight', 'bold');
            $('.fileObjects').mouseleave(function() {
                $(this).css('background-color', prevBgc);
                $(this).find('.filename').css('font-weight', '');
                $(this).find('.filename').html(prevName);
            });
            if (onUpload == 1 && index == $(this).attr('id').split('fileTh')[1]) {
                // 文件已经开始上传且this为正在上传的文件, 此后的命令将不被执行
                return
            }
            $(this).find('.filename').html($(this).find('.filename').attr('title'));
        });

        $('.fileindex').mouseenter(function() {
            if (onUpload == 1 || $(this).attr('title') == '[已上传]') {
                // 上传进程已开始/已经上传完 屏蔽按钮
                return
            }
            let iconNow = $(this).html();
            let titleNow = $(this).attr('title');
            $(this).html('❌');
            $(this).attr('title', '删除');
            $('.fileindex').mouseleave(function() {
                if (onUpload == 1 || $(this).attr('title') == '[已上传]') {
                    return
                }
                $(this).html(iconNow);
                $(this).attr('title', titleNow);
            });
        });
    }

    // 文件选择前事件监听
    $('#inputDiv').click(() => {
        $('#currentFile').trigger('click');
    });
    $('#currentFile').change(function() {
        flag = 0;
        filelist = []; // 先执行清空 再push
        fileChangedByInput();
    });

    function fileChangedByInput() {
        if (flag == 0) {
            let filelistTMP = {};
            for (let i = 0; i < $('#currentFile')[0].files.length; i++) {
                filelistTMP = $('#currentFile')[0].files[i];
                filelist.push(filelistTMP);
                filelistTMP = {};
            }
        }
        // 缓存区更新
        appendObjects(filelist);

        // 文件更新后事件监听
        $('#emptyTrigger').click(function() {
            $('#currentFile').val('');
            $('#filenames, #buttonDiv').empty();
            $('#inputDiv').show();
            isAbort = 1;
            onUpload = 0;
            filelist = [];
            $('#filenames, #buttonDiv, #fileInfo').hide();
        });
        $('.fileindex').click(function() {
            if (onUpload == 1 || $(this).attr('title') == '[已上传]') {
                // 上传进程已开始/已经上传完 屏蔽按钮
                return
            }
            let th = $(this).attr('id').split('fileindex')[1];
            filelist.splice(th, 1);
            // 缓存区更新
            appendObjects(filelist);
            flag = 1; // 执行change前，flag置1，不重新读文件
            fileChangedByInput();
            flag = 0; // 执行change后，flag置0，为下次重新读文件做准备
            if (filelist.length == 0) {
                // 点击的文件是最后一个文件，则直接执行清空
                $('#emptyTrigger').trigger('click');
            }
        })

        // 上传按钮的监听要放在change中: change后才有#uploadtrigger
        $('#uploadTrigger').click(function() {
            $('#uploadTrigger').hide();
            if (onUpload == 1) {
                // 上传进程开始，屏蔽按钮
                return
            }
            // 处理文件缓存区
            isAbort = 0; // 按上传之前按过清空，将isAbort置回0
            sendFileMsg();

            function sendFileMsg() {
                if (index >= filelist.length) {
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
                xReq.open('POST', 'http://cc.bjtu.edu.cn:81/meol/servlet/SerUpload');
                xReq.addEventListener("load", onSuccess);
                xReq.addEventListener("error", onError);
                xReq.upload.onloadstart = onStart;
                xReq.upload.onprogress = onProgress;
                xReq.upload.onabort = onAbort;
                xReq.send(formData);

                function onStart() {
                    onUpload = 1; // 上传标志位置1
                    startTime = new Date().getTime(); // 设置上传开始时间,用以计算时间速度
                    alreadyLoaded = 0; // 设置上传开始时，已上传的文件大小为0
                    // 上传开始，缓存区加入竖线
                    // $('#speedTh'+index).prepend('&nbsp; | &nbsp;');
                    if (filelist[index].size > 52428800) {
                        // 大于50M文件 插入timeremain竖线
                        $('#timeRemainTh' + index).before('&nbsp; | &nbsp;');
                    }
                }

                function onProgress(evt) {
                    if (isAbort == 1) {
                        xReq.abort(); // 上传过程中随时检查，终止请求
                    }
                    // 进度计算
                    let percentage;
                    percentage = (evt.loaded * 100 / evt.total).toFixed(0);

                    // 速度计算
                    let nt = new Date().getTime(); // 获取当前时间
                    let perTime = (nt - startTime) / 1000; // 计算出上次调用该方法时到现在的时间差，单位为s
                    startTime = new Date().getTime(); //重新赋值，用以下次计算
                    let perLoad = evt.loaded - alreadyLoaded; // 计算该分段上传的文件大小，单位b
                    alreadyLoaded = evt.loaded; // 重新赋值，用以下次计算
                    let speed = perLoad / perTime; // 单位 B/s
                    let bspeed = speed;
                    let Sunits = 'B/s';
                    if (speed / 1024 > 1) {
                        speed = speed / 1024;
                        Sunits = 'KB/s'
                    }
                    if (speed / 1024 > 1) {
                        speed = speed / 1024;
                        Sunits = 'MB/s';
                    }
                    speed = speed.toFixed(1);

                    // 时间计算 文件>20MB触发
                    if (evt.total > 20971520) {
                        let restTime = ((evt.total - evt.loaded) / bspeed).toFixed(0);
                        // 实时更新文件缓存区
                        $('#timeRemainTh' + index).html(upldIconList[0] + restTime + 's');
                        $('#timeRemainTh' + index).attr('title', '剩余时间');
                    }

                    // 实时更新文件缓存区
                    $('#fileTh' + index).css('background-size', percentage + '%');
                    $('#speedTh' + index).html('&nbsp; | &nbsp;' + upldIconList[1] + speed + Sunits);
                }

                function onAbort() {
                    isAbort = 0; // 终止条件置零
                    index = 0; // 请求终止后index也必须归零，因为中止未完成递归，若中止文件index>0则第二次上传请求无法发起
                    onUpload = 0; // 上传标志位置0
                }

                function onSuccess() {
                    // 插入编辑器操作
                    let myiframe = document.getElementsByTagName('iframe')[1].contentDocument;
                    let textArea = myiframe.getElementsByClassName('cke_show_borders');
                    let constructor = '<p><a data-cke-saved-href="/meol/' + this.responseText + '" href="/meol/' + this.responseText + '">' + filelist[index].name + '</a></p>';
                    $(textArea).append(constructor);

                    // 处理缓存区操作
                    let clipboard = new ClipboardJS('#filenameTH' + index); // 要用id做索引 否则会重复调用.on 但在清空后重新上传还是会重复调用T.T
                    let fileURL = 'http://cc.bjtu.edu.cn:81/meol/' + this.responseText;

                    $('#filenameTH' + index).attr("data-clipboard-text", fileURL);
                    $('#filenameTH' + index).css('cursor', 'pointer');
                    $('#fileindex' + index).html('<a>' + upldIconList[2] + '</a>')
                    $('#fileindex' + index).attr('title', '[已上传]')
                    $('#speedTh' + index).html('');
                    $('#timeRemainTh' + index).remove();
                    $('#fileTh' + index).css('background', '#ffffff');
                    $('#fileTh' + index).css('font-color', '#e7e8e0');

                    clipboard.on('success', function(evt) {
                        PopNotify.show("成功", `【${$(evt.trigger).text()}】 文件链接已复制到剪切板`, "success");
                        evt.clearSelection();
                    });

                    // 递归操作
                    index++;
                    sendFileMsg();
                }

                function onError() {
                    alert('Failed');
                }
            }
        })
    }

    // 拖拽上传功能
    let oBox = document.getElementById('inputDiv');
    let timer = null;
    document.ondragover = function() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            // 文件放下后执行操作
            $('#p1').html('📁文件上传📝');
            $('#inputDiv').css('background-color', '#c6f062');
            $('#textShow').css('color', '#424d55');
        }, 200);
    };
    // 进入子集的时候 会触发ondragover 频繁触发 不给ondrop机会
    oBox.ondragover = function() {
        return false;
    };
    oBox.ondragleave = function() {
        $('#p1').html('📌请将文件拖拽到此区域');
        $('#inputDiv').css('background-color', '#aad63d');
        $('#textShow').css('color', '#ffffff');
    };
    oBox.ondrop = function(ev) {
        $('#currentFile')[0].files = ev.dataTransfer.files;
        fileChangedByInput();
        return false;
    };

    function getSizeType(filelist) {
        let RtnsizeType = [];
        for (let item of filelist) {
            let sizeTypeTMP = {};
            if (item.size < 1024) {
                sizeTypeTMP.size = (item.size).toFixed(2);
                sizeTypeTMP.type = 'B';
            } else if (item.size > 1024 && item.size < 1048576) {
                sizeTypeTMP.size = (item.size / 1024).toFixed(2);
                sizeTypeTMP.type = 'KB';
            } else if (item.size > 1048576 && item.size < 1073741824) {
                sizeTypeTMP.size = (item.size / 1048576).toFixed(2);
                sizeTypeTMP.type = 'MB';
            } else if (item.size > 1073741824) {
                PopNotify.show("警告", "你选择了大于1GB的文件，服务器存储资源有限，建议选择其他传输方式。", "warn");
                sizeTypeTMP.size = (item.size / 1073741824).toFixed(2);
                sizeTypeTMP.type = 'GB';
            }
            RtnsizeType.push(sizeTypeTMP);
        }
        return RtnsizeType;
    }

    function getNameType(filelist) {
        // 文件名显示长度限制
        let nameType = [];
        let limit;
        for (let item of filelist) {
            let splitName = item.name.split('.'); // 预防文件名中含.的情况
            let newName = splitName[0];
            for (let i = 1; i < splitName.length - 1; i++) {
                newName = newName + '.' + splitName[i];
            }
            limit = isChina(newName); // 即时生成limit限制
            if (newName.length > limit) { // 有后缀超长文件
                newName = newName.slice(0, limit) + '... .' + splitName.pop();
            } else if (newName.length == 0) { // 无后缀文件
                newName = splitName[0];
            } else { // 默认去掉了后缀 把后缀加回来
                newName = newName + '.' + splitName.pop();
            }
            nameType.push(newName);
        }

        function isChina(str) {
            if (escape(str).indexOf("%u") < 0) {
                return 35; // 不包含中文
            } else {
                return 20; // 包含中文
            }
        }
        return nameType;
    }

    function getFileType(filelist) {
        // 文件图标类型
        let fileType = [];
        for (let item of filelist) {
            let fileTypeTMP = {};
            if (item.type.indexOf('image') != -1) {
                fileTypeTMP.icon = fileTypeIconList[1];
                fileTypeTMP.info = '[图像]';
            } else if (item.type.indexOf('zip') != -1) {
                fileTypeTMP.icon = fileTypeIconList[2];
                fileTypeTMP.info = '[压缩文件]';
            } else if (item.type.indexOf('video') != -1) {
                fileTypeTMP.icon = fileTypeIconList[3];
                fileTypeTMP.info = '[视频]';
            } else if (item.type.indexOf('officedocument') != -1 || item.type.indexOf('excel') != -1 || item.type.indexOf('word') != -1 || item.type.indexOf('powerpoint') != -1) {
                fileTypeTMP.icon = fileTypeIconList[4];
                fileTypeTMP.info = '[文档]';
            } else if (item.type.indexOf('pdf') != -1) {
                fileTypeTMP.icon = fileTypeIconList[5];
                fileTypeTMP.info = '[文档]';
            } else if(item.type.indexOf('audio') != -1) {
                fileTypeTMP.icon = fileTypeIconList[6];
                fileTypeTMP.info = '[音频]';
            } else {
                fileTypeTMP.icon = fileTypeIconList[0];
                fileTypeTMP.info = '[文件]';
            }
            fileType.push(fileTypeTMP);
        }
        return fileType;
    }
}

export default fileUploader