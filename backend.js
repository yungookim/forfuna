var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();

module.exports = {

	set_posts : function(data, fn){
		
	},

	get_posts : function(data, fn){
		
	},

	create_profile : function(data, fn){
		
	},

	get_profile : function(fn){
		db.each("SELECT * FROM user_info limit 1", function(err, result){
			if (err) {
				console.log(err); return;
			}
			fn(null, result);
		});
	},

	save_profile : function(data, fn){
		console.log(data);
		db.run("UPDATE user_info SET name=?, id=?, status=?, uuid=? where uid=0", 
			[data.name, data.id, data.status, data.uuid],
			function(err, ret){
				if (err) {fn(err); console.log(err); return;}
				fn(null, ret);
			});	
	}
}
