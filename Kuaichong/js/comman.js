/**
 * Created by Administrator on 2016/10/17.
 */

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
        var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';};
            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var comman={};

//弹窗
var tip=[
    '恭喜您，充值成功！',
    '请输入正确的手机号码',
    '请选择到帐时间',
    '未知归属地号码',
    '验证码不正确'
];
function createAlert(tip) {
    $("body").prepend("<div class='full-mask'></div>");
    $(".full-mask").append("<div class='alert-box'></div>");
    $(".alert-box").append("<div class='alert-content-box'></div><div class='alert-button'>知道了</div>");
    $(".alert-content-box").append("<i class='iconfont alerticon'>&#xe64c;</i><p>"+tip+"</p>");

    var alertBtn=$(".alert-button");
    alertBtn.bind("click",function(){
        $(this).parents(".full-mask").hide();
    });
}



//倒计时
wait=60;
function time(o) {
    o.removeClass("sendcode").addClass("beforesend");
    o.val("重新发送(" + wait + ")");
    wait--;
    var x=setTimeout(function() {
            time(o);
        },
        1000);
    if (wait==0){
        clearTimeout(x);
        o.toggleClass("sendcode").val("验证码");
    }

}

//手机号码验证
function isPhone(phone){
    var rules = /^1[3|4|5|7|8][0-9]{9}$/;
    return rules.test(phone)
}

window.comman=comman;


//弹窗样式



