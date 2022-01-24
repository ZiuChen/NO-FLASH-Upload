const { author, repository, version } = require('../package.json')

module.exports = {
    "name": "免Flash文件上传",
    "name:en": "NO-FLASH-Upload",
    "description": "无需调用Flash，从课程平台上传附件，不必为了传作业多装一个浏览器！",
    "description:en": "No need to call Flash, upload accessories from the course platform.",
    "version": version,
    "author": author,
    "namespace": "https://greasyfork.org/zh-CN/users/605474",
    "icon": "https://gitee.com/ziuc/utool-filebed/raw/master/20210514-231824-0795.png",
    "source": repository.url,
    "match": ["*://cc.bjtu.edu.cn:81/meol*"],
    "require": [],
    "grant": [],
    'license': 'MIT'
}