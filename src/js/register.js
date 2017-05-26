require(['config'],function(){
	require(['jquery'],function(){
		$('#btn').click(function(){

			// 注册
			$.post('/register', {
				email: $.trim($('#email').val()),
				name: $.trim($('#username').val()),
				password: $.trim($('#password').val())
			}, function(response){
				if(response.status){
					console.log(response.status)
					window.location.href = "http://10.3.133.77:88/src/html/login.html";
				} else {
					alert(response.status);
					console.log(response.status)
				}
			})

			
		})
	})
})