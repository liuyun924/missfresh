require(['config'],function(){
	require(['jquery'],function(){
		// 引入尾部
		// $('#webFooter').load('footer.html');

		// 显示
		$.get('/mine', function(response){
			if(response.status){
				console.log(response.data)
				$('#login').css('display','none');
				$('#user').css('display','block');
				$('.username').text(response.data);
			} else {
				// alert('您还没登录');
				console.log(response.status)
			}
		})

		// 点击余额时切换页面
		$('.surplus').click(function(){
			$('#mine').slideUp();
			$('#surplus').show();
		})
		$('#back').click(function(){
			$('#mine').slideDown();
			$('#surplus').hide();
		})

		// 余额页面中的tab切换
		var $tab = $('#tab');
		var $content = $tab.find('.content');
		var $title = $tab.children('.title');

		// 显示第一个的内容，隐藏其他
		$content.children().eq(0).show();
		$content.children().eq(0).siblings().hide();

		// 高亮第一个tab
		$title.children().eq(0).addClass('active');

		// 绑定点击事件
		$title.on('click','>span',function(){
			// 获取索引值
			var idx = $(this).index();

			// tab高亮
			$(this).addClass('active').siblings().removeClass('active');

			// 内容显示
			$content.children().hide().eq(idx).slideDown();
		});
	})
})