require(['config'],function(){
	require(['jquery','mobile','header','swiper'],function($,m,h,s){
		//移动端适配
		m.mobile();

<<<<<<< HEAD
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
=======


		//购物车按钮效果
		$('.s_car').each(function(i){
			$('.s_car').eq(i).on('click',function(){
				$(this).css('display','none');
				$(this).next().css('display','block');
>>>>>>> 334896f0b39c6d7509943ab7b1d0ca89729cf0a2
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
			var arr2 = [];
			$('.s_car').each(function(i){
				
							
				
						$('.s_car').eq(i).on('click',function(){
							var id = null;
							var arr2 = []; 
							var $Div_wares = $(this).parent().parent().parent();
							 id = $Div_wares.data('id');
							var num = id + '_num';
							localStorage.max =parseInt(localStorage.max) + 1;
							$('.wares_num')[0].innerText = localStorage.max;
							$('.s_car').each(function(l){
								if($('.s_car').eq(l).parent().parent().parent().data('id')===id){
									arr2.push(l);
									// console.log(arr2);
									console.log(arr2);
										for(var k=0;k<=arr2.length-1;k++){
											
											localStorage[id] = id;
											localStorage[num] = 1;
											$('.car_num').eq(arr2[k])[0].innerText = localStorage[num];
											
											$('.wares_num').eq(arr2[k]).css('display','block');
											
											$('.s_car').eq(arr2[k]).css('display','none');
											
											$('.s_car').eq(arr2[k]).next().css('display','block');
										}
									
								}
								
						});
							
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
		// var arr = [];
		// var arr1 = [];
		//购物车删减效果
		$('.car_remove').each(function(i){

			$('.car_remove').eq(i).on('click',function(){
				var arr = [];
				localStorage.max = parseInt(localStorage.max) - 1;
				var id = $(this).parent().parent().parent().parent().data('id');
				var num = id + '_num';
				var val = $('.car_num').eq(i)[0].innerText;
				if(localStorage.max == 0){

					$('.wares_num').css('display','none');

					
				}				
				localStorage[num] = parseInt(localStorage[num]) - 1;
				$('.car_remove').each(function(l){
					if($('.car_remove').eq(l).parent().parent().parent().parent().data('id')===id){
						arr.push(l);
						if(val ==1){
							for(var k=0;k<=arr.length-1;k++){
								
								$('.add_remove').eq(arr[k]).css('display','none');
								$('.s_car').eq(arr[k]).css('display','block');
								localStorage.removeItem(num);
								localStorage.removeItem(id);

								// console.log(localStorage);
							}
						}else{
							for(var k=0;k<=arr.length-1;k++){

								$('.car_num').eq(arr[k])[0].innerText = localStorage[num];
							}
							
						}
					}
				});
				
				
				
				
				$('.wares_num')[0].innerText = localStorage.max;
				

			});
		})

		//购物车添加效果
		$('.car_add').each(function(i){
			var id = $(this).parent().parent().parent().parent().data('id');
			var num = id + '_num';
			$('.car_add').eq(i).on('click',function(){
				var arr1 = []
				localStorage.max = parseInt(localStorage.max) + 1;
				localStorage[num] = parseInt(localStorage[num]) + 1;
				$('.wares_num')[0].innerText = localStorage.max;
				var val = parseInt($('.car_num')[i].innerText);

				$('.car_add').each(function(l){
					if($('.car_add').eq(l).parent().parent().parent().parent().data('id')===id){
						arr1.push(l);
						
							for(var k=0;k<=arr1.length-1;k++){
								// console.log(localStorage[num]);
								$('.car_num').eq(arr1[k])[0].innerText = localStorage[num];
							}
						

					}
				});
			})
		});
		
<<<<<<< HEAD
		//单个商品数量显示
		$('.car_num').each(function(i){
			var id = $('.car_num').eq(i).parent().parent().parent().parent().data('id');

			var num = id + '_num';
			
			$('.car_num').eq(i)[0].innerText = localStorage[num];
		});
=======
		//搜索页面效果
		
		$('#header').load('html/header.html',function(){
			h.head();
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
			})
		});
		$('#footer').load('html/footer.html');		

>>>>>>> 334896f0b39c6d7509943ab7b1d0ca89729cf0a2
		
	})
});
