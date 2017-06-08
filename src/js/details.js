window.onload = function() {
    //  通过localStorage获取id
    // localStorage.setItem("click", 3);
    var currentID = localStorage.getItem("click");
    if (!localStorage.click) {
        alert("好像没有选择商品哦,快去买买买吧~");
        history.go(-1);
    }
    // 发送ID到express.js并动态获取数据替换结构
    $.post("/todetail", { dataId: currentID }, function(res) {
        //  title
        $(".top h1.title").html(res.title);
        $(".ng-binding").eq(0).html(res.title);
        //  img
        $(".carouserBox img.maingood").attr("src", res.imgUrl);
        //  广告词
        $(".title-product").text(res.adword);
        //  可用券价格
        $(".price-currency").text("￥" + res.discount);
        //  现在价格
        $(".pricenow").text(res.originPrice);
        //  已售多少份
        $(".cellnum").text("已售" + res.sellCounts + "份");
        //  亮点
        var highPoint = eval("(" + res.sellPoint + ")")

        $(".sp").eq(0).text(highPoint.sp1);
        $(".sp").eq(1).text(highPoint.sp2);
        $(".sp").eq(2).text(highPoint.sp3);

        //  详情
        var goodDetails = res.goodDetails
        goodDetails = eval('(' + goodDetails + ')');
        $('.detail-info').eq(0).text(goodDetails.norms);
        $('.detail-info').eq(1).text(goodDetails.weight);
        $('.detail-info').eq(2).text(goodDetails.package);
        $('.detail-info').eq(3).text(goodDetails.expirationDate);
        $('.detail-info').eq(4).text(goodDetails.save);
    }, "json");

    // ------------------------------------------------------------------------------------------------------
    // 点击分享按钮
    var $shareicon = $(".top .share");
    var $shareitem = $(".share-menu");
    var $closebtn = $shareitem.find('.share-btn')
    var $cover = $('.cover')
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

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 点击后退按钮
    $('.back').click(function(e) {
        e.preventDefault();
        // 清click
        localStorage.setItem("click", "");
        history.go(-1)
    })

    // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 购物车
    $("#toCart  .car").on("click", function() {
            location.href = "shopping_cart.html"
        })
        // var localStorage = localStorage.getItem('')
        //如果没有总数量，就创建总数量，并且赋值为0
    if (!localStorage.max) {
        localStorage.max = 0;
    } else {
        // 如果有数量 写入购物车图标
        $('.wares_num').css('display', 'block').html(localStorage.max);
    }
    //如果总数量为0，购物车数量不显示
    if (localStorage.max == 0 && (!$(".wares_num"))) {
        $('.wares_num').css('display', 'none');
    }
    // 点击加入购物车
    $("#toCart .addTocar ").on("click", function() {
        localStorage.max++
            $('.wares_num').css('display', 'block').html(localStorage.max);
    })
}