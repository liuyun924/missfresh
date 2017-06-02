var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017);

var db = new mongodb.Db('missfresh', server);

// 判断是否存在
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
				if(key=='dataId'){
					data[key]=Number(data[key]);
				}
				obj[key] = data[key];
				// console.log(obj);
				collection.find(obj).toArray(function(err, docs){
					// console.log(docs[0]);
					callback(docs[0])

				});
			}
			db.close();
		})
	})	
}

// 搜索
var search = function(_collection, obj, callback){
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
					var findarr=[];
					docs.forEach(function(item){
						var str=obj.keyword; 
							if(((item.title).indexOf(str)>-1 )||((item.adword).indexOf(str)>-1)){
								findarr.push(item);
							}
						
					})
					callback(findarr);
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

var del = function(_collection, data, key, callback){
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
				collection.remove(obj);
				callback(true);
					
			
			}
			db.close();
		})
	})	
}

var update = function(_collection, data, key,callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			} else {
				collection.find({name:data[key]}).toArray(function(err, docs){
					if(docs[0]){
						collection.update({name:data[key]},{$set:{address_name:data.address_name,address_phone:data.address_phone,newAddress:data.newAddress,address_type:data.address_type}})
						callback(docs[0]);
					}
					// else{
					// 	callback(false);
					// }
					

				});
			}
			db.close();
		})
	})
}


exports.exists = exists;
exports.save = save;
exports.read=read;
exports.del=del;
exports.search=search;
exports.update=update;