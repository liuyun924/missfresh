require(['config'],function(){
	require(['jquery','mobile'],function($,m){
		//移动端适配
		m.mobile();

		//购物车按钮效果
		$('.s_car').each(function(i){
			$('.s_car').eq(i).on('click',function(){
				$(this).css('display','none');
				$(this).next().css('display','block');
			});
		});

		//购物车删减效果
		$('.car_remove').each(function(i){
			$('.car_remove').eq(i).on('click',function(){
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
			
			$('.car_add').eq(i).on('click',function(){

				var val = parseInt($('.car_num')[i].innerText);

				$('.car_num')[i].innerText = val + 1; 
			})
		});
		
<<<<<<< HEAD
=======
			var left;
			// var top;
			$('.main').addEventListener('touchstart',function(e){
				left = e.targetTouches[0].clientX;
				// top = e.targetTouches[0].clientY;
			});
			$('.main').addEventListener('touchmove',function(e){
				var e_left = e.targetTouches[0].clientX;
				if(e.targetTouches[0].clientX<left){
					$('.main').css('tarnsform','translate(-'+ (left-e_left) +')')
				}
				left = e.targetTouches[0].clientX;
				// top = e.targetTouches[0].clientY;
			});
		

		// $('.main')[0].addEventListener('touchmove',function(e){
		// 	console.log(e.targetTouches);
		// });
>>>>>>> dzy
	})
});