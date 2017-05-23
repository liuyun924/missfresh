require(['config'],function(){
	require(['jquery','mobile'],function($,m){
		//移动端适配
		m.mobile();

		$('.s_car').on('click',function(){
			$(this).css('display','none');
			$(this).next().css('display','block');
		})
	})
});
