/**
 * Created by Administrator on 2016/10/21.
 */
$(document).ready(function () {
    function init() {
        selestTY();//普通用户订单下拉单
        alertTY();//弹窗
        modifyTY();////账户管理页面修改权限
        inputTY();//input  时的各种判断
    }
    var account = $(".userbox>a");
    var page = $(".paging>li:not('.nextpage')>a");
    var next = $(".paging>li.nextpage>a");

//普通用户订单的下拉框
    function selestTY() {
        var select={};
        select.icon = $(".nav .triangle");//触发按钮
        select.box=$("ul.order-select");//筛选框
        select.list=$('ul.order-select>li');//每条筛选条目
        select.content=select.list.text();//每条筛选条目的具体内容

        select.icon.bind("mouseenter",function () {
            select.box.slideDown("slow",function () {

            });
        });

        select.box.bind('mouseleave',function () {
            $(this).slideUp(1000);
        });

        select.list.bind('click',function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            select.box.slideUp(500);
        });
    }

//弹窗
    function alertTY() {
        var alert={};
        alert.out = $(".mainbox .output-btn");//导出订单按钮
        alert.agentout=$(".mainbox .agent-output-btn");//经销商用户界面的导出按钮
        alert.alertbox=$(".alert-box");//弹窗盒子
        alert.agentbox=$(".agent-alert-box");//经销商用户的弹窗盒子

        alert.log=$(".account-info .changelog");//修改登录密码按钮
        alert.logalertbox=$(".login-box");//修改登录密码的盒子

        alert.pay=$(".account-info .changepay");//修改支付密码的盒子
        alert.payalertbox=$(".pay-box");//修改支付密码的盒子

        alert.adminbox=$(".alert-admin-box");//输入管理员密码弹窗
        alert.moneybox=$(".alert-money-box");//打款弹窗
        alert.paying=$("table .orange .paying");//表格中打款按钮
        alert.moneybtn=$(".alert-admin-box .money-btn");//激发打款弹窗的按钮

        alert.moneyin=$(".alert-money-box .moneyin");//账户余额
        alert.moneyout=$(".alert-money-box .moneyout");//返利的余额

        alert.close =$(".close-btn");//关闭弹窗的按钮
        alert.confirm=$(".yes-btn");//弹窗的确定按钮

        alert.paying.bind("click",function () {
            var mybalance= $(this).parent("td").siblings("td.mybalance").text();
            var myrebate=$(this).parent("td").siblings("td.myrebate").text();

            alert.moneyin.text(mybalance);
            alert.moneyout.text( myrebate);
            alert.adminbox.show();

        });

        alert.moneybtn.bind("click",function () {
                alert.moneybox.show();
        });



        alert.out.bind("click",function () {
            alert.alertbox.show();
        });

        alert.agentout.bind("click",function () {
            alert.moneybox.hide();
            alert.adminbox.hide();
            alert.agentbox.show();
        });

        alert.close.bind('click',function () {
            alert.alertbox.hide();
            alert.logalertbox.hide();
            alert.payalertbox.hide();
        });
        alert.confirm.bind("click",function () {
            alert.alertbox.hide();
            alert.logalertbox.hide();
            alert.payalertbox.hide();
        });

        alert.log.bind('click',function () {
            alert.logalertbox.show();
        });

        alert.pay.bind('click',function () {
            alert.payalertbox.show();
        });
    }
//账户管理页面修改权限
    function modifyTY() {
        var modify={};
        modify.modify = $(".admin-list .modify");//修改权限按钮
        modify.box = $(".modify-box");//修改权限的弹出盒子
        modify.icon = $(".modify-box .triangle");//下拉按钮三角
        modify.lists = $(".modify-box .modify-lists");//下拉列表
        modify.li = $(".modify-box .modify-lists>li");//下拉的每一项
        modify.newli=$(".modify-box .newli");//已选择的每一项
        modify.confirm=$(".modify-box .yes-btn");//确定按钮
        modify.delete =$(".modify-box .no");//删除已选择的选项
        modify.close =$(".modify-box .close-btn");//关闭弹窗
        modify.modify.bind('click',function () {
            modify.box.show();
        });


        modify.icon.bind('click',function () {
            modify.lists.slideToggle();
        });

        modify.li.bind("click",function () {
            var n=$(this).index();
            $(this).addClass("active");
            modify.newli[n].style.display="block";

        });

        modify.delete.bind("click",function () {
            $(this).parents(".newli").hide();
            var n=$(this).parents(".newli").index()-1;
            var li = $(modify.li[n]);
            li.removeClass("active");
        });

        var select=[];//记录被选中的li的部分

        modify.confirm.bind("click",function () {

            $.each(modify.newli,function (i) {
                if (modify.newli.eq(i).css("display")=="block"){
                    select.push(i)
                }
            });
            alert(select);
            modify.box.hide();
        });

        modify.close.bind("click",function () {
            modify.box.hide();
        });
    }

//公共弹窗
    var tip=["输入不能为空!"];

    function myAlert(tip) {
        var $commanalert=$(" <div class='comman-alert'></div>");
        var $alertheader=$(" <div class='alert-header'>!! 重要提示</div>");
        var $alertbody=$("<div class='alert-body'></div>" );
        var $p=$("<p>"+tip+"</p>");
        var $yes=$("<div class='yes-btn'>确定</div>");
        $alertbody.append($p);
        $alertbody.append($yes);
        $commanalert.append($alertheader);
        $commanalert.append($alertbody);
        $("header").after($commanalert);

        var commanalert={};
        commanalert.confirm=$(".comman-alert .yes-btn"); //确定按钮
        commanalert.box=$(".comman-alert");//弹窗盒子

        commanalert.confirm.bind("click",function () {
            commanalert.box.hide();
        });
    }



//input的判断
    function inputTY() {
        var input={};
        input.text=$("input[type='text']");//文本输入框
        input.tel= $("input[type='tel']");//电话输入框
        // input.text.on("blur",function () {
        //     if ($(this).val()==""){
        //         myAlert(tip[0]);
        //     }
        // });
    }



    //页码切换

    page.bind('click', function (e) {
        e.preventDefault();
        $(this).parent('li').addClass("active")
            .siblings("li").removeClass("active");

    });


    next.bind("click", function () {
        $(".paging>li.active").removeClass("active")
            .next("li:not('.next')").addClass("active");

    });

    init();
});