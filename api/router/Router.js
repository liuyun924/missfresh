var path = require('path');

var AccountRouter = require('./Account.router.js');

exports.transmit = function(express){
	var app = express();

	AccountRouter.handle(app);

	// app.get('/', function(request, response){
	// 	response.send('root');
	// })
	
	app.use(express.static(path.join(path.resolve(__dirname, '../../'), '/')));

	app.listen(88);
}