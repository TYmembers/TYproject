/**
 * Created by Administrator on 2016/10/17.
 */
$(document).ready(function () {
    function init() {
        login();
        // recharge();
    }
//登录页
    function login() {
        var log={};
        log.phone =$("#phonenumber");//手机号id
        log.icon =$("#icon-right");//对勾id
        log.code=$("#authenticode");//验证码内容
        log.codeBtn=$("#authenticode-button");  //验证码获取按钮
        log.logBtn=$("#login-button");

        // 验证手机号
        var logphone=log.phone[0];
        logphone.addEventListener("keyup",function() {
            if (isPhone(log.phone.val())){
                log.icon.show();
                log.codeBtn.removeClass("beforesend").addClass("sendcode");
            }else{
                log.icon.hide();
                log.codeBtn.addClass('beforesend').removeClass('sendcode');

            }
        });

        //发送验证码
        log.codeBtn.bind("click",function () {
            time(log.codeBtn);
            $.ajax({
                type:'post',
                url:"../json/code.json",
                data:{
                    phoneNumber:log.phone.val()
                },
                datatype:"json",
                success:function (data) {
                    if (data.code ==1){
                        // wait=1;//清空计时器
                        log.codePhp=data.message;
                    }else{
                        createAlert(data.message)
                    }//不成功时重新发送
                }
            });

        });

        //登录   发送手机号和验证码  ，验证验证码正确性
        log.logBtn.bind("click",function (){
            if (log.code.val()==log.codePhp){
                $.ajax({
                    type:'post',
                    url:'../json/login.json',
                    data:{
                        phoneNumber:log.phone.val(),
                        codeNumber:log.code.val()
                    },
                    datatype:'json',
                    success:function (data) {
                        if(data.code ==1) {
                            localStorage.setItem("loginNumber",log.phone.val());
                            localStorage.setItem('token',data.token);
                            location.href = "../webhtml/push.html";
                        }else{
                            createAlert(data.message);
                        }
                    }
                })
                } else {
                createAlert(tip[4])
                }
        });
    }

    init();

    // createAlert(tip[0])
});


