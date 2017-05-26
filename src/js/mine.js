require(['config'],function(){
	require(['jquery'],function(){
		// 引入尾部
		$('#webFooter').load('footer.html');

		// 显示
		$.get('/mine', function(response){
			if(response.status){
				console.log(response.data)
				$('#login').css('display','none');
				$('#user').css('display','block');
				$('.username').text(response.data);
			} else {
				alert('您还没登录');
				console.log(response.status)
			}
		})		
	})
})