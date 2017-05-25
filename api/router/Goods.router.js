var db = require('../module/db.moudle.js');

var apiResult = require('../module/apiResult.module.js')

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');


exports.Register = function(app){

	//设置 session
	app.use(cookieParser());
	app.use(session({
		secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
		name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
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



}