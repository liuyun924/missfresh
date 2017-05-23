  // 顶部点击跳转
  $('.top').on('click', function(e) {
          if (e.target.className != "closebtn") {

              window.open('http://www.baidu.com')

          }
      })
      // 顶部点击收起 
  $('.top .closebtn').on('click', function() {
          setTimeout(function() {
              $('.top').slideUp()
          }, 500)
      })
      // 轮播图

  //导航栏tab标签切换（暂时只有切换类名功能）
  $('.nav li a').on('click', function() {
      $('.nav li a').attr('class', '');
      $(this).attr('class', 'active');
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
      var mySwiper = new Swiper('.swiper-container', {
          autoplay: 2000,
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          loop: true
      })
  })
