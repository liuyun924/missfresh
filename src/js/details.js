 $(function() {
     var $shareicon = $(".top .share");
     var $shareitem = $(".share-menu");
     var $closebtn = $shareitem.find('.share-btn')
     var $cover = $('.cover')
         // 点击分享按钮
     $shareicon.on("click", function(event) {
             // 阻止默认行为
             event.preventDefault()
             $cover.fadeIn("fast", function() {
                 $shareitem.slideToggle("fast")
             });
         })
         // 点击关闭按钮
     $closebtn.on("click", function() {
             $shareitem.slideToggle("fast", function() {
                 $cover.fadeOut("fast")
             })
         })
         // 点击cover的时候
     $cover.on("click", function() {
         // 如果分享部分存在
         if ($shareitem.css('display') == "block") {
             $shareitem.slideToggle("fast", function() {
                 $cover.fadeOut("fast")
             })

         }
     })

 })
