<div align="center">
<center>
<div align="center">
<h1>免Flash文件上传</h1>
<div align="center">
北京交通大学课程平台功能增强脚本，实现信息聚合，附件上传，让你高效处理课程信息。
</div>
</br>
<a href="https://github.com/ZiuChen/NO-FLASH-Upload"><img src="https://img.shields.io/badge/Github-black?logo=github"></img></a>
<a href="https://gitee.com/ziuc/NO-FLASH-Upload"><img src="https://img.shields.io/static/v1?label=Gitee&message=%E9%95%9C%E5%83%8F&color=c71d23&style=flat-square&logo=gitee&logoColor=c71d23"></img></a>
<img src="https://img.shields.io/static/v1?label=Node.js&message=v14.16&color=339933&style=flat-square&logo=node.js&logoColor=ffffff"></img>
<img src="https://img.shields.io/static/v1?label=Vue.js&message=v3.2&color=4FC08D&style=flat-square&logo=vue.js&logoColor=ffffff"></img>
<img src="https://img.shields.io/badge/%20License-MIT-yellow?style=flat-square&labelColor=black"></img>
</div>
</center>
</div>

## 🚀 初衷

由于课程平台使用的`THEOL清华教育在线`系统版本过旧，其基于`Flash`的附件上传功能不再在主流浏览器上被支持，故编写此脚本以实现信息汇总、附件上传等功能。

**课程平台更新后，脚本升级为`2.0`，提供了更多更方便的功能。**

本脚本于 2021 年 9 月 7 日发布，已在[_Greasy Fork_](https://greasyfork.org/zh-CN/scripts/432056)被安装千余次，日检查更新次数`~400`。

## 🔰 开始使用

1. 在任一浏览器上安装 [`Tampermonkey`](https://www.tampermonkey.net/) 脚本管理器。
2. [`点击此处`](https://service-n4tqsll5-1304937021.sh.apigw.tencentcs.com/release/v1/index.prod.user.js) 安装脚本。

| 浏览器版本  | 脚本管理器及其版本    | 脚本版本 | 可用性 |
| ----------- | --------------------- | -------- | ------ |
| **Chrome**  | `Tampermonkey 4.16.1` | `2.3.2`  | ✔      |
| **Edge**    | `Tampermonkey 4.16.1` | `2.3.2`  | ✔      |
| **FireFox** | `Tampermonkey 4.16.1` | `2.3.2`  | ✔      |

新版具有更好的稳定性，**请尽量保持脚本更新，使用最新版本**。使用中遇到任何问题，欢迎在[`Github Issues`](https://github.com/ZiuChen/NO-FLASH-Upload/issues)或[`腾讯兔小巢`](https://support.qq.com/products/395800)反馈交流。

## 📸 效果展示

<img alt="homepage" width="80%" src="https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/img/HomePage.jpg"></img>

<img alt="submissionpage" width="80%" src="https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/img/SubmissionPage.jpg"></img>

## 🏗️ 参与开发

1. `Fork`[本仓库](https://github.com/ZiuChen/NO-FLASH-Upload)并`clone`到本地。
2. 使用`npm i`安装依赖，使用`npm run dev`执行自动编译。
3. 在`Tampermonkey`脚本管理器中新建脚本，将`dist`目录下生成的`index.dev.user.js`复制到其中并保存，开始开发。
4. **(可选)** 配合浏览器拓展 `LiveReload` 可实现代码更新，浏览器自动刷新。
5. 开发完毕，整理代码，提交 Pr。

### 📁 目录说明

- `config`：`Webpack`配置文件（分为基本配置、开发环境配置、生产环境配置）、脚本元信息
- `dist`：执行打包命令后，脚本输出目录
- `doc`：存放文档的目录
- `plugins`：存放插件的目录
- `publish`：版本更新源，存放发布脚本的目录
- `src`：源文件目录

  - `base-ui`：存放基础组件的目录
  - `components`：存放`Vue`组件的目录
  - `global`：存放页面预处理、全局注册等逻辑的目录
  - `hooks`：存放公共逻辑的目录
  - `request`：存放网络请求的目录
  - `route`：存放`Vue Router`路由的目录
  - `style`：存放样式文件的目录
  - `index.ts`：脚本的入口文件

  **注意：** 目前项目有两个分支：旧的`script`分支与新的`Vue`分支，分别对应`1.x`版本与`2.x`版本，`1.x`版本由于平台更新，已基本不可用，不再维护。

## ❤️ 感谢捐赠

**如果觉得脚本帮到了你，可以通过[捐赠二维码](https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/img/Buy%20me%20a%20coffee.png)赞赏我，这将鼓励我继续维护这个脚本。**

[【定期更新】感谢捐赠名单 ❤](https://docs.qq.com/sheet/DRWFjSFlKWFplSldi)

<a href="https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/img/Buy%20me%20a%20coffee.png"><img alt="捐赠二维码" width="65%" src="https://fastly.jsdelivr.net/gh/ZiuChen/NO-FLASH-Upload@master/doc/img/Buy%20me%20a%20coffee.png"></img></a>

## 🧱 第三方开源组件

感谢这些组件帮助我极大地提升了开发效率：

- [Vue](https://cn.vuejs.org/)
- [Element Plus](http://element-plus.gitee.io/)
- [wangEditor](https://www.wangeditor.com/)
- [MDUI](https://www.mdui.org/)

## 📎 相关链接

[`兔小巢反馈平台`](https://support.qq.com/products/395800)
[`反馈交流QQ群：769115389`](https://qm.qq.com/cgi-bin/qm/qr?k=9qfHKTaQuWqYN1ys1yiQPdJ4iIlHwgL5&jump_from=webapi)
[`更新计划`](https://github.com/ZiuChen/NO-FLASH-Upload/projects/2)
[`更新日志`](doc/update_log.md)
[`v1.x脚本介绍`](doc/usage_old.md)
[`v1.x更新日志`](doc/update_log_old.md)
