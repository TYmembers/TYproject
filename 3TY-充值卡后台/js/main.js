/**
 * Created by Administrator on 2016/11/7.
 */
(function () {
    function init() {
        modifyAdminPassword();//修改登录的管理员密码
        changePage();//iframe的选项卡
    }
    //修改登录的管理员密码
    function modifyAdminPassword() {
        $('#modiAdminPsd').bind('click',function () {
            $('.modify-admin-box').show();
            $('.modify-admin-box .close-btn').bind('click', function () {
                $(this).parents('.modify-admin-box').hide();
            });
            $(".modify-admin-box .yes").bind('click', function () {
                var oldPSD = $('#oldAdminPSD').val();
                var newPSD = $('#newAdminPSD').val();
                if (testPSD(newPSD) && testPSD(oldPSD)) {
                    $.ajax({
                        type: "post",
                        url: "../json/add.json",
                        data: {
                            old: oldPSD,
                            new: newPSD
                        },
                        datatype: "json",
                        success: function (data) {
                            if (data.code == 1) {
                                $(".modify-box").hide();
                                window.myAlert("修改密码成功！");
                            } else {
                                $(".modify-box").hide();
                                window.myAlert(data.message);
                            }

                        }
                    });
                } else {
                    alert('密码必须为6-16位数字和字母');
                    return false;
                }
            });
        })
    }
    //测试密码
    function testPSD(psd) {
        var pattern=/^[0-9a-zA-Z_#]{6,16}$/;
        return pattern.test(psd);

    }

    function changePage() {
        var anchors=[
            "generate.html",
            "active.html",
            "record.html",
            "users.html",
            "admin.html"
        ];//iframe的连接们

        var menu={};//系统菜单
        menu.slide =$('.menu .head .slide');
        menu.body = $('.menu ul.body');//菜单整体
        menu.li = $(".menu ul.body li");//每条菜单
        menu.nav=$('.content .nav .text');//上部的灵活导航
        menu.navli=$('.content .nav li');//导航的li容器
        menu.close =$('.content .nav .close');//关闭iframe的按钮
        //菜单滑动
        menu.slide.bind('click',function () {
          menu.body.slideToggle();
        });


        var page={};//选项卡页面
        page.page = $('section.content');//index中的页面容器
        page.part=$("section.content .part");

        //切换选项卡
        menu.li.bind('click',function () {
           $(this).addClass('active').siblings("li").removeClass('active');
            x=$(this).index();
            menu.navli.eq(x).show().addClass('active').siblings("li").removeClass('active');

            menu.nav.bind('click',function () {
                $(this).parent("li").addClass('active').siblings("li").removeClass('active');
                var x = $(this).parent().index();
                menu.li.eq(x).addClass('active').siblings('li').removeClass('active');
                createIframe(anchors[x],x);
            });

            //导航关闭按钮,只有链接当前页面的导航可点击
            menu.close.bind('click',function () {
                if ($(this).parent('li').hasClass('active')){
                    $(this).css('pointer-events','all');
                    var visili=$(this).parents("ul.nav").children('li:visible');
                    var length=visili.length;//当前显示导航的长度

                    if (length == 1){
                        page.part.empty().append("<p class='welcome'>亲爱的管理员，欢迎回到充值卡后台！</p>");
                        menu.li.removeClass('active');
                        $(this).parent().hide();
                        location.replace(location.href);
                        return false;
                    }else{
                        var x=$(this).parent().index();//当前的总体下标
                        var lispre=$(this).parent().hide().prevAll("li:visible");
                        var lisnext=$(this).parent().hide().nextAll("li:visible");
                        $(this).parent().hide().prevAll("li:visible:first").addClass('active')
                            .siblings('li').removeClass('active');

                        var y=$(".content .nav li.active").index();
                        console.log(y);

                        menu.li.eq(x).removeClass('active');
                        menu.li.eq(y).addClass('active');


                        createIframe(anchors[y],y)
                    }

                }else{
                    $(this).css('pointer-events','none');
                }
            });





            createIframe(anchors[x],x);
            function createIframe(anchor,m) {
                page.part.empty();
                page.iframe=$('<iframe frameborder="0" scrolling="no"></iframe>');
                page.iframe.attr('id',"ifarame"+parseInt(m+1));
                page.iframe.attr('src',anchor);
                page.part.append(page.iframe);
            }
        });


    }

    init();
})();