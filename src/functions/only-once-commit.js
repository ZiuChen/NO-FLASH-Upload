import PopNotify from "../js/PopNotify"
import PopNotifyCSS from "../style/css/PopNotify.css";

function judgeOnceSubmit() {
    if ($("script:contains('该作业不允许重复提交,确定提交作业吗？')").length != 0) {
        let newspan = '<span>（只能提交一次）</span>';
        $('span:contains("查看作业任务")').after(newspan);
        PopNotify.show("警告", "注意，此作业只能提交一次，请检查无误后再提交！", "warn");
        return 1;
    } else return 0;
}
export default judgeOnceSubmit