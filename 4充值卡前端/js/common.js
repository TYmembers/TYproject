/**
 * Created by Administrator on 2016/7/28.
 */
var tip=[
    '请输入正确的手机号码',
    '密码不能为空',
    '两次输入的密码不一致',
    '此手机号码已经注册，不能重复注册！',
    '请输入正确的验证码！',
    '请先阅读用户协议!',
    '请输入充值卡号',
    '充值密码不能为空'
],
 icon = [
    '&#xe609;',//中国电信
    '&#xe60a;',//中国移动
    '&#xe608;',//中国联通
    '&#xe603;',//勾2
    '&#xe605;',//勾
    '&#xe600;'//手机icon
 ],
    url = '../lightstar/json',
 wait=30;
function time(o) {
    if (wait == 0) {
        o.removeAttr("disabled");
        o.val('发送验证码');
        wait = 30;
    } else {
        o.attr("disabled", true);
        o.val("重新发送(" + wait + ")");
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
//验证码倒计时
/*手机号码正则*/
function isPhone(phone){
    var rules = /^1[3|4|5|7|8][0-9]{9}$/;
    return rules.test(phone)
}
//pwd
function pwd(pwd){
    var rules = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    return rules.test(pwd);
}