require(['config'],function(){
	require(['jquery','mobile','header','swiper'],function($,m,h,s){
		//移动端适配
		m.mobile();
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
		//延迟代码执行
		$(function($){
			//头部载入
			
	
			
			$.post('/getgoods',function(res){
				$('.loading').css('display','none');	
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
			
			//单个商品数量显示
			$('.car_num').each(function(i){
				var id = $('.car_num').eq(i).parent().parent().parent().parent().data('id');

				var num = id + '_num';
				
				$('.car_num').eq(i)[0].innerText = localStorage[num];
			});	

			//高仿动态加载。（或许也能叫懒加载） 
			$('.jiazai').each(function(num){
				$('.jiazai').eq(num).css('opacity',0);
				$('.jiazai').eq(num).css('display','none');
			});

			$('.main1').each(function(num){
				var $main1 = $('.main1').eq(num);
				
				var l = 0;
				$main1[0].addEventListener('touchmove',function(){
					
					if($main1.scrollTop() > 400){
						
						// setInterval(function(){},1500);
						// for(var l=0;l<=2;l++){}
							if(l>=3){
								l = 0;
							}
							var num1 = l+3*num;//每个div的jiazai都有规律
							 
							$('.jiazai').eq(num1).css('display','block');
							$('.jiazai').eq(num1).animate({opacity: 1},1000,function(){
								l++;
							});
						
					}
					
				});
				
			});
			
			//搜索
			$('.search_button').on('click',function(){

				var val = $('.input_box input').val();
				if(val === ''){
					$('.search_result')[0].innerText = "请输入内容";
					$('.search_result').css('color','red');
					$('.search_result').css('display','block');
					return;
				}
				$('.search_result')[0].innerText = "搜索结果如下";
				$('.search_result').css('color','#020');
				$('.search_result').css('display','block');
				$.post('/sergoods',{keyword:val},function(res){
					if(res.length == 0){
						$('.search_result')[0].innerText = "抱歉···搜索不到您想要的商品";
					}else{
						$('.search_create').css('display','block');
						
						res.forEach(function(item){
							
							var $wares1 = $('<div/>').addClass('wares1');
							$wares1.appendTo($('.search_create'));
							$wares1.attr('dataId',item.dataId);
							var $wares1_news = $('<div/>').addClass('wares1_news');
							$wares1_news.appendTo($wares1);

							var $wares1_text = $('<div/>').addClass('wares1_text');
							$wares1_text.appendTo($wares1);

							var $wares1_news_img = $('<img/>').addClass('wares1_news_img');
							$wares1_news_img[0].src = item.imgUrl.slice(3);
							$wares1_news_img.appendTo($wares1_news);

							var $wares1_text_p1 = $('<p/>').addClass('wares1_text_p1');
							var $wares1_text_p2 = $('<p/>').addClass('wares1_text_p2');
							$wares1_text_p1.appendTo($wares1_text);
							$wares1_text_p2.appendTo($wares1_text);

							var $wares1_text_prices = $('<p/>').addClass('wares1_text_prices');
							var $wares1_text_vip = $('<P/>').addClass('wares1_text_vip');
							$wares1_text_prices.appendTo($wares1_text);
							$wares1_text_vip.appendTo($wares1_text);

							$wares1_text_p1[0].innerText = item.title;
							$wares1_text_p2[0].innerText = item.adword;
							$wares1_text_vip[0].innerText = "会员价：￥" + item.discount;
							$wares1_text_prices[0].innerText = "可用券价：￥" + item.originPrice;

							});	
							$('.wares1').on('click',function(e){
								
								if(e.target.tagName.toLowerCase() === 'img'){
									localStorage.click = $(this).attr('dataId');
								}								
						});
					}
					
					

				});
			});	

		
			//搜索框吸顶
			$('.search_box')[0].addEventListener('touchmove',function(){
				var top = $('.search_box').scrollTop();
				if(top>=1){
					$('.search_div').css('position','fixed');
				}else{
					$('.search_div').css('position','');
				}

			});

			$('.wares_news').on('click',function(e){
				if(e.target.tagName.toLowerCase() === 'img'){
					localStorage.click = $(this).attr('data-id');

				}
				
			});

		})
		
	})
});
