var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

module.exports = {

	get_posts : function(fn){
		db.all("SELECT * FROM posts ORDER BY time", function(err, result){
			if (err) {
				console.og(err); return;
			}
			fn(null, result);
		});
	},

	get_profile : function(fn){
		db.each("SELECT * FROM user_info limit 1", function(err, result){
			if (err) {
				console.og(err); return;
			}
			fn(null, result);
		});
	},

	save_profile : function(data, fn){
		db.run("UPDATE user_info SET name=?, id=?, status=?, uuid=? where uid=0", 
			[data['data[name]'], data['data[id]'], 
			data['data[status]'], data['data[uuid]']],
			function(err, ret){
				if (err) {fn(err); console.log(err); return;}
				fn(null, ret);
			});	
	},

	save_post : function(data, fn){
		data.comments = "";
		db.run("INSERT INTO posts values(?,?,?,?,?,?)", 
			[data.pid, data.name, data.id, data.post, 
			data.time, data.comments],
			function(err, ret){
				if (err) {fn(err); console.log(err); return;}
				fn(null, ret);
			});
	},

	save_comments : function(data, fn){
		 db.run("UPDATE posts SET comments=? where pid=?", 
		 	[data.comments, data.pid],
		 	function(err, ret){
		 		if (err) {fn(err); console.log(err); return;}
				fn(null, ret);
		 	});
	},

	save_news : function(data, fn){
		db.run("UPDATE user_info SET news=? where uid=0", 
			[data.news], 
			function(err, ret){
				if (err) {fn(err); console.log(err); return;}
				fn(null, ret);
			});
	}
}
