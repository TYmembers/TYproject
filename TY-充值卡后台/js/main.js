/**
 * Created by Administrator on 2016/11/7.
 */
(function () {
    function init() {
        changePage();//iframe的选项卡
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
        //菜单滑动
        menu.slide.bind('click',function () {
          menu.body.slideToggle();
        });

        var page={};//选项卡页面
        page.page = $('section.content');//index中的页面容器
        page.navli=$('.content .nav li');
        //切换选项卡
        menu.li.bind('click',function () {
           $(this).addClass('active').siblings("li").removeClass('active');
            page.page.empty();
            var x=$(this).index();
            createIframe(anchors[x]);

        });

        function createIframe(anchor) {
            page.iframe=$('<iframe frameborder="0" scrolling="no"></iframe>');
            page.iframe.attr('src',anchor);
            page.page.append(page.iframe);
        }
    }

    init();
})();