require(['config'],function(){
	require(['jquery','mobile','header','swiper'],function($,m,h,s){
		//移动端适配
		m.mobile();

		//头部载入
		$('#header').load('html/header.html',function(){
			h.head();
			//搜索页面效果
			var $header_width = parseInt($('#header').css('width'));
			$('.search_box').css('left',$header_width);
			$('.search').on('click',function(){
				$('.search_box').css('display','block');
				$('.search_box').animate({
					left:0,

				},500);
			});

			$('.back').on('click',function(){
				$('.search_box').animate({
					left:$header_width,
				},500);
			});
		});

		//尾部载入
		$('#footer').load('html/footer.html',function(){

			//如果没有总数量，就创建总数量，并且赋值为0
			if(!localStorage.max){
				localStorage.max = 0;
			}
			//如果总数量为0，购物车数量不显示
			if(localStorage.max == 0){
					$('.wares_num').css('display','none');
			}
			
			//购物车按钮效果
			$('.s_car').each(function(i){
				console.log($('.s_car').eq(i));
				var $Div_wares = $('.s_car').eq(i).parent().parent().parent();
				var id = $Div_wares.data('id');
				var num = id + '_num';
				if(localStorage[num]){
						$('.s_car').eq(i).css('display','none');
						$('.s_car').eq(i).next().css('display','block');
						$('.wares_num').css('display','block');
						console.log(localStorage);
						$('.wares_num')[0].innerText = localStorage.max;
						console.log($('.wares_num'));
						return;
					}
						$('.s_car').eq(i).on('click',function(){
							
							localStorage[id] = id;
							localStorage[num] = 1;
							$('.car_num').eq(i)[0].innerText = localStorage[num];
							localStorage.max =parseInt(localStorage.max) + 1;
							$('.wares_num').css('display','block');
							$('.wares_num')[0].innerText = localStorage.max;
							$(this).css('display','none');
							$(this).next().css('display','block');
							console.log(localStorage);
							//localStorage是一个集合
							//$Div_wares.data('id') 商品id
						});
								
			});
		});		

					

		$.post('/getgoods',function(res){
			var obj = JSON.parse(res);
			$('.wares_news').each(function(i){
				
				var id = $('.wares_news').eq(i).data('id');
				var id_ = parseInt(id) - 1;
				var url = obj[id_].imgUrl;

				var $img_box = $('.wares_news').eq(i).children('.w_n_img_box');
				var $text_box = $('.wares_news').eq(i).children('.w_n_text');
				$img_box.children().attr('src',url.slice(3));
				$text_box.children('.text_p1')[0].innerText = obj[id_].title;
			 	$text_box.children('.text_p2')[0].innerText = obj[id_].adword;

			 	$text_box.children('.text_prices').children('.t_p_num')[0].innerText = obj[id_].originPrice;
			 	$text_box.children('.text_vip_prices').children('.t_v_p_num')[0].innerText = obj[id_].discount;
				
				
			});
		});
		

		//购物车删减效果
		$('.car_remove').each(function(i){
			$('.car_remove').eq(i).on('click',function(){
				localStorage.max = parseInt(localStorage.max) - 1;
				if(localStorage.max == 0){
					$('.wares_num').css('display','none');
				}				
				var id = $(this).parent().parent().parent().parent().data('id');
				var num = id + '_num';
				localStorage.removeItem(num);
				$('.wares_num')[0].innerText = localStorage.max;
				var val = parseInt($('.car_num')[i].innerText);
				if(val == 1){
					$(this).parent().css('display','none');
					$(this).parent().prev().css('display','block');
					return;
				}else{
					$('.car_num')[i].innerText = val - 1;
				}

			});
		})

		//购物车添加效果
		$('.car_add').each(function(i){
			var id = $(this).parent().parent().parent().parent().data('id');
			var num = id + '_num';
			$('.car_add').eq(i).on('click',function(){
				localStorage.max = parseInt(localStorage.max) + 1;
				localStorage[num] = parseInt(localStorage[num]) + 1;
				$('.wares_num')[0].innerText = localStorage.max;
				var val = parseInt($('.car_num')[i].innerText);

				$('.car_num')[i].innerText = val + 1; 
			})
		});
		
		//单个商品数量显示
		$('.car_num').each(function(i){
			var id = $('.car_num').eq(i).parent().parent().parent().parent().data('id');

			var num = id + '_num';
			
			$('.car_num').eq(i)[0].innerText = localStorage[num];
		});
		
	})
});
