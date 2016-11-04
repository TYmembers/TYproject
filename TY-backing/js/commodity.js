/**
 * Created by Administrator on 2016/11/2.
 */
(function () {
    // var operator=["中国移动","中国联通","中国电信"];
    var commodity={};
    commodity.state = ["未上架","已上架"];
    commodity.shelves=["上架","下架"];
    var tip=["输入不能为空!", "还未添加任何权限",'确定要删除吗'];


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
        commanalert.box=$(".comman-alert");//弹窗盒子增加

        commanalert.confirm.bind("click",function () {
            commanalert.box.hide();
        });
    }
    function init() {

        createTable();//初始化，页面加载表格

        activeAlert();//添加商品,出现弹窗

    }
//加载表格   初始状态,全局
    function createTable() {
        $(document).ready(function () {
            var currentTable=$('.add-commodity-table');
            var currentTr=currentTable.find('tr').has('td');
            currentTr.remove();
                $.ajax({
                    type:"get",
                    url:"../json/commodity.json",
                    datatype:"json",
                    success:function (datas) {
                        if (datas.code==1){
                            var dataInt=datas.content;
                            function sortNumber(a,b)//排序，已上架的靠前排
                            {
                                return b.state - a.state
                            }
                            var data=dataInt.sort(sortNumber);
                            $.each(data, function (i,item) {
                                createTR(item);//创建表格
                            });
                            putAway();//上架,下架   考虑若是下面的，则需要重新排序
                            modifyData();
                            deleteData();
                        }else{
                            alert(datas.message);
                        }
                    }
                });

        })
    }
    //添加商品
    function activeAlert() {
        var addBtn=$(".add-commodity");//添加按钮
        commodity.box=$(".commodity-box");//添加商品弹窗
        commodity.close=$(".commodity-box .close-btn");//两个关闭按钮按钮
        commodity.confirm=$(".commodity-box .yes-btn");//确定按钮


        //添加商品
        addBtn.bind("click",function () {
            commodity.box.show();
            closeAlert();//关闭弹窗

            //发送数据，生成一行表格，默认未上架
            commodity.confirm.bind("click",function () {

                commodity.value=$(".commodity-box input.value");//面值
                commodity.discount=$(".commodity-box input.discount");//折后价
                commodity.operator=$('.commodity-box .selectOperator');//运营商
                commodity.time =$(".commodity-box .selectTime");//充值时间
                var ajaxData={
                    operator:commodity.operator.val(),
                    value:commodity.value.val(),
                    discount:commodity.discount.val(),
                    time:commodity.time.val(),
                    state:0
                };
                $.ajax({
                    type:"post",
                    url:"../json/add.json",
                    data: ajaxData,
                    datatype:"json",
                    success:function (datas) {
                        if (datas.code==1){
                            commodity.box.hide();
                            createTable();

                        }else{
                            alert(datas.message);
                        }
                    }
                });
            })

        });

    }
    //关闭弹窗
    function closeAlert() {
        commodity.close.bind("click",function () {
            commodity.box.hide();
        });

    }
    // 根据数据生成  每一行表格
    function createTR(data) {
            var table=$(".add-commodity-table");
            var exisTr=$(".add-commodity-table tr").length;
            var tr=$("<tr></tr>");
            var td1=$("<td></td>");
            td1.text(exisTr);
            var td2=$("<td class='id'></td>");
            td2.text(data.id);
            var td3=$("<td>"+data.operator+"</td>");
            var td4=$("<td>"+data.value+"</td>");
            var td5=$("<td>"+data.discount+"</td>");
            var td6=$("<td>"+data.time+"小时"+"</td>");
            var td7=$("<td></td>");
            td7.text(commodity.state[data.state]);
            var td8=$("<td class='operation'></td>");
            var input1=$("<input type='button' class='on'>");
            input1.val(commodity.shelves[data.state]);
            var input2=$("<input type='button' class='modify' value='修改'>");
            var input3=$("<input type='button' class='delete' value='删除'>");
            td8.append(input1).append(input2).append(input3);
            tr.append(td1).append(td2).append(td3).append(td4).append(td5).append(td6).append(td7).append(td8);
            table.append(tr);
        // }

    }

    // 上架下架
    // 考虑到上架的可能是后面的商品，需要返回所有数据，对数据进行重新排序，不是简单的前端字面修改
    function putAway() {
        var putawayBtn=$(".add-commodity-table input.on");
        putawayBtn.bind('click',function () {
                $.ajax({
                    type: "post",
                    data:{
                        action:$(this).val(),//通过值判断是上架还是下架
                        id:$(this).parent("td").siblings('td.id').text()//商品
                    },
                    url: "../json/commodity.json",
                    datatype: "json",
                    success: function (datas) {
                        if (datas.code==1){
                            createTable();
                        }else{
                            alert(datas.message);
                        }
                    }
                })
        });

    }

    //修改，已上架和下架的都可以修改，局部刷新
    function modifyData() {
        var modifyBtn=$(".add-commodity-table input.modify");//修改按钮
        commodity.modifyBox=$(".commodity-box-modify");//修改商品弹窗
        commodity.modifyClose=$(".commodity-box-modify .close-btn");
        commodity.modifyConfirm=$(".commodity-box-modify .yes-btn");//确定按钮
        modifyBtn.bind('click',function () {
            var tds=$(this).parent('td').siblings('td');
            var tdDatas=[];
            for (var x=2;x<=6;x++ ){
                tdDatas.push(tds.eq(x).text());
            }
            $('.commodity-box-modify .selectOperator').val(tdDatas[0]);
            $(".commodity-box-modify input.value").val(tdDatas[1]);
            $(".commodity-box-modify input.discount").val(tdDatas[2]);
            $(".commodity-box-modify .selectTime").val(tdDatas[3]);
            commodity.modifyBox.show();
            commodity.modifyClose.bind("click",function () {
                commodity.modifyBox.hide();
            });

            commodity.modifyConfirm.bind("click",function () {
                commodity.value=$(".commodity-box-modify input.value");//面值
                commodity.discount=$(".commodity-box-modify input.discount");//折后价
                commodity.operator=$('.commodity-box-modify .selectOperator');//运营商
                commodity.time =$(".commodity-box-modify .selectTime");//充值时间
                var modifiedData={
                    operator:commodity.operator.val(),
                    value:commodity.value.val(),
                    discount:commodity.discount.val(),
                    time:commodity.time.val(),
                    id:$(this).parent("td").siblings('td.id').text()//商品id,确认修改的是哪个商品
                };
                $.ajax({
                    type:"post",
                    url:"../json/commodity.json",
                    data: modifiedData,
                    datatype:"json",
                    success:function (datas) {
                        if (datas.code==1){
                            //直接从前端传值修改4项目，后台只做修改不再传值
                            tds.eq(2).text(modifiedData.operator);//运营商
                            tds.eq(3).text(modifiedData.value);//面值
                            tds.eq(4).text(modifiedData.discount);//折扣
                            tds.eq(5).text(modifiedData.time+"小时");//到帐时间
                            commodity.modifyBox.hide();
                            // createTable();
                        }else{
                            alert(datas.message);
                        }
                    }
                });
            })

        })
    }
        // 删除，全局刷新，删除后重排
    function deleteData() {
        var delBtn=$(".add-commodity-table input.delete");//删除按钮
        delBtn.bind('click',function () {
            var currentTable=$(this).parents('.add-commodity-table');
            var currentTr=currentTable.find('tr').has('td');
                $.ajax({
                type: "post",
                data:{
                    id:$(this).parent("td").siblings('td.id').text()//商品
                },
                url: "../json/delete.json",
                datatype: "json",
                success: function (datas) {
                    if (datas.code==1){
                        confirmAlert(tip[2]);
                        var commanalert={};
                        commanalert.confirm=$(".comman-alert .yes-btn"); //确定按钮
                        commanalert.close = $('.comman-alert .close-icon');
                        commanalert.box=$(".comman-alert");//弹窗盒子

                        commanalert.close.bind('click',function () {
                            commanalert.box.hide();
                        });
                        commanalert.confirm.bind("click",function () {
                            commanalert.box.hide();
                            createTable();
                        });
                    }else{
                        alert(datas.message);
                    }
                }
            })
        })
    }
    //提示确定要删除的弹窗
    function confirmAlert(tip) {
        var $commanalert = $(" <div class='comman-alert'></div>");
        var $alertheader = $(" <div class='alert-header'>重要提示</div>");
        var $closeicon = $("<span class='close-icon'>×</span>");
        var $alertbody = $("<div class='alert-body'></div>");
        var $p = $("<p>" + tip + "</p>");
        var $yes = $("<div class='yes-btn'>确定</div>");
        $alertbody.append($p);
        $alertbody.append($yes);
        $alertheader.append($closeicon);
        $commanalert.append($alertheader);
        $commanalert.append($alertbody);
        $("header").after($commanalert);

    }
    var commanalert={};
    commanalert.confirm=$(".comman-alert .yes-btn"); //确定按钮
    commanalert.close = $('.comman-alert .close-icon');
    commanalert.box=$(".comman-alert");//弹窗盒子

        commanalert.close.bind('click',function () {
            commanalert.box.hide();
        });

        commanalert.confirm.bind("click",function () {
            commanalert.box.hide();
        });



   init();
})();