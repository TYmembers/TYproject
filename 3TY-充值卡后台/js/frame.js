/**
 * Created by Administrator on 2016/11/9.
 */
(function () {

    function init() {
        addCards();//增加批次
        deleteCard();//删除批次

         exportCards();//导出批次
        singleExport();//单批次导出
        clearCards();//清空卡
        activeCards();//激活卡

        exportOrder();//导出订单
        selectTime();//根据时间筛选

        addAdmin();//添加管理员
        modifyPassword();//修改密码
        deleteAdmin();//删除管理员
        // viewAuthority();//管理页面查看权限
        modifyPower();//修改权限
    }
    var tips=[
        "请选择一条数据进行删除",
        "您确定要删除此条批次记录信息吗",
        '添加批次成功',
        "删除批次成功",
        "导出成功",
        "请选择一条数据进行导出",
        "导出成功，请耐心等待^_^",
        "删除失败",
        '添加失败',
        '激活成功',
        '激活失败',
        '请输入正确的批次号',
        '查询失败'//12
    ];
    var contents=[
        "用户管理",
        "充值设置",
        "账户管理",
        "统计报表"
    ];
    var check=$('.generate-table td input:checkbox');
    //增加批次
   function addCards() {
       var add ={};
       add.box = $('.add-box');//弹框
       add.btn=$(".tab-operation .generate");//生成按钮
       add.boxclose=$('.add-box .close-btn');//两个关闭，包括取消和x号
       add.confirm=$(".add-box .yes");//确定按钮
       add.input=$('.add-box input[type="text"]');


       add.btn.bind('click',function () {
           $.ajax({
               type:"post",
               url:"../json/add.json",
               data:{
                   style:'1'
               },
               datatype:"json",
               success:function (xhr) {
                   // var datas=xhr.content;
                   var datas=xhr;//php
                   $.each(datas,function (i,item) {
                       var option=$("<option></option>");
                       option.val(datas[i].id).text(datas[i].worths);
                       $("#cardValue").append(option);
                   })
               }
           });
            add.box.show();

       });
       add.boxclose.bind('click',function () {
           add.box.hide();
       });
        //  不能为空
       add.confirm.bind('click',function () {
           for (var i=0;i<add.input.length;i++){
               if (add.input.eq(i).val()==""){
                   alert(add.input.eq(i).prev('span').text()+"不能为空");
                   return false
               }else{
                   $.ajax({
                       type:"post",
                       url:"../json/add.json",
                       data:{
                           batch:$('#batchNumber').val(),
                           value:$("#cardValue").val(),
                           start:$("#startNumber").val(),
                           end:$("#endNumber").val()
                       },
                       datatype:"json",
                       success:function (data) {
                           if (data.code==1){
                               add.box.hide();
                               myAlert(tips[2]);
                           }else{
                               myAlert(data.message);
                           }


                       }
                   });
                   return false;
               }
           }
       });
   }
   //删除批次
   function deleteCard() {
       var del={};
       del.btn = $(".tab-operation .delete");
       del.yes=$('.del-box .yes');
        var checkBox=[];//记录被选中的checkbox
       //选中变色
        check.bind('click',function () {
            $(this).parents("tr").toggleClass('active');
        });
       del.btn.bind('click',function () {
           $.each(check,function (i,item) {
               if (item.checked){
                   checkBox.push(item);
               }
           });

           if (checkBox.length==1){
               del.batch =($(checkBox[0]).parents("td.check").siblings('td.batch').text());
                showDelBox();
               del.yes.bind('click',function () {
                   $.ajax({
                       type:"post",
                       url:"../json/add.json",
                       data:{
                           batch:del.batch
                       },
                       datatype:"json",
                       success:function (data) {
                           if (data.code==1){
                               $(this).parents('.del-box').hide();
                               myAlert(tips[3]);

                           }else{
                               myAlert(data.message);
                           }

                       }
                   });
               })
           }else{
                myAlert(tips[0])
           }
       })
   }
   //导出全部批次
    function exportCards() {
        //导出
        $(".tab-operation .export").bind('click',function () {
            
        })


    }
    //导出单个批次
    function singleExport() {
        var exone={};
        exone.btn=$(".tab-operation .export-one");
        exone.check=$('.generate-table td input:checkbox');
        exone.btn.bind('click',function () {
            var checkBox=[];
            $.each(check,function (i,item) {
                if (item.checked){
                    checkBox.push(item);
                }
            });

            if (checkBox.length==1){
                exone.batch =($(checkBox[0]).parents("td.check").siblings('td.batch').text());
                location.href("url?"+"batch="+exone.batch);

            }else{
                myAlert(tips[5])
            }
        })
    }
    //清除输入效果
    function clearCards() {
        var clearObj=$('.part .query .clearObj');
        $('.part .clearBtn').bind('click',function () {
            clearObj.val(' ');
        })
    }
    //激活卡
    function activeCards() {
        var startNumber=$('#startCard').val();//开始序号
        var endNumber=$("#endCard").val();
        $(".part2 .tab-operation .active").bind('click',function () {
            $(".active-box").show();
            $('.active-box .close-btn').bind('click',function () {
                $(this).parents('.active-box').hide();
            });
            $('.active-box .yes').bind('click',function () {

                    $(this).parents('.active-box').hide();
                    $.ajax({
                        type:"post",
                        url:"../json/add.json",
                        data:{
                            start:startNumber,
                            end:endNumber
                        },
                        datatype:"json",
                        success:function (data) {
                            if (data.code==1){
                                $(this).parents('.active-box').hide();
                                myAlert(tips[9]);

                            }else{
                                myAlert(tips[10]);
                            }

                        }
                    });

            });
        })
    }
    //导出订单
    function exportOrder() {
        $('.tab-operation .output').bind('click',function () {
            $('.output-box').show();
            $('.output-box .close-btn').bind('click',function () {
                $(this).parents('.output-box').hide();
            });
            $(".output-box .yes").bind('click',function () {
                var startTime=new Date($("#startTime").val());
                // window.location.href="url?"
                //     +"start="+$("#startDate").val()+$("#startTime").val()
                //     +"&end="+$("#endDate").val()+$("#endTime").val()
                //     +"&state="+$("#stateType").val();
            })
        })
    }
    //根据时间刷新页面
    function selectTime() {
        $(".tab-operation .selectTime").bind("click",function () {
            var index=$(this).index()+1;
            window.location.href="url?"+"time="+index;
        })
    }

    //添加管理员
    function addAdmin() {
        $("#addAdmin").bind('click',function () {
            $(".add-admin-box").show();
        });
        $('.add-admin-box .close-btn').bind('click',function () {
            $(this).parents('.add-admin-box').hide();
        });
        $(".add-admin-box .yes").bind('click',function () {
            var adminInput=$(".add-admin-box input[type='text']");
            var password=$("#adminPSD").val();
            for (var i=0;i<adminInput.length;i++){
                if (adminInput.eq(i).val()==""){
                    alert(adminInput.eq(i).prev('span').text()+"不能为空");
                    return false
                }
            }

            if (testPSD(password)){
                $.ajax({
                    type:"post",
                    url:"../json/add.json",
                    data:{
                        role:$('#adminRole').val(),
                        name:$("#adminname").val(),
                        account:$("#adminAccount").val(),
                        password:password
                    },
                    datatype:"json",
                    success:function (data) {
                        if (data==1){
                            $(".add-admin-box").hide();
                            myAlert("添加成功！");
                        }else{
                            $('.add-admin-box').hide();
                            myAlert("添加失败！");
                        }
                    }
                });
            }else{
                alert('密码必须为6-16位数的数字和字母');
            }
        })
    }
    //修改管理员密码
    function modifyPassword() {
        var selected=[];//记录选中的管理员
        var check=$('.admin-table td input:checkbox');

        $("#modifyPSD").bind('click', function () {
            $.each(check,function (i) {
                if (check.eq(i).attr('checked')=='checked'){
                    selected.push(check.eq(i).val());
                }
            });
            if (selected.length==1){
                $('.modify-box').show();

                $('.modify-box .close-btn').bind('click', function () {
                    $(this).parents('.modify-box').hide();
                });
                $(".modify-box .yes").bind('click', function () {
                    var oldPSD = $('#oldPSD').val();
                    var newPSD = $('#newPSD').val();
                    if (testPSD(newPSD) && testPSD(oldPSD)) {
                        $.ajax({
                            type: "post",
                            url: "../json/add.json",
                            data: {
                                id:selected[0],
                                old: oldPSD,
                                new: newPSD
                            },
                            datatype: "json",
                            success: function (data) {
                                if (data.code == 1) {
                                    $(".modify-box").hide();
                                    myAlert("修改密码成功！");
                                } else {
                                    myAlert(data.message);
                                }

                            }
                        });
                    } else {
                        alert('密码必须为6-16位数字和字母')
                    }
                });
            }else{
                $('.modify-box').hide();
                myAlert('请选择一个管理员进行密码修改！')
            }

        });

    }
    //删除管理员
    function deleteAdmin() {
        var selected=[];//记录选中的管理员
        var check=$('.admin-table td input:checkbox');
        //全选删除
        $(".selectAll").bind('click',function () {
            var adminCheck = $('table td input:checkbox');
            if ($(this).attr('checked')=="checked"){
                adminCheck.attr('checked','true');
                $.each(adminCheck,function (i,item) {
                    selected.push(adminCheck.eq(i).val());
                })
            }else{
                adminCheck.removeAttr('checked');
            }
        });

        $('#deleteAdmin').bind('click',function () {
            //灵活删除
            $.each(check,function (i) {
                if (check.eq(i).attr('checked')=='checked'){
                    selected.push(check.eq(i).val());
                }
            });
            if (selected.length>=1){
                $(".delete-box").show();
                $(".delete-box .close-btn").bind('click',function () {
                   $(this).parents('.delete-box').hide();
                    selected=[];
                });
                $('.delete-box .yes').bind('click',function () {
                    $.ajax({
                        type:"post",
                        url:"../json/add.json",
                        data:{
                            ids:selected
                        },
                        datatype:"json",
                        success:function (data) {
                            selected=[];
                            if (data==1){
                                $(this).parents(".delete-box").hide();
                                myAlert("删除成功！");
                                $(".delete-box").hide();
                            }else{
                                myAlert("删除失败！");
                                $(".delete-box").hide();
                            }
                        }
                    });

                })

            }else{
                myAlert("请至少选择一条数据进行删除")
            }//全部删除
        })
    }
    //修改管理权限
    function modifyPower() {
        var modify={};
        modify.modify = $(".admin-table td.operate");//修改权限按钮
        modify.box = $(".modify-power");//修改权限的弹出盒子
        modify.hide=$(".modify-power .hideids");//修改弹窗的主体部分
        modify.hideInput=$('.modify-power .hideids .adminid');
        modify.close = $(".modify-power .close-btn");//关闭弹窗

        modify.modify.bind('click',function () {
            var rootID=$(this).prev('td.power').children('input').val();//记录权限
            var adminID=$(this).siblings('td.check').children('input').val();//记录管理员
            if(rootID==1){
                $('#operating').attr('checked','checked')
            }else if(rootID==2){
                $('#management').attr('checked','checked')
            }

            modify.hideInput.val(adminID);
            modify.box.show();
        });
        modify.close.bind("click",function () {
            modify.box.hide();
        });
    }
    //测试密码
    function testPSD(psd) {
        var pattern=/^[0-9a-zA-Z_#]{6,16}$/;
        return pattern.test(psd);

    }

   //删除弹窗
    function showDelBox() {
        $(".del-box").show();
        $('.del-box .close-btn').bind('click',function () {
            $(this).parents('.del-box').hide();
        })
    }
   //公共弹窗
    function myAlert(tip) {
        var $commanalert=$(" <div class='comman-alert'></div>");
        var $alertheader=$(" <div class='alert-header'>" +
            "天缘官方提醒您："+
            "<span class='close-btn'>×</span>" +
            "</div>");
        var $alertbody=$("<div class='alert-body'></div>" );
        var $p=$("<p class='tip'>"+tip+"</p>");
        var $yes=$("<div class='yes-btn'>确定</div>");
        $alertbody.append($p);
        $alertbody.append($yes);
        $commanalert.append($alertheader);
        $commanalert.append($alertbody);
        $('body').append($commanalert);

        var commanalert={};
        commanalert.confirm=$(".comman-alert .yes-btn"); //确定按钮
        commanalert.close=$(".comman-alert .close-btn");//关闭按钮
        commanalert.box=$(".comman-alert");//弹窗盒子

        commanalert.close.bind('click',function () {
            commanalert.box.hide();
        });
        commanalert.confirm.bind("click",function () {
            setTimeout(function () {
                location.replace(location.href);
            },500);

            commanalert.box.hide();
        });
    }

    init();
})();

