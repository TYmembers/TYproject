/**
 * Created by Administrator on 2016/10/31.
 */
$(document).ready(function () {


    var record={};
    record.goback=$(".record>.goback");//动态添加记录的标记
    record.box = $("<ul class='Relist'></ul>");//列表框
    record.month =$("<h3 class='month'>本月</h3>");//月份
    record.li = $("<li></li>");//每个月份下的列表，按天
    record.daybox =($("<h3 class='month'></h3>"));

    $.ajax({
        method:'get',
        url:'../json/date.json',
        data:{
            tel:localStorage.loginNumber
        },
        datatype:"json",
        success:function (datas) {
            var data=datas.content;
            $.each(data, function (i) {
                var time=[i];
                    time[i]=data[i].create_time;
                console.log(time);
            })
        }
    });

    record.goback.after(record.box);
    record.box.append(record.month);

});