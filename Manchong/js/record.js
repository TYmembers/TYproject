/**
 * Created by Administrator on 2016/10/31.
 */
$(document).ready(function () {


    var record={};
    record.goback=$(".record>.goback");//动态添加记录的标记


    $.ajax({
        method:'get',
        url:'../json/date.json',
        data:{
            tel:localStorage.loginNumber
        },
        datatype:"json",
        success:function (datas) {
            var data=datas.content;
            var today=new Date();
            var month=today.getMonth()+1;//当前月
            var year=today.getFullYear();
            var datalist=[];
            time=[];
            selectDate();
            function selectDate() {
                $.each(data, function (i) {
                    var timestr=data[i].create_time;//数据中的每一个time
                    var timearr=timestr.split(" ");//分割成数组
                    var timestr2=timearr[0];//获取数组中的年月日
                    var timestry=timestr2.slice(0,4);//只带年
                    var timestrmd=timestr2.slice(5);//带有月和日
                    var timestrm=timestrmd.slice(0,2);//只带日
                    if (timestry==year&&timestrm==month){
                        datalist[i]=data[i];
                    }
                });
                console.log(datalist);
                var index=datalist.length;
                data=data.slice(index);
                if (data.length>0){
                    month --;
                    selectDate();
                }
            }

        }
    });
    function createRecord(month) {


        record.li = $("<li></li>");//每个月份下的列表，按天
        record.daybox =($("<h3 class='month'></h3>"));

        record.box = $("<ul class='Relist'></ul>");//列表框
        record.goback.after(record.box);

        record.box.append(record.month);
        record.month =$("<h3 class='month'></h3>");//月份
    }


});