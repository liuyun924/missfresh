require(['config'],function(){
	require(['jquery'],function(){
		$('#btn').click(function(){

			
			// var erp = erp || {};
			// erp.baseUrl = 'http://127.0.0.1:888/';

			// 登录
			$.post('/login', {
				email: $.trim($('#email').val()),
				password: $.trim($('#password').val())
			}, function(response){
				if(response.status){
					console.log(response.status)
					window.location.href = "http://10.3.133.77:88/src/html/mine.html";
				} else {
					alert(response.status);
					console.log(response.status)
				}
			})
		})
	})
})