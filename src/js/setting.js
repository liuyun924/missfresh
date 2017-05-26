require(['config'],function(){
	require(['jquery'],function(){

		// 判断登录状态
		$.get('/setting', function(response){
			if(response.status){
				console.log(response.data)
				$('.user').css('display','block');
				$('#logout').css('display','block');
				$('#username').text(response.data);
			} else {
				$('.user').css('display','none');
				$('#logout').css('display','none');
			}
		})	

		// 点击退出登录
		$('#logout').click(function(){
			window.location.href = "http://10.3.133.77:88/src/html/login.html";
		})


	})
})