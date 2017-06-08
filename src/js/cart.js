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
  		
  		// 购物车删除的数量
  		var $del_img = $('.del_img');
  		$del_img.click(function() {
  			var t = $(this).parents('.list_count').find('span');
  			t.text(parseInt(t.text()) - 1);
  			if (t.text() < 1) {
  				t.text(0);
          $(this).parents('.product-style').hide();
           // localStorage.removeItem()
  			}
  			TotalPrice();
  		});

  		//购物车增加的数量
  		var $add_img = $('.add_img');
      $add_img.click(function() {
        var t = $(this).parents('.list_count').find('span');
        t.text(parseInt(t.text()) + 1);
        if (t.text() <= 1) {
          t.text(1);
        }
        TotalPrice();
      });
  		
      var $Shops = $('.radios'); //获取全国送的单选
      var $btnCkeck = $('.btnCkeck'); //总价的全选
      //产品单选按钮
      $(".commodity_radio").click(function() {
        if ($(this).find('i').attr('class') == 'radio_img') {
          $(this).find('i').hide();
          $(this).find('i').removeClass('radio_img');
          $(this).css({border:'1px solid #d1d1d1'});
          TotalPrice();
        }else{
          $(this).find('i').show();
          $(this).find('i').addClass('radio_img');
          $(this).css({border:'none'});
          TotalPrice();
        }
        var goods = $(this).closest(".main_list").find(".commodity_radio"); //获取本店铺的所有商品
        var goodsC = $(this).closest(".main_list").find(".radio_img"); //获取本店铺所有被选中的商品
        if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
          $Shops.find('i').show(); //店铺全选按钮被选中
          $Shops.find('i').addClass('radioImg');//添加类名
          $Shops.css({border:'none'})
          $btnCkeck.find('i').show();
          $btnCkeck.css({border:'none'})
        } else { //如果选中的商品不等于所有商品
          $Shops.find('i').hide(); //店铺全选按钮不被选中
          $Shops.find('i').removeClass('radioImg');//删除类名
          $Shops.css({border:'1px solid #d1d1d1'})
          $btnCkeck.find('i').hide();
          $btnCkeck.css({border:'1px solid #d1d1d1'})
         
          // 计算
          TotalPrice();
          // 计算
        }
      });

  		// 点击店铺按钮
      $Shops.click(function() {
        if ($(this).find('i').attr('class') == 'radioImg') { //如果店铺按钮被选中
          $(this).parents('main').find('.commodity_radio').find('i').hide(); //店铺内的所有商品按钮也被选中
          $(this).parents('main').find('.commodity_radio').css({border:'1px solid #d1d1d1'});
          $(this).parents('main').find('.commodity_radio').find('i').removeClass('radio_img');
          $(this).find('i').hide();// i隐藏
          $(this).css({border:'1px solid #d1d1d1'});
          $(this).find('i').removeClass('radioImg');//删除类名
          $btnCkeck.find('i').hide();//全选按钮被选中
          $btnCkeck.css({border:'1px solid #d1d1d1'});
          $btnCkeck.removeClass('btnradio');
          TotalPrice();
        } else { //如果店铺按钮不被选中
          $(this).parents('main').find('.commodity_radio').find('i').show(); //店铺内的所有商品也不被全选
          $(this).parents('main').find('.commodity_radio').css({border:'none'});
          $(this).parents('main').find('.commodity_radio').find('i').addClass('radio_img');
          $(this).find('i').show(); // i显示
          $(this).css({border:'none'});
          $(this).find('i').addClass('radioImg');//添加类名
          $btnCkeck.find('i').show();
          $btnCkeck.css({border:'none'});//全选按钮也不被选中
          $btnCkeck.addClass('btnradio');
          TotalPrice();
        }
      });
      // 点击全选按钮
      $btnCkeck.click(function() {
        if ($(this).attr('class') == 'btnCkeck btnradio') { //如果全选按钮被选中
          $(this).find('i').hide();// i隐藏
          $(this).css({border:'1px solid #d1d1d1'});
          $(this).parents('footer').prev().find('.commodity_radio').find('i').hide(); //店铺内的所有商品按钮也被选中
          $(this).parents('footer').prev().find('.commodity_radio').css({border:'1px solid #d1d1d1'}); 
          $(this).parents('footer').prev().find('.commodity_radio').find('i').removeClass('radio_img');
          $(this).removeClass('btnradio');
          $Shops.find('i').hide();
          $Shops.css({border:'1px solid #d1d1d1'});//全选按钮也不被选中
          $Shops.addClass('btnradio');
          TotalPrice();
        } else {
          $(this).parents('footer').prev().find('.commodity_radio').find('i').show(); //店铺内的所有商品也不被全选
          $(this).parents('footer').prev().find('.commodity_radio').css({border:'none'});
          $(this).parents('footer').prev().find('.commodity_radio').find('i').addClass('radio_img');
          $(this).addClass('btnradio');//添加类名
          $(this).find('i').show(); // i显示
          $(this).css({border:'none'});
          $Shops.find('i').show();
          $Shops.css({border:'none'});
          $Shops.removeClass('btnradio');
          TotalPrice();
        }
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
        $('.twob').hide();
        $('.twon').show();
        $('.threeb').hide();
        $('.threen').show();

        //舌尖会员价显示
        $('.main_clearNone').show();
        // 用券优惠
        $('.main_clearing').hide();
        
        //删除高亮
        $('.threeb').find('span').removeClass('unit_price');
        //添加高亮
        $('.threen').find('span').addClass('unit_price');
        TotalPrice();

      })

      $With_Offer.click(function(){
        $With_Offer.css({border:0}).find('i').show();
        $With_Offer.eq(1).css({border:0}).find('i').show();
        $members.css({border:'1px solid #d1d1d1'}).find('i').hide();
        //显示隐藏
        $('.twon').hide();
        $('.twob').show();
        $('.threen').hide();
        $('.threeb').show();
        
        //舌尖会员价显示
        $('.main_clearing').show();
        // 用券优惠
        $('.main_clearNone').hide();

        //删除高亮
        $('.threen').find('span').removeClass('unit_price');
        //添加高亮
        $('.threeb').find('span').addClass('unit_price');
        //点击添加合计
        TotalPrice();
      })

      function TotalPrice() {
          var oprice = 0; //店铺总价
          $('.commodity_radio').each(function() { //循环商品
            if ($(this).find('i').attr('class') == 'radio_img') { //如果该商品被选中
              var num = parseInt($(this).parents('.product-style').find('.list_count').find('span').text()); //得到商品的数量
              var price = Number($(this).parents('.product-style').find('.unit_price').text()); //得到商品的单价
              console.log(num,price);
              var total = price * num; //计算单个商品的总价
              oprice += total; //计算该店铺的总价
            }
          });
        $footing.text(oprice.toFixed(2)); //输出全部总价
      }

  		//弹框页面
  		$('.pop_up').on('click','span',function(){
  			$('.pop_up').hide();
  		})

      //点击去结算
  		var $settle = $('.to-settle-accounts');
  		var $clearing = $('#clearing_bottom');
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


      $newAdd = $('.newAdd');
      $newAdd.click(function(){
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


      var $save_p = $('.save_p');
      var address_name;
      var address_phone;
      var address_type;
      var newAddress;
      $save_p.click(function(){
        address_name = $('.address_name').text();
        address_phone = $('.address_phone').text();
        address_type = $('.address_type').text();
        newAddress = $('.newAddress').text();
        


        var address_name = $('#name').val();
        var address_phone = $('#phone').val();
        var address_shipping = $('#address').val();
        var address_tablet = $('#tablet').val();
        var address_type = $('.Highlight').text();

        //获取收货地址
        var newAddress = $.trim(address_shipping) + $.trim(address_tablet);
        // 收货人
        if(!/^\w{2,20}$/.test(address_name)){
          alert('输入的收货人姓名不合法');
          return false;
        }
        // 手机号码
        if (!/^1[34578]\d{9}$/.test(address_phone)) {
          alert('输入的手机号码不合法');
          return false;
        }
        // 收货地址
        if(address_shipping == ''){
          alert('收货地址不能为空');
          return false;
        }
        // 楼号门牌
        if(address_shipping == ''){
          alert('楼号门牌不能为空');
          return false;
        }

        $.post('/addAddress',{
          name:username,
          address_name:$.trim(address_name),
          address_phone:$.trim(address_phone),
          newAddress:$.trim(newAddress),
          address_type:$.trim(address_type)
        },function(response){
          if (!response) {
            alert('设置失败');
          }else{
            location.reload;
            alert('添加成功');
          }
        })

      })

      var username='lrs';
     
      var $address = $('.address');
      $address.on('click',function(){
        $.post('/getAddress',{name:username},function(response){
          var newObj = response;
          var html = newObj.map(function(item){
            return `
            <div class="address_list">
              <div class="address_left">
                <span><i></i></span>
              </div>
              <div class="address_center">
              <ul>
                <li class="address_name">${item.address_name}</li>
                <li class="address_phone">${item.address_phone}</li>
                <li>
                <span class="add_list">
                  <span>[</span>
                  <i class="address_type">${item.address_type}</i>
                  <span>]</span>
                </span>
                <i class="newAddress">${item.newAddress}</i>
              </li>
              </ul>
              </div>
              <div class="address_right">
                <div class="address_edit">
                  <span>编辑</span>
                </div>
              </div>
            </div>
          `
          })
          $('.receiver').html(html);
          // 本地储存地址
          $address_list = $('.address_list');
          $address_list.click(function(){
            var $address_name = $(this).find('.address_name').text();
            var $address_phone = $(this).find('.address_phone').text();
            var $address_type = $(this).find('.address_type').text();
            var $newAddress = $(this).find('.newAddress').text();

            if (!window.localStorage) {
              alert("浏览器支持localstorage");
            }else{
              var storage=window.localStorage;

              storage.name = $address_name;
              storage.phone = $address_phone;
              storage.type = $address_type;
              storage.address = $newAddress;
              
              $newAdd = $('.newAdd');
              var html = 
              ` 
                  <ul>
                    <li>${storage.name}<span>${storage.phone}</span></li>
                    <li>${storage.address}<span class="newAdd_span">${storage.type}</span></li>
                  </ul>
              `
              console.log(storage);
              $newAdd.html(html);
              $address.hide();
              $newAdd.show();
              $('#shipping_address').animate({top:'9.375rem'},function(){
                $('#shipping_address').hide();
              });
            }

            
          })
        })
      })

      $newAdd.on('click',function(){
        $.post('/getAddress',{name:username},function(response){
          var newObj = response;
          var html = newObj.map(function(item){
            return `
            <div class="address_list">
              <div class="address_left">
                <span><i></i></span>
              </div>
              <div class="address_center">
              <ul>
                <li class="address_name">${item.address_name}</li>
                <li class="address_phone">${item.address_phone}</li>
                <li>
                <span class="add_list">
                  <span>[</span>
                  <i class="address_type">${item.address_type}</i>
                  <span>]</span>
                </span>
                <i class="newAddress">${item.newAddress}</i>
              </li>
              </ul>
              </div>
              <div class="address_right">
                <div class="address_edit">
                  <span>编辑</span>
                </div>
              </div>
            </div>
          `
          })
          $('.receiver').html(html);
          // 本地储存地址
          $address_list = $('.address_list');
          $address_list.click(function(){
            var $address_name = $(this).find('.address_name').text();
            var $address_phone = $(this).find('.address_phone').text();
            var $address_type = $(this).find('.address_type').text();
            var $newAddress = $(this).find('.newAddress').text();

            if (!window.localStorage) {
              alert("浏览器支持localstorage");
            }else{
              var storage=window.localStorage;

              storage.name = $address_name;
              storage.phone = $address_phone;
              storage.type = $address_type;
              storage.address = $newAddress;
              
              $newAdd = $('.newAdd');
              var html = 
              ` 
                  <ul>
                    <li>${storage.name}<span>${storage.phone}</span></li>
                    <li>${storage.address}<span class="newAdd_span">${storage.type}</span></li>
                  </ul>
              `
              $newAdd.html(html);

              $address.hide();
              $newAdd.show();
              $('#shipping_address').animate({top:'9.375rem'},function(){
                $('#shipping_address').hide();
              });
            }

            
          })
        })
      })
      //地址更新后显示到页面
      var username='lrs';
      var $choices_address = $('.choices_address');
      $choices_address.on('click','i',function(){
        $(this).parents('.new_address').hide();
        $.post('/getAddress',{name:username,},function(response){
          var newObj = response;
          var html = newObj.map(function(item){
              return `
              <div class="address_list">
                <div class="address_left">
                  <span><i></i></span>
                </div>
                <div class="address_center">
                <ul>
                  <li class="address_name">${item.address_name}</li>
                  <li class="address_phone">${item.address_phone}</li>
                  <li>
                  <span class="add_list">
                    <span>[</span>
                    <i class="address_type">${item.address_type}</i>
                    <span>]</span>
                  </span>
                  <i class="newAddress">${item.newAddress}</i>
                </li>
                </ul>
                </div>
                <div class="address_right">
                  <div class="address_edit">
                    <span>编辑</span>
                  </div>
                </div>
              </div>
            `
          })
          $('.receiver').html(html);
        })
      })  
    
      
	  },500);
	})
})
