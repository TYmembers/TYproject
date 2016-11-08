/**
 * Created by Administrator on 2016/11/7.
 */
(function () {
    function init() {
        generateMenu();//生成菜单的样式
    }

    function generateMenu() {
        var menu={};
        menu.head=$(".menu .head");//系统菜单
        menu.body = $('.menu .body');//菜单整体
        menu.li=$(".menu .body>li");//菜单选项

        menu.page = $('.part');//与菜单对应的页面、
        menu.navli=$(".content .nav li");//生成页面的上部导航
        menu.close =$('.content .nav .close');//关闭页面的按钮


        menu.head.bind('click',function () {
            menu.body.slideToggle("slow");
        });
        //
        menu.li.bind('click',function () {
            $(this).addClass('active').siblings("li").removeClass('active');
            var n=$(this).index();
            menu.page.eq(n).show().siblings('div.part').hide();//选项卡
            menu.navli.eq(n).show().bind('click',function () {
                var x=$(this).index();
                menu.page.eq(x).show().siblings('div.part').hide();
            });


            menu.close.bind('click',function () {
                $(this).parent("li").hide();
                var m=$(this).parents('li').index();
                console.log(m);
                menu.page.eq(m).hide();
            });

        });

    }


    init();
})();