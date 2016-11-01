/**
 * Created by Administrator on 2016/10/31.
 */
$(document).ready(function () {

    var iconfonts=["&#xe652;","&#xe50c;","&#xe501;"];//电信，联通，移动
    var iconclass=["dx","yd","lt"];
    var daynumbers=["日","一","二","三","四","五","六"];

    var today=new Date();
    var month=today.getMonth()+1;//当前月
    var year=today.getFullYear();
    var data1=[];//记录当年的数据集合
    var data2=[];//记录去年的数据集合

    //根据分类的数据生成充值记录的公用函数
    function selectData(data) {
        var header={};//记录头部数值的变量
        header.arr=data[0].create_time.split(" ");
        header.year =header.arr[0].slice(0,4);
        header.month=header.arr[0].slice(5,7);//订单头部的月份字样

        var record={};//记录页面的标签
        record.record=$(".record");//动态添加记录的标记
        record.box = $("<ul class='Relist'></ul>");//列表框

        record.monthbox =($("<h3 class='month'></h3>"));//头部月份信息
        if (header.year==year && header.month==month){
            record.monthbox.text("本月")
        }else if(header.year==year && header.month!==month){
            record.monthbox.text(header.month+"月")
        }else{
            record.monthbox.text(header.year+"年"+header.month+"月");
        }

        record.record.append(record.box);
        record.box.append(record.monthbox);


        $.each(data,function (i,item) {
            var oldtime=new Date(item.create_time);
            var time1={};  //记录列表中所需数据的变量
            time1.month=oldtime.getMonth()+1;
            time1.month=time1.month>=10?time1.month:"0"+time1.month;
            time1.date =oldtime.getDate();
            time1.md =time1.month+"-"+time1.date;//月日
            time1.day =oldtime.getDay();//星期


            //创建时间
            record.li = $("<li></li>");//每个月份下的列表，按天
            record.h4=$("<h4 class='date'></h4>");//几号，星期几
            record.span1 = $("<span></span>");
            record.span1.text(time1.md);
            record.span2=$("<span></span>");
            record.span2.text("周"+daynumbers[time1.day]);

            record.h4.append(record.span1);
            record.h4.append(record.span2);
            record.li.append(record.h4);

            //创建主要内容  div与h4同级
            record.div=$("<div class='detail clearfix'></div>");
            record.icon1=$("<i class='iconfont dx'>&#xe652;</i>");//电信图标
            record.icon2=$("<i class='iconfont lt'>&#xe50c;</i>");//联通图标
            record.icon3=$("<i class='iconfont yd'>&#xe501;</i>");//移动图标
            record.span3=$("<span class='span3'></span>");
            record.span3.text("充值话费"+parseInt(item.recharge)+"元");//多少钱
            record.span4=$("<span></span>");
            record.span4.text("充值号码"+item.tel);//号码
            record.span5=$("<span></span>");
            if (item.state ==1){
                record.span5.addClass("suc").text('充值成功')
            }else {
                record.span5.addClass('fail').text('充值失败')
            }

            switch (item.operator)
            {
                case "中国电信":
                    record.icon=record.icon1;
                    break;
                case "中国联通":
                    record.icon=record.icon2;
                    break;
                case "中国移动":
                    record.icon=record.icon3;
                    break;
            }

            record.div.append(record.icon)
                .append(record.span3)
                .append(record.span4)
                .append(record.span5);
            record.li.append(record.div);

            record.box.append(record.li);

        })
    }

    $.ajax({
        method:'get',
        url:'../json/date.json',
        data:{
            tel:localStorage.loginNumber
        },
        datatype:"json",
        success:function (datas) {
            var data=datas.content;
            // var data=datas;
                $.each(data, function (i,item) {
                    var time=[];//记录数据中分解出来的时间
                    time.str=item.create_time;//数据中的每一个time
                    time.arr=time.str.split(" ");//分割成数组
                    time.str2=time.arr[0];//获取数组中的年月日
                    time.stry=time.str2.slice(0,4);//只带年
                    time.strmd=time.str2.slice(5);//带有月和日
                    time.strm=time.strmd.slice(0,2);//只带月
                    if (time.stry==year){
                        data1.push(item);
                    }
                });
            var index=data1.length;
            data2=data.slice(index);

            //今年的数据，遍历出每月的数据   从当月到1月
            var datalist1=[];
            for (var j=month;j>0;j--){
                $.each(data1, function (i,item) {
                    var time1=[];
                    time1.arr = item.create_time.split(" ");//解成数组
                    time1.str = time1.arr[0].slice(5);//月日
                    time1.strm = time1.str.slice(0,2);//月
                    if (time1.strm==j){
                        datalist1.push(item)
                    }
                });
                if (datalist1.length){
                    selectData(datalist1);
                }
                datalist1=[];
            }

            //去年的数据，便利出每月的数据   从12月到当前月
            var datalist2=[];
            for (var k=12;k>=month;k--){
                $.each(data2, function (i,item) {
                    var time2=[];
                    time2.arr = item.create_time.split(" ");//解成数组
                    time2.str = time2.arr[0].slice(5);//月日
                    time2.strm = time2.str.slice(0,2);//月

                    if (time2.strm==k){
                        datalist2.push(item)
                    }
                });
                if (datalist2.length){
                    selectData(datalist2);
                }
                datalist2=[];
            }




        }
    });

// 退出登录
    var logout=$(".record .btnBox .logOut");
    logout.bind('click',function () {
        localStorage.clear();
        location.href="../webhtml/welcome.html";
    })
});