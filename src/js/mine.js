require(['config'],function(){
	require(['jquery'],function(){
		// 引入尾部
		// $('#webFooter').load('footer.html');


		// 用户登录后显示用户信息
		var erp = erp || {};
		erp.baseUrl = 'http://127.0.0.1:888/';

		// 显示
		$.get(erp.baseUrl +  'mine', function(response){
			if(response.status){
				console.log(response.data)
				$('#login').css('display','none');
				$('#user').css('display','block');
				$('.username').text(response.data);
			} else {
				alert(response.status);
				console.log(response.status)
			}
		})		
	})
})