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

               
            $.post('/getgoods', function(response){
                    var data_arr=JSON.parse(response);

                   $('.boxgoodslist').find('tbody').html(
                   data_arr.map(function(item){
                        return `<tr>
                                <td><input type="checkbox" class="danxuan"></td>
                                <td>${item.dataId}</td>
                                <td>${item.imgUrl}</td>
                                <td>${item.title}</td>
                                <td>${item.originPrice}</td>
                                <td>${item.discount}</td>
                                <td>${item.sellCounts}</td>
                                <td><button class="btn btn-sm delgoods">删除该商品</button></td>
                                </tr>`
                      })
                    )
                    
                })

    });


    // 添加商品
    $('.addgoods').click(function(){

        $('.addwindow').css('display','block');
        $('.addwindow').find('input').val('');
         $('.addwindow').find('textarea').val('');


    })

    $('.addcancel').click(function(){
         $('.addwindow').css('display','none');
          $('.addwindow').find('input').val('');
         $('.addwindow').find('textarea').val('');

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

        // 添加到页面
        var newgoods=`
                        <td><input type="checkbox" class="danxuan"></td>
                        <td>${dataid}</td>
                        <td>${img}</td>
                        <td>${title}</td>
                        <td>${originprice}</td>
                        <td>${discount}</td>
                        <td>${sellcounts}</td>
                        <td><button class="btn btn-sm delgoods">删除该商品</button></td>
                        `
        var $tr=$('<tr/>');
        $tr.html(newgoods).appendTo($('tbody'));


        $.post('/addgoods', {
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


    // 删除单个商品
    var $tbody = $('.boxgoodslist').find('tbody');

        $tbody.on('click','button',function(e){
         var dataid = $(this).parents('tr').find('td').eq(1).text();
         
                      
                $.post('/delgoods',{dataId:dataid},function(response){
                    if(response.status){
                        console.log(response.status)
                       alert('成功删除此商品');
                    } else {
                        alert(response.status);
                        console.log(response.status);
                    }
                })
                $(this).parents('tr').remove();
        })
        
        
      
       
       


    
         

            



   
});