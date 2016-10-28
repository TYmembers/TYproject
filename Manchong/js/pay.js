/**
 * Created by Administrator on 2016/10/18.
 */
$(document).ready(function () {
    var date=new Date();
    var pay={};
    pay.way=$(".pay>.actList");//支付方式
    pay.way.bind('click',function () {
        $.ajax({
            type:'post',
            url:"../json/pay.json",
            data:{
                loginNumber:localStorage.loginNumber,//登录的号码
                phoneNumber:localStorage.phoneNumber,// 充值的号码
                carrier:localStorage.carrier,//充值号码的运营商
                howlong:localStorage.howlong,//充值时间
                howmuch:localStorage.howmuch,//充值数额(纯数值)
                discount:localStorage.discount,//折后的实际价钱
                payway:$(this).find('h4').text(),//充值方式
                date:date     //下订单的时间
            },
            datatype:"json",
            success:function (data) {
                if (data.code==1){
                    comman.status = "success";
                }else{

                }//else{查不到手机号是的弹窗}
            }
        });
    });

});