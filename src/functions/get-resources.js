import PopNotify from "../js/PopNotify"

function getResources() {
    if (location.href.indexOf('listview.jsp?') == -1) {
        return
    }
    let fileLinks = [];
    for (let i = 0; i < $('tbody>tr').length; i++) {
        let href = $($('tbody>tr')[i]).find('td>a').attr('href');
        if (href && href.indexOf('listview.jsp?') != 0) {
            fileLinks.push('http://cc.bjtu.edu.cn:81/meol/common/script/download.jsp' + $($('tbody>tr')[i]).find('td>a').attr('href').split('download_preview.jsp')[1])
        }
    }
    $('.subtitle').append( /*html*/ `<a id="downloadAll" style="cursor: pointer">下载此目录下所有文件</a>`)
    $('#downloadAll').click(() => {
        if (fileLinks.length) {
            fileLinks.forEach(value => {
                window.open(value)
            })
        } else PopNotify.show("警告", "当前目录下无文件", "warn")
    });
}


export default getResources