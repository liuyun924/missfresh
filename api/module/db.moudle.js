var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017);

var db = new mongodb.Db('missfresh', server);

var exists = function(_collection, data, key, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				var obj = {};
				obj[key] = data[key];
				collection.find(obj).toArray(function(err, docs){
					callback(docs[0])
				});
			}
			db.close();
		})
	})	
}

var save = function(_collection, data){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				// 插入数据
				collection.insert(data);
			}
			db.close();
		})
	})
}

var read = function(_collection, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find().toArray(function(err, docs){
					callback(docs)
				});
			}
			db.close();
		})
	})
}
exports.exists = exists;
exports.save = save;
exports.read=read;
