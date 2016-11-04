/**
 * Created by Administrator on 2016/10/17.
 */

$(document).ready(function () {
    var recharge={};
    recharge.phoneNumber=$("#rechange-phonenumber");//电话号码
    recharge.type=$("#mobile-type");//号码运营商
    recharge.changeBtn=$("#changenumber");//更改号码
    recharge.numberBefore=$(".push>.phoneNumber");//号码记录
    // recharge.numberList=$(".push>.phoneNumber>li.newli");
    // recharge.clearNum=$(".push>.phoneNumber>li.clear");//清除充值记录
    recharge.time=$(".checkbox>li");//到账时间
    recharge.icon=$(".checkbox>li>i"); //选择框
    recharge.price=$(".push .moneyList a");//选择价钱

// 默认电话号码

    recharge.phoneNumber.val(localStorage.loginNumber);
    //切换号码
    recharge.changeBtn.bind("click",function () {
        recharge.type.hide();
        recharge.phoneNumber.css({color:"#ccc",fontSize:"1.2rem"}).val(localStorage.loginNumber)
            .focus(function () {
                $(this).val("").css({color:"#555",fontSize:"1.3rem"});
            });
        $.ajax({
            method:'post',
            url:'../json/numbefore.json',
            data:{
                tel:recharge.phoneNumber.val()
            },
            datatype:"json",
            success:function (datas) {
                if (datas.code==1){
                    var nums=datas.content;
                    $.each(nums,function (i) {
                        recharge.newli=$("<li class='newli'></li>");
                        recharge.newli.text(nums[i].tel);
                        recharge.numberBefore.append(recharge.newli);
                    });
                    recharge.lastli=$("<li class='clearnum'>清空历史充值号码</li>");
                    recharge.numberBefore.append(recharge.lastli);
                    recharge.numberBefore.show();
                    //点击充值号码填充
                    recharge.linum=$(".push>.phoneNumber>li.newli");
                    recharge.linum.bind("click",function () {
                        recharge.phoneNumber.val($(this).text());
                        getMobileOperation();
                        recharge.numberBefore.remove($(this).children()).hide();

                    });
                    //清空历史充值号码
                    recharge.lastli.bind("click",function () {
                        $(this).parent().remove($(this).children()).hide();
                    });
                }else{
                    recharge.numberBefore.hide();
                }
            }
        });
    });


    //  验证手机号码的归属地

            function getMobileOperation() {
            if (isPhone(recharge.phoneNumber.val()) ){
                recharge.numberBefore.hide();
                $.ajax({
                    method:'get',
                    url:"http://apis.baidu.com/apistore/mobilephoneservice/mobilephone",
                    headers:{
                        apikey:"0232aa12434e9773e9cfaac7ffafddcf"
                    },
                    data:{
                        tel:recharge.phoneNumber.val()
                    },
                    datatype:"json",
                    success:function (xhr) {

                        var datas=JSON.parse(xhr);
                        if (datas.errMsg=="success"){
                            var data=datas.retData;
                            recharge.type.text("用户绑定号码"+data.carrier).show();
                            localStorage.setItem('carrier',data.carrier);
                            localStorage.setItem('phoneNumber',recharge.phoneNumber.val());
                        }else {

                            createAlert(tip[3]);//正确字段查不到归属地时
                        }
                    }
                });
            }else{
                createAlert(tip[1]);
            }
        }

        if (recharge.phoneNumber.val().length==11){
            getMobileOperation();
        }else{
            getMobileOperation =null;
        }

    // }


    //输入切换号码验证归属地
    recharge.phoneNumber[0].onkeyup=function () {
        if (recharge.phoneNumber.val().length==11) {
            getMobileOperation();
        }
    };



    //选择到帐时间,单选
    recharge.icon.bind("click",function () {
        $(this).children("span").toggleClass("disc")
            .parents("li").siblings("li").children("i").
        children("span").removeClass("disc");

        localStorage.setItem("howlong",$(this).siblings('span').text());
    });

    //选择充值价钱
    recharge.price.bind("click",function (e) {
        if (recharge.icon.children('span').hasClass("disc")){
            e.preventDefault();
            localStorage.setItem("howmuch",$(this).children('h4').children('span').text());
            localStorage.setItem('discount',$(this).children('p').children("span").text());
            $(this).toggleClass("active").siblings("a").removeClass("active");
            location.href = "../webhtml/pay.html";
        }else{
            $(this).removeAttr("href");
            createAlert(tip[2]);
        }
    });

});
