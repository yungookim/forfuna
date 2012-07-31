//Transporation layer.
//Syncs encrypted messages in the server.

var http = require('http');

module.exports = {
	serverip : "23.23.188.2",
	post_options : {  
	  host: "23.23.188.2",
	  path : "",
	  port: 3000,
	  method: 'POST',
	  headers: {  
		    'Content-Type': 'application/json'
		}
	},

	push_profile : function(data){
		data.public_key = "";

		this.post_options.path = "/prepare_profile";

		var req = http.request(this.post_options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    console.log('BODY: ' + chunk);
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});

		console.log(data);

		// write data to request body
		req.write(JSON.stringify(data));
		req.end();
		this.post_options.path = '';
	},

	get_new_friend : function(data, fn){

		data = JSON.stringify({fid : data.id});

		this.post_options.path = "/get_friend_info";
		var headers = {
			'Content-Type': 'application/json',
			'Content-Length': data.length
		};
		this.post_options.headers = headers;

		var req = http.request(this.post_options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		    fn(null, chunk);
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		  fn(e.message);
		});

		// write data to request body
		req.write(data);
		req.end();
		this.post_options.path = '';
	},

	request_friend : function(data, fn){
		this.post_options.path = '/request_friend';
		var req = createHttp(this.post_options, JSON.stringify(data).length,fn);

		// write data to request body
		req.write(JSON.stringify(data));
		req.end();
		this.post_options.path = '';
	},

	get_updates : function(data, fn){
		this.post_options.path = '/get_updates';

		var req = createHttp(this.post_options, JSON.stringify(data).length, fn);
		req.write(JSON.stringify(data));
		req.end();
		this.post_options.path = '';
	},

	remove : function(data){
		this.post_options.path = '/remove';
		var tdata = JSON.parse(data);
		var id, uuid;
		for (k in tdata){
			tdata[k] = JSON.parse(tdata[k]);
			for (i in tdata[k]){
				if (i == 'id'){
					id = tdata[k][i];
				}
				if (i == 'uuid'){
					uuid = tdata[k][i];
				}
			}
		}
		var _data = {
			length : data.length,
			id : id,
			uuid : uuid
		};

		_data = JSON.stringify(_data);
		console.log(_data);
		var length = _data.length;
		var req = createHttp(this.post_options, length, null);
		
		req.write(_data);
		req.end();
		this.post_options.path = '';
	}
}

function createHttp(options, length, fn){
	var headers = {
			'Content-Type': 'application/json',
			'Content-Length': length
		};
	options.headers = headers;
	return http.request(options, function(res) {
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.setEncoding('utf8');
		  res.on('data', function (chunk) {
		  	if (fn){
		  		fn(null, chunk);
		  	}
		  });
		});
		req.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		  fn(e.message);
		});
}