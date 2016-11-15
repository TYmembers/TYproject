/**
 * Created by Administrator on 2016/7/26.
 */
/*
 sweetAlert('可以使用了')*/
$(document).ready(function(){
    var w={
        weltip:$('#weltip')
    };
    w.weltip.bind('click',function(){
        $(this).addClass('out');
    });
    //欢迎页

//充值页面
    var act={
        num:$('#actnum'), //卡号id
        pwd:$('#actpwd'),//密码id
        bind:$('#bindphone'),//传cookie手机号
        chephone:$('#checkphone'),//切换手机号
        phone:$('.phone'),//手机号码id盒子
        tips:$('#acttips'),//提示消息框
        sub:$('#act-submit'),//立即充值按钮
        opr:$('#telOperater')//运营商
    };
   //切换手机号，清空内容
    act.chephone.bind('click',function(){
        act.bind.val('');
        act.phone.find('p').html('');
    });
    //查询手机号码归属地
    function check(){
        $.ajax({
            method:'get',
            url:"http://apis.baidu.com/apistore/mobilephoneservice/mobilephone",
            headers:{
                apikey:"0232aa12434e9773e9cfaac7ffafddcf"
            },
            data:{
                tel:$('#bindphone').val()
            },
            datatype:"json",
            success:function (xhr) {
                var datas=JSON.parse(xhr);
                console.log(datas);
                if (datas.errMsg=="success" && datas.retData.carrier!==" "){
                    var data=datas.retData;
                    act.opr.text("用户绑定号码"+data.carrier).show();
                    // localStorage.setItem('carrier',data.carrier);
                    // localStorage.setItem('phoneNumber',act.opr.val());
                }else {
                    act.opr.hide();
                    sweetAlert("无效的手机号码");//正确字段查不到归属地时
                }
            }
        })
    }
    //切换号码后，执行查询
    act.bind.bind('input prototypechange',function(){
        if($(this).val().length == 11){
            if(isPhone($(this).val())){
                check();//判断手机号是哪里的
            }else{
                sweetAlert(tip[0]);
            }
        }
    });
    act.bind.bind('blur',function () {
        if($(this).val().length == 11){

        }else{
            sweetAlert(tip[0]);
            return false;
        }
    });
    //判断充值卡的类型
    act.num.bind('blur',function(){
        $.ajax({
            url:url+'/whichNum.json',
            type:'post',
            data:{
                card:act.num.val()
            },
            success:function(xrh){
                if(xrh.code != 0){
                    return
                }
                act.tips.html('提示:您的卡充值的是'+xrh.result)
            },
            error:function(){}
        });//查询卡类型及钞票
    });
    //立即充值
    act.sub.bind('click',function(){
        console.log(act.bind.val());
        console.log(isPhone(act.bind.val()));
        if(!isPhone(act.bind.val())){
            return sweetAlert(tip[0])
        }
        if(act.num.val() == ''){
            return sweetAlert(tip[6])
        }
        if(act.pwd.val() == ''){
            return sweetAlert(tip[7])
        }

        $.ajax({
            url:url+'/open.json',
            type:'post',
            data:{
                phone:act.bind.val(),//手机号
                idcard:act.num.val(),//充值卡号
                pwd:act.pwd.val()//充值密码
            },
            success:function(xrh){
                sweetAlert(xrh.msg)
            },
            error:function(){}
        });//充值流量
    });
    //流量充值页面

    //充值记录需要登录，记录页面展示直接写在页面里了。recharg_records


});