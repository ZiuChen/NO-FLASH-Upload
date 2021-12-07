const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
    name: '免Flash文件上传',
    namespace: 'https://greasyfork.org/zh-CN/users/605474',
    version: version,
    description: '无需调用Flash，从课程平台上传附件，不必为了传作业多装一个浏览器！',
    author: author,
    source: repository.url,
    match: [
        '*://cc.bjtu.edu.cn:81/*',
    ],
    require: [
        `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
        `https://cdn.bootcdn.net/ajax/libs/jquery/1.7.2/jquery.min.js`,
        `https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.8/clipboard.min.js`,
    ],
    'icon': 'https://gitee.com/ziuc/utool-filebed/raw/master/20210514-231824-0795.png',
    'license': 'MIT',
    'name:en': 'NO-FLASH-Upload',
    'description:en': 'No need to call Flash, upload accessories from the course platform, do not have to install another browser for the homework!',

}