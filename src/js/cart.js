require(['config'],function(){
	require(['jquery','mobile'],function($,m){
		//移动端适配
		m.mobile();


		//总价
		var $unit_price = $('.unit_price');
		var $footing = $('.footing');
		var res = 0;
		$unit_price.each(function(i){
			var num = $(this).text();
			var idx = $(this).parent().next().next().find('span').text();
			res += Number(num) * idx;
			// console.log(Number(Number(num).toFixed(2)));
			// console.log(res,idx);
		})
		$footing.text(res.toFixed(1));


		

		//购物车增加的数量
		var $add_img = $('.add_img');
		$add_img.each(function(i){
			$(this).click(function(){
				var num =0;
				//获取img父级上个兄弟元素。
				var span = $(this).parent().prev();
				//获取单价
				var total = span.parent().prev().find('.unit_price').text();
				var spanText = span.text();
				spanText ++;
				span.text(spanText);
				num = total * spanText;
				//点击添加合计
				var res = 0;	
				$unit_price.each(function(i){
					var num = $(this).text();
					var idx = $(this).parent().next().next().find('span').text();
					res += Number(num) * idx;
				})
				$footing.text(res.toFixed(1));
			})

		})


		//购物车删除的数量
		var $del_img = $('.del_img');
		$del_img.each(function(i){
			$(this).click(function(){
				//获取img父级下个兄弟元素。
				var span = $(this).parent().next();
				var productStyle = $(this).parents('.product-style');
				var spanText = span.text();
				if (spanText <= 1) {
					//spanText小于等于1，隐藏product-style
					productStyle.hide();
					spanText =0;
				}else{
					spanText--;
				}
				span.text(spanText);


				//点击添加合计
				var res = 0;	
				$unit_price.each(function(i){
					var num = $(this).text();
					var idx = $(this).parent().next().next().find('span').text();
					res += Number(num) * idx;
				})
				$footing.text(res.toFixed(1));
			})
		})


		//优惠选项
		var $members = $('.members');
		var $With_Offer = $('.With_Offer');

		//单选
		$members.click(function(){
			$members.css({border:0}).find('i').show();
			$members.eq(1).css({border:0}).find('i').show();
			$With_Offer.css({border:'1px solid #d1d1d1'}).find('i').hide();
			//显示隐藏
			$('.twon').hide();
			$('.twob').show();
			$('.threen').hide();
			$('.threeb').show();

			//舌尖会员价显示
			$('.main_clearNone').show();
			// 用券优惠
			$('.main_clearing').hide();
			
			//删除高亮
			$('.threen').find('span').removeClass('unit_price');
			//添加高亮
			$('.threeb').find('span').addClass('unit_price');

			//点击添加合计
			var res = 0;	
			$('.threeb').find('span').each(function(i){
				var num = $(this).text();
				var idx = $(this).parent().next().next().find('span').text();
				res += Number(num) * idx;
			})
			$footing.text(res.toFixed(1));

		})

		$With_Offer.click(function(){
			$With_Offer.css({border:0}).find('i').show();
			$With_Offer.eq(1).css({border:0}).find('i').show();
			$members.css({border:'1px solid #d1d1d1'}).find('i').hide();
			//显示隐藏
			$('.twob').hide();
			$('.twon').show();
			$('.threeb').hide();
			$('.threen').show();

			//舌尖会员价显示
			$('.main_clearing').show();
			// 用券优惠
			$('.main_clearNone').hide();

			//删除高亮
			$('.threeb').find('span').removeClass('unit_price');
			//添加高亮
			$('.threen').find('span').addClass('unit_price');
			//点击添加合计
			var res = 0;	
			$('.threen').find('span').each(function(i){
				var num = $(this).text();
				var idx = $(this).parent().next().find('span').text();
				res += Number(num) * idx;
			})
			$footing.text(res.toFixed(1));

		})
		//全国送商品的单选
		var $checkboxSpan = $('.radios');
		var $productStyle = $('.product-style');
		var $radio_img = $('.radio_img');
		$checkboxSpan.click(function(){
			$footing.text(0);
			if ($(this).attr('class') == 'radios') {
				$(this).find('i').hide();
				$(this).css({border:'1px solid #d1d1d1'});
				$(this).removeClass('radios');
				$radio_img.parent().css({border:'1px solid #d1d1d1'});
				$radio_img.hide();
				$radio_img.parent().removeClass('commodity_radio');
				//结账时的全选
				$btnCkeck.find('i').hide();
				$btnCkeck.css({border:'1px solid #d1d1d1'});
				$btnCkeck.removeClass('btnradio'); 

			}else{
				$(this).find('i').show();
				$(this).css({border:'none'});
				$(this).addClass('radios');
				$radio_img.parent().css({border:'none'})
				$radio_img.show();
				$radio_img.parent().addClass('commodity_radio');
				//结账时的全选
				$btnCkeck.find('i').show();
				$btnCkeck.css({border:'none'});
				$btnCkeck.addClass('btnradio');

				var res = 0;	
				$unit_price.each(function(i){
					var num = $(this).text();
					var idx = $(this).parent().next().next().find('span').text();
					res += Number(num) * idx;
				})
				$footing.text(res.toFixed(1));
			}
		})

		//结账时的全选
		var $btnCkeck = $('.btnCkeck');
		$btnCkeck.on('click',function(){
			$footing.text(0);
			if ($(this).attr('class') == 'btnCkeck btnradio') {
				$(this).find('i').hide();
				$(this).css({border:'1px solid #d1d1d1'});
				$(this).removeClass('btnradio'); 
				$radio_img.parent().css({border:'1px solid #d1d1d1'});
				$radio_img.hide();
				$radio_img.parent().removeClass('commodity_radio');
				//全国送商品的单选
				$checkboxSpan.find('i').hide();
				$checkboxSpan.css({border:'1px solid #d1d1d1'});
				$checkboxSpan.removeClass('radios');
			}else{
				$(this).find('i').show();
				$(this).css({border:'none'});
				$(this).addClass('btnradio');

				$radio_img.parent().css({border:'none'})
				$radio_img.show();
				$radio_img.parent().addClass('commodity_radio');
				//全国送商品的单选
				$checkboxSpan.find('i').show();
				$checkboxSpan.css({border:'none'});
				$checkboxSpan.addClass('radios');


				var res = 0;	
				$unit_price.each(function(i){
					var num = $(this).text();
					var idx = $(this).parent().next().next().find('span').text();
					res += Number(num) * idx;
				})
				$footing.text(res.toFixed(1));
			}
		})


		//产品的选项
		var $lisChe = $('.list_checkbox').find('span');
		$productStyle.on('click','span',function(){
			var res = 0;
			var $hide;
			if ($(this).attr('class') == 'commodity_radio') {
				//true时，隐藏图片，显示边框
				$(this).css({border:'1px solid #d1d1d1'});
				$(this).find('i').hide();
				$(this).removeClass('commodity_radio');
				//把jiage变为0；
				
				$hide = $('.commodity_radio').parent().next().find('.unit_price');
				

			}else{
				//false时，显示图片，隐藏边框
				$(this).css({border:'none'});
				$(this).find('i').show();
				$(this).addClass('commodity_radio');
				$hide = $('.commodity_radio').parent().next().find('.unit_price');
			}

			$hide.each(function(){
				var num = $(this).text();
				var idx = $(this).parent().next().next().find('span').text();
				res += Number(num) * idx;
			})
			$footing.text(res.toFixed(1));
			

			//获取commodity_radio的长度 和 productStyle的长度，判断
			var $cartPro = $('.commodity_radio').length;
			var $productLen = $productStyle.length
			
			if ($cartPro == $productLen) {
				// console.log($(this));
				// 结账时的全选
				$btnCkeck.find('i').show();
				$btnCkeck.css({border:'none'});
				$btnCkeck.addClass('btnradio');
				//全国送商品的全选
				$checkboxSpan.find('i').show();
				$checkboxSpan.css({border:'none'});
				$checkboxSpan.addClass('radios');
			}else{
				//结账时的全选
				$btnCkeck.find('i').hide();
				$btnCkeck.css({border:'1px solid #d1d1d1'});
				$btnCkeck.removeClass('btnradio'); 
				//全国送商品的全选
				$checkboxSpan.find('i').hide();
				$checkboxSpan.css({border:'1px solid #d1d1d1'});
				$checkboxSpan.removeClass('radios');
			}
		})

		var $settle = $('.to-settle-accounts');
		var $clearing = $('#clearing_bottom');
		//点击去结算
		$settle.click(function(){
			$clearing.css({display:'flex'}).animate({top:0})
		})

		// 返回弹框
		var $confirmation = $('.confirmation');
		var $leave = $('.leave');
		$confirmation.on('click','i',function(){
			$leave.show();
		});

		$departure = $('.departure');
		$continue = $('.continue');
		//弹框：离开
		$departure.click(function(){
			$leave.hide();
			$clearing.animate({top:'9.375rem'},function(){
				$clearing.hide();
			});
		})
		//弹框：继续填单
		$continue.click(function(){
			$leave.hide();
		});

		//商品列表页
		$product_list = $('.product_list');
		$productList = $('#productList');
		$proLis_top = $('.proLis_top');
		$product_list.click(function(){
			$productList.css({display:'flex'}).animate({top:0});
		})
		$proLis_top.on('click','span',function(){
			$productList.animate({top:'9.375rem'},function(){
				$productList.hide();
			});
		})

		// 微信
		var $weixin = $('.weixin');
		var $zhifubao = $('.zhifubao');
		$weixin.click(function(){
			$weixin.removeClass('weixin_n');
			$weixin.addClass('weixin_b');
			$zhifubao.removeClass('zhifubao_n');
			$zhifubao.addClass('zhifubao_b');
		})
		//支付宝
		$zhifubao.click(function(){
			$zhifubao.removeClass('zhifubao_b');
			$zhifubao.addClass('zhifubao_n');
			$weixin.removeClass('weixin_b');
			$weixin.addClass('weixin_n');
		})


		//优惠说明
		var $privilege = $('.privilege');
		$privilege.click(function(){
			$('#state').css({display:'flex'}).animate({top:0});
		});


		//红包页
		var $red_packet = $('.red_packet');
		var $red_envelope = $('#red_envelope');
		// $red_packet.on('mousedown',function(){

		// })
		$red_packet.click(function(){
			$red_packet.css({background:'#ddd'});
			$red_envelope.css({display:'flex'}).animate({top:0});
		})

		var $choice = $('.choice_red_envelope');
		$choice.on('click','i',function(){
			$red_packet.css({background:'#fff'});
			$red_envelope.animate({top:'9.375rem'},function(){
				$red_envelope.hide();
			});
		})
		var $address = $('.address');
		var $shippingAddress = $('#shipping_address');
		var $choice_address = $('.choice_address');
		$address.click(function(){
			$shippingAddress.css({display:'flex'}).animate({top:0});
		})
		$choice_address.on('click','i',function(){
			$shippingAddress.animate({top:'9.375rem'},function(){
				$shippingAddress.hide();
			});
		})

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
							localStorage.max =parseInt(localStorage.max) + 1;
							$('.wares_num')[0].innerText = localStorage.max;
							$('.s_car').each(function(l){
								if($('.s_car').eq(l).parent().parent().parent().data('id')===id){
									arr2.push(l);
									console.log(arr2);
									
										for(var k=0;k<=arr2.length-1;k++){
											console.log(arr2[k]);
											localStorage[id] = id;
											localStorage[num] = 1;
											$('.car_num').eq(arr2[k])[0].innerText = localStorage[num];
											
											$('.wares_num').css('display','block');
											
											$('.s_car').eq(arr2[k]).css('display','none');
											console.log($('.s_car').eq(arr2[k]));
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
	})
})



	
