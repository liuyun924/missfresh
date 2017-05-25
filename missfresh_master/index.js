$(function(){
    $("#toggle").click(function(){
        $("aside").toggleClass("sideshow");
        if ($("aside").hasClass("sideshow")) {
            $("aside").animate({width:'230px'});
            $(".main").animate({paddingLeft:"230px"});
        } else {
            $("aside").animate({width:'0px'});
            $(".main").animate({paddingLeft:"0px"});
        }
    });

    $('.box').css('display','none');
    // $('.accounts').click(function(){
    //     $('.boxaccounts').css('display','block').siblings().css('display','none');
    // }); 

    $('.goodslist').click(function(){
        $('.boxgoodslist').css('display','block').siblings().css('display','none');
            // 从数据库获得商品数据

                var erp = erp || {};
                erp.baseUrl = 'http://127.0.0.1:888/';
            $.post(erp.baseUrl +  'getgoods', function(response){
                    var data_arr=JSON.parse(response);

                   $('.boxgoodslist').find('tbody').html(
                   data_arr.map(function(item){
                        return `<tr>
                                <th><input type="checkbox"></th>
                                <th>${item.dataId}</th>
                                <td><img src="${item.imgUrl}"></td>
                                <td>${item.title}</td>
                                <td>${item.originPrice}</td>
                                <td>${item.discount}</td>
                                <td>${item.sellCounts}</td>
                                </tr>`
                      })
                    )
                    
                })

    });


    // 添加商品
    $('.addgoods').click(function(){

        $('.addwindow').css('display','block');

    })

    $('.addcancel').click(function(){
         $('.addwindow').css('display','none');

    })
    // 添加商品信息
    $('.addok').click(function(){
        $('.addwindow').css('display','none');
        var dataid=$('.addwindow').find('input').eq(0).val();
        var img=$('.addwindow').find('input').eq(1).val();
        var adword=$('.addwindow').find('input').eq(2).val();
        var title=$('.addwindow').find('input').eq(3).val();
        var originprice=$('.addwindow').find('input').eq(4).val();
        var discount=$('.addwindow').find('input').eq(5).val();
        var sellcounts=$('.addwindow').find('input').eq(6).val();
        var sellpoint=$('.addwindow').find('textarea').eq(0).val();
        var gooddetails=$('.addwindow').find('textarea').eq(1).val();

        var erp = erp || {};
        erp.baseUrl = 'http://127.0.0.1:888/';
        $.post(erp.baseUrl +  'addgoods', {
                    dataId:dataid,
                    imgUrl:img,
                    adword:adword,
                    title:title,
                    originPrice:originprice,
                    discount:discount,
                    sellCounts:sellcounts,
                    sellPoint:sellpoint,
                    goodDetails:gooddetails
                }, function(response){
                    if(response.status){
                        console.log(response.status)
                       alert('商品添加成功');
                    } else {
                        alert(response.status);
                        console.log(response.status)
                    }
                })

            

    })
});