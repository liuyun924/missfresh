var db = require('../module/db.moudle.js');

var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');


exports.handle = function(app){

	//设置 session
	app.use(cookieParser());
	app.use(session({
		secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
		name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
		cookie: {maxAge: 800000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true,
	}))

	// 登录
	app.post('/login', urlencodedParser, function(request, response){
		db.exists('account', request.body, 'email', function(data){
			// console.log(data)
			if(data){
				request.session.name = data;
				// console.log(request.session.name)
				console.log(data)
				response.send(apiResult(true,'',data));
			} else {
				response.send(apiResult(false, '邮箱错误'));
			}
		})
	})
	// 注册
	app.post('/register', urlencodedParser, function(request, response){
		db.exists('account', request.body, 'email', function(result){

			console.log(result);

			if(result){
				response.send(apiResult(false, '该邮箱已注册过'));
			} else {
				db.save('account', request.body); 	
				response.send(apiResult(true));
			}
		})
	})

	// 在我的页面判断是否登录
	app.get('/mine', function(request, response){
		console.log(request.session.name)
		response.send(apiResult(request.session.name != null, null, request.session.name));
	})
	// 退出登录
	app.get('/logout', function(request, response){
		response.send('account logout');
	})	
}
