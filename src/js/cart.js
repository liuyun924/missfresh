require(['config'],function(){
	require(['jquery','mobile'],function($,m){
		//移动端适配
		m.mobile();
				var arr =[];

		for (var i = 1; i <=13; i++) {
			if(localStorage[i]){
				arr.push(localStorage[i]);
			}

		}
		$.post('./../../getgoods',function(res){
			var obj = JSON.parse(res);
			// console.log(obj);
			$('.main_list').html(arr.map((item)=>{
				console.log(obj[item]);
				console.log( obj[parseInt(item)-1]);
				var num = item + '_num';
				return `
				<div class="product-style">
					<div class="list_checkbox">
						<span class="commodity_radio">
							<i class="radio_img"></i>
						</span>
					</div>
					<a href="#">
						<div class="list_img">
							<img src="${obj[parseInt(item)-1].imgUrl}" alt="">
						</div>
						<div class="list_introduce">
							<ul>
								<li class="lis_title">${obj[parseInt(item)-1].title}</li>
								<li class="lis_one">广东风味</li>
								<li class="lis_two">
									<s class="twob">
										<i>舌尖会员价</i>
										<i>¥</i>
										<span class="twoVip">${obj[parseInt(item)-1].discount}</span>
									</s>
									<s class="twon">
										<i>可用券价</i>
										<i>¥</i>
										<span class="twoVip">${obj[parseInt(item)-1].originPrice}</span>
									</s>
								</li>
								<li class="lis_three">
									<s class="threeb"><i  class="threeI">可用券价</i>
										<b>¥</b>
										<span class="unit_price">${obj[parseInt(item)-1].originPrice}</span>
									</s>
									<s class="threen">
										<i>舌尖会员价</i>
										<b>¥</b>
										<span>${obj[parseInt(item)-1].discount}</span>
									</s>
									<div class="list_count">
										<i><img src="../img/cart_img/reduce-img.png" alt="" class="del_img"></i>
										<span>${localStorage[num]}</span>
										<i><img src="../img/cart_img/add-img.png" alt="" class="add_img"></i>
									</div>
								</li>
							</ul>
						</div>
					</a>	
				</div>
				`
			})
			)


			$('.list_cate').find('ul').html(arr.map((item)=>{
			
				var num = item + '_num';
				return `
				<li>
					<div class="pro_li_left"><img src="${obj[parseInt(item)-1].imgUrl}" alt=""></div>
					<div class="pro_li_right">
						<ul>
							<li class="list_1">
								<p>${obj[parseInt(item)-1].title}
									<span><b>${localStorage[num]}</b>件</span>
								</p>
							</li>
							<li class="list_2"><span>2小时达</span></li>
							<li class="list_3">
								<span class="span1">可用券价<b>￥${obj[parseInt(item)-1].originPrice}</b></span>
								<span class="span2">舌尖会员价<b>￥${obj[parseInt(item)-1].discount}</b></span>
							</li>
						</ul>
					</div>
				</li>
				`
			})
			)


			$('.pro_lis_left').html(arr.map((item)=>{
			
				var num = item + '_num';
				return `
				<div class="img_item">
					<img src="${obj[parseInt(item)-1].imgUrl}" alt="">
				</div>
				`
			})
			)
		});


		setTimeout(function(){
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
				var $radio_img = $(this).parents('.product-style').find('.radio_img');
				if ($radio_img.attr('class') == 'radio_img') {
					
					//单价
					var span = $radio_img.parents('.product-style').find('.unit_price').text();
					// 数量
					var number = $radio_img.parents('.product-style').find('.list_count').find('span');
					var numberText = number.text();
					numberText ++;
					// console.log(number);
					number.text(numberText);
					num = numberText * span;
					//点击添加合计
					var res = 0;	
					$unit_price.each(function(i){
						var num = $(this).text();
						var idx = $(this).parent().next().next().find('span').text();
						res += Number(num) * idx;
						$footing.text(res.toFixed(1));

						for(var i=0;i<=arr.length-1;i++){
							var id = arr[i];
							var num = id + '_num';
						}
						localStorage[id + 1];
						localStorage[num + 1];
					})
				}else{
					$('.pop_up').show();
				}
				
			})

		})
		


		//购物车删除的数量
		var $del_img = $('.del_img');
		$del_img.each(function(i){
			$(this).click(function(){
				var num =0;
				//获取img父级上个兄弟元素。
				var $radio_img = $(this).parents('.product-style').find('.radio_img');
				var $productStyle = $(this).parents('.product-style');
				if ($radio_img.attr('class') == 'radio_img') {
					//单价
					var span = $radio_img.parents('.product-style').find('.unit_price').text();
					// 数量
					var number = $radio_img.parents('.product-style').find('.list_count').find('span');
					var numberText = number.text();
					if (numberText <= 1) {
						//spanText小于等于1，隐藏product-style
						$productStyle.hide();
						numberText =0;
					}else{
						numberText--;
					}
				}else{
					$('.pop_up').show();
				}
				number.text(numberText);
				num = numberText * span;
				console.log(num);
				//点击添加合计
				var res = 0;	
				$unit_price.each(function(i){
					var num = $(this).text();
					var idx = $(this).parent().next().next().find('span').text();
					res += Number(num) * idx;

					$footing.text(res.toFixed(1));

					for(var i=0;i<=arr.length-1;i++){
						var id = arr[i];
						var num = id + '_num';
						console.log(id);
					}
					localStorage.removeItem(id);
					localStorage.removeItem(num);
				})
			})
		})
		//弹框页面
		$('.pop_up').on('click','span',function(){
			$('.pop_up').hide();
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
				$(this).find('i').removeClass('radio_img');
				$(this).removeClass('commodity_radio');
				//把jiage变为0；
				
				$hide = $('.commodity_radio').parent().next().find('.unit_price');
				

			}else{
				//false时，显示图片，隐藏边框
				$(this).css({border:'none'});
				$(this).find('i').show();
				$(this).find('i').addClass('radio_img');
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

		//新增收货地址1
		$addAddress = $('.addAddress');
		$addAddress.click(function(){
			$('.new_address').css({display: 'flex',}).animate({right:0});
		})

		// 新增收货地址2
		$choices_address = $('.choices_address');
		$choices_address.on('click','i',function(){
			$('.new_address').animate({right: '-7.8125rem'},function(){
				$('.new_address').hide();
			})
		})


		//地址类型
		$type_checked = $('.type_checked');
		$type_checked.on('click','span',function(){
			$(this).addClass('Highlight');
			$(this).siblings().removeClass('Highlight');
		})
	},500);
		//总价
		




	// 	//尾部载入
	// 	$('#footer').load('footer.html');	
	// })
	})
})
