// import frameCSS from "../../style/css/frame.css"

function deleteInit() {
    if (location.href !== 'http://cc.bjtu.edu.cn:81/meol/main.jsp') {
        // 不在主页则返回
        console.log('return');
        return
    }
    $('*').remove()
    console.log()
}
export default deleteInit