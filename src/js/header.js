define(['jquery'], function($) {
    return {
        head: function() {
            $('.top').on('click', function(e) {
                    if (e.target.className != "closebtn") {

                        window.open('http://www.baidu.com');

                    }
                })
                // 顶部点击收起 
            $('.top .closebtn').on('click', function() {
                    setTimeout(function() {
                        $('.top').slideUp()
                    }, 500)
                })
                // 轮播图

            //导航栏tab标签切换
            $('.nav li').each(function(i) {
                $(this).on('click', function() {
                    $('.nav li a').attr('class', '');
                    $(this).children().attr('class', 'active');
                    var $main1_width = parseInt($('.main1').css('width'));
                    $('.main').css('transition-duration', '300ms')
                    $('.main').css('transform', 'translate3d(-' + i * $main1_width + 'px,0px,0px)')
                })
            });

            document.addEventListener('touchstart', function(e) {
                console.log($('.main').css('left'));
            });
            // <!-- 内容推荐（小鲜说） -->
            var idx = 0;
            var $ul = $('.notice .wrap ul');
            var $lis = $ul.find('li')

            // 克隆第一个标签,插到末尾
            $ul.find('.first').clone('true').appendTo($ul);

            function changeIdx() {
                idx++;
                if (idx > 2) {
                    // 立即切换到初始状态 实现无缝
                    $ul.css({
                        top: 0
                    })
                    idx = 1
                }
            }
            setInterval(function() {
                changeIdx()
                $ul.animate({
                    top: -38 * idx
                })
            }, 3000)

            // 每日秒杀--------------------------
            setInterval(function() {
                var now = new Date()
                var hour = 24 - now.getHours();
                var minute = 60 - now.getMinutes();
                var second = 60 - now.getSeconds();
                var Msec = 10 - parseInt((now.getMilliseconds() / 100).toFixed(2));
                // 补0
                ("" + hour).length < 2 ? hour = "0" + hour : hour;
                ("" + minute).length < 2 ? minute = "0" + minute : minute;
                ("" + second).length < 2 ? second = "0" + second : second;
                $('.seckill .hour').text(hour);
                $('.seckill .min').text(minute);
                $('.seckill .sec').text(second);
                $('.seckill .milsec').text(Msec);
            }, 100)

            // 轮播图 swiper插件
            $(function() {
                var mySwiper = new Swiper('.carousel_box', {
                    autoplay: 2000,
                    pagination: '.swiper-pagination',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    loop: true,

                    autoplayDisableOnInteraction: false,
                });

                var indexSwiper = new Swiper('.swiper_box', {

                });
            });

        }
    }
});
