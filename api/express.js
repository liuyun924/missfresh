var express = require('express');
var app = express();
var path = require('path');
var db = require('./db');
var apiResult = require('./apiResult.js');

//node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');

	app.use(cookieParser());
	app.use(session({
		secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
		name: 'users',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
		cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: false,
		saveUninitialized: true,
	}))


	app.post('/getgoods', urlencodedParser, function(request, response){
			db.read('goodslist',function(data){
				var _data=JSON.stringify(data);
				response.send(_data);
			})
				
	})

	// 添加商品接口
	app.post('/addgoods', urlencodedParser, function(request, response){
		db.exists('goodslist',request.body,'dataId',function(result){
			
			if(result){
				response.send(apiResult(false, '该商品已存在'));
			} else {
				db.save('goodslist', request.body); 	
				response.send(apiResult(true));
			}
		})
			
	})

	// 删除商品接口
	app.post('/delgoods', urlencodedParser, function(request, response){
		db.del('goodslist',request.body,'dataId',function(result){
			
			if(result){
				response.send(apiResult(ture, '该商品已删除'));
			}else{

				response.send(apiResult(false));
			
			}
		})
			
	})
	// 搜索商品
app.post('/sergoods', urlencodedParser, function(request, response){
		db.search('goodslist',request.body,function(result){
			
			if(result){
				response.send(result);
			}else{

				response.send(apiResult(false));
			
			}
		})
			
	})

// 获取详情页列表
app.post('/todetail',urlencodedParser,function(request, response){
	db.exists('goodslist',request.body,dataId,function(result){
			
			if(result){
				response.send(result);
			} else {	
				response.send(apiResult(false));
			}
		})
})


// 给用户添加地址

app.post('/addAddress', urlencodedParser, function(request, response){
		db.exists('address',request.body,'name',function(result){
			console.log(result);
			if(result){
				db.update('address',request.body);
				response.send('updata');
			} else {
				db.save('address', request.body); 	
				response.send(apiResult(true));
				
			}
		})
			
	})
// 获取用户地址及信息
app.post('/getAddress', urlencodedParser, function(request, response){
		db.exists('address',request.body,'name',function(result){
			
			response.send(result);
		})
			
	})

	// 登录
	app.post('/login', urlencodedParser, function(request, response){
		db.exists('account', request.body, 'email', function(data){
			if(data){
				request.session.name = data.name;
				console.log(data.name)
				response.send(apiResult(true,'',data));
			} else {
				response.send(apiResult(false, '邮箱错误'));
			}
		})
	})
	// 用户注册
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

	// 在设置页面判断是否登录
	app.get('/setting', function(request, response){
		console.log(request.session.name)
		response.send(apiResult(request.session.name != null, null, request.session.name));
	})

app.use(express.static(path.join(__dirname, './../')));
app.listen(88,'10.3.133.77');
