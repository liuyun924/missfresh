require(['config'],function(){
	require(['jquery'],function(){
		$('#btn').click(function(){

			// if(!$(':input').val()){
			// 		console.log($(':input').val())
			// 		alert('请不要留空')
			// 		return false;
			// 	}
			
			var erp = erp || {};
			erp.baseUrl = 'http://127.0.0.1:888/';

			// 注册
			$.post(erp.baseUrl +  'register', {
				email: $.trim($('#email').val()),
				name: $.trim($('#username').val()),
				password: $.trim($('#password').val())
			}, function(response){
				if(response.status){
					console.log(response.status)
					window.location.href = "http://127.0.0.1:888/html/login.html";
				} else {
					alert(response.status);
					console.log(response.status)
				}
			})

			
		})
	})
})